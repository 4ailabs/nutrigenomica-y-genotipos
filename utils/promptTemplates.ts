import type { ResearchPatientCase } from '../types';
import { GENOTYPE_DATA } from '../genotypeData';

/**
 * Genera un resumen del paciente para usar en el prompt
 */
function generatePatientSummary(patientCase: ResearchPatientCase): string {
    const parts: string[] = [];
    
    if (patientCase.age) parts.push(`${patientCase.age} años`);
    if (patientCase.sex) parts.push(patientCase.sex);
    if (patientCase.genotypeName) parts.push(`Genotipo ${patientCase.genotypeName}`);
    if (patientCase.bmi) parts.push(`IMC ${patientCase.bmi}`);
    
    return parts.join(', ');
}

/**
 * Obtiene la descripción del genotipo desde los datos existentes
 */
function getGenotypeDescription(genotypeId?: number): string {
    if (!genotypeId || !GENOTYPE_DATA[genotypeId]) {
        return 'No especificado';
    }
    
    const genotype = GENOTYPE_DATA[genotypeId];
    return `${genotype.name} - ${genotype.essence.description}`;
}

/**
 * Template para Gemini Deep Research
 */
export function generateGeminiDeepResearchPrompt(patientCase: ResearchPatientCase): string {
    const genotypeDescription = getGenotypeDescription(patientCase.genotypeId);
    
    return `# INVESTIGACIÓN NUTRIGENÓMICA - CASO CLÍNICO

## PERFIL DEL PACIENTE

**Datos Demográficos:**
${patientCase.age ? `- Edad: ${patientCase.age} años` : '- Edad: No especificada'}
${patientCase.sex ? `- Sexo: ${patientCase.sex}` : '- Sexo: No especificado'}
${patientCase.height ? `- Altura: ${patientCase.height} cm` : ''}
${patientCase.weight ? `- Peso: ${patientCase.weight} kg` : ''}
${patientCase.bmi ? `- IMC: ${patientCase.bmi} (${getBMICategory(patientCase.bmi)})` : ''}
${patientCase.bodyComposition ? `- Composición corporal: ${patientCase.bodyComposition}` : ''}

**Genotipo Nutricional:**
${patientCase.genotypeName ? `- Genotipo identificado: ${patientCase.genotypeName}` : '- Genotipo: No especificado'}
- Características principales: ${genotypeDescription}

**Historial Médico:**
${patientCase.medicalHistory || 'No especificado'}

**Síntomas Actuales:**
${patientCase.symptoms || 'No especificados'}

**Medicamentos Actuales:**
${patientCase.currentMedications || 'Ninguno reportado'}

**Alergias:**
${patientCase.allergies || 'Ninguna reportada'}

${patientCase.chronicConditions ? `**Condiciones Crónicas:**
${patientCase.chronicConditions}
` : ''}

${patientCase.familyHistory ? `**Historial Familiar:**
${patientCase.familyHistory}
` : ''}

${patientCase.labResults ? `**Resultados de Laboratorio:**
${patientCase.labResults}
` : ''}

**Dieta Actual:**
${patientCase.currentDiet || 'No especificada'}

${patientCase.dietaryRestrictions ? `**Restricciones Dietéticas:**
${patientCase.dietaryRestrictions}
` : ''}

---

## OBJETIVO DE LA INVESTIGACIÓN

${patientCase.researchFocus || 'Análisis nutrigenómico general y recomendaciones personalizadas'}

${patientCase.specificQuestions ? `## PREGUNTAS ESPECÍFICAS

${patientCase.specificQuestions}
` : ''}

---

## SOLICITUD DE INVESTIGACIÓN

Realiza una investigación nutrigenómica profunda y exhaustiva considerando:

### 1. Interacción Gen-Nutriente
Analiza cómo los nutrientes específicos interactúan con el perfil genético del paciente basado en su genotipo ${patientCase.genotypeName || 'identificado'}. Considera:
- Polimorfismos genéticos relevantes para la nutrición
- Variaciones en el metabolismo de macronutrientes
- Capacidad de absorción y utilización de micronutrientes
- Sensibilidades alimentarias relacionadas con el genotipo

### 2. Recomendaciones Personalizadas
Genera recomendaciones nutricionales específicas y accionables considerando:
- El genotipo nutricional identificado y sus características únicas
- Las condiciones médicas actuales y su manejo nutricional
- Los medicamentos actuales (analiza interacciones nutriente-fármaco potenciales)
- Los objetivos de salud específicos del paciente
- Las restricciones y preferencias dietéticas

### 3. Evidencia Científica Actualizada
Proporciona estudios científicos recientes (últimos 5 años preferiblemente) sobre:
- Nutrigenómica aplicada a las condiciones específicas del paciente
- Efectividad de intervenciones nutricionales en genotipos similares
- Biomarcadores relevantes para monitorear el progreso
- Protocolos de nutrición personalizada validados científicamente
- Metaanálisis y revisiones sistemáticas relevantes

### 4. Plan de Acción Estructurado
Sugiere un plan de acción práctico y detallado que incluya:

**Fase 1 - Cambios Inmediatos (Semana 1-2):**
- Cambios dietéticos prioritarios basados en el genotipo
- Alimentos a incorporar (superalimentos para el genotipo)
- Alimentos a evitar (toxinas para el genotipo)
- Pautas de hidratación

**Fase 2 - Optimización (Mes 1-3):**
- Ajustes en macronutrientes según respuesta
- Suplementación recomendada (dosis, timing, forma)
- Patrones de alimentación óptimos
- Estrategias de preparación de alimentos

**Fase 3 - Mantenimiento a Largo Plazo:**
- Protocolo de seguimiento
- Biomarcadores a monitorear (frecuencia y valores objetivo)
- Ajustes estacionales o según actividad
- Prevención de deficiencias nutricionales

### 5. Consideraciones Especiales
${patientCase.researchFocus ? `Profundiza especialmente en: ${patientCase.researchFocus}` : 'Analiza cualquier consideración especial relevante para este caso'}

### 6. Contraindicaciones y Precauciones
Identifica:
- Posibles contraindicaciones nutricionales
- Interacciones medicamento-nutriente a vigilar
- Señales de alerta que requieran ajuste del plan
- Consideraciones de seguridad específicas del genotipo

---

## FORMATO DE RESPUESTA SOLICITADO

Por favor, estructura la respuesta de la siguiente manera:

1. **RESUMEN EJECUTIVO** (2-3 párrafos)
2. **ANÁLISIS NUTRIGENÓMICO DETALLADO** (con fundamentos científicos)
3. **PLAN NUTRICIONAL PERSONALIZADO** (fase por fase)
4. **SUPLEMENTACIÓN RECOMENDADA** (con evidencia)
5. **PROTOCOLO DE MONITOREO** (biomarcadores y frecuencia)
6. **CONSIDERACIONES ESPECIALES** (basadas en el caso)
7. **REFERENCIAS CIENTÍFICAS** (formato APA completo)

---

**NOTA IMPORTANTE:** 
Proporciona referencias científicas completas (formato APA) para todas las recomendaciones. Prioriza estudios de alta calidad: metaanálisis, revisiones sistemáticas, ensayos clínicos aleatorizados y estudios de cohorte bien diseñados.

Esta información será utilizada por un médico profesional para el manejo clínico del paciente, por lo que debe ser precisa, actualizada y basada en evidencia sólida.`;
}

