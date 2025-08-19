import { GoogleGenerativeAI } from '@google/generative-ai';

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
    primary: 'gemini-2.0-flash-exp',
    fallback: 'gemini-2.0-flash',
    reason: 'Planificación rápida de investigación nutrigenómica',
    maxTokens: 4096,
    temperature: 0.3,
    researchDepth: 'medium'
  },
  
  GENETIC_ANALYSIS: {
    primary: 'gemini-1.5-pro',
    fallback: 'gemini-2.0-pro',
    reason: 'Análisis genético profundo con contexto extenso',
    maxTokens: 16384,
    temperature: 0.1,
    researchDepth: 'deep'
  },
  
  METABOLIC_RESEARCH: {
    primary: 'gemini-2.0-pro',
    fallback: 'gemini-1.5-pro',
    reason: 'Investigación metabólica con razonamiento avanzado',
    maxTokens: 12288,
    temperature: 0.2,
    researchDepth: 'deep'
  },
  
  EPIGENETIC_STUDY: {
    primary: 'gemini-1.5-pro',
    fallback: 'gemini-2.0-pro',
    reason: 'Análisis epigenético con máximo contexto',
    maxTokens: 16384,
    temperature: 0.15,
    researchDepth: 'comprehensive'
  },
  
  CLINICAL_SYNTHESIS: {
    primary: 'gemini-2.0-pro',
    fallback: 'gemini-1.5-flash',
    reason: 'Síntesis clínica con razonamiento médico',
    maxTokens: 8192,
    temperature: 0.2,
    researchDepth: 'deep'
  },
  
  LITERATURE_REVIEW: {
    primary: 'gemini-2.0-flash-exp',
    fallback: 'gemini-1.5-flash',
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

const getNutrigenomicsBasePrompt = (task: NutrigenomicsTask, content: any): string => {
  switch (task) {
    case 'PLANNING':
      return `Eres un especialista en nutrigenómica clínica. Crea un plan de investigación para: "${typeof content === 'string' ? content : content.query}".

REQUISITOS:
- Genera 5-7 aspectos específicos de investigación nutrigenómica
- Incluye análisis genético, metabólico, epigenético y clínico
- Considera polimorfismos relevantes y vías metabólicas
- Enfócate en aplicaciones clínicas prácticas

FORMATO: Array JSON de strings con aspectos de investigación.`;
      
    case 'GENETIC_ANALYSIS':
      return `Eres un genetista especializado en nutrigenómica. Analiza: "${typeof content === 'string' ? content : content.aspect}".

REQUISITOS:
- Identifica polimorfismos genéticos relevantes (SNPs)
- Analiza función de genes específicos
- Explica impacto en metabolismo de nutrientes
- Incluye frecuencias poblacionales cuando sea relevante
- Considera interacciones gen-gen y gen-ambiente

FORMATO JSON:
{
  "content": "análisis genético detallado...",
  "geneAnalysis": [{"gene": "nombre", "polymorphism": "SNP", "function": "descripción", "impact": "efecto"}],
  "metabolicInsights": ["insight1", "insight2"],
  "epigeneticFindings": ["finding1", "finding2"],
  "clinicalApplications": ["aplicación1", "aplicación2"],
  "sources": [{"uri": "URL", "title": "título"}],
  "confidenceLevel": 0.85
}`;

    case 'METABOLIC_RESEARCH':
      return `Eres un bioquímico especializado en metabolismo nutricional. Investiga: "${typeof content === 'string' ? content : content.aspect}".

REQUISITOS:
- Analiza vías metabólicas específicas
- Explica enzimas y cofactores involucrados
- Identifica puntos de regulación metabólica
- Considera efectos de nutrientes específicos
- Incluye biomarcadores relevantes

FORMATO: Mismo JSON que GENETIC_ANALYSIS con enfoque metabólico.`;

    case 'EPIGENETIC_STUDY':
      return `Eres un especialista en epigenética nutricional. Estudia: "${typeof content === 'string' ? content : content.aspect}".

REQUISITOS:
- Analiza modificaciones epigenéticas (metilación, acetilación)
- Explica influencia de nutrientes en expresión génica
- Considera factores ambientales y estilo de vida
- Incluye aspectos transgeneracionales si es relevante
- Evalúa reversibilidad de cambios epigenéticos

FORMATO: Mismo JSON con enfoque epigenético.`;

    case 'CLINICAL_SYNTHESIS':
      return `Eres un médico especialista en medicina personalizada. Sintetiza la investigación de: "${typeof content === 'string' ? content : content.topic}".

DATOS DE INVESTIGACIÓN:
${typeof content === 'object' && content.researchData ? JSON.stringify(content.researchData, null, 2) : ''}

REQUISITOS:
- Integra hallazgos genéticos, metabólicos y epigenéticos
- Genera recomendaciones clínicas específicas
- Considera contraindicaciones y interacciones
- Incluye monitoreo y seguimiento sugerido
- Evalúa nivel de evidencia científica

FORMATO JSON:
{
  "summary": ["punto clave 1", "punto clave 2"],
  "geneticProfile": "perfil genético integrado",
  "metabolicAnalysis": "análisis metabólico conjunto",
  "epigeneticFactors": "factores epigenéticos relevantes",
  "clinicalRecommendations": "recomendaciones específicas",
  "report": "reporte completo en Markdown",
  "confidenceScore": 0.90
}`;

    case 'LITERATURE_REVIEW':
      return `Eres un investigador especializado en literatura nutrigenómica. Revisa literatura reciente sobre: "${typeof content === 'string' ? content : content.topic}".

REQUISITOS:
- Enfócate en estudios 2020-2024
- Prioriza ensayos clínicos y metaanálisis
- Incluye estudios de asociación genómica (GWAS)
- Considera diversidad poblacional en estudios
- Evalúa calidad metodológica

FORMATO: JSON con content, sources y confidenceLevel.`;

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
    
    try {
      const prompt = getNutrigenomicsPrompt(task, model, content);
      
      const genModel = this.genAI.getGenerativeModel({ model });
      const result = await genModel.generateContent(prompt);
      
      const response = await result.response;
      const text = response.text();
      const responseTime = Date.now() - startTime;
      
      // Calcular confianza basada en completitud de respuesta
      const confidence = this.calculateConfidence(text, task);
      
      this.performanceMonitor.recordRequest(model, task, true, responseTime, confidence);
      
      console.log(`🧬 Nutrigenómica API exitosa: ${model} en ${responseTime}ms (confianza: ${confidence})`);
      
      try {
        const parsed = JSON.parse(text);
        return { ...parsed, _meta: { model, responseTime, confidence, task } };
      } catch (parseError) {
        return { 
          content: text, 
          sources: [], 
          geneAnalysis: [],
          metabolicInsights: [],
          epigeneticFindings: [],
          clinicalApplications: [],
          confidenceLevel: confidence,
          _meta: { model, responseTime, confidence, task }
        };
      }
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.performanceMonitor.recordRequest(model, task, false, responseTime, 0);
      console.error(`🧬 Error en Nutrigenómica API con ${model}:`, error);
      throw error;
    }
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
    
    await this.cache.setCachedResponse(cacheKey, result, model, result._meta?.confidence, !!genotypeId);
    return Array.isArray(result) ? result : result.content || [];
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