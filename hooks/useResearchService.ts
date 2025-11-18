import { useState, useEffect } from 'react';
import NutrigenomicsResearchService from '../services/NutrigenomicsResearchService';
import { getGeminiApiKey } from '../utils/env';

export function useResearchService() {
  const [service, setService] = useState<NutrigenomicsResearchService | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const apiKey = getGeminiApiKey();
      
      if (apiKey) {
        const researchService = new NutrigenomicsResearchService(apiKey);
        setService(researchService);
        setIsInitialized(true);
        setError(null);
      } else {
        setError('API key no configurada');
        setIsInitialized(true);
      }
    } catch (err) {
      console.error('[useResearchService] Error al inicializar:', err);
      setError('Error al inicializar el servicio de investigación');
      setIsInitialized(true);
    }
  }, []);

  return { service, isInitialized, error, hasService: !!service };
}

