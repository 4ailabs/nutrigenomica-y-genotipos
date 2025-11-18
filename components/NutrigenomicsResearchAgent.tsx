import React, { useState } from 'react';
import { Search, Send, Bot, Loader2, RefreshCw, Microscope, Heart, Activity, Zap, Brain } from 'lucide-react';
import { NutrigenomicsTask } from '../services/NutrigenomicsResearchService';
import { useResearchService } from '../hooks/useResearchService';
import { useResearchMessages } from '../hooks/useResearchMessages';
import { useResearchExecution } from '../hooks/useResearchExecution';
import { useResearchResults } from '../hooks/useResearchResults';
import { ResearchErrorHandler } from '../services/research/ResearchErrorHandler';
import { ResearchMessageList } from './research/ResearchMessageList';
import { ResearchResultsView } from './research/ResearchResultsView';
import { determineResearchType, generateSubagents } from '../utils/researchHelpers';

interface NutrigenomicsResearchAgentProps {
  genotypeId?: number;
  genotypeColor: string;
}

const NutrigenomicsResearchAgent: React.FC<NutrigenomicsResearchAgentProps> = ({ 
  genotypeId, 
  genotypeColor 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentQuery, setCurrentQuery] = useState<string>('');
  
  // Hooks personalizados
  const { service, hasService, error: serviceError } = useResearchService();
  const { messages, addMessage, clearMessages, messagesEndRef } = useResearchMessages();
  const { 
    isProcessing, 
    currentPlan, 
    results, 
    synthesis, 
    error: executionError,
    executeResearch,
    reset 
  } = useResearchExecution(service);
  const { 
    currentResearch, 
    showResults, 
    setShowResults,
    createResearchResult,
    setResearch,
    clearResearch,
    downloadReport 
  } = useResearchResults();

  // Ejemplos de consultas
  const researchExamples = [
    {
      title: "Análisis de Polimorfismos MTHFR",
      query: "Paciente con antecedentes familiares de hiperhomocisteinemia. Investiga polimorfismos MTHFR C677T y A1298C, su impacto en metabolismo del folato, requerimientos de B12 y folato, y protocolo de suplementación personalizada.",
      type: "depth-first" as const,
      icon: Microscope,
      task: 'GENETIC_ANALYSIS' as NutrigenomicsTask
    },
    {
      title: "Metabolismo Lipídico y Variantes APOE",
      query: "Evalúa un caso con dislipidemia familiar. Analiza variantes APOE (ε2/ε3/ε4), su efecto en metabolismo de colesterol y triglicéridos, respuesta a ácidos grasos omega-3, y diseño de dieta cardioprotectora personalizada.",
      type: "depth-first" as const,
      icon: Heart,
      task: 'METABOLIC_RESEARCH' as NutrigenomicsTask
    },
    {
      title: "Epigenética Nutricional en Obesidad",
      query: "Investigación en paciente con obesidad mórbida. Estudia modificaciones epigenéticas inducidas por dieta alta en grasas saturadas, impacto en genes de saciedad (LEP, LEPR), y estrategias nutricionales para revertir cambios epigenéticos.",
      type: "breadth-first" as const,
      icon: Activity,
      task: 'EPIGENETIC_STUDY' as NutrigenomicsTask
    },
    {
      title: "Farmacogenómica y Warfarina",
      query: "Paciente en tratamiento con warfarina. Analiza polimorfismos CYP2C9 y VKORC1, interacciones con vitamina K dietética, alimentos que afectan INR, y protocolo de monitoreo nutricional personalizado.",
      type: "depth-first" as const,
      icon: Zap,
      task: 'CLINICAL_SYNTHESIS' as NutrigenomicsTask
    },
    {
      title: "Revisión: Nutrigenómica en Diabetes T2",
      query: "Revisión sistemática de literature 2020-2024 sobre nutrigenómica en diabetes tipo 2. Enfócate en polimorfismos TCF7L2, FTO, PPARG, su relación con sensibilidad a insulina y respuesta a intervenciones nutricionales.",
      type: "breadth-first" as const,
      icon: Brain,
      task: 'LITERATURE_REVIEW' as NutrigenomicsTask
    }
  ];

  // Manejar envío de consulta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing || !hasService) return;

    const query = inputValue.trim();
    const researchType = determineResearchType(query);

    // Agregar mensaje de usuario
    addMessage({
      type: 'user',
      content: query,
      status: 'completed',
    });

    // Agregar mensaje de sistema
    addMessage({
      type: 'system',
      content: `Iniciando investigación **${researchType === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      status: 'processing',
      researchType,
    });

    setInputValue('');
    clearResearch();
    setCurrentQuery(query);
    
    // Resetear todas las referencias para evitar bloqueos
    reportCreatedRef.current = null;
    planMessageRef.current = null;
    errorMessageRef.current = null;

    // Ejecutar investigación
    const result = await executeResearch(query, researchType, genotypeId);

    // Los estados se actualizarán automáticamente en el hook
    // Usamos un efecto para crear el reporte cuando synthesis esté disponible
  };

  // Manejar ejemplo
  const handleExampleClick = async (example: typeof researchExamples[0]) => {
    if (isProcessing || !hasService) return;

    addMessage({
      type: 'user',
      content: example.query,
      status: 'completed',
    });

    addMessage({
      type: 'system',
      content: `🔄 Iniciando investigación **${example.type === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      status: 'processing',
      researchType: example.type,
    });

    clearResearch();
    setCurrentQuery(example.query);
    
    // Resetear todas las referencias para evitar bloqueos
    reportCreatedRef.current = null;
    planMessageRef.current = null;
    errorMessageRef.current = null;

    const result = await executeResearch(example.query, example.type, genotypeId);

    // El reporte se creará automáticamente cuando synthesis esté disponible (vía useEffect)
    if (!result.success) {
      const errorMsg = ResearchErrorHandler.createErrorMessage(
        result.error || new Error('Error desconocido'),
        'Error en la Investigación'
      );
      addMessage(errorMsg);
    }
  };

  // Prevenir mensaje de servicio duplicado
  const serviceErrorShownRef = React.useRef(false);

  // Mostrar mensaje de error de servicio si no está disponible
  React.useEffect(() => {
    if (serviceError && messages.length === 0 && !serviceErrorShownRef.current) {
      serviceErrorShownRef.current = true;
      addMessage({
        type: 'system',
        content: `**ADVERTENCIA: API Key No Configurada**\n\nPara usar la funcionalidad completa de IA:\n\n**En desarrollo local:** Crea un archivo .env.local con VITE_GEMINI_API_KEY=tu_api_key\n**En Vercel:** Configura la variable de entorno VITE_GEMINI_API_KEY\n\nSin la API configurada, no se pueden generar reportes de investigación personalizados.`,
        status: 'error',
      });
    } else if (!serviceError) {
      // Resetear cuando el servicio esté disponible
      serviceErrorShownRef.current = false;
    }
  }, [serviceError, messages.length, addMessage]);

  // Prevenir creación múltiple de reportes
  const reportCreatedRef = React.useRef<string | null>(null);

  // Crear reporte cuando synthesis esté disponible
  React.useEffect(() => {
    if (synthesis && currentPlan && results.length > 0 && !isProcessing && currentQuery) {
      const reportKey = `${currentQuery}-${currentPlan.subagents.join(',')}-${results.length}`;
      
      // Evitar crear el mismo reporte múltiples veces
      if (reportCreatedRef.current === reportKey) {
        return;
      }

      const researchResult = createResearchResult(
        currentQuery,
        currentPlan.researchType,
        currentPlan.subagents,
        results,
        synthesis
      );
      setResearch(researchResult);
      reportCreatedRef.current = reportKey;

      addMessage({
        type: 'agent',
        content: `**Investigación Completada**\n\n${results.filter(r => r.status === 'completed').length} aspectos analizados con IA\nNivel de evidencia: ${researchResult.evidenceLevel}\n${researchResult.recommendations.length} recomendaciones clínicas personalizadas\n\nHaz clic en "Ver Reporte" para acceder a los resultados detallados.`,
        status: 'completed',
        researchType: currentPlan.researchType,
        subagents: currentPlan.subagents,
      });
    }
  }, [synthesis, currentPlan, results, isProcessing, currentQuery, createResearchResult, setResearch, addMessage]);

  // Prevenir mensajes duplicados del plan
  const planMessageRef = React.useRef<string | null>(null);

  // Actualizar mensajes cuando cambia el plan
  React.useEffect(() => {
    if (currentPlan && isProcessing) {
      const planKey = `${currentPlan.subagents.join(',')}-${currentPlan.researchType}`;
      
      // Evitar mensajes duplicados
      if (planMessageRef.current === planKey) {
        return;
      }
      
      planMessageRef.current = planKey;
      addMessage({
        type: 'system',
        content: `**Plan de Investigación Creado**\n\nSe han identificado ${currentPlan.subagents.length} aspectos especializados para analizar:\n\n${currentPlan.subagents.map((aspect, index) => `${index + 1}. ${aspect}`).join('\n')}`,
        status: 'processing',
        researchType: currentPlan.researchType,
        subagents: currentPlan.subagents,
      });
    }
  }, [currentPlan, isProcessing, addMessage]);

  // Prevenir mensajes de error duplicados
  const errorMessageRef = React.useRef<string | null>(null);

  // Mostrar error si hay
  React.useEffect(() => {
    if (executionError && !isProcessing) {
      // Evitar mensajes de error duplicados
      if (errorMessageRef.current === executionError) {
        return;
      }
      
      errorMessageRef.current = executionError;
      const errorMsg = ResearchErrorHandler.createErrorMessage(
        new Error(executionError),
        'Error en la Investigación'
      );
      addMessage(errorMsg);
    }
  }, [executionError, isProcessing, addMessage]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Agente de Investigación */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white`}>
          <div className="flex items-center gap-4">
            <Bot className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">Agente de Investigación Nutrigenómica</h3>
              <p className="text-purple-100">
                Investigación especializada con múltiples perspectivas científicas
              </p>
            </div>
          </div>
          
          {/* Estado del Servicio */}
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">
              Estado del Servicio: {hasService ? 'Activo' : 'No Configurado'}
            </div>
            {!hasService && (
              <div className="text-xs text-yellow-200">
                Configura GEMINI_API_KEY en Vercel o VITE_GEMINI_API_KEY en .env.local
              </div>
            )}
            {currentPlan && currentPlan.subagents.length > 0 && (
              <>
                <div className="text-sm font-medium mt-2">Subagentes Nutrigenómicos Activos:</div>
                <div className="flex flex-wrap gap-2">
                  {currentPlan.subagents.map((subagent, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {subagent}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ejemplos de Consulta */}
        {messages.length === 0 && (
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Ejemplos de Investigación Especializada</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {researchExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  disabled={isProcessing || !hasService}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start gap-3">
                    <example.icon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">{example.title}</h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{example.query}</p>
                      <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                        example.type === 'depth-first' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {example.type === 'depth-first' ? 'Profundidad' : 'Amplitud'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="h-96 overflow-y-auto p-6">
          <ResearchMessageList
            messages={messages}
            messagesEndRef={messagesEndRef}
            onCopyMessage={(content) => navigator.clipboard.writeText(content)}
            onShowReport={() => setShowResults(true)}
            hasReport={!!currentResearch}
          />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe tu consulta nutrigenómica especializada..."
                disabled={isProcessing || !hasService}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing || !hasService}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isProcessing ? 'Investigando...' : 'Investigar'}
            </button>
          </form>
          
          <div className="mt-3 text-sm text-gray-500">
            El agente determinará automáticamente si usar investigación en profundidad o amplitud según tu consulta
            {!hasService && (
              <span className="text-amber-600 ml-2">
                Para funcionalidad completa, configura VITE_GEMINI_API_KEY
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Vista de Resultados */}
      {showResults && currentResearch && (
        <ResearchResultsView
          research={currentResearch}
          onClose={() => setShowResults(false)}
          onDownload={downloadReport}
        />
      )}
    </div>
  );
};

export default NutrigenomicsResearchAgent;

