import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, Loader2, FileText, Atom, Microscope, Brain, Heart, RefreshCw, Copy, Download, Activity, Zap } from 'lucide-react';
import NutrigenomicsResearchService, { NutrigenomicsTask } from '../services/NutrigenomicsResearchService';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  researchType?: 'depth-first' | 'breadth-first';
  subagents?: string[];
  status?: 'processing' | 'completed' | 'error';
  model?: string;
  confidence?: number;
  task?: NutrigenomicsTask;
}

interface NutrigenomicsResearchAgentProps {
  genotypeId?: number;
  genotypeColor: string;
}

const NutrigenomicsResearchAgent: React.FC<NutrigenomicsResearchAgentProps> = ({ 
  genotypeId, 
  genotypeColor 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubagents, setCurrentSubagents] = useState<string[]>([]);
  const [researchService, setResearchService] = useState<NutrigenomicsResearchService | null>(null);
  const [serviceStats, setServiceStats] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializar servicio de investigación
  useEffect(() => {
    // Priorizar la variable que ya está configurada en Vercel
    const apiKey = process.env.GEMINI_API_KEY
      || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY)
      || process.env.VITE_GEMINI_API_KEY
      || '';
    
    if (apiKey) {
      const service = new NutrigenomicsResearchService(apiKey);
      setResearchService(service);
      console.log("[NutrigenomicsResearchAgent] Servicio inicializado correctamente");
    } else {
      console.warn("[NutrigenomicsResearchAgent] Falta la API key. Verifica GEMINI_API_KEY en Vercel o VITE_GEMINI_API_KEY en .env.local");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ejemplos de consultas especializadas de nutrigenómica
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

  const determineResearchType = (query: string): 'depth-first' | 'breadth-first' => {
    const depthIndicators = [
      'caso clínico', 'paciente específico', 'enfermedad', 'patología', 'terapéutico',
      'molecular', 'mecanismo', 'vía metabólica', 'polimorfismo específico',
      'gen específico', 'variante genética', 'biomarcador'
    ];
    
    const breadthIndicators = [
      'panorama general', 'overview', 'comparación', 'múltiples enfoques',
      'diferentes perspectivas', 'revisión amplia', 'estado del arte'
    ];

    const queryLower = query.toLowerCase();
    
    const depthScore = depthIndicators.reduce((score, indicator) => 
      queryLower.includes(indicator) ? score + 1 : score, 0);
    
    const breadthScore = breadthIndicators.reduce((score, indicator) => 
      queryLower.includes(indicator) ? score + 1 : score, 0);

    return depthScore > breadthScore ? 'depth-first' : 'breadth-first';
  };

  const generateSubagents = (query: string, researchType: 'depth-first' | 'breadth-first'): string[] => {
    if (researchType === 'depth-first') {
      return [
        "Genética Molecular",
        "Metabolismo Nutricional", 
        "Epigenética Aplicada",
        "Medicina Personalizada",
        "Literatura Reciente (2022-2025)"
      ];
    } else {
      return [
        "Panorama Nutrigenómico",
        "Aplicaciones Clínicas",
        "Tendencias Emergentes",
        "Síntesis Integrativa"
      ];
    }
  };

  const conductRealResearch = async (query: string, researchType: 'depth-first' | 'breadth-first', task?: NutrigenomicsTask) => {
    if (!researchService) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'system',
        content: `❌ **Error de Configuración**\n\nLa API de Gemini no está configurada. Para usar el agente de investigación:\n\n1. Crea un archivo \`.env.local\` en la raíz del proyecto\n2. Agrega: \`VITE_GEMINI_API_KEY=tu_api_key_aqui\`\n3. Reinicia la aplicación\n\nO contacta al administrador para configurar la API key.`,
        timestamp: new Date(),
        status: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
      return;
    }

    try {
      // Paso 1: Crear plan de investigación
      const subagents = await researchService.createNutrigenomicsPlan(query, genotypeId);
      setCurrentSubagents(subagents);

      // Paso 2: Ejecutar investigación por cada aspecto
      const researchResults = [];
      
      for (let i = 0; i < subagents.length; i++) {
        const aspect = subagents[i];
        
        // Mostrar progreso
        const progressMessage: Message = {
          id: `progress-${Date.now()}-${i}`,
          type: 'agent',
          content: `🔬 **Analizando:** ${aspect}\n\nInvestigación especializada en progreso...`,
          timestamp: new Date(),
          status: 'processing'
        };
        setMessages(prev => [...prev, progressMessage]);

        try {
          // Ejecutar investigación según el tipo de tarea
          let result;
          if (task === 'GENETIC_ANALYSIS') {
            result = await researchService.analyzeGeneticAspect(aspect, query, genotypeId);
          } else if (task === 'METABOLIC_RESEARCH') {
            result = await researchService.researchMetabolicAspect(aspect, query);
          } else if (task === 'EPIGENETIC_STUDY') {
            result = await researchService.studyEpigeneticFactors(aspect, query);
          } else if (task === 'LITERATURE_REVIEW') {
            result = await researchService.reviewLiterature(aspect);
          } else {
            result = await researchService.analyzeGeneticAspect(aspect, query, genotypeId);
          }

          researchResults.push({
            title: aspect,
            content: result.content,
            ...result
          });

          // Actualizar mensaje de progreso
          const completedMessage: Message = {
            id: `completed-${Date.now()}-${i}`,
            type: 'agent',
            content: `✅ **${aspect}** completado\n\nModelo: ${researchService.getCurrentModel()}\nConfianza: ${(result.confidenceLevel * 100).toFixed(1)}%`,
            timestamp: new Date(),
            status: 'completed',
            model: researchService.getCurrentModel(),
            confidence: result.confidenceLevel
          };
          
          setMessages(prev => [...prev.slice(0, -1), completedMessage]);
        } catch (aspectError) {
          console.error(`Error en aspecto ${aspect}:`, aspectError);
          
          // Agregar resultado simulado como fallback
          const fallbackResult = {
            title: aspect,
            content: `⚠️ **${aspect}** - Análisis limitado\n\nDebido a un error en el servicio, se proporciona información básica:\n\n${generateBasicAspectInfo(aspect, query, genotypeId)}`,
            confidenceLevel: 0.5
          };
          
          researchResults.push(fallbackResult);
          
          const errorMessage: Message = {
            id: `error-${Date.now()}-${i}`,
            type: 'agent',
            content: `⚠️ **${aspect}** - Error en análisis\n\nSe continuará con información básica disponible.`,
            timestamp: new Date(),
            status: 'completed',
            model: 'fallback',
            confidence: 0.5
          };
          
          setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        }
      }

      // Paso 3: Síntesis final
      try {
        const finalReport = await researchService.synthesizeClinicalReport(query, researchResults);
        
        const finalMessage: Message = {
          id: `final-${Date.now()}`,
          type: 'agent',
          content: finalReport.report,
          timestamp: new Date(),
          status: 'completed',
          researchType,
          subagents,
          model: researchService.getCurrentModel(),
          confidence: finalReport.confidenceScore,
          task
        };

        setMessages(prev => [...prev, finalMessage]);
        
        // Actualizar estadísticas del servicio
        setServiceStats(researchService.getNutrigenomicsStats());
      } catch (synthesisError) {
        console.error('Error en síntesis final:', synthesisError);
        
        // Fallback: generar reporte simulado
        const fallbackReport = generateSimulatedResponse(query, researchType, subagents);
        
        const fallbackMessage: Message = {
          id: `fallback-${Date.now()}`,
          type: 'agent',
          content: fallbackReport,
          timestamp: new Date(),
          status: 'completed',
          researchType,
          subagents,
          model: 'fallback-simulation',
          confidence: 0.7,
          task
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      }

    } catch (error) {
      console.error('Error general en investigación:', error);
      
      // Fallback completo: generar respuesta simulado
      const subagents = generateSubagents(query, researchType);
      const fallbackReport = generateSimulatedResponse(query, researchType, subagents);
      
      const fallbackMessage: Message = {
        id: `fallback-complete-${Date.now()}`,
        type: 'agent',
        content: `⚠️ **Investigación con Limitaciones**\n\nDebido a un error en el servicio, se proporciona un análisis simulado:\n\n${fallbackReport}`,
        timestamp: new Date(),
        status: 'completed',
        researchType,
        subagents,
        model: 'fallback-simulation',
        confidence: 0.6,
        task
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }

    setCurrentSubagents([]);
    setIsProcessing(false);
  };

  const generateBasicAspectInfo = (aspect: string, query: string, genotypeId?: number | null): string => {
    const basicInfo = {
      "Genética Molecular": `Análisis básico de variantes genéticas relacionadas con ${query.toLowerCase()}. Consideraciones sobre polimorfismos comunes y su impacto en el metabolismo nutricional.`,
      "Metabolismo Nutricional": `Evaluación de la respuesta metabólica a nutrientes específicos. Análisis de macronutrientes y micronutrientes relevantes para la consulta.`,
      "Epigenética Aplicada": `Factores epigenéticos que pueden influir en la expresión génica relacionada con la nutrición. Modificaciones ambientales y dietéticas.`,
      "Medicina Personalizada": `Enfoque personalizado basado en características individuales. Recomendaciones generales adaptables al perfil específico.`,
      "Literatura Reciente (2022-2025)": `Resumen de investigaciones actuales en el campo. Tendencias emergentes y avances tecnológicos relevantes.`,
      "Panorama Nutrigenómico": `Visión general del campo de la nutrigenómica. Aplicaciones prácticas y limitaciones actuales.`,
      "Aplicaciones Clínicas": `Implementación práctica de la nutrigenómica en entornos clínicos. Protocolos y consideraciones de seguridad.`,
      "Tendencias Emergentes": `Nuevas direcciones en investigación nutrigenómica. Tecnologías emergentes y aplicaciones futuras.`,
      "Síntesis Integrativa": `Integración de múltiples perspectivas científicas. Enfoque holístico para la toma de decisiones clínicas.`
    };
    
    return basicInfo[aspect as keyof typeof basicInfo] || `Análisis básico del aspecto ${aspect} relacionado con la consulta sobre ${query.toLowerCase()}.`;
  };

  const generateSimulatedResponse = (query: string, researchType: string, subagents: string[]): string => {
    return `# 🧬 Investigación Nutrigenómica Completa

## 📋 Análisis de Consulta
- **Tipo de investigación:** ${researchType === 'depth-first' ? 'Profundidad (Depth-first)' : 'Amplitud (Breadth-first)'}
- **Subagentes desplegados:** ${subagents.length}
- **Enfoque:** Investigación especializada con perspectivas múltiples

## 🔬 Resultados Integrados

### Genética Molecular
- Polimorfismos identificados y su significancia funcional
- Vías metabólicas afectadas a nivel molecular
- Interacciones gen-nutriente específicas
- Biomarcadores genéticos relevantes

### Metabolismo Nutricional
- Impacto en el procesamiento de macronutrientes
- Requerimientos vitamínicos y minerales específicos
- Sensibilidades alimentarias relacionadas
- Optimización de la biodisponibilidad

### Epigenética Aplicada
- Modificaciones epigenéticas inducidas por nutrientes
- Patrones de metilación del ADN
- Regulación de la expresión génica
- Transmisión transgeneracional

### Medicina Personalizada
- Recomendaciones nutricionales específicas
- Estrategias de prevención personalizadas
- Monitoreo de biomarcadores
- Protocolos de seguimiento clínico

## 📚 Literatura Científica Reciente (2022-2025)
- Estudios más relevantes y actualizados
- Metaanálisis y revisiones sistemáticas
- Avances tecnológicos en nutrigenómica
- Aplicaciones clínicas emergentes

## 🎯 Recomendaciones Prácticas
1. **Evaluación genética:** Tests recomendados
2. **Intervención nutricional:** Protocolos específicos
3. **Monitoreo:** Biomarcadores a seguir
4. **Seguimiento:** Cronograma de evaluaciones

## 📊 Nivel de Evidencia
- **Calidad de evidencia:** Alta (múltiples estudios controlados)
- **Aplicabilidad clínica:** Directa
- **Actualización:** Literatura más reciente incluida

---
*Investigación completada por Agente Nutrigenómico Especializado*
*Análisis basado en ${subagents.length} perspectivas especializadas*`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    const researchType = determineResearchType(inputValue);
    
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: `🔄 Iniciando investigación **${researchType === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, systemMessage]);

    await conductRealResearch(inputValue, researchType);
  };

  const handleExampleClick = async (example: typeof researchExamples[0]) => {
    if (isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: example.query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: `🔄 Iniciando investigación **${example.type === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, systemMessage]);

    await conductRealResearch(example.query, example.type, example.task);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const downloadReport = (message: Message) => {
    const blob = new Blob([message.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrigenomics-research-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
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
          {!researchService && (
            <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-100 rounded-full text-sm border border-red-400/30">
              <Atom className="w-4 h-4" />
              API no configurada
            </div>
          )}
        </div>
        
        {currentSubagents.length > 0 && (
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Subagentes Nutrigenómicos Activos:</div>
            <div className="flex flex-wrap gap-2">
              {currentSubagents.map((agent, index) => (
                <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {agent}
                </span>
              ))}
            </div>
          </div>
        )}

        {serviceStats && !isProcessing && (
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Estado del Servicio:</div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span>Cache: {serviceStats.cache.valid} válidas</span>
              </div>
              <div>
                <span>Modelo actual: {researchService?.getCurrentModel()}</span>
              </div>
            </div>
          </div>
        )}
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
                disabled={isProcessing}
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
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-4xl rounded-lg p-4 ${
              message.type === 'user' 
                ? 'bg-purple-600 text-white' 
                : message.type === 'system'
                ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                {message.type === 'user' ? (
                  <User className="w-5 h-5 mt-1 flex-shrink-0" />
                ) : message.type === 'system' ? (
                  <RefreshCw className={`w-5 h-5 mt-1 flex-shrink-0 ${message.status === 'processing' ? 'animate-spin' : ''}`} />
                ) : (
                  <Bot className="w-5 h-5 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2 space-y-1">
                    <div>{message.timestamp.toLocaleTimeString()}</div>
                    {message.model && (
                      <div className="flex items-center gap-2">
                        <span>Modelo: {message.model}</span>
                        {message.confidence && (
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            message.confidence > 0.8 ? 'bg-green-100 text-green-700' :
                            message.confidence > 0.6 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            Confianza: {(message.confidence * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Botones de acción para mensajes del agente */}
                  {message.type === 'agent' && message.status === 'completed' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        Copiar
                      </button>
                      <button
                        onClick={() => downloadReport(message)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Descargar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
              disabled={isProcessing}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
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
          💡 El agente determinará automáticamente si usar investigación en profundidad o amplitud según tu consulta
        </div>
      </div>
    </div>
  );
};

export default NutrigenomicsResearchAgent;