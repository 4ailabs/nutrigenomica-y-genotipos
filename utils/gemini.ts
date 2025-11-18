import { GoogleGenerativeAI } from '@google/generative-ai';
import type { FoodGuideData, AIPersonalData, ChatMessage } from '../types';
import { FOOD_GUIDE_DATA } from '../foodData';
import { getGeminiApiKey } from './env';
import { withRetry, getErrorMessage, logError } from './errorHandler';

// Obtener API Key de forma segura y centralizada
const apiKey = getGeminiApiKey();

if (!apiKey) {
  console.warn("[Gemini] Falta la API key. Define VITE_GEMINI_API_KEY en .env.local (desarrollo) o en Vercel (producción).");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

function getFoodLists(foodData: FoodGuideData) {
    const superfoods: string[] = [];
    const toxins: string[] = [];
    const neutrals: string[] = [];

    for (const category in foodData.categorias_alimentos) {
        for (const food of (foodData.categorias_alimentos as any)[category]) {
            if (food.estado === "Superalimento") {
                superfoods.push(food.nombre);
            } else if (food.estado === "Toxina") {
                toxins.push(food.nombre);
            } else {
                neutrals.push(food.nombre);
            }
        }
    }
    return { 
        superfoods: [...new Set(superfoods)], 
        toxins: [...new Set(toxins)],
        neutrals: [...new Set(neutrals)]
    };
}

// Calcular TMB (Tasa Metabólica Basal) usando ecuación de Mifflin-St Jeor
function calculateBMR(personalData: AIPersonalData): number | null {
    if (!personalData.age || !personalData.height || !personalData.weight || !personalData.sex) {
        return null;
    }
    
    const age = parseFloat(personalData.age);
    const height = parseFloat(personalData.height);
    const weight = parseFloat(personalData.weight);
    
    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
        return null;
    }
    
    // Fórmula de Mifflin-St Jeor
    const baseBMR = 10 * weight + 6.25 * height - 5 * age;
    return personalData.sex === 'masculino' ? baseBMR + 5 : baseBMR - 161;
}

// Calcular TDEE (Total Daily Energy Expenditure) considerando nivel de actividad
function calculateTDEE(personalData: AIPersonalData): number | null {
    const bmr = calculateBMR(personalData);
    if (!bmr) return null;
    
    const activityMultipliers: { [key: string]: number } = {
        'sedentario': 1.2,
        'ligero': 1.375,
        'moderado': 1.55,
        'activo': 1.725,
        'muy_activo': 1.9
    };
    
    const multiplier = activityMultipliers[personalData.activityLevel || 'moderado'] || 1.55;
    return Math.round(bmr * multiplier);
}

