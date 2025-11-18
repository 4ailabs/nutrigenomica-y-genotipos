import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ResearchPatientCase } from '../types';
import { GENOTYPE_DATA } from '../genotypeData';
import { getGeminiApiKey } from './env';
import { withRetry, getErrorMessage, logError } from './errorHandler';

// Obtener API Key
const apiKey = getGeminiApiKey();

if (!apiKey) {
  console.warn("[AI Prompt Generator] Falta la API key de Gemini.");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

/**
 * Función para extraer texto de la respuesta de Gemini
 */
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

/**
 * Obtiene información del genotipo
 */
function getGenotypeInfo(genotypeId?: number): string {
    if (!genotypeId || !GENOTYPE_DATA[genotypeId]) {
        return 'No se especificó un genotipo';
    }
    
    const genotype = GENOTYPE_DATA[genotypeId];
    return `**Genotipo ${genotype.name}**
- Esencia: ${genotype.essence.description}
- Características clave: ${genotype.essence.traits}
- Superalimentos principales: ${genotype.dietary.superfoods.slice(0, 10).join(', ')}
- Alimentos a evitar: ${genotype.dietary.toxins.slice(0, 10).join(', ')}`;
}

/**
 * Obtiene la categoría del IMC
 */
function getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidad grado I';
    if (bmi < 40) return 'Obesidad grado II';
    return 'Obesidad grado III';
}

/**
 * Genera un prompt de investigación nutrigenómica usando IA
 */
