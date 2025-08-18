import { GoogleGenAI } from "@google/genai";
import type { FoodGuideData, AIPersonalData, ChatMessage } from '../types';
import { FOOD_GUIDE_DATA } from '../foodData';

// Obtener API Key de forma segura para Vite (cliente) o Node
const apiKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY)
  || process.env.VITE_GEMINI_API_KEY
  || process.env.GEMINI_API_KEY
  || process.env.API_KEY;

if (!apiKey) {
  // Lanzar error claro en desarrollo; en prod devolvemos mensajes de error amigables
  // eslint-disable-next-line no-console
  console.warn("[Gemini] Falta la API key. Define VITE_GEMINI_API_KEY en Vercel (y .env.local para dev).");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

function getFoodLists(foodData: FoodGuideData) {
    const superfoods: string[] = [];
    const toxins: string[] = [];

    for (const category in foodData.categorias_alimentos) {
        for (const food of (foodData.categorias_alimentos as any)[category]) {
            if (food.estado === "Superalimento") {
                superfoods.push(food.nombre);
            } else if (food.estado === "Toxina") {
                toxins.push(food.nombre);
            }
        }
    }
    return { superfoods: [...new Set(superfoods)], toxins: [...new Set(toxins)] };
}

function extractText(resp: any): string {
  if (!resp) return '';
  try {
    if (typeof resp.text === 'function') return resp.text();
    if (typeof resp.text === 'string') return resp.text;
    if (resp.output_text) return resp.output_text;
    if (resp.candidates && resp.candidates[0]?.content?.parts?.[0]?.text) {
      return resp.candidates[0].content.parts[0].text as string;
    }
    return JSON.stringify(resp);
  } catch {
    return '';
  }
}

export async function generateAiResponse(
    requestType: 'menu' | 'recipes' | 'supplements' | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'salads' | 'smoothies' | 'mealPrep',
    foodData: FoodGuideData,
    personalData: AIPersonalData
): Promise<string> {

    if (!apiKey) {
      return "Lo siento, la IA no está disponible por falta de credenciales. Por favor, configura VITE_GEMINI_API_KEY en el entorno.";
    }

    const { superfoods, toxins } = getFoodLists(foodData);
    const genotypeName = foodData.genotipo_info.nombre;

    const role = `Eres un experto en nutrigenómica especializado en el sistema de GenoTipos, diseñando recomendaciones para que médicos profesionales las presenten a sus pacientes.

CONTEXTO MÉDICO PROFESIONAL:
- Tu audiencia son médicos que necesitan información clara para sus pacientes
- Las recomendaciones deben ser precisas y fundamentadas científicamente
- El formato debe ser fácil de presentar y explicar a pacientes
- Incluye justificación basada en el genotipo específico del paciente

REGLAS DIETÉTICAS ESTRICTAS:
- NUNCA incluir alimentos de la lista de TOXINAS
- PRIORIZAR alimentos de la lista de SUPERALIMENTOS
- Complementar con alimentos 'Neutros' cuando sea necesario
- Explicar el fundamento genotípico de cada recomendación

FORMATO PROFESIONAL:
- Usar Markdown con estructura clara y directa
- Incluir sección "Fundamento Científico" de forma objetiva
- Incluir sección "Para Explicar al Paciente" en lenguaje accesible
- Proporcionar listas prácticas y organizadas
- NO usar fórmulas de cortesía ni tratamientos

DISCLAIMER MÉDICO:
Al final de cada respuesta incluir: "**Nota Profesional:** Esta información nutrigenómica está basada en el análisis del genotipo específico del paciente y debe ser integrada dentro del contexto clínico completo del mismo."`;

    const userInfo = `
      - Genotipo: ${genotypeName}
      - Edad: ${personalData.age}
      - Sexo: ${personalData.sex}
      - Condiciones de Salud: ${personalData.healthConditions || 'Ninguna especificada'}
      - Objetivos: ${personalData.goals || 'Bienestar general'}
    `;

    const foodRules = `
      - Lista de Superalimentos permitidos: ${superfoods.join(', ')}.
      - Lista de Toxinas ESTRICTAMENTE PROHIBIDAS: ${toxins.join(', ')}.
    `;

    let userRequest: string = '';
    switch (requestType) {
        case 'menu':
            userRequest = `Crea un plan de menú semanal detallado (Lunes a Domingo) para desayuno, comida y cena usando ÚNICAMENTE los superalimentos permitidos para este genotipo. Estructura la respuesta así:
            
**MENÚ SEMANAL PERSONALIZADO**

**LUNES**
- 🌅 Desayuno: [usar superalimentos de la lista]
- 🍽️ Almuerzo: [usar superalimentos de la lista]
- 🌙 Cena: [usar superalimentos de la lista]

[Continuar para cada día]

Asegúrate de que cada comida use SOLO alimentos de la lista de superalimentos y que sea nutricionalmente completa y variada.`;
            break;
        case 'recipes':
            userRequest = "Genera 3 recetas creativas y fáciles de preparar (un desayuno, una comida y una cena) que sean adecuadas para este perfil. Incluye ingredientes y pasos de preparación.";
            break;
        case 'supplements':
            userRequest = "Basado en el genotipo y los objetivos del usuario, recomienda 3 a 5 suplementos clave. Explica brevemente por qué cada uno es beneficioso para este perfil específico.";
            break;
        case 'breakfast':
            userRequest = "Crea 5 opciones de desayunos nutritivos y energéticos para este perfil genotípico. Incluye ingredientes, preparación y beneficios específicos.";
            break;
        case 'lunch':
            userRequest = "Genera 5 opciones de almuerzos equilibrados y nutritivos para este perfil. Incluye platos principales, guarniciones y bebidas recomendadas.";
            break;
        case 'dinner':
            userRequest = "Crea 5 opciones de cenas ligeras pero nutritivas para este perfil. Enfócate en proteínas magras y vegetales de fácil digestión.";
            break;
        case 'snacks':
            userRequest = "Genera 8 opciones de snacks saludables entre comidas para este perfil. Incluye opciones dulces y saladas, con horarios recomendados.";
            break;
        case 'salads':
            userRequest = "Crea 6 ensaladas nutritivas y variadas para este perfil genotípico. Incluye diferentes tipos de hojas, proteínas y aderezos saludables.";
            break;
        case 'smoothies':
            userRequest = "Genera 5 recetas de smoothies y batidos nutritivos para este perfil. Incluye opciones para diferentes momentos del día y objetivos.";
            break;
        case 'mealPrep':
            userRequest = "Crea un plan de preparación de comidas para 5 días que sea eficiente y nutritivo para este perfil. Incluye lista de compras y planificación semanal.";
            break;
    }

    const fullPrompt = `
      Rol y Reglas:
      ${role}

      Datos del Usuario:
      ${userInfo}

      Reglas Dietéticas del Genotipo:
      ${foodRules}

      Solicitud del Usuario:
      ${userRequest}
    `;
    
    try {
      const response = await (ai as any).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            temperature: 0.5,
            topK: 40,
            topP: 0.95,
        }
      });
      return extractText(response);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Lo siento, ha ocurrido un error al generar la recomendación. Por favor, inténtalo de nuevo más tarde.";
    }
}

