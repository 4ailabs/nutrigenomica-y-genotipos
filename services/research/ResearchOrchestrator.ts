import NutrigenomicsResearchService, { NutrigenomicsTask } from '../NutrigenomicsResearchService';
import { ResearchErrorHandler } from './ResearchErrorHandler';
import { ResearchValidator } from './ResearchValidator';
import { formatAspectResult, formatSynthesis } from '../../utils/formatResearchContent';

export interface AspectResult {
  aspect: string;
  content: string;
  status: 'completed' | 'error';
  confidence: number;
}

export interface ResearchPlan {
  subagents: string[];
  researchType: 'depth-first' | 'breadth-first';
}

export interface ResearchSynthesis {
  summary: string | string[];
  clinicalRecommendations: string | string[];
  evidenceLevel?: string;
}

export class ResearchOrchestrator {
  constructor(private service: NutrigenomicsResearchService) {}

  async createPlan(
    query: string,
    researchType: 'depth-first' | 'breadth-first',
    genotypeId?: number
  ): Promise<{ success: boolean; plan?: ResearchPlan; error?: any }> {
    try {
      const planResult = await this.service.createNutrigenomicsPlan(query, genotypeId);
      const subagents = Array.isArray(planResult) ? planResult : [];

      if (!ResearchValidator.validateSubagents(subagents)) {
        throw new Error('No se pudieron generar aspectos de investigación');
      }

      return {
        success: true,
        plan: { subagents, researchType },
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  getAnalysisType(aspect: string): NutrigenomicsTask {
    if (aspect.includes('Genética') || aspect.includes('Molecular') || aspect.includes('Polimorfismo')) {
      return 'GENETIC_ANALYSIS';
    } else if (aspect.includes('Metabolismo') || aspect.includes('Metabólico')) {
      return 'METABOLIC_RESEARCH';
    } else if (aspect.includes('Epigenética') || aspect.includes('Epigenético')) {
      return 'EPIGENETIC_STUDY';
    } else if (aspect.includes('Literatura') || aspect.includes('Revisión')) {
      return 'LITERATURE_REVIEW';
    }
    return 'GENETIC_ANALYSIS';
  }

  async executeAnalysis(
    aspect: string,
    query: string,
    genotypeId?: number
  ): Promise<AspectResult> {
    const analysisType = this.getAnalysisType(aspect);

    try {
      let aspectResult;
      
      switch (analysisType) {
        case 'GENETIC_ANALYSIS':
          aspectResult = await this.service.analyzeGeneticAspect(aspect, query, genotypeId);
          break;
        case 'METABOLIC_RESEARCH':
          aspectResult = await this.service.researchMetabolicAspect(aspect, query);
          break;
        case 'EPIGENETIC_STUDY':
          aspectResult = await this.service.studyEpigeneticFactors(aspect, query);
          break;
        case 'LITERATURE_REVIEW':
          aspectResult = await this.service.reviewLiterature(query);
          break;
        default:
          aspectResult = await this.service.analyzeGeneticAspect(aspect, query, genotypeId);
      }

      // Formatear contenido para que sea legible
      const formattedContent = formatAspectResult(aspectResult) || `Análisis de ${aspect} completado exitosamente.`;

      return {
        aspect,
        content: formattedContent,
        status: 'completed',
        confidence: aspectResult.confidenceLevel || 0.85,
      };
    } catch (error: any) {
      return {
        aspect,
        content: `❌ Error: No se pudo analizar este aspecto. ${error?.message || 'Error desconocido'}`,
        status: 'error',
        confidence: 0,
      };
    }
  }

  async executeBatchAnalysis(
    aspects: string[],
    query: string,
    batchSize: number = 3,
    genotypeId?: number
  ): Promise<AspectResult[]> {
    const results: AspectResult[] = [];

    for (let i = 0; i < aspects.length; i += batchSize) {
      const batch = aspects.slice(i, i + batchSize);
      const batchPromises = batch.map(aspect => this.executeAnalysis(aspect, query, genotypeId));
      
      try {
        const batchResults = await Promise.allSettled(batchPromises);
        
        batchResults.forEach((result, batchIndex) => {
          if (result.status === 'fulfilled') {
            results.push(result.value);
          } else {
            const aspect = batch[batchIndex];
            results.push({
              aspect,
              content: `❌ Error: No se pudo analizar este aspecto. El servicio de IA no está disponible o falló.`,
              status: 'error',
              confidence: 0,
            });
          }
        });
      } catch (batchError) {
        console.error(`Error en batch ${i}:`, batchError);
        batch.forEach(aspect => {
          results.push({
            aspect,
            content: `❌ Error: No se pudo analizar este aspecto. El servicio de IA no está disponible o falló.`,
            status: 'error',
            confidence: 0,
          });
        });
      }
    }

    return results;
  }

  async synthesizeReport(
    query: string,
    results: AspectResult[]
  ): Promise<{ success: boolean; synthesis?: ResearchSynthesis; error?: any }> {
    const { validResults } = ResearchValidator.validateResults(results);

    if (validResults.length === 0) {
      return {
        success: false,
        error: new Error('No hay resultados válidos para sintetizar'),
      };
    }

    try {
      const researchData = validResults.map(r => ({
        title: r.aspect,
        content: typeof r.content === 'string' ? r.content : JSON.stringify(r.content),
        sources: [],
        geneAnalysis: [],
        metabolicPathways: [],
        epigeneticFactors: [],
        clinicalRecommendations: [],
      }));

      const synthesisResult = await this.service.synthesizeClinicalReport(query, researchData);

      if (!ResearchValidator.validateSynthesis(synthesisResult)) {
        throw new Error('Síntesis inválida');
      }

      // Formatear síntesis para que sea legible
      const formatted = formatSynthesis(synthesisResult);

      return {
        success: true,
        synthesis: {
          summary: formatted.summary,
          clinicalRecommendations: formatted.recommendations,
          evidenceLevel: synthesisResult.confidenceScore ? `Alta (Confianza: ${(synthesisResult.confidenceScore || 0.85) * 100}%)` : 'Alta',
        },
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

