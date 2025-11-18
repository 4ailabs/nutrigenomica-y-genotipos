import { GoogleGenerativeAI } from '@google/generative-ai';
import { FOOD_GUIDE_DATA } from '../foodData';
import type { FoodGuideData } from '../types';

// Tipos específicos para investigación nutrigenómica
export type NutrigenomicsTask = 'PLANNING' | 'GENETIC_ANALYSIS' | 'METABOLIC_RESEARCH' | 'EPIGENETIC_STUDY' | 'CLINICAL_SYNTHESIS' | 'LITERATURE_REVIEW';

export interface NutrigenomicsStrategy {
  primary: string;
  fallback: string;
  reason: string;
  maxTokens?: number;
  temperature?: number;
  researchDepth: 'shallow' | 'medium' | 'deep' | 'comprehensive';
}

export interface NutrigenomicsData {
  title: string;
  content: string;
  geneAnalysis?: any[];
  metabolicPathways?: any[];
  epigeneticFactors?: any[];
  clinicalRecommendations?: any[];
  sources: any[];
}

export interface NutrigenomicsResult {
  content: string;
  geneAnalysis: any[];
  metabolicInsights: any[];
  epigeneticFindings: any[];
  clinicalApplications: any[];
  sources: any[];
  confidenceLevel: number;
}

export interface NutrigenomicsFinalReport {
  summary: string[];
  geneticProfile: string;
  metabolicAnalysis: string;
  epigeneticFactors: string;
  clinicalRecommendations: string;
  report: string;
  confidenceScore: number;
}

// Estrategias específicas para investigación nutrigenómica
export const NUTRIGENOMICS_STRATEGY: Record<NutrigenomicsTask, NutrigenomicsStrategy> = {
  PLANNING: {
    primary: 'gemini-1.5-flash',
    fallback: 'gemini-2.0-flash-exp',
    reason: 'Planificación rápida de investigación nutrigenómica',
    maxTokens: 4096,
    temperature: 0.3,
    researchDepth: 'medium'
  },
  
  GENETIC_ANALYSIS: {
    primary: 'gemini-2.0-flash-exp',
    fallback: 'gemini-1.5-flash',
    reason: 'Análisis genético profundo con contexto extenso',
    maxTokens: 16384,
    temperature: 0.1,
    researchDepth: 'deep'
  },
  
  METABOLIC_RESEARCH: {
    primary: 'gemini-2.0-flash-exp',
    fallback: 'gemini-1.5-flash',
    reason: 'Investigación metabólica con razonamiento avanzado',
    maxTokens: 12288,
    temperature: 0.2,
    researchDepth: 'deep'
  },
  
  EPIGENETIC_STUDY: {
    primary: 'gemini-2.0-flash-exp',
    fallback: 'gemini-1.5-flash',
    reason: 'Análisis epigenético con máximo contexto',
    maxTokens: 16384,
    temperature: 0.15,
    researchDepth: 'comprehensive'
  },
  
  CLINICAL_SYNTHESIS: {
    primary: 'gemini-2.0-flash-exp',
    fallback: 'gemini-1.5-flash',
    reason: 'Síntesis clínica con razonamiento médico',
    maxTokens: 8192,
    temperature: 0.2,
    researchDepth: 'deep'
  },
  
  LITERATURE_REVIEW: {
    primary: 'gemini-1.5-flash',
    fallback: 'gemini-2.0-flash-exp',
    reason: 'Revisión rápida de literatura actualizada',
    maxTokens: 6144,
    temperature: 0.4,
    researchDepth: 'medium'
  }
};

// Cache especializado para nutrigenómica
export class NutrigenomicsCache {
  private cache = new Map<string, {
    response: any;
    timestamp: number;
    model: string;
    confidence: number;
    genotypeSpecific: boolean;
  }>();
  private readonly TTL = 60 * 60 * 1000; // 1 hora para datos nutrigenómicos