export async function generateResearchPromptWithAI(
    patientCase: ResearchPatientCase,
    platform: 'gemini-deep-research' | 'claude'
): Promise<{ success: boolean; prompt?: string; error?: string }> {
    
    if (!apiKey) {
        return {
            success: false,
            error: 'API key de Gemini no configurada'
        };
    }

    // Preparar el contexto del paciente
    const patientContext = `
DATOS DEL PACIENTE:
${patientCase.patientName ? `- Nombre: ${patientCase.patientName}` : ''}
${patientCase.age ? `- Edad: ${patientCase.age} años` : ''}
${patientCase.sex ? `- Sexo: ${patientCase.sex}` : ''}
${patientCase.height ? `- Altura: ${patientCase.height} cm` : ''}
${patientCase.weight ? `- Peso: ${patientCase.weight} kg` : ''}
${patientCase.bmi ? `- IMC: ${patientCase.bmi} (${getBMICategory(patientCase.bmi)})` : ''}
${patientCase.bodyComposition ? `- Composición corporal: ${patientCase.bodyComposition}` : ''}

PERFIL GENÉTICO:
${getGenotypeInfo(patientCase.genotypeId)}

HISTORIAL MÉDICO:
${patientCase.medicalHistory || 'No especificado'}

SÍNTOMAS ACTUALES:
${patientCase.symptoms || 'No especificados'}

MEDICAMENTOS:
${patientCase.currentMedications || 'Ninguno'}

ALERGIAS:
${patientCase.allergies || 'Ninguna'}

${patientCase.chronicConditions ? `CONDICIONES CRÓNICAS:\n${patientCase.chronicConditions}\n` : ''}
${patientCase.familyHistory ? `HISTORIAL FAMILIAR:\n${patientCase.familyHistory}\n` : ''}
${patientCase.labResults ? `RESULTADOS DE LABORATORIO:\n${patientCase.labResults}\n` : ''}

DIETA ACTUAL:
${patientCase.currentDiet || 'No especificada'}

${patientCase.dietaryRestrictions ? `RESTRICCIONES DIETÉTICAS:\n${patientCase.dietaryRestrictions}\n` : ''}

OBJETIVO DE INVESTIGACIÓN:
${patientCase.researchFocus || 'Análisis nutrigenómico general y recomendaciones personalizadas'}

${patientCase.specificQuestions ? `PREGUNTAS ESPECÍFICAS:\n${patientCase.specificQuestions}\n` : ''}
`;

    // Instrucción para la IA según la plataforma
    const platformInstructions = platform === 'gemini-deep-research' 
        ? `Genera un prompt de investigación profunda y exhaustiva optimizado para **Gemini Deep Research**. El prompt debe:
- Ser claro, detallado y estructurado
- Solicitar investigación científica actualizada (últimos 5 años)
- Pedir análisis de interacciones gen-nutriente específicas del genotipo
- Incluir solicitud de evidencia científica con referencias completas (formato APA)
- Estructurar la petición en secciones claras (Análisis Nutrigenómico, Recomendaciones Personalizadas, Plan de Acción, etc.)
- Enfocarse en investigación profunda con análisis de estudios científicos recientes
- Solicitar metaanálisis, revisiones sistemáticas y ensayos clínicos
- Pedir un plan de implementación por fases con biomarcadores a monitorear`
        : `Genera un prompt conversacional y analítico optimizado para **Claude**. El prompt debe:
- Tener un tono profesional pero conversacional
- Presentar el caso como una consulta médica real
- Solicitar razonamiento paso a paso del análisis
- Pedir que Claude explique su proceso de pensamiento
- Incluir preguntas reflexivas que guíen el análisis
- Estructurar como un diálogo profesional médico
- Solicitar análisis integrado del genotipo con el cuadro clínico
- Pedir fundamentación científica pero con explicaciones claras`;

    const aiPrompt = `Eres un experto en nutrigenómica clínica especializado en crear prompts de investigación médica de alta calidad.

Tu tarea es generar un PROMPT COMPLETO Y DETALLADO que será copiado y usado en otra plataforma de IA (${platform === 'gemini-deep-research' ? 'Gemini Deep Research' : 'Claude'}) para realizar investigación nutrigenómica profunda.

${platformInstructions}

INFORMACIÓN DEL CASO CLÍNICO:
${patientContext}

INSTRUCCIONES CRÍTICAS:
1. El prompt que generes debe ser COMPLETO y AUTOSUFICIENTE - incluye TODOS los datos del paciente
2. El prompt debe ser optimizado para ${platform === 'gemini-deep-research' ? 'Gemini Deep Research' : 'Claude'}
3. NO generes la respuesta a la investigación, solo genera el PROMPT que se usará
4. El prompt debe solicitar explícitamente:
   - Análisis nutrigenómico del genotipo específico
   - Recomendaciones personalizadas basadas en todos los datos del paciente
   - Evidencia científica actualizada
   - Plan de acción estructurado y práctico
   - Consideraciones de seguridad e interacciones medicamentosas
5. Usa un lenguaje profesional médico apropiado
6. El prompt debe ser directo y claro, sin ambigüedades
7. NO incluyas saludos ni despedidas en el prompt generado

IMPORTANTE: Genera ÚNICAMENTE el texto del prompt. No agregues introducciones, explicaciones ni meta-comentarios. El output debe ser el prompt listo para copiar y pegar.`;

    try {
        const response = await withRetry(
            async () => {
                const modelsToTry = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro'];
                let lastError: any = null;
                
                for (const modelName of modelsToTry) {
                    try {
                        const model = genAI.getGenerativeModel({ 
                            model: modelName,
                            generationConfig: {
                                temperature: 0.7,
                                topK: 40,
                                topP: 0.95,
                                maxOutputTokens: 8192,
                            }
                        });
                        const result = await model.generateContent(aiPrompt);
                        return result.response;
                    } catch (error: any) {
                        lastError = error;
                        const errorMsg = error?.message || error?.toString() || '';
                        if (errorMsg.includes('404') || 
                            errorMsg.includes('not found') || 
                            errorMsg.includes('is not found') ||
                            errorMsg.includes('not supported')) {
                            console.warn(`[AI Prompt Generator] Modelo ${modelName} no disponible:`, errorMsg);
                            continue;
                        }
                        throw error;
                    }
                }
                throw lastError || new Error('No se pudo encontrar un modelo disponible');
            },
            {
                maxRetries: 3,
                retryDelay: 1000,
                onRetry: (attempt, error) => {
                    console.log(`Reintentando generación de prompt (intento ${attempt}/3)...`, error);
                }
            }
        );
        
        const generatedPrompt = extractText(response);
        
        if (!generatedPrompt || generatedPrompt.length < 100) {
            return {
                success: false,
                error: 'La IA generó un prompt demasiado corto o vacío'
            };
        }
        
        return {
            success: true,
            prompt: generatedPrompt
        };
        
    } catch (error) {
        logError(error, 'generateResearchPromptWithAI');
        return {
            success: false,
            error: getErrorMessage(error) || 'Error al generar el prompt con IA'
        };
    }
}

/**
 * Genera un resumen del caso para mostrar en la UI
 */
export function generateCaseSummary(patientCase: ResearchPatientCase): string {
    const parts: string[] = [];
    
    if (patientCase.age) parts.push(`${patientCase.age} años`);
    if (patientCase.sex) parts.push(patientCase.sex);
    if (patientCase.genotypeName) parts.push(`Genotipo ${patientCase.genotypeName}`);
    if (patientCase.bmi) parts.push(`IMC ${patientCase.bmi}`);
    
    return parts.length > 0 ? parts.join(', ') : 'Caso sin datos demográficos';
}

