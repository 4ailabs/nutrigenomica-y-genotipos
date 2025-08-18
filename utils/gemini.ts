import { GoogleGenAI } from "@google/genai";
import type { FoodGuideData, AIPersonalData, ChatMessage } from '../types';
import { FOOD_GUIDE_DATA } from '../foodData';

// Assume process.env.API_KEY is properly configured
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

function getFoodLists(foodData: FoodGuideData) {
    const superfoods: string[] = [];
    const toxins: string[] = [];

    for (const category in foodData.categorias_alimentos) {
        for (const food of foodData.categorias_alimentos[category]) {
            if (food.estado === "Superalimento") {
                superfoods.push(food.nombre);
            } else if (food.estado === "Toxina") {
                toxins.push(food.nombre);
            }
        }
    }
    return { superfoods: [...new Set(superfoods)], toxins: [...new Set(toxins)] };
}

export async function generateAiResponse(
    requestType: 'menu' | 'recipes' | 'supplements',
    foodData: FoodGuideData,
    personalData: AIPersonalData
): Promise<string> {

    const { superfoods, toxins } = getFoodLists(foodData);
    const genotypeName = foodData.genotipo_info.nombre;

    const role = `Eres un experto en nutrición especializado en el sistema de Genotipos. Tu tarea es crear recomendaciones personalizadas basadas en el perfil de un usuario. Debes seguir las reglas dietéticas ESTRICTAMENTE.
    - **Regla 1: NUNCA USES ALIMENTOS DE LA LISTA DE TOXINAS.**
    - **Regla 2:** Prioriza siempre los alimentos de la lista de Superalimentos.
    - **Regla 3:** Puedes usar alimentos 'Neutros' (aquellos que no están en la lista de Superalimentos ni en la de Toxinas) de forma complementaria.
    - **Regla 4:** Responde siempre en formato Markdown, usando listas y negritas para que sea fácil de leer.
    - **Regla 5:** Siempre al final de tu respuesta, sin excepción, incluye el siguiente descargo de responsabilidad: "**Aviso Importante:** Esta recomendación fue generada por IA y no reemplaza el consejo de un profesional de la salud. Consulta a tu médico o nutricionista antes de hacer cambios en tu dieta o régimen de suplementos."`;

    const userInfo = `
      - **Genotipo:** ${genotypeName}
      - **Edad:** ${personalData.age}
      - **Sexo:** ${personalData.sex}
      - **Condiciones de Salud:** ${personalData.healthConditions || 'Ninguna especificada'}
      - **Objetivos:** ${personalData.goals || 'Bienestar general'}
    `;

    const foodRules = `
      - **Lista de Superalimentos permitidos:** ${superfoods.join(', ')}.
      - **Lista de Toxinas ESTRICTAMENTE PROHIBIDAS:** ${toxins.join(', ')}.
    `;

    let userRequest: string;
    switch (requestType) {
        case 'menu':
            userRequest = "Crea un plan de menú semanal (Lunes a Domingo) para desayuno, comida y cena. Asegúrate de que sea variado y equilibrado.";
            break;
        case 'recipes':
            userRequest = "Genera 3 recetas creativas y fáciles de preparar (un desayuno, una comida y una cena) que sean adecuadas para este perfil. Incluye ingredientes y pasos de preparación.";
            break;
        case 'supplements':
            userRequest = "Basado en el genotipo y los objetivos del usuario, recomienda 3 a 5 suplementos clave. Explica brevemente por qué cada uno es beneficioso para este perfil específico.";
            break;
    }

    const fullPrompt = `
      **Rol y Reglas:**
      ${role}

      **Datos del Usuario:**
      ${userInfo}

      **Reglas Dietéticas del Genotipo:**
      ${foodRules}

      **Solicitud del Usuario:**
      ${userRequest}
    `;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            temperature: 0.5,
            topK: 40,
            topP: 0.95,
        }
      });
      return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Lo siento, ha ocurrido un error al generar la recomendación. Por favor, inténtalo de nuevo más tarde.";
    }
}

export async function generateChatResponse(
    history: ChatMessage[],
    genotypeId: number | null
): Promise<string> {
    const model = 'gemini-2.5-flash';
    
    let genotypeSpecifics = "";
    if (genotypeId && FOOD_GUIDE_DATA[genotypeId]) {
        const foodData = FOOD_GUIDE_DATA[genotypeId];
        const { superfoods, toxins } = getFoodLists(foodData);
        genotypeSpecifics = `
          **Contexto Específico:**
          Actualmente estás asistiendo a un usuario que está viendo el **${foodData.genotipo_info.nombre}**.
          Debes basar tus respuestas sobre alimentos ESTRICTAMENTE en las siguientes listas:
          - **Superalimentos Permitidos:** ${superfoods.join(', ')}.
          - **Toxinas Prohibidas:** ${toxins.join(', ')}.
          - **Alimentos Neutros:** Cualquier alimento que no esté en ninguna de las dos listas anteriores se considera neutro y está permitido. Si te preguntan por un alimento que no está en las listas, di que es neutro.
          NO inventes información. Si no sabes, dilo.
        `;
    }

    const systemInstruction = `
        Eres un asistente de IA conversacional, amigable y experto en el programa de salud GenoTipo. Tu objetivo es responder las preguntas del usuario de manera clara y concisa.
        
        **Reglas Estrictas:**
        1. **NUNCA des consejos médicos.** Si un usuario pregunta por condiciones médicas, recomienda siempre que consulte a un profesional de la salud.
        2. Basa tus respuestas únicamente en la información proporcionada sobre los Genotipos.
        3. Mantén las respuestas breves y al grano.
        4. Al final de CADA respuesta, incluye el descargo de responsabilidad: "**Aviso:** Soy un asistente de IA y esta información no reemplaza el consejo médico profesional."

        ${genotypeSpecifics}
    `;

    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
    }));

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topK: 40,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for chat:", error);
        return "Lo siento, tuve un problema para procesar tu pregunta. Por favor, intenta de nuevo.";
    }
}