  async getCachedResponse(key: string, model: string): Promise<any | null> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      console.log(`🧬 Datos nutrigenómicos en cache: ${key}`);
      return cached.response;
    }
    return null;
  }

  setCachedResponse(key: string, response: any, model: string, confidence: number = 0.8, genotypeSpecific: boolean = false): void {
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
      model,
      confidence,
      genotypeSpecific
    });
    console.log(`🧬 Cache nutrigenómico actualizado: ${key} (confianza: ${confidence})`);
  }

  getGenotypeSpecificData(genotypeId?: number): any[] {
    const results = [];
    for (const [key, value] of this.cache.entries()) {
      if (value.genotypeSpecific && key.includes(`genotype:${genotypeId}`)) {
        results.push({ key, ...value });
      }
    }
    return results;
  }

  // Método para obtener estadísticas del cache
  getCacheStats() {
    const now = Date.now();
    let activeEntries = 0;
    let expiredEntries = 0;
    let totalConfidence = 0;
    let genotypeSpecificCount = 0;
    const modelCounts: Record<string, number> = {};

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp < this.TTL) {
        activeEntries++;
        totalConfidence += value.confidence;

        if (value.genotypeSpecific) {
          genotypeSpecificCount++;
        }

        modelCounts[value.model] = (modelCounts[value.model] || 0) + 1;
      } else {
        expiredEntries++;
      }
    }

    return {
      totalEntries: this.cache.size,
      activeEntries,
      expiredEntries,
      genotypeSpecificCount,
      averageConfidence: activeEntries > 0 ? totalConfidence / activeEntries : 0,
      modelDistribution: modelCounts,
      hitRate: activeEntries / Math.max(this.cache.size, 1)
    };
  }

  // Limpiar entradas expiradas
  cleanExpiredEntries(): number {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp >= this.TTL) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧬 Cache limpiado: ${cleanedCount} entradas expiradas eliminadas`);
    }

    return cleanedCount;
  }

  // Limpiar todo el cache
  clearCache(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`🧬 Cache completamente limpiado: ${size} entradas eliminadas`);
  }
}

// Monitor de rendimiento especializado
export class NutrigenomicsPerformanceMonitor {
  private metrics = new Map<string, {
    successCount: number;
    errorCount: number;
    avgResponseTime: number;
    avgConfidence: number;
    totalRequests: number;
    lastUsed: number;
    taskSpecialty: NutrigenomicsTask[];
  }>();

  recordRequest(model: string, task: NutrigenomicsTask, success: boolean, responseTime: number, confidence: number = 0.8): void {
    const current = this.metrics.get(model) || {
      successCount: 0,
      errorCount: 0,
      avgResponseTime: 0,
      avgConfidence: 0,
      totalRequests: 0,
      lastUsed: Date.now(),
      taskSpecialty: []
    };

    current.totalRequests++;
    current.lastUsed = Date.now();
    
    if (success) {
      current.successCount++;
      current.avgConfidence = (current.avgConfidence * 0.9) + (confidence * 0.1);
    } else {
      current.errorCount++;
    }

    current.avgResponseTime = (current.avgResponseTime * 0.9) + (responseTime * 0.1);
    
    if (!current.taskSpecialty.includes(task)) {
      current.taskSpecialty.push(task);
    }
    
    this.metrics.set(model, current);
  }

  getBestModelForNutrigenomicsTask(task: NutrigenomicsTask): string {
    const taskModels = [NUTRIGENOMICS_STRATEGY[task].primary, NUTRIGENOMICS_STRATEGY[task].fallback];

    return taskModels.reduce((best, current) => {
      const bestMetrics = this.metrics.get(best);
      const currentMetrics = this.metrics.get(current);

      if (!bestMetrics) return current;
      if (!currentMetrics) return best;

      // Score específico para nutrigenómica: éxito + confianza + especialización
      const bestScore = (bestMetrics.successCount / Math.max(bestMetrics.totalRequests, 1)) *
                       bestMetrics.avgConfidence *
                       (bestMetrics.taskSpecialty.includes(task) ? 1.2 : 1.0);

      const currentScore = (currentMetrics.successCount / Math.max(currentMetrics.totalRequests, 1)) *
                          currentMetrics.avgConfidence *
                          (currentMetrics.taskSpecialty.includes(task) ? 1.2 : 1.0);

      return currentScore > bestScore ? current : best;
    });
  }

  // Obtener estadísticas de todos los modelos
  getAllModelStats() {
    const stats: Record<string, any> = {};

    for (const [model, metrics] of this.metrics.entries()) {
      const successRate = metrics.totalRequests > 0
        ? (metrics.successCount / metrics.totalRequests) * 100
        : 0;

      stats[model] = {
        successCount: metrics.successCount,
        errorCount: metrics.errorCount,
        totalRequests: metrics.totalRequests,
        successRate: successRate.toFixed(2) + '%',
        avgResponseTime: Math.round(metrics.avgResponseTime),
        avgConfidence: metrics.avgConfidence.toFixed(2),
        lastUsed: new Date(metrics.lastUsed).toISOString(),
        taskSpecialties: metrics.taskSpecialty,
        performance: this.calculatePerformanceScore(metrics)
      };
    }

    return stats;
  }

  // Calcular score de rendimiento general
  private calculatePerformanceScore(metrics: any): string {
    const successRate = metrics.totalRequests > 0
      ? metrics.successCount / metrics.totalRequests
      : 0;

    const score = (successRate * 0.4) + (metrics.avgConfidence * 0.4) +
                  (Math.min(metrics.avgResponseTime / 1000, 1) * 0.2);

    if (score >= 0.8) return 'Excelente';
    if (score >= 0.6) return 'Bueno';
    if (score >= 0.4) return 'Aceptable';
    return 'Necesita mejorar';
  }
}

// Prompts especializados en nutrigenómica
export const getNutrigenomicsPrompt = (task: NutrigenomicsTask, model: string, content: any): string => {
  const basePrompt = getNutrigenomicsBasePrompt(task, content);
  
  switch (model) {
    case 'gemini-1.5-pro':
      return `${basePrompt}

INSTRUCCIONES ESPECÍFICAS PARA ANÁLISIS NUTRIGENÓMICO PROFUNDO:
- Utiliza todo el contexto disponible para análisis genético completo
- Profundiza en interacciones gen-nutriente específicas
- Analiza vías metabólicas en detalle molecular
- Incluye referencias a polimorfismos específicos (SNPs)
- Considera factores epigenéticos y ambientales
- Genera recomendaciones clínicas basadas en evidencia`;
      
    case 'gemini-2.0-pro':
      return `${basePrompt}

INSTRUCCIONES ESPECÍFICAS PARA RAZONAMIENTO NUTRIGENÓMICO:
- Enfócate en razonamiento médico avanzado
- Analiza relaciones causa-efecto gen-nutriente
- Considera interacciones farmacogenómicas
- Evalúa riesgo-beneficio de intervenciones
- Prioriza evidencia científica reciente (2020-2024)
- Estructura respuestas para aplicación clínica`;
      
    default:
      return basePrompt;
  }
};

// Función auxiliar para obtener información del genotipo
function getGenotypeContext(genotypeId?: number): string {
  if (!genotypeId || !FOOD_GUIDE_DATA[genotypeId]) {
    return '';
  }
  
  const foodData: FoodGuideData = FOOD_GUIDE_DATA[genotypeId];
  const genotypeName = foodData.genotipo_info.nombre;
  const description = foodData.genotipo_info.descripcion;
  
  // Extraer superalimentos y toxinas
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
  
  return `
CONTEXTO DEL GENOTIPO DEL PACIENTE:
- Genotipo: ${genotypeName}
- Descripción: ${description}
- Superalimentos relevantes: ${superfoods.slice(0, 20).join(', ')}${superfoods.length > 20 ? '...' : ''}
- Toxinas a evitar: ${toxins.slice(0, 15).join(', ')}${toxins.length > 15 ? '...' : ''}

IMPORTANTE: Considera este contexto genotípico específico en todo el análisis. Las recomendaciones deben alinearse con los superalimentos y evitar las toxinas de este genotipo.
`;
}

const getNutrigenomicsBasePrompt = (task: NutrigenomicsTask, content: any): string => {
  const genotypeContext = getGenotypeContext(
    typeof content === 'object' ? content.genotypeId : undefined
  );
  
  switch (task) {
    case 'PLANNING':
      return `Eres un especialista en nutrigenómica clínica con experiencia en medicina personalizada y genómica nutricional. Crea un plan de investigación científica riguroso para: "${typeof content === 'string' ? content : content.query}".

${genotypeContext}

CONTEXTO CIENTÍFICO:
- Trabajas en un entorno clínico donde médicos necesitan información precisa y basada en evidencia
- Las recomendaciones deben ser aplicables en práctica clínica real
- Prioriza evidencia científica de alta calidad (ensayos clínicos, metaanálisis, estudios de asociación genómica)

REQUISITOS DEL PLAN:
- Genera EXACTAMENTE 5-7 aspectos específicos de investigación nutrigenómica
- Cada aspecto debe ser:
  * Específico y accionable
  * Basado en evidencia científica
  * Relevante para el contexto clínico
  * Conectado con polimorfismos genéticos conocidos o vías metabólicas identificadas
- Incluye al menos:
  * 1-2 aspectos de análisis genético (SNPs, variantes, frecuencias poblacionales)
  * 1-2 aspectos de metabolismo nutricional (vías enzimáticas, cofactores, biomarcadores)
  * 1 aspecto epigenético (modificaciones, expresión génica, factores ambientales)
  * 1-2 aspectos clínicos (aplicaciones prácticas, protocolos, monitoreo)
- Considera interacciones gen-gen, gen-nutriente y gen-ambiente
- Enfócate en aplicaciones clínicas prácticas y protocolos de intervención

FORMATO REQUERIDO - IMPORTANTE:
Responde ÚNICAMENTE con un array JSON válido de strings. No agregues texto adicional, explicaciones o formato markdown.
La respuesta debe ser SOLO el array JSON, sin código de bloques, sin backticks, sin prefijos.

Ejemplo del formato EXACTO que debes seguir:
["Análisis de polimorfismos MTHFR C677T y A1298C y su impacto en requerimientos de folato y B12", "Investigación de metabolismo lipídico y variantes APOE en relación con ácidos grasos omega-3", "Estudio de modificaciones epigenéticas inducidas por dieta", "Síntesis clínica de protocolos de intervención nutricional personalizada"]`;
      
    case 'GENETIC_ANALYSIS':
      const geneticAspect = typeof content === 'string' ? content : content.aspect;
      const geneticTopic = typeof content === 'object' ? content.mainTopic : '';
      
      return `Eres un genetista médico especializado en nutrigenómica con experiencia en análisis de polimorfismos genéticos y medicina personalizada. Realiza un análisis genético profundo de: "${geneticAspect}".

${genotypeContext}

CONTEXTO DE LA INVESTIGACIÓN:
- Tema principal: ${geneticTopic || 'Análisis genético nutrigenómico'}
- Enfoque: Análisis genético detallado con aplicación clínica

REQUISITOS DEL ANÁLISIS GENÉTICO:
1. IDENTIFICACIÓN DE POLIMORFISMOS:
   - Identifica todos los polimorfismos genéticos relevantes (SNPs, indels, CNVs)
   - Especifica nomenclatura estándar (rsID cuando esté disponible)
   - Incluye frecuencias alélicas poblacionales (especificar población si es relevante)
   - Menciona frecuencias genotípicas cuando sea relevante

2. ANÁLISIS FUNCIONAL DE GENES:
   - Explica la función biológica de cada gen identificado
   - Describe el impacto funcional de cada polimorfismo
   - Analiza cómo afecta la expresión o actividad de proteínas
   - Considera efectos dominantes, recesivos o codominantes

3. IMPACTO EN METABOLISMO NUTRICIONAL:
   - Explica cómo cada variante afecta el metabolismo de nutrientes específicos
   - Identifica nutrientes críticos afectados (vitaminas, minerales, macronutrientes)
   - Describe vías metabólicas alteradas
   - Menciona requerimientos nutricionales modificados

4. INTERACCIONES GENÉTICAS:
   - Analiza interacciones gen-gen (epistasia, efectos aditivos)
   - Considera interacciones gen-ambiente (nutrientes, estilo de vida)
   - Evalúa efectos combinados de múltiples polimorfismos

5. APLICACIONES CLÍNICAS:
   - Recomendaciones dietéticas específicas basadas en el genotipo
   - Protocolos de suplementación personalizados (dosis, formas activas)
   - Estrategias de monitoreo y biomarcadores relevantes
   - Consideraciones de seguridad y contraindicaciones

FORMATO DE RESPUESTA (TEXTO LEGIBLE, NO JSON):
Debes responder en formato de texto legible y organizado, NO en JSON. Estructura tu respuesta de la siguiente manera:

## Análisis Genético Completo

Escribe un análisis genético completo y detallado en formato narrativo (mínimo 500 palabras, máximo 2000 palabras). Debe incluir introducción, análisis de cada gen/polimorfismo, impacto metabólico, y conclusiones clínicas.

## Genes y Polimorfismos Analizados

Para cada gen relevante, incluye:
- Gen: Nombre del gen (símbolo oficial HGNC)
- Polimorfismo: SNP rsID o variante (ej: rs1801133, C677T)
- Función: Función biológica del gen y proteína codificada
- Impacto: Impacto funcional específico del polimorfismo
- Frecuencia Alélica: Frecuencia alélica poblacional si está disponible
- Significado Clínico: Significado clínico y relevancia nutrigenómica

## Insights Metabólicos

1. Descripción específica de cómo afecta el metabolismo
2. Vías enzimáticas o procesos afectados

## Hallazgos Epigenéticos

1. Modificaciones epigenéticas relacionadas si aplica
2. Influencia de nutrientes en expresión génica

## Aplicaciones Clínicas

1. Recomendación específica y accionable
2. Protocolo de intervención o monitoreo

## Referencias

- Título del estudio o referencia - URL o DOI - Tipo: estudio clínico, revisión, metaanálisis, etc.

Nivel de Evidencia: Alto/Medio/Bajo basado en calidad de estudios disponibles`;

    case 'METABOLIC_RESEARCH':
      const metabolicAspect = typeof content === 'string' ? content : content.aspect;
      const metabolicTopic = typeof content === 'object' ? content.mainTopic : '';
      
      return `Eres un bioquímico médico especializado en metabolismo nutricional y fisiología humana. Realiza una investigación metabólica profunda de: "${metabolicAspect}".

${genotypeContext}

CONTEXTO DE LA INVESTIGACIÓN:
- Tema principal: ${metabolicTopic || 'Investigación metabólica nutrigenómica'}
- Enfoque: Análisis de vías metabólicas y regulación nutricional

REQUISITOS DE LA INVESTIGACIÓN METABÓLICA:
1. ANÁLISIS DE VÍAS METABÓLICAS:
   - Identifica todas las vías metabólicas relevantes (glucólisis, ciclo de Krebs, beta-oxidación, etc.)
   - Describe el flujo metabólico paso a paso
   - Explica puntos de regulación clave (enzimas limitantes, retroalimentación)
   - Analiza conexiones entre vías metabólicas

2. ENZIMAS Y COFACTORES:
   - Lista todas las enzimas involucradas con sus nombres oficiales (EC numbers cuando sea posible)
   - Identifica cofactores esenciales (vitaminas, minerales, coenzimas)
   - Explica el papel de cada cofactor en la actividad enzimática
   - Describe deficiencias de cofactores y sus consecuencias metabólicas

3. REGULACIÓN METABÓLICA:
   - Identifica puntos de control alostérico
   - Analiza regulación hormonal (insulina, glucagón, cortisol, etc.)
   - Considera regulación transcripcional (factores de transcripción, elementos de respuesta)
   - Evalúa efectos de nutrientes específicos en la regulación

4. EFECTOS DE NUTRIENTES:
   - Describe cómo nutrientes específicos afectan cada vía metabólica
   - Analiza requerimientos nutricionales para optimización metabólica
   - Identifica nutrientes limitantes o críticos
   - Considera interacciones entre nutrientes

5. BIOMARCADORES Y MONITOREO:
   - Identifica biomarcadores relevantes para evaluar función metabólica
   - Describe valores normales y patológicos
   - Sugiere protocolos de monitoreo clínico
   - Explica interpretación de resultados

6. APLICACIONES CLÍNICAS:
   - Estrategias nutricionales para optimizar vías metabólicas
   - Protocolos de suplementación de cofactores
   - Consideraciones de timing nutricional (crononutrición)
   - Intervenciones dietéticas personalizadas

FORMATO DE RESPUESTA (TEXTO LEGIBLE, NO JSON):
Debes responder en formato de texto legible y organizado, NO en JSON. Estructura tu respuesta de la siguiente manera:

## Investigación Metabólica Completa

Escribe una investigación metabólica completa y detallada en formato narrativo (mínimo 600 palabras, máximo 2500 palabras). Debe incluir descripción de vías, regulación, efectos nutricionales y aplicaciones clínicas.

## Genes y Vías Metabólicas

Para cada gen relevante:
- Gen: Nombre del gen relacionado con la vía metabólica
- Variantes: Variantes genéticas relevantes si aplica
- Función: Función en la vía metabólica
- Impacto: Impacto en el metabolismo nutricional

## Insights Metabólicos

1. Descripción detallada de vía metabólica específica y su regulación
2. Efectos de nutrientes en enzimas y cofactores
3. Puntos de regulación y control metabólico
4. Biomarcadores y evaluación funcional

## Hallazgos Epigenéticos

1. Regulación epigenética de vías metabólicas si aplica

## Aplicaciones Clínicas

1. Estrategia nutricional específica con dosis y protocolo
2. Protocolo de monitoreo y seguimiento

## Referencias

- Título del estudio - URL o DOI - Tipo de estudio

Nivel de Evidencia: Alto/Medio/Bajo`;

    case 'EPIGENETIC_STUDY':
      const epigeneticAspect = typeof content === 'string' ? content : content.aspect;
      const epigeneticTopic = typeof content === 'object' ? content.mainTopic : '';
      
      return `Eres un especialista en epigenética nutricional y regulación de la expresión génica. Realiza un estudio epigenético profundo de: "${epigeneticAspect}".

${genotypeContext}

CONTEXTO DE LA INVESTIGACIÓN:
- Tema principal: ${epigeneticTopic || 'Estudio epigenético nutrigenómico'}
- Enfoque: Modificaciones epigenéticas y su relación con nutrición

