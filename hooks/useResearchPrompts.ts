import { useState, useEffect, useCallback } from 'react';
import type { ResearchPatientCase, GeneratedResearchPrompt, ResearchPromptHistory } from '../types';
import { researchPromptService } from '../services/researchPromptService';
import { generateResearchPromptWithAI, generateCaseSummary } from '../utils/aiPromptGenerator';

export function useResearchPrompts() {
    const [cases, setCases] = useState<ResearchPatientCase[]>([]);
    const [prompts, setPrompts] = useState<GeneratedResearchPrompt[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar historial desde localStorage al montar
    useEffect(() => {
        try {
            const history = researchPromptService.getHistory();
            setCases(history.cases);
            setPrompts(history.prompts);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar el historial');
            setLoading(false);
            console.error('[useResearchPrompts] Error al cargar:', err);
        }
    }, []);

    /**
     * Guardar o actualizar un caso
     */
    const saveCase = useCallback((patientCase: ResearchPatientCase) => {
        try {
            // Calcular BMI si no está presente pero hay altura y peso
            if (!patientCase.bmi && patientCase.height && patientCase.weight) {
                patientCase.bmi = researchPromptService.calculateBMI(
                    patientCase.height,
                    patientCase.weight
                ) || undefined;
            }

            researchPromptService.saveCase(patientCase);
            
            // Recargar historial
            const history = researchPromptService.getHistory();
            setCases(history.cases);
            setError(null);
            
            return { success: true, message: 'Caso guardado correctamente' };
        } catch (err) {
            const errorMsg = 'Error al guardar el caso';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al guardar caso:', err);
            return { success: false, message: errorMsg };
        }
    }, []);

    /**
     * Eliminar un caso y sus prompts asociados
     */
    const deleteCase = useCallback((caseId: string) => {
        try {
            researchPromptService.deleteCase(caseId);
            
            // Recargar historial
            const history = researchPromptService.getHistory();
            setCases(history.cases);
            setPrompts(history.prompts);
            setError(null);
            
            return { success: true, message: 'Caso eliminado correctamente' };
        } catch (err) {
            const errorMsg = 'Error al eliminar el caso';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al eliminar caso:', err);
            return { success: false, message: errorMsg };
        }
    }, []);

    /**
     * Generar prompt para un caso usando IA
     */
    const generatePrompt = useCallback(async (
        patientCase: ResearchPatientCase,
        platform: 'gemini-deep-research' | 'claude'
    ) => {
        try {
            // Generar el texto del prompt con IA
            const result = await generateResearchPromptWithAI(patientCase, platform);
            
            if (!result.success || !result.prompt) {
                const errorMsg = result.error || 'Error al generar el prompt con IA';
                setError(errorMsg);
                return { success: false, prompt: null, message: errorMsg };
            }
            
            // Crear objeto de prompt
            const prompt: GeneratedResearchPrompt = {
                id: `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                caseId: patientCase.id,
                timestamp: new Date(),
                promptText: result.prompt,
                targetPlatform: platform,
                patientSummary: generateCaseSummary(patientCase)
            };
            
            // Guardar prompt
            researchPromptService.savePrompt(prompt);
            
            // Recargar historial
            const history = researchPromptService.getHistory();
            setPrompts(history.prompts);
            setError(null);
            
            return { success: true, prompt };
        } catch (err) {
            const errorMsg = 'Error al generar el prompt';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al generar prompt:', err);
            return { success: false, prompt: null, message: errorMsg };
        }
    }, []);

    /**
     * Obtener un caso por ID
     */
    const getCaseById = useCallback((caseId: string): ResearchPatientCase | null => {
        return researchPromptService.getCaseById(caseId);
    }, []);

    /**
     * Obtener prompts de un caso específico
     */
    const getPromptsByCaseId = useCallback((caseId: string): GeneratedResearchPrompt[] => {
        return researchPromptService.getPromptsByCaseId(caseId);
    }, []);

    /**
     * Eliminar un prompt específico
     */
    const deletePrompt = useCallback((promptId: string) => {
        try {
            researchPromptService.deletePrompt(promptId);
            
            // Recargar historial
            const history = researchPromptService.getHistory();
            setPrompts(history.prompts);
            setError(null);
            
            return { success: true, message: 'Prompt eliminado correctamente' };
        } catch (err) {
            const errorMsg = 'Error al eliminar el prompt';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al eliminar prompt:', err);
            return { success: false, message: errorMsg };
        }
    }, []);

    /**
     * Exportar historial como JSON
     */
    const exportHistory = useCallback(() => {
        try {
            const jsonData = researchPromptService.exportHistory();
            
            // Crear archivo para descargar
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nutrigenomica_research_history_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return { success: true, message: 'Historial exportado correctamente' };
        } catch (err) {
            const errorMsg = 'Error al exportar el historial';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al exportar:', err);
            return { success: false, message: errorMsg };
        }
    }, []);

    /**
     * Importar historial desde JSON
     */
    const importHistory = useCallback((jsonData: string) => {
        try {
            researchPromptService.importHistory(jsonData);
            
            // Recargar historial
            const history = researchPromptService.getHistory();
            setCases(history.cases);
            setPrompts(history.prompts);
            setError(null);
            
            return { success: true, message: 'Historial importado correctamente' };
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error al importar el historial';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al importar:', err);
            return { success: false, message: errorMsg };
        }
    }, []);

    /**
     * Limpiar todo el historial
     */
    const clearHistory = useCallback(() => {
        try {
            researchPromptService.clearHistory();
            setCases([]);
            setPrompts([]);
            setError(null);
            
            return { success: true, message: 'Historial limpiado correctamente' };
        } catch (err) {
            const errorMsg = 'Error al limpiar el historial';
            setError(errorMsg);
            console.error('[useResearchPrompts] Error al limpiar:', err);
            return { success: false, message: errorMsg };
        }
    }, []);

    /**
     * Limpiar errores
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        // Estado
        cases,
        prompts,
        loading,
        error,
        
        // Operaciones con casos
        saveCase,
        deleteCase,
        getCaseById,
        
        // Operaciones con prompts
        generatePrompt,
        getPromptsByCaseId,
        deletePrompt,
        
        // Gestión de historial
        exportHistory,
        importHistory,
        clearHistory,
        
        // Utilidades
        clearError
    };
}

