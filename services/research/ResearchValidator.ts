import { AspectResult } from './ResearchOrchestrator';

export class ResearchValidator {
  static validateSubagents(subagents: string[] | null | undefined): boolean {
    return !!(subagents && subagents.length > 0);
  }

  static validateResults(results: AspectResult[]): {
    isValid: boolean;
    validResults: AspectResult[];
    hasErrors: boolean;
  } {
    const validResults = results.filter(r => r.status === 'completed' && r.confidence > 0.5);
    const hasErrors = results.some(r => r.status === 'error');
    
    return {
      isValid: validResults.length > 0,
      validResults,
      hasErrors,
    };
  }

  static validateSynthesis(synthesis: any): boolean {
    if (!synthesis) return false;
    
    // Validar que tenga summary (puede ser string o array)
    const hasSummary = synthesis.summary && (
      (typeof synthesis.summary === 'string' && synthesis.summary.trim().length > 0) ||
      (Array.isArray(synthesis.summary) && synthesis.summary.length > 0)
    );
    
    // Validar que tenga clinicalRecommendations (puede ser string o array)
    const hasRecommendations = synthesis.clinicalRecommendations && (
      (typeof synthesis.clinicalRecommendations === 'string' && synthesis.clinicalRecommendations.trim().length > 0) ||
      (Array.isArray(synthesis.clinicalRecommendations) && synthesis.clinicalRecommendations.length > 0)
    );
    
    return !!(hasSummary && hasRecommendations);
  }

  static canGenerateReport(
    subagents: string[] | null | undefined,
    results: AspectResult[],
    synthesis: any
  ): { canGenerate: boolean; reason?: string } {
    if (!this.validateSubagents(subagents)) {
      return { canGenerate: false, reason: 'No hay aspectos de investigación válidos' };
    }

    const { isValid, validResults } = this.validateResults(results);
    if (!isValid) {
      return { canGenerate: false, reason: 'No hay resultados válidos de análisis' };
    }

    if (!this.validateSynthesis(synthesis)) {
      return { canGenerate: false, reason: 'No se pudo generar síntesis clínica' };
    }

    return { canGenerate: true };
  }
}