REQUISITOS DEL ESTUDIO EPIGENÉTICO:
1. MODIFICACIONES EPIGENÉTICAS:
   - Analiza modificaciones de ADN (metilación de CpG, hidroximetilación)
   - Describe modificaciones de histonas (acetilación, metilación, fosforilación, ubiquitinación)
   - Identifica microRNAs y otros RNAs no codificantes relevantes
   - Explica mecanismos de silenciamiento o activación génica

2. INFLUENCIA DE NUTRIENTES:
   - Identifica nutrientes que actúan como donadores de grupos metilo (folato, B12, colina, metionina)
   - Analiza nutrientes que afectan modificaciones de histonas (ácidos grasos, polifenoles)
   - Describe nutrientes que influyen en expresión de microRNAs
   - Explica mecanismos moleculares de acción de cada nutriente

3. FACTORES AMBIENTALES Y ESTILO DE VIDA:
   - Evalúa impacto de dieta (calorías, macronutrientes, micronutrientes)
   - Considera efectos de ejercicio físico
   - Analiza influencia de estrés y sueño
   - Evalúa exposición a toxinas ambientales

4. ASPECTOS TRANSGENERACIONALES:
   - Analiza herencia epigenética si es relevante
   - Considera efectos en desarrollo fetal y programación metabólica
   - Evalúa ventanas críticas de desarrollo
   - Describe mecanismos de transmisión epigenética

5. REVERSIBILIDAD Y MODULACIÓN:
   - Evalúa potencial de reversión de modificaciones epigenéticas
   - Identifica intervenciones nutricionales que pueden modificar el epigenoma
   - Describe tiempos de respuesta y persistencia de cambios
   - Analiza factores que determinan reversibilidad

6. APLICACIONES CLÍNICAS:
   - Estrategias nutricionales para modulación epigenética
   - Protocolos de intervención con nutrientes específicos
   - Consideraciones de timing y duración de intervenciones
   - Biomarcadores epigenéticos para monitoreo

FORMATO DE RESPUESTA (TEXTO LEGIBLE, NO JSON):
Debes responder en formato de texto legible y organizado, NO en JSON. Estructura tu respuesta de la siguiente manera:

## Estudio Epigenético Completo

Escribe un estudio epigenético completo y detallado en formato narrativo (mínimo 600 palabras, máximo 2500 palabras). Debe incluir mecanismos, influencia nutricional, factores ambientales y aplicaciones clínicas.

## Genes con Regulación Epigenética

Para cada gen relevante:
- Gen: Nombre del gen con regulación epigenética relevante
- Variantes: Variantes que afectan susceptibilidad epigenética si aplica
- Función: Función del gen y su regulación epigenética
- Impacto: Impacto de modificaciones epigenéticas en expresión y función

## Vías Metabólicas Afectadas

1. Vías metabólicas afectadas por cambios epigenéticos

## Hallazgos Epigenéticos

1. Modificaciones epigenéticas específicas identificadas (tipo, ubicación, genes afectados)
2. Nutrientes que modulan estas modificaciones
3. Factores ambientales y de estilo de vida relevantes
4. Potencial de reversión y estrategias de intervención

## Aplicaciones Clínicas

1. Protocolo nutricional específico para modulación epigenética
2. Estrategia de monitoreo y evaluación de cambios epigenéticos

## Referencias

- Título del estudio - URL o DOI - Tipo de estudio

Nivel de Evidencia: Alto/Medio/Bajo`;

    case 'CLINICAL_SYNTHESIS':
      const synthesisTopic = typeof content === 'string' ? content : content.topic;
      const researchData = typeof content === 'object' && content.researchData ? content.researchData : [];
      
      return `Eres un médico especialista en medicina personalizada y nutrigenómica clínica. Sintetiza y integra toda la investigación científica realizada sobre: "${synthesisTopic}".

${genotypeContext}

DATOS DE INVESTIGACIÓN DISPONIBLES:
${researchData.length > 0 ? JSON.stringify(researchData, null, 2) : 'No hay datos de investigación previos disponibles.'}

CONTEXTO CLÍNICO:
- Trabajas para médicos que necesitan información clara y accionable
- Las recomendaciones deben ser específicas, seguras y basadas en evidencia
- Debes considerar el contexto completo del paciente (genotipo, condiciones de salud, medicamentos)

REQUISITOS DE LA SÍNTESIS CLÍNICA:
1. INTEGRACIÓN DE HALLAZGOS:
   - Integra coherentemente todos los hallazgos genéticos, metabólicos y epigenéticos
   - Identifica conexiones y sinergias entre diferentes aspectos
   - Resuelve contradicciones o inconsistencias si existen
   - Prioriza información más relevante clínicamente

2. PERFIL GENÉTICO INTEGRADO:
   - Crea un perfil genético unificado que resuma todas las variantes relevantes
   - Explica cómo interactúan diferentes polimorfismos
   - Identifica el perfil de riesgo/beneficio general
   - Considera el contexto del genotipo del sistema GenoTipos

3. ANÁLISIS METABÓLICO CONJUNTO:
   - Sintetiza todas las vías metabólicas afectadas
   - Identifica puntos de intervención prioritarios
   - Evalúa el estado metabólico general inferido
   - Considera requerimientos nutricionales integrados

4. FACTORES EPIGENÉTICOS:
   - Resume modificaciones epigenéticas relevantes
   - Evalúa potencial de modulación nutricional
   - Considera factores ambientales modificables
   - Integra con hallazgos genéticos y metabólicos

