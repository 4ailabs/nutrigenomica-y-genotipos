import type { ResearchPatientCase, GeneratedResearchPrompt, ResearchPromptHistory } from '../types';

const STORAGE_KEY = 'nutrigenomica_research_prompts';

export class ResearchPromptService {
    /**
     * Obtener historial completo desde localStorage
     */
    getHistory(): ResearchPromptHistory {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return {
                    cases: [],
                    prompts: [],
                    lastUpdated: new Date()
                };
            }
            
            const parsed = JSON.parse(stored);
            // Convertir strings de fecha a objetos Date
            return {
                cases: (parsed.cases || []).map((c: any) => ({
                    ...c,
                    timestamp: new Date(c.timestamp)
                })),
                prompts: (parsed.prompts || []).map((p: any) => ({
                    ...p,
                    timestamp: new Date(p.timestamp)
                })),
                lastUpdated: new Date(parsed.lastUpdated)
            };
        } catch (error) {
            console.error('[ResearchPromptService] Error al cargar historial:', error);
            return {
                cases: [],
                prompts: [],
                lastUpdated: new Date()
            };
        }
    }

    /**
     * Guardar historial completo en localStorage
     */
    private saveHistory(history: ResearchPromptHistory): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ...history,
                lastUpdated: new Date()
            }));
        } catch (error) {
            console.error('[ResearchPromptService] Error al guardar historial:', error);
            throw new Error('No se pudo guardar el historial. Verifica el espacio disponible en localStorage.');
        }
    }

    /**
     * Guardar un nuevo caso de paciente
     */
    saveCase(patientCase: ResearchPatientCase): void {
        const history = this.getHistory();
        
        // Verificar si ya existe un caso con el mismo ID
        const existingIndex = history.cases.findIndex(c => c.id === patientCase.id);
        
        if (existingIndex >= 0) {
            // Actualizar caso existente
            history.cases[existingIndex] = {
                ...patientCase,
                timestamp: new Date()
            };
        } else {
            // Agregar nuevo caso
            history.cases.push({
                ...patientCase,
                timestamp: new Date()
            });
        }
        
        this.saveHistory(history);
    }

    /**
     * Guardar un prompt generado
     */
    savePrompt(prompt: GeneratedResearchPrompt): void {
        const history = this.getHistory();
        
        history.prompts.push({
            ...prompt,
            timestamp: new Date()
        });
        
        this.saveHistory(history);
    }

    /**
     * Obtener un caso específico por ID
     */
    getCaseById(caseId: string): ResearchPatientCase | null {
        const history = this.getHistory();
        return history.cases.find(c => c.id === caseId) || null;
    }

    /**
     * Obtener todos los prompts de un caso específico
     */
    getPromptsByCaseId(caseId: string): GeneratedResearchPrompt[] {
        const history = this.getHistory();
        return history.prompts.filter(p => p.caseId === caseId);
    }

    /**
     * Eliminar un caso y todos sus prompts asociados
     */
    deleteCase(caseId: string): void {
        const history = this.getHistory();
        
        // Filtrar casos y prompts
        history.cases = history.cases.filter(c => c.id !== caseId);
        history.prompts = history.prompts.filter(p => p.caseId !== caseId);
        
        this.saveHistory(history);
    }

    /**
     * Eliminar un prompt específico
     */
    deletePrompt(promptId: string): void {
        const history = this.getHistory();
        history.prompts = history.prompts.filter(p => p.id !== promptId);
        this.saveHistory(history);
    }

    /**
     * Limpiar todo el historial
     */
    clearHistory(): void {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('[ResearchPromptService] Error al limpiar historial:', error);
        }
    }

    /**
     * Exportar historial como JSON
     */
    exportHistory(): string {
        const history = this.getHistory();
        return JSON.stringify(history, null, 2);
    }

    /**
     * Importar historial desde JSON
     */
    importHistory(jsonData: string): void {
        try {
            const imported = JSON.parse(jsonData);
            
            // Validar estructura básica
            if (!imported.cases || !Array.isArray(imported.cases)) {
                throw new Error('Formato inválido: falta el array de casos');
            }
            if (!imported.prompts || !Array.isArray(imported.prompts)) {
                throw new Error('Formato inválido: falta el array de prompts');
            }
            
            // Convertir fechas
            const history: ResearchPromptHistory = {
                cases: imported.cases.map((c: any) => ({
                    ...c,
                    timestamp: new Date(c.timestamp)
                })),
                prompts: imported.prompts.map((p: any) => ({
                    ...p,
                    timestamp: new Date(p.timestamp)
                })),
                lastUpdated: new Date()
            };
            
            this.saveHistory(history);
        } catch (error) {
            console.error('[ResearchPromptService] Error al importar historial:', error);
            throw new Error('No se pudo importar el historial. Verifica que el formato sea válido.');
        }
    }

    /**
     * Calcular IMC si hay altura y peso
     */
    calculateBMI(height?: string, weight?: string): number | null {
        if (!height || !weight) return null;
        
        const h = parseFloat(height);
        const w = parseFloat(weight);
        
        if (isNaN(h) || isNaN(w) || h === 0) return null;
        
        // IMC = peso (kg) / altura (m)²
        return parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));
    }
}

// Exportar instancia singleton
export const researchPromptService = new ResearchPromptService();