// Calcular IMC
function calculateBMI(personalData: AIPersonalData): number | null {
    if (!personalData.height || !personalData.weight) {
        return null;
    }
    
    const height = parseFloat(personalData.height);
    const weight = parseFloat(personalData.weight);
    
    if (isNaN(height) || isNaN(weight) || height === 0) {
        return null;
    }
    
    return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(1));
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

    const { superfoods, toxins, neutrals } = getFoodLists(foodData);
    const genotypeName = foodData.genotipo_info.nombre;
    
    // Calcular métricas nutricionales
    const bmr = calculateBMR(personalData);
    const tdee = calculateTDEE(personalData);
    const bmi = calculateBMI(personalData);
    const bmiCategory = bmi ? (
        bmi < 18.5 ? 'Bajo peso' :
        bmi < 25 ? 'Normal' :
        bmi < 30 ? 'Sobrepeso' : 'Obesidad'
    ) : null;

    const role = `Eres un experto en nutrigenómica especializado en el sistema de GenoTipos, diseñando recomendaciones para que médicos profesionales las presenten a sus pacientes.

CONTEXTO MÉDICO PROFESIONAL:
- Tu audiencia son médicos que necesitan información clara para sus pacientes
- Las recomendaciones deben ser precisas y fundamentadas científicamente
- El formato debe ser fácil de presentar y explicar a pacientes
- Incluye justificación basada en el genotipo específico del paciente
- Considera TODOS los datos del paciente para personalización completa

REGLAS DIETÉTICAS ESTRICTAS:
- NUNCA incluir alimentos de la lista de TOXINAS (prohibidos estrictamente)
- PRIORIZAR alimentos de la lista de SUPERALIMENTOS (60-70% de la dieta)
- USAR alimentos NEUTROS para complementar y variar (30-40% de la dieta)
- Explicar el fundamento genotípico de cada recomendación
- Considerar alergias y restricciones dietéticas del paciente
- Evitar interacciones con medicamentos cuando sea relevante

FORMATO PROFESIONAL:
- Usar Markdown con estructura clara y directa
- Incluir sección "Fundamento Científico" de forma objetiva
- Incluir sección "Para Explicar al Paciente" en lenguaje accesible
- Proporcionar listas prácticas y organizadas
- Incluir información nutricional cuando sea relevante (calorías, macronutrientes)
- NO usar fórmulas de cortesía ni tratamientos

DISCLAIMER MÉDICO:
Al final de cada respuesta incluir: "**Nota Profesional:** Esta información nutrigenómica está basada en el análisis del genotipo específico del paciente y debe ser integrada dentro del contexto clínico completo del mismo."`;

    const userInfo = `
PERFIL COMPLETO DEL PACIENTE:
- Genotipo: ${genotypeName}
- Edad: ${personalData.age} años
- Sexo: ${personalData.sex}
${personalData.height ? `- Altura: ${personalData.height} cm` : ''}
${personalData.weight ? `- Peso: ${personalData.weight} kg` : ''}
${bmi ? `- IMC: ${bmi} (${bmiCategory})` : ''}
${bmr ? `- TMB (Tasa Metabólica Basal): ${Math.round(bmr)} kcal/día` : ''}
${tdee ? `- Calorías diarias estimadas (TDEE): ${tdee} kcal/día (considerando nivel de actividad)` : ''}
- Nivel de actividad física: ${personalData.activityLevel || 'No especificado'}
${personalData.sleepHours ? `- Horas de sueño: ${personalData.sleepHours} horas/día` : ''}
${personalData.stressLevel ? `- Nivel de estrés: ${personalData.stressLevel}` : ''}
${personalData.exerciseFrequency ? `- Frecuencia de ejercicio: ${personalData.exerciseFrequency}` : ''}

CONDICIONES CLÍNICAS Y RESTRICCIONES:
${personalData.healthConditions ? `- Condiciones de salud: ${personalData.healthConditions}` : '- Condiciones de salud: Ninguna especificada'}
${personalData.allergies ? `- ⚠️ ALERGIAS ALIMENTARIAS (CRÍTICO): ${personalData.allergies} - NUNCA incluir estos alimentos` : '- Alergias alimentarias: Ninguna'}
${personalData.medications ? `- Medicamentos actuales: ${personalData.medications} (considerar interacciones)` : '- Medicamentos actuales: Ninguno'}
${personalData.bloodType ? `- Grupo sanguíneo: ${personalData.bloodType}${personalData.rhFactor ? ` ${personalData.rhFactor}` : ''}` : ''}
${personalData.familyHistory ? `- Historial familiar: ${personalData.familyHistory}` : ''}
${personalData.chronicConditions ? `- Condiciones crónicas: ${personalData.chronicConditions}` : ''}
${personalData.previousSurgeries ? `- Cirugías previas: ${personalData.previousSurgeries}` : ''}

OBJETIVOS Y PREFERENCIAS:
- Objetivos principales: ${personalData.goals || 'Bienestar general'}
${personalData.dietaryRestrictions ? `- Restricciones dietéticas: ${personalData.dietaryRestrictions}` : ''}
${personalData.foodPreferences ? `- Preferencias alimentarias: ${personalData.foodPreferences}` : ''}
    `;

    const foodRules = `
CLASIFICACIÓN DE ALIMENTOS PARA ESTE GENOTIPO:

1. SUPERALIMENTOS (PRIORITARIOS - 60-70% de la dieta):
   ${superfoods.length > 0 ? superfoods.join(', ') : 'Ninguno especificado'}
   
   - Usar principalmente en todas las comidas
   - Máximo beneficio nutrigenómico para este genotipo
   - Optimizan expresión génica y metabolismo

2. ALIMENTOS NEUTROS (COMPLEMENTARIOS - 30-40% de la dieta):
   ${neutrals.length > 0 ? neutrals.slice(0, 30).join(', ') + (neutrals.length > 30 ? '...' : '') : 'Ninguno especificado'}
   
   - Permitidos con moderación
   - Usar para variar y complementar superalimentos
   - No generan respuesta adversa pero tampoco beneficio específico

3. TOXINAS (PROHIBIDOS ESTRICTAMENTE - 0% de la dieta):
   ${toxins.length > 0 ? toxins.join(', ') : 'Ninguno especificado'}
   
   - NUNCA incluir en ninguna recomendación
   - Pueden generar respuestas adversas en este genotipo
   - Evitar completamente
    `;

    let userRequest: string = '';
    switch (requestType) {
        case 'menu':
            userRequest = `Crea un plan de menú semanal detallado (Lunes a Domingo) para desayuno, comida y cena personalizado para este paciente. 

REQUISITOS ESPECÍFICOS:
- Usar PRINCIPALMENTE superalimentos (60-70% de cada comida)
- Complementar con alimentos neutros (30-40% de cada comida)
- NUNCA incluir alimentos de la lista de toxinas
${tdee ? `- Distribuir aproximadamente ${Math.round(tdee / 7)} kcal por día` : ''}
${tdee ? `- Desayuno: ~${Math.round(tdee * 0.25)} kcal, Almuerzo: ~${Math.round(tdee * 0.40)} kcal, Cena: ~${Math.round(tdee * 0.35)} kcal` : ''}
- Incluir porciones específicas (ej: 150g de proteína, 200g de vegetales)
- Variar alimentos cada día para evitar monotonía
- Considerar ${personalData.activityLevel || 'nivel de actividad moderado'}
${personalData.allergies ? `- ⚠️ EXCLUIR completamente: ${personalData.allergies}` : ''}

Estructura la respuesta así:

**MENÚ SEMANAL PERSONALIZADO**

**LUNES**
- 🌅 Desayuno: [descripción con ingredientes específicos y porciones]
  - Calorías aproximadas: [valor]
  - Macronutrientes: Proteínas [X]g, Carbohidratos [X]g, Grasas [X]g
  
- 🍽️ Almuerzo: [descripción con ingredientes específicos y porciones]
  - Calorías aproximadas: [valor]
  - Macronutrientes: Proteínas [X]g, Carbohidratos [X]g, Grasas [X]g
  
- 🌙 Cena: [descripción con ingredientes específicos y porciones]
  - Calorías aproximadas: [valor]
  - Macronutrientes: Proteínas [X]g, Carbohidratos [X]g, Grasas [X]g

[Continuar para cada día de la semana]

**RESUMEN NUTRICIONAL SEMANAL**
- Calorías promedio diarias: [valor]
- Distribución de macronutrientes: [% proteínas, % carbohidratos, % grasas]
- Alimentos superalimentos utilizados: [lista]
- Variedad y rotación de alimentos: [nota]`;
            break;
        case 'recipes':
            userRequest = `Genera 3 recetas creativas y prácticas (un desayuno, una comida y una cena) personalizadas para este paciente.

REQUISITOS:
- Usar principalmente superalimentos (60-70% de ingredientes)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Incluir porciones exactas para 2-4 personas (especificar cantidad)
- Tiempos de preparación y cocción específicos
- Dificultad de preparación (Fácil/Intermedio/Avanzado)
- Beneficios específicos para este genotipo
- Información nutricional aproximada por porción

Para cada receta incluir:
1. Nombre atractivo
2. Tiempo total de preparación
3. Dificultad
4. Ingredientes con cantidades exactas
5. Pasos de preparación detallados
6. Información nutricional (calorías, macronutrientes)
7. Por qué es ideal para este genotipo específico`;
            break;
        case 'supplements':
            userRequest = `Recomienda 3 a 5 suplementos clave personalizados para este paciente.

CONSIDERACIONES CRÍTICAS:
- Basado en el genotipo ${genotypeName} y objetivos: ${personalData.goals || 'bienestar general'}
${personalData.medications ? `- ⚠️ VERIFICAR interacciones con: ${personalData.medications}` : ''}
${personalData.healthConditions ? `- Considerar condiciones: ${personalData.healthConditions}` : ''}
${personalData.allergies ? `- ⚠️ Evitar alérgenos: ${personalData.allergies}` : ''}
- Priorizar suplementos con evidencia científica para este genotipo
- Considerar deficiencias comunes del genotipo

Para cada suplemento incluir:
1. Nombre del suplemento
2. Dosis recomendada diaria
3. Momento de ingesta (mañana/tarde/noche, con/sin comida)
4. Beneficio específico para este genotipo
5. Evidencia científica breve
6. Precauciones o contraindicaciones (si aplica)
7. Interacciones con medicamentos (si aplica)

IMPORTANTE: Si hay medicamentos, mencionar posibles interacciones y recomendar consulta médica antes de suplementar.`;
            break;
        case 'breakfast':
            userRequest = `Crea 5 opciones de desayunos nutritivos y energéticos personalizados.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${tdee ? `- Calorías objetivo: ~${Math.round(tdee * 0.25)} kcal por desayuno` : ''}
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Considerar ${personalData.activityLevel || 'nivel de actividad'} y objetivos: ${personalData.goals || 'bienestar'}

Para cada opción incluir:
- Ingredientes con porciones específicas
- Tiempo de preparación
- Pasos de preparación
- Información nutricional aproximada
- Beneficios específicos para genotipo ${genotypeName}
- Momento ideal de consumo`;
            break;
        case 'lunch':
            userRequest = `Genera 5 opciones de almuerzos equilibrados y nutritivos personalizados.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${tdee ? `- Calorías objetivo: ~${Math.round(tdee * 0.40)} kcal por almuerzo` : ''}
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Incluir proteína completa, carbohidratos complejos y vegetales

Para cada opción incluir:
- Plato principal con ingredientes y porciones
- Guarniciones recomendadas
- Bebidas recomendadas (agua, infusiones, etc.)
- Información nutricional aproximada
- Beneficios específicos para genotipo ${genotypeName}
- Tiempo de preparación`;
            break;
        case 'dinner':
            userRequest = `Crea 5 opciones de cenas ligeras pero nutritivas personalizadas.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${tdee ? `- Calorías objetivo: ~${Math.round(tdee * 0.35)} kcal por cena` : ''}
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Enfocarse en proteínas magras y vegetales de fácil digestión
- Considerar que la cena debe ser más ligera para facilitar el sueño
${personalData.sleepHours ? `- Considerar ${personalData.sleepHours} horas de sueño del paciente` : ''}

Para cada opción incluir:
- Ingredientes con porciones específicas
- Técnicas de cocción ligeras (al vapor, a la plancha, horneado)
- Información nutricional aproximada
- Beneficios para digestión nocturna
- Tiempo de preparación`;
            break;
        case 'snacks':
            userRequest = `Genera 8 opciones de snacks saludables entre comidas personalizados.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
- Incluir opciones dulces y saladas
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Calorías por snack: 100-200 kcal aproximadamente

Para cada snack incluir:
- Ingredientes y porciones específicas
- Horario recomendado (media mañana, media tarde, pre/post ejercicio)
- Información nutricional aproximada
- Beneficios específicos para genotipo ${genotypeName}
- Facilidad de preparación/portabilidad`;
            break;
        case 'salads':
            userRequest = `Crea 6 ensaladas nutritivas y variadas personalizadas.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Variar tipos de hojas, proteínas y aderezos
- Hacer cada ensalada completa nutricionalmente

Para cada ensalada incluir:
- Base de hojas/vegetales (especificar tipos y cantidades)
- Proteína recomendada (con cantidad)
- Aderezo saludable (receta completa)
- Ingredientes adicionales (frutos secos, semillas, etc.)
- Información nutricional aproximada
- Beneficios específicos para genotipo ${genotypeName}
- Momento ideal de consumo (almuerzo, cena, acompañamiento)`;
            break;
        case 'smoothies':
            userRequest = `Genera 5 recetas de smoothies y batidos nutritivos personalizados.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Variar para diferentes momentos del día y objetivos

Para cada smoothie incluir:
- Ingredientes con cantidades exactas
- Técnica de preparación
- Información nutricional aproximada
- Momento ideal de consumo (desayuno, post-ejercicio, merienda)
- Beneficios específicos para genotipo ${genotypeName}
- Opciones de personalización (proteína en polvo, superalimentos adicionales)`;
            break;
        case 'mealPrep':
            userRequest = `Crea un plan de preparación de comidas para 5 días personalizado.

REQUISITOS:
- Usar principalmente superalimentos (60-70%)
- Complementar con alimentos neutros (30-40%)
- NUNCA incluir toxinas
${tdee ? `- Distribuir ${Math.round(tdee)} kcal diarias aproximadamente` : ''}
${personalData.allergies ? `- ⚠️ EXCLUIR: ${personalData.allergies}` : ''}
- Optimizar para preparación eficiente (batch cooking)
- Considerar conservación y almacenamiento

Incluir:
1. PLAN DE COMIDAS (5 días):
   - Desayuno, almuerzo y cena para cada día
   - Ingredientes y porciones específicas
   - Información nutricional diaria

2. LISTA DE COMPRAS ORGANIZADA:
   - Por categorías (proteínas, vegetales, frutas, etc.)
   - Cantidades totales necesarias
   - Notas sobre frescura y conservación

3. PLANIFICACIÓN DE PREPARACIÓN:
   - Orden de preparación recomendado
   - Tiempos estimados
   - Técnicas de batch cooking
   - Instrucciones de almacenamiento y recalentado

4. CONSEJOS DE CONSERVACIÓN:
   - Cómo almacenar cada tipo de comida
   - Tiempo máximo de conservación
   - Mejores prácticas de seguridad alimentaria`;
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
      const response = await withRetry(
        async () => {
          // Intentar con modelos disponibles, en orden de preferencia (más recientes primero)
          const modelsToTry = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
          let lastError: any = null;
          
          for (const modelName of modelsToTry) {
            try {
              const model = genAI.getGenerativeModel({ 
                model: modelName,
                generationConfig: {
                  temperature: 0.5,
                  topK: 40,
                  topP: 0.95,
                }
              });
              const result = await model.generateContent(fullPrompt);
              return result.response;
            } catch (error: any) {
              lastError = error;
              const errorMsg = error?.message || error?.toString() || '';
              // Si es error 404 o modelo no encontrado, intentar siguiente modelo
              if (errorMsg.includes('404') || 
                  errorMsg.includes('not found') || 
                  errorMsg.includes('is not found') ||
                  errorMsg.includes('not supported')) {
                console.warn(`[Gemini] Modelo ${modelName} no disponible:`, errorMsg);
                continue;
              }
              // Si es otro error, lanzarlo
              throw error;
            }
          }
          // Si todos los modelos fallaron, lanzar error descriptivo
          const errorMsg = lastError?.message || lastError?.toString() || 'Error desconocido';
          throw new Error(`No se pudo encontrar un modelo disponible de Gemini. Modelos intentados: ${modelsToTry.join(', ')}. Error: ${errorMsg}. Verifica que tu API key tenga acceso a los modelos de Gemini.`);
        },
        {
          maxRetries: 3,
          retryDelay: 1000,
          onRetry: (attempt, error) => {
            console.log(`Reintentando llamada a Gemini (intento ${attempt}/3)...`, error);
          }
        }
      );
      return extractText(response);
    } catch (error) {
        logError(error, 'generateAiResponse');
        return getErrorMessage(error) || "Lo siento, ha ocurrido un error al generar la recomendación. Por favor, inténtalo de nuevo más tarde.";
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
        const { superfoods, toxins, neutrals } = getFoodLists(foodData);
        specificGenotypeInfo = `
          
          CONTEXTO ESPECÍFICO - ${foodData.genotipo_info.nombre}:
          El usuario tiene contexto del ${foodData.genotipo_info.nombre}.
          
          CLASIFICACIÓN DE ALIMENTOS:
          
          1. SUPERALIMENTOS (PRIORITARIOS - 60-70% de la dieta):
             ${superfoods.slice(0, 15).join(', ')}${superfoods.length > 15 ? '...' : ''}
             - Usar principalmente en todas las comidas
             - Máximo beneficio nutrigenómico
          
          2. ALIMENTOS NEUTROS (COMPLEMENTARIOS - 30-40% de la dieta):
             ${neutrals.slice(0, 15).join(', ')}${neutrals.length > 15 ? '...' : ''}
             - Permitidos con moderación
             - Usar para variar y complementar
          
          3. TOXINAS (PROHIBIDAS - 0% de la dieta):
             ${toxins.slice(0, 15).join(', ')}${toxins.length > 15 ? '...' : ''}
             - NUNCA recomendar
             - Pueden generar respuestas adversas
          
          Si preguntan específicamente sobre alimentos para este genotipo, usa estas clasificaciones.
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
        const response = await withRetry(
          async () => {
            // Intentar con modelos disponibles, en orden de preferencia (más recientes primero)
            const modelsToTry = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
            let lastError: any = null;
            
            for (const modelName of modelsToTry) {
              try {
                const model = genAI.getGenerativeModel({ 
                  model: modelName,
                  generationConfig: {
                    temperature: 0.3, // Más bajo para respuestas más consistentes
                    topK: 40,
                    topP: 0.8,
                  }
                });
                const result = await model.generateContent(fullPrompt);
                return result.response;
              } catch (error: any) {
                lastError = error;
                const errorMsg = error?.message || error?.toString() || '';
                // Si es error 404 o modelo no encontrado, intentar siguiente modelo
                if (errorMsg.includes('404') || 
                    errorMsg.includes('not found') || 
                    errorMsg.includes('is not found') ||
                    errorMsg.includes('not supported')) {
                  console.warn(`[Gemini] Modelo ${modelName} no disponible:`, errorMsg);
                  continue;
                }
                // Si es otro error, lanzarlo
                throw error;
              }
            }
            // Si todos los modelos fallaron, lanzar el último error
            throw lastError || new Error('No se pudo encontrar un modelo disponible');
          },
          {
            maxRetries: 3,
            retryDelay: 1000,
            onRetry: (attempt, error) => {
              console.log(`Reintentando chat con Gemini (intento ${attempt}/3)...`, error);
            }
          }
        );
        return extractText(response);
    } catch (error) {
        logError(error, 'generateChatResponse');
        return getErrorMessage(error) || "Lo siento, tuve un problema para procesar tu pregunta. Por favor, intenta de nuevo.";
    }
}