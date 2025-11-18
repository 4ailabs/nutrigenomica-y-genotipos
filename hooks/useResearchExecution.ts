import { useState, useCallback } from 'react';
import NutrigenomicsResearchService from '../services/NutrigenomicsResearchService';
import { ResearchOrchestrator, AspectResult, ResearchPlan, ResearchSynthesis } from '../services/research/ResearchOrchestrator';
import { ResearchValidator } from '../services/research/ResearchValidator';

export interface ResearchState {
  isProcessing: boolean;
  currentPlan: ResearchPlan | null;
  results: AspectResult[];
  synthesis: ResearchSynthesis | null;
  error: string | null;
}

export function useResearchExecution(service: NutrigenomicsResearchService | null) {
  const [state, setState] = useState<ResearchState>({
    isProcessing: false,
    currentPlan: null,
    results: [],
    synthesis: null,
    error: null,
  });

  const executeResearch = useCallback(async (
    query: string,
    researchType: 'depth-first' | 'breadth-first',
    genotypeId?: number
  ): Promise<{ success: boolean; error?: string }> => {
    if (!service) {
      setState(prev => ({
        ...prev,
        error: 'Servicio de IA no disponible',
        isProcessing: false,
      }));
      return { success: false, error: 'Servicio de IA no disponible' };
    }

    setState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
      currentPlan: null,
      results: [],
      synthesis: null,
    }));

    const orchestrator = new ResearchOrchestrator(service);

    try {
      // Paso 1: Crear plan
      const planResult = await orchestrator.createPlan(query, researchType, genotypeId);
      
      if (!planResult.success || !planResult.plan) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: 'No se pudo crear el plan de investigación',
        }));
        return { success: false, error: 'No se pudo crear el plan de investigación' };
      }

      setState(prev => ({
        ...prev,
        currentPlan: planResult.plan!,
      }));

      // Paso 2: Ejecutar análisis
      const results = await orchestrator.executeBatchAnalysis(
        planResult.plan.subagents,
        query,
        3, // batch size
        genotypeId
      );

      const { validResults } = ResearchValidator.validateResults(results);
      
      if (validResults.length === 0) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: 'No se pudieron obtener resultados válidos',
        }));
        return { success: false, error: 'No se pudieron obtener resultados válidos' };
      }

      setState(prev => ({
        ...prev,
        results,
      }));

      // Paso 3: Sintetizar reporte
      const synthesisResult = await orchestrator.synthesizeReport(query, results);
      
      if (!synthesisResult.success || !synthesisResult.synthesis) {
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: 'No se pudo generar síntesis clínica',
        }));
        return { success: false, error: 'No se pudo generar síntesis clínica' };
      }

      setState(prev => ({
        ...prev,
        synthesis: synthesisResult.synthesis!,
        isProcessing: false,
      }));

      return { success: true };
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error?.message || 'Error en la investigación',
      }));
      return { success: false, error: error?.message || 'Error en la investigación' };
    }
  }, [service]);

  const reset = useCallback(() => {
    setState({
      isProcessing: false,
      currentPlan: null,
      results: [],
      synthesis: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    executeResearch,
    reset,
  };
}