/**
 * Template para Claude
 */
export function generateClaudePrompt(patientCase: ResearchPatientCase): string {
    const genotypeDescription = getGenotypeDescription(patientCase.genotypeId);
    
    return `# Análisis Nutrigenómico Clínico - Caso para Investigación Profunda

Necesito tu ayuda como experto en nutrigenómica para analizar un caso clínico y desarrollar un plan de nutrición personalizado basado en el perfil genético del paciente.

## Contexto del Paciente

Estoy evaluando a un paciente con el siguiente perfil:

**Información Demográfica:**
${patientCase.age ? `- Edad: ${patientCase.age} años` : '- Edad: No especificada'}
${patientCase.sex ? `- Sexo: ${patientCase.sex}` : ''}
${patientCase.height ? `- Altura: ${patientCase.height} cm` : ''}
${patientCase.weight ? `- Peso: ${patientCase.weight} kg` : ''}
${patientCase.bmi ? `- Índice de Masa Corporal: ${patientCase.bmi} - ${getBMICategory(patientCase.bmi)}` : ''}
${patientCase.bodyComposition ? `- Composición corporal: ${patientCase.bodyComposition}` : ''}

**Perfil Genotípico:**
${patientCase.genotypeName ? `El paciente ha sido identificado como genotipo ${patientCase.genotypeName}.` : 'El genotipo aún no ha sido determinado completamente.'}

Contexto del genotipo: ${genotypeDescription}

**Historia Clínica:**
${patientCase.medicalHistory || 'Sin antecedentes médicos significativos reportados.'}

**Presentación Actual:**
Síntomas o condiciones actuales: ${patientCase.symptoms || 'Sin síntomas específicos reportados en este momento.'}

**Farmacoterapia Actual:**
${patientCase.currentMedications || 'El paciente no está tomando medicamentos actualmente.'}

**Alergias Conocidas:**
${patientCase.allergies || 'Sin alergias conocidas.'}

${patientCase.chronicConditions ? `**Condiciones Crónicas:**
${patientCase.chronicConditions}
` : ''}

${patientCase.familyHistory ? `**Antecedentes Familiares:**
${patientCase.familyHistory}
` : ''}

${patientCase.labResults ? `**Datos de Laboratorio:**
${patientCase.labResults}
` : ''}

**Patrón Alimentario Actual:**
${patientCase.currentDiet || 'No se ha especificado el patrón alimentario actual.'}

${patientCase.dietaryRestrictions ? `**Restricciones Dietéticas:**
${patientCase.dietaryRestrictions}
` : ''}

---

## Mi Pregunta Principal

${patientCase.researchFocus || 'Necesito un análisis nutrigenómico completo y recomendaciones personalizadas para optimizar la salud de este paciente basándome en su perfil genético.'}

${patientCase.specificQuestions ? `Además, tengo estas preguntas específicas:

${patientCase.specificQuestions}
` : ''}

---

## Lo Que Necesito de Tu Análisis

Me gustaría que abordes este caso de manera sistemática y reflexiva:

### Paso 1: Análisis del Perfil Genético
Primero, ayúdame a entender:
- ¿Qué características metabólicas y nutricionales son típicas de este genotipo?
- ¿Qué polimorfismos genéticos son relevantes para la nutrición en este perfil?
- ¿Cómo influye este genotipo en el metabolismo de macronutrientes y micronutrientes?
- ¿Qué sensibilidades o intolerancias alimentarias son comunes?

### Paso 2: Integración con el Cuadro Clínico
Ahora, considerando el estado de salud actual del paciente:
- ¿Cómo se relacionan los síntomas actuales con el perfil nutrigenómico?
- ¿Qué deficiencias nutricionales podrían estar contribuyendo al cuadro clínico?
- ¿Hay interacciones entre los medicamentos actuales y ciertos nutrientes?
- ¿Qué riesgos de salud a largo plazo deberíamos abordar preventivamente?

### Paso 3: Estrategia Nutricional Personalizada
Con base en tu análisis, desarrolla:

**A) Fundamentos de la Dieta:**
- Principios nutricionales clave para este genotipo
- Distribución óptima de macronutrientes
- Alimentos prioritarios (superalimentos para el genotipo)
- Alimentos a limitar o evitar (toxinas para el genotipo)
- Patrones de comidas recomendados

**B) Plan de Implementación Gradual:**
- Cambios inmediatos (primeras 2 semanas)
- Optimización progresiva (meses 1-3)
- Estrategia de mantenimiento a largo plazo
- Cómo adaptar el plan según la respuesta del paciente

**C) Suplementación Nutricional:**
- ¿Qué suplementos son particularmente beneficiosos para este genotipo?
- Dosis recomendadas y momento de ingesta
- Formas biodisponibles preferidas
- Duración del protocolo de suplementación
- Precauciones y contraindicaciones

### Paso 4: Monitoreo y Ajustes
Recomienda:
- Biomarcadores específicos a monitorear
- Frecuencia de evaluación recomendada
- Indicadores de que el plan está funcionando
- Señales que requerirían ajustes
- Herramientas de seguimiento (diarios, apps, etc.)

### Paso 5: Evidencia Científica
Para cada recomendación importante, por favor:
- Cita estudios científicos recientes (últimos 5 años preferiblemente)
- Explica el nivel de evidencia (metaanálisis, RCT, estudios observacionales)
- Menciona si hay consenso científico o si el tema es aún controversial
- Proporciona referencias completas al final

---

## Consideraciones Importantes

Por favor, ten en cuenta:

1. **Seguridad:** Identifica cualquier contraindicación o interacción medicamento-nutriente relevante
2. **Practicidad:** Las recomendaciones deben ser viables y sostenibles en la vida real
3. **Individualización:** Adapta las guías generales del genotipo a las circunstancias específicas de este paciente
4. **Evidencia:** Fundamenta tus recomendaciones en ciencia sólida y actualizada
5. **Claridad:** Explica el razonamiento detrás de cada recomendación importante

---

## Formato de Respuesta Deseado

Organiza tu análisis de manera clara y estructurada:

1. **Síntesis Inicial** - Tu comprensión del caso en 2-3 párrafos
2. **Análisis Nutrigenómico** - Explicación detallada del perfil genético
3. **Razonamiento Clínico** - Cómo integraste el genotipo con el cuadro clínico
4. **Plan Nutricional Detallado** - Paso a paso, con fundamentos
5. **Protocolo de Suplementación** - Si aplica, con evidencia
6. **Estrategia de Monitoreo** - Biomarcadores y seguimiento
7. **Consideraciones Especiales** - Precauciones y ajustes
8. **Referencias Científicas** - Lista completa en formato APA

---

Esta información será utilizada para el manejo clínico profesional del paciente. Agradezco un análisis exhaustivo y bien fundamentado que me ayude a proporcionar la mejor atención nutrigenómica posible.`;
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
 * Genera un resumen breve del caso para mostrar en la UI
 */
export function generateCaseSummary(patientCase: ResearchPatientCase): string {
    return generatePatientSummary(patientCase);
}

/**
 * Función principal para generar prompts según la plataforma
 */
export function generatePromptForPlatform(
    patientCase: ResearchPatientCase,
    platform: 'gemini-deep-research' | 'claude'
): string {
    if (platform === 'gemini-deep-research') {
        return generateGeminiDeepResearchPrompt(patientCase);
    } else {
        return generateClaudePrompt(patientCase);
    }
}