export async function generateChatResponse(
    history: ChatMessage[],
    genotypeId: number | null
): Promise<string> {
    if (!apiKey) {
      return "Lo siento, la IA no está disponible por falta de credenciales. Configura VITE_GEMINI_API_KEY.";
    }
    
    // Información general sobre todos los genotipos
    const allGenotypes = `
        INFORMACIÓN GENERAL DE GENOTIPOS:
        
        El sistema GenoTipo identifica 6 perfiles genéticos nutricionales:
        
        1. **HUNTER (Cazador)** - Perfil ancestral de cazadores:
           - Grupo sanguíneo: Principalmente O
           - Características: Sistema inmune reactivo, energía pulsátil, orientado al detalle
           - Dieta: Carnívora, baja en lectinas y gluten, rica en proteínas animales
        
        2. **GATHERER (Recolector)** - Perfil ancestral de recolectores:
           - Grupo sanguíneo: O o B
           - Características: Metabolismo eficiente, alta capacidad mental, adaptativo
           - Dieta: Alta en proteínas, bajo índice glucémico, rica en antioxidantes
        
        3. **MASTER (Maestro)** - Perfil equilibrado y adaptable:
           - Grupo sanguíneo: A o AB
           - Características: Sistema inmune tolerante, creatividad innata, adaptabilidad
           - Dieta: Basada en vegetales, rica en nutrientes metilantes y fitoquímicos
        
        4. **EXPLORER (Explorador)** - Perfil adaptativo e innovador:
           - Grupo sanguíneo: Cualquiera (multiusos genético)
           - Características: Sistema detoxificante eficiente, sensibilidad química, regeneración genética
           - Dieta: Desintoxicante, nutritiva para la sangre y médula ósea
        
        5. **WARRIOR (Guerrero)** - Perfil de fortaleza y determinación:
           - Grupo sanguíneo: A o AB
           - Características: Sistema circulatorio activo, capacidad cognitiva elevada, metabolismo cambiante
           - Dieta: Principios mediterráneos modificados, pescados, aceites saludables
        
        6. **NOMAD (Nómada)** - Perfil resiliente y sensible:
           - Grupo sanguíneo: A o AB
           - Características: Sensibilidad ambiental única, fortaleza mental, conexión mente-cuerpo
           - Dieta: Omnívora, baja en lectinas y gluten, optimizada para óxido nítrico
    `;
    
    let specificGenotypeInfo = "";
    if (genotypeId && (FOOD_GUIDE_DATA as any)[genotypeId]) {
        const foodData = (FOOD_GUIDE_DATA as any)[genotypeId];
        const { superfoods, toxins } = getFoodLists(foodData);
        specificGenotypeInfo = `
          
          CONTEXTO ESPECÍFICO - ${foodData.genotipo_info.nombre}:
          El usuario tiene contexto del ${foodData.genotipo_info.nombre}.
          
          SUPERALIMENTOS PERMITIDOS para este genotipo: ${superfoods.slice(0, 15).join(', ')}${superfoods.length > 15 ? '...' : ''}
          TOXINAS PROHIBIDAS para este genotipo: ${toxins.slice(0, 15).join(', ')}${toxins.length > 15 ? '...' : ''}
          
          Si preguntan específicamente sobre alimentos para este genotipo, usa estas listas.
        `;
    }

    const systemPrompt = `
        Eres un asistente especializado en nutrigenómica para médicos profesionales que utilizan el sistema de GenoTipos nutricionales con sus pacientes.
        
        ${allGenotypes}
        ${specificGenotypeInfo}
        
        CONTEXTO DE USO:
        - Los usuarios son médicos que necesitan información para presentar a sus pacientes
        - Las respuestas deben ser profesionales pero comprensibles para pacientes
        - La información debe estar lista para ser explicada o compartida con pacientes
        - Incluye fundamento científico cuando sea apropiado
        
        FORMATO DE RESPUESTAS:
        1. **Lenguaje directo y neutral** sin tratamientos ("doctor", "estimado", etc.)
        2. **Estructura clara** con títulos y listas
        3. **Información práctica** presentada de forma objetiva
        4. **Base científica** del sistema GenoTipo cuando sea relevante
        5. **Separar información técnica** de la información para pacientes
        
        INSTRUCCIONES ESPECÍFICAS:
        - Responde de manera directa y neutral, sin fórmulas de cortesía
        - NO uses tratamientos como "doctor", "estimado", "entendido", etc.
        - Presenta la información de forma objetiva y profesional
        - Incluye tanto fundamento científico como aplicación práctica
        - Para listas de alimentos, usa las clasificaciones exactas: Superalimento/Toxina/Neutro
        - Menciona beneficios específicos del genotipo de forma factual
        
        EJEMPLO DE ESTRUCTURA DESEADA:
        **Información Técnica:**
        [Fundamento científico y datos del genotipo]
        
        **Para Explicar al Paciente:**
        [Información clara y práctica]
        
        RESPONDE SIEMPRE EN ESPAÑOL de forma directa y neutra.
    `;

    // Crear el prompt completo con el historial y la instrucción del sistema
    const fullPrompt = `
        ${systemPrompt}
        
        HISTORIAL DE CONVERSACIÓN:
        ${history.map(msg => `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`).join('\n')}
        
        INSTRUCCIÓN: Responde la última pregunta del usuario de forma directa y neutral, basándote en el contexto del GenoTipo y las reglas dietéticas establecidas. NO uses fórmulas de cortesía como "entendido", "doctor", "estimado", etc.
    `;

    try {
        const response = await (ai as any).models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                temperature: 0.3, // Más bajo para respuestas más consistentes
                topK: 40,
                topP: 0.8,
            }
        });
        return extractText(response);
    } catch (error) {
        console.error("Error calling Gemini API for chat:", error);
        return "Lo siento, tuve un problema para procesar tu pregunta. Por favor, intenta de nuevo.";
    }
}