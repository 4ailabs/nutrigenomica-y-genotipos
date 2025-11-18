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
    return !!(
      synthesis &&
      synthesis.summary &&
      synthesis.clinicalRecommendations &&
      Array.isArray(synthesis.clinicalRecommendations) &&
      synthesis.clinicalRecommendations.length > 0
    );
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