5. RECOMENDACIONES CLÍNICAS ESPECÍFICAS:
   - Genera recomendaciones dietéticas específicas y cuantificables
   - Incluye protocolos de suplementación con dosis específicas
   - Proporciona guías de alimentos a priorizar y evitar
   - Considera timing nutricional (crononutrición) si es relevante
   - Alinea con superalimentos y evita toxinas del genotipo

6. SEGURIDAD Y CONTRAINDICACIONES:
   - Identifica contraindicaciones específicas
   - Analiza interacciones con medicamentos comunes
   - Considera interacciones entre suplementos
   - Evalúa riesgos y efectos adversos potenciales
   - Proporciona advertencias de seguridad claras

7. MONITOREO Y SEGUIMIENTO:
   - Sugiere biomarcadores específicos para monitoreo
   - Define intervalos de seguimiento recomendados
   - Establece objetivos y criterios de éxito
   - Proporciona guías para ajuste de protocolos

8. NIVEL DE EVIDENCIA:
   - Evalúa la calidad y cantidad de evidencia disponible
   - Clasifica nivel de evidencia (Alto/Medio/Bajo)
   - Identifica áreas con evidencia limitada
   - Sugiere áreas que requieren más investigación

FORMATO DE RESPUESTA (JSON ESTRUCTURADO):
Debes responder ÚNICAMENTE con un objeto JSON válido. No agregues texto adicional, explicaciones o formato markdown.
La respuesta debe ser SOLO el objeto JSON, sin código de bloques, sin backticks, sin prefijos.

{
  "summary": [
    "Punto clave 1: Resumen ejecutivo de hallazgo principal (máximo 2 líneas)",
    "Punto clave 2: Hallazgo secundario importante",
    "Punto clave 3: Recomendación principal",
    "Punto clave 4-6: Otros puntos críticos (MÍNIMO 4, MÁXIMO 7 puntos)"
  ],
  "geneticProfile": "Perfil genético integrado completo (300-500 palabras). Debe resumir todas las variantes genéticas relevantes, sus interacciones, y el significado clínico integrado.",
  "metabolicAnalysis": "Análisis metabólico conjunto completo (300-500 palabras). Debe integrar todas las vías metabólicas, requerimientos nutricionales, y estado metabólico inferido.",
  "epigeneticFactors": "Factores epigenéticos relevantes integrados (200-400 palabras). Debe resumir modificaciones epigenéticas, influencia nutricional, y potencial de modulación.",
  "clinicalRecommendations": "Recomendaciones clínicas específicas y accionables (400-600 palabras). Debe incluir: Dieta específica con alimentos prioritarios y a evitar, Protocolo de suplementación con dosis y formas activas, Timing nutricional si es relevante, Consideraciones de seguridad, Alineación con genotipo del sistema GenoTipos.",
  "report": "Reporte clínico completo en formato Markdown profesional (mínimo 1000 palabras). Incluye: Resumen ejecutivo, Introducción al caso, Análisis genético integrado, Análisis metabólico integrado, Factores epigenéticos, Recomendaciones clínicas detalladas, Protocolo de intervención paso a paso, Monitoreo y seguimiento, Contraindicaciones y precauciones, Referencias y nivel de evidencia, Notas profesionales para el médico.",
  "confidenceScore": 0.90
}`;

    case 'LITERATURE_REVIEW':
      const reviewTopic = typeof content === 'string' ? content : content.topic;
      
      return `Eres un investigador especializado en literatura nutrigenómica con experiencia en revisión sistemática y evaluación crítica de evidencia científica. Realiza una revisión de literatura científica reciente sobre: "${reviewTopic}".

${genotypeContext}

CONTEXTO DE LA REVISIÓN:
- Enfoque: Revisión crítica de evidencia científica nutrigenómica
- Audiencia: Médicos que necesitan información basada en evidencia de alta calidad

REQUISITOS DE LA REVISIÓN DE LITERATURA:
1. CRITERIOS DE SELECCIÓN:
   - Prioriza estudios publicados entre 2020-2024 (últimos 5 años)
   - Incluye estudios más antiguos solo si son fundamentales o seminales
   - Prioriza en este orden:
     * Metaanálisis y revisiones sistemáticas
     * Ensayos clínicos aleatorizados (RCTs)
     * Estudios de asociación genómica (GWAS, estudios de asociación)
     * Estudios de cohorte prospectivos
     * Estudios caso-control bien diseñados
   - Excluye estudios observacionales de baja calidad, estudios in vitro sin validación clínica, y opiniones no respaldadas

2. EVALUACIÓN DE CALIDAD METODOLÓGICA:
   - Evalúa tamaño de muestra y poder estadístico
   - Considera diseño del estudio y controles adecuados
   - Analiza sesgos potenciales (selección, confusión, publicación)
   - Evalúa validez interna y externa
   - Considera reproducibilidad y consistencia de hallazgos

3. DIVERSIDAD POBLACIONAL:
   - Considera diversidad étnica y geográfica en estudios
   - Evalúa aplicabilidad a diferentes poblaciones
   - Identifica limitaciones de generalización
   - Menciona estudios específicos de poblaciones relevantes

4. SÍNTESIS DE HALLAZGOS:
   - Resume hallazgos principales de manera coherente
   - Identifica consensos y controversias en la literatura
   - Analiza tendencias y evolución del conocimiento
   - Evalúa fortaleza de la evidencia acumulada

5. APLICACIÓN CLÍNICA:
   - Traduce hallazgos a aplicaciones clínicas prácticas
   - Identifica brechas en el conocimiento
   - Sugiere áreas que requieren más investigación
   - Proporciona contexto para toma de decisiones clínicas

FORMATO DE RESPUESTA (TEXTO LEGIBLE, NO JSON):
Debes responder en formato de texto legible y organizado, NO en JSON. Estructura tu respuesta de la siguiente manera:

## Revisión de Literatura Completa

Escribe una revisión de literatura completa y crítica (mínimo 800 palabras, máximo 3000 palabras). Debe incluir:
- Introducción al tema
- Resumen de estudios clave (mínimo 5-10 estudios relevantes)
- Evaluación crítica de evidencia
- Síntesis de hallazgos principales
- Consensos y controversias
- Aplicaciones clínicas
- Brechas en el conocimiento
- Conclusiones y recomendaciones

## Genes Relevantes Identificados

Para cada gen relevante:
- Gen: Nombre del gen relevante identificado en la literatura
- Polimorfismos: Polimorfismos mencionados en estudios
- Función: Función según evidencia científica
- Impacto: Impacto clínico según estudios revisados

## Insights Metabólicos

1. Hallazgo metabólico principal de la literatura
2. Consenso o controversia identificada

## Hallazgos Epigenéticos

1. Evidencia epigenética encontrada en la literatura

## Aplicaciones Clínicas

1. Aplicación clínica basada en evidencia revisada

## Referencias

Para cada estudio:
- Título completo del estudio - DOI o URL
- Tipo: Tipo de estudio (metaanálisis, RCT, GWAS, cohorte, etc.)
- Año: Año de publicación
- Autores: Autores principales (opcional)
- Calidad: Evaluación de calidad (Alta/Media/Baja)

Nivel de Evidencia: Alto/Medio/Bajo basado en calidad de estudios revisados
Nivel de Consenso: Alto/Medio/Bajo/Controvertido en la literatura`;

    default:
      return `Analiza el siguiente contenido nutrigenómico: ${JSON.stringify(content)}`;
  }
};

// Servicio principal de investigación nutrigenómica
export class NutrigenomicsResearchService {
  private genAI: GoogleGenerativeAI;
  private cache: NutrigenomicsCache;
  private performanceMonitor: NutrigenomicsPerformanceMonitor;
  private currentModel: string = '';

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.cache = new NutrigenomicsCache();
    this.performanceMonitor = new NutrigenomicsPerformanceMonitor();
  }

  private async callGeminiAPI(model: string, task: NutrigenomicsTask, content: any): Promise<any> {
    const startTime = Date.now();
    
    // Lista de modelos a intentar en orden de preferencia (con fallback)
    const modelsToTry = [
      model, // Intentar primero el modelo solicitado
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro'
    ];
    
    // Eliminar duplicados manteniendo el orden
    const uniqueModels = Array.from(new Set(modelsToTry));
    
    let lastError: any = null;
    let lastModel = model;
    
    for (const modelName of uniqueModels) {
      try {
        const prompt = getNutrigenomicsPrompt(task, modelName, content);
        
        const genModel = this.genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: NUTRIGENOMICS_STRATEGY[task].temperature || 0.3,
            topK: 40,
            topP: 0.95,
          }
        });
        
        const result = await genModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const responseTime = Date.now() - startTime;
        
        // Calcular confianza basada en completitud de respuesta
        const confidence = this.calculateConfidence(text, task);
        
        // Registrar con el modelo que funcionó
        this.performanceMonitor.recordRequest(modelName, task, true, responseTime, confidence);
        
        console.log(`🧬 Nutrigenómica API exitosa: ${modelName} (solicitado: ${model}) en ${responseTime}ms (confianza: ${confidence})`);
        
        // Limpiar la respuesta de formato markdown si existe
        let cleanedText = text.trim();
        
        // Remover bloques de código markdown (```json...```)
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/,'');
        }
        
        // Intentar parsear JSON, pero mantener el texto original si falla
        try {
          const parsed = JSON.parse(cleanedText);
          
          // Si es un array (como en PLANNING), devolverlo directamente
          if (Array.isArray(parsed)) {
            console.log(`🧬 Array parseado exitosamente con ${parsed.length} elementos`);
            return parsed;
          }
          
          // Extraer contenido de texto del JSON si existe
          // Si el contenido es un objeto complejo, convertirlo a texto legible
          if (parsed.content && typeof parsed.content === 'object') {
            parsed.content = JSON.stringify(parsed.content, null, 2);
          }
          
          return { ...parsed, _meta: { model: modelName, originalModel: model, responseTime, confidence, task } };
        } catch (parseError) {
          // Si no es JSON válido, es porque pedimos texto legible (Markdown)
          // Para tareas que no son PLANNING, el texto Markdown es válido
          if (task !== 'PLANNING') {
            console.log(`🧬 Respuesta en texto Markdown recibida correctamente (${cleanedText.length} caracteres)`);
            return { 
              content: cleanedText, 
              sources: [], 
              geneAnalysis: [],
              metabolicInsights: [],
              epigeneticFindings: [],
              clinicalApplications: [],
              confidenceLevel: confidence,
              _meta: { model: modelName, originalModel: model, responseTime, confidence, task }
            };
          }
          
          // Para PLANNING, es un error real
          console.warn(`🧬 Error al parsear JSON para ${task}. Error:`, parseError);
          return { 
            content: cleanedText, 
            sources: [], 
            geneAnalysis: [],
            metabolicInsights: [],
            epigeneticFindings: [],
            clinicalApplications: [],
            confidenceLevel: confidence,
            _meta: { model: modelName, originalModel: model, responseTime, confidence, task }
          };
        }
        
      } catch (error: any) {
        lastError = error;
        lastModel = modelName;
        
        const errorMsg = error?.message || error?.toString() || '';
        
        // Si es error 404 o modelo no encontrado, intentar siguiente modelo
        if (errorMsg.includes('404') || 
            errorMsg.includes('not found') || 
            errorMsg.includes('is not found') ||
            errorMsg.includes('not supported')) {
          console.warn(`🧬 Modelo ${modelName} no disponible, intentando siguiente modelo...`);
          continue;
        }
        
        // Si es otro tipo de error (cuota, autenticación, etc.), no intentar más modelos
        console.error(`🧬 Error en Nutrigenómica API con ${modelName}:`, errorMsg);
        break;
      }
    }
    
    // Si todos los modelos fallaron
    const responseTime = Date.now() - startTime;
    this.performanceMonitor.recordRequest(lastModel, task, false, responseTime, 0);
    
    const errorMsg = lastError?.message || lastError?.toString() || 'Error desconocido';
    console.error(`🧬 Todos los modelos fallaron. Último error (${lastModel}):`, errorMsg);
    
    throw new Error(`No se pudo encontrar un modelo disponible de Gemini. Modelos intentados: ${uniqueModels.join(', ')}. Error: ${errorMsg}. Verifica que tu API key tenga acceso a los modelos de Gemini.`);
  }

  private calculateConfidence(response: string, task: NutrigenomicsTask): number {
    let confidence = 0.5; // Base confidence
    
    // Factores que aumentan confianza
    if (response.includes('SNP') || response.includes('polimorfismo')) confidence += 0.1;
    if (response.includes('metabolismo') || response.includes('enzima')) confidence += 0.1;
    if (response.includes('epigenético') || response.includes('metilación')) confidence += 0.1;
    if (response.includes('estudio') || response.includes('evidencia')) confidence += 0.1;
    if (response.length > 1000) confidence += 0.1;
    if (response.includes('recomendación') || response.includes('clínico')) confidence += 0.1;
    
    return Math.min(confidence, 0.95);
  }

  async createNutrigenomicsPlan(query: string, genotypeId?: number): Promise<string[]> {
    const task: NutrigenomicsTask = 'PLANNING';
    const model = this.performanceMonitor.getBestModelForNutrigenomicsTask(task);
    this.currentModel = model;
    
    const cacheKey = `nutri_plan:${query}:${genotypeId}:${model}`;
    
    const cached = await this.cache.getCachedResponse(cacheKey, model);
    if (cached) return cached;
    
    const result = await this.callGeminiAPI(model, task, { query, genotypeId });
    
    // El resultado debería ser un array directamente
    let planArray: string[] = [];
    if (Array.isArray(result)) {
      planArray = result;
    } else if (result.content) {
      // Si por alguna razón viene en result.content, intentar parsearlo
      if (Array.isArray(result.content)) {
        planArray = result.content;
      } else if (typeof result.content === 'string') {
        try {
          const parsed = JSON.parse(result.content);
          planArray = Array.isArray(parsed) ? parsed : [];
        } catch {
          planArray = [];
        }
      }
    }
    
    // Guardar en caché con confianza alta para planes
    await this.cache.setCachedResponse(cacheKey, planArray, model, 0.9, !!genotypeId);
    return planArray;
  }

  async analyzeGeneticAspect(aspect: string, mainTopic: string, genotypeId?: number): Promise<NutrigenomicsResult> {
    const task: NutrigenomicsTask = 'GENETIC_ANALYSIS';
    const model = this.performanceMonitor.getBestModelForNutrigenomicsTask(task);
    this.currentModel = model;
    
    const cacheKey = `nutri_genetic:${aspect}:${mainTopic}:${genotypeId}:${model}`;
    
    const cached = await this.cache.getCachedResponse(cacheKey, model);
    if (cached) return cached;
    
    const result = await this.callGeminiAPI(model, task, { aspect, mainTopic, genotypeId });
    
    await this.cache.setCachedResponse(cacheKey, result, model, result._meta?.confidence, !!genotypeId);
    return result;
  }

  async researchMetabolicAspect(aspect: string, mainTopic: string): Promise<NutrigenomicsResult> {
    const task: NutrigenomicsTask = 'METABOLIC_RESEARCH';
    const model = this.performanceMonitor.getBestModelForNutrigenomicsTask(task);
    
    return await this.callGeminiAPI(model, task, { aspect, mainTopic });
  }

  async studyEpigeneticFactors(aspect: string, mainTopic: string): Promise<NutrigenomicsResult> {
    const task: NutrigenomicsTask = 'EPIGENETIC_STUDY';
    const model = this.performanceMonitor.getBestModelForNutrigenomicsTask(task);
    
    return await this.callGeminiAPI(model, task, { aspect, mainTopic });
  }

  async synthesizeClinicalReport(topic: string, researchData: NutrigenomicsData[]): Promise<NutrigenomicsFinalReport> {
    const task: NutrigenomicsTask = 'CLINICAL_SYNTHESIS';
    const model = this.performanceMonitor.getBestModelForNutrigenomicsTask(task);
    
    return await this.callGeminiAPI(model, task, { topic, researchData });
  }

  async reviewLiterature(topic: string): Promise<NutrigenomicsResult> {
    const task: NutrigenomicsTask = 'LITERATURE_REVIEW';
    const model = this.performanceMonitor.getBestModelForNutrigenomicsTask(task);
    
    return await this.callGeminiAPI(model, task, { topic });
  }

  // Métodos de utilidad específicos para nutrigenómica
  getCurrentModel(): string {
    return this.currentModel;
  }

  getNutrigenomicsStats() {
    return {
      cache: this.cache.getCacheStats(),
      performance: this.performanceMonitor.getAllModelStats(),
      genotypeSpecificData: this.cache.getGenotypeSpecificData()
    };
  }

  getGenotypeSpecificCache(genotypeId: number) {
    return this.cache.getGenotypeSpecificData(genotypeId);
  }
}

export default NutrigenomicsResearchService;