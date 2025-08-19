import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, Loader2, Copy, Download } from 'lucide-react';

interface SimpleMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  status?: 'processing' | 'completed' | 'error';
}

interface SimpleNutrigenomicsAgentProps {
  genotypeId?: number;
  genotypeColor: string;
}

const SimpleNutrigenomicsAgent: React.FC<SimpleNutrigenomicsAgentProps> = ({ 
  genotypeId, 
  genotypeColor 
}) => {
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubagents, setCurrentSubagents] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ejemplos de consultas especializadas
  const researchExamples = [
    {
      title: "Análisis de Polimorfismos MTHFR",
      query: "Investiga polimorfismos MTHFR C677T y A1298C, su impacto en metabolismo del folato, requerimientos de B12 y protocolo de suplementación.",
      type: "depth-first" as const
    },
    {
      title: "Metabolismo Lipídico y APOE",
      query: "Analiza variantes APOE, su efecto en metabolismo de colesterol, respuesta a omega-3 y diseño de dieta cardioprotectora.",
      type: "depth-first" as const
    },
    {
      title: "Epigenética en Obesidad",
      query: "Estudia modificaciones epigenéticas por dieta alta en grasas, impacto en genes de saciedad y estrategias de reversión.",
      type: "breadth-first" as const
    },
    {
      title: "Farmacogenómica de Warfarina",
      query: "Analiza polimorfismos CYP2C9 y VKORC1, interacciones con vitamina K dietética y protocolo de monitoreo nutricional.",
      type: "depth-first" as const
    }
  ];

  const simulateResearch = async (query: string, researchType: 'depth-first' | 'breadth-first') => {
    console.log("Iniciando investigación simulada...");
    
    const subagents = researchType === 'depth-first' 
      ? ["Genética Molecular", "Metabolismo Nutricional", "Epigenética Aplicada", "Medicina Personalizada", "Literatura Reciente"]
      : ["Panorama Nutrigenómico", "Aplicaciones Clínicas", "Tendencias Emergentes", "Síntesis Integrativa"];
    
    setCurrentSubagents(subagents);

    // Simular proceso de investigación
    for (let i = 0; i < subagents.length; i++) {
      console.log(`Procesando subagente ${i + 1}: ${subagents[i]}`);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subagentMessage: SimpleMessage = {
        id: `subagent-${Date.now()}-${i}`,
        type: 'agent',
        content: `🔬 **${subagents[i]}** completado\n\nAnálisis especializado finalizado con éxito.`,
        timestamp: new Date(),
        status: 'completed'
      };
      
      setMessages(prev => {
        console.log("Actualizando mensajes...");
        return [...prev, subagentMessage];
      });
    }

    // Generar respuesta final
    const finalResponse = `# 🧬 Investigación Nutrigenómica: ${query}

## 📋 Análisis Completado
- **Tipo de investigación:** ${researchType === 'depth-first' ? 'Profundidad (Depth-first)' : 'Amplitud (Breadth-first)'}
- **Subagentes desplegados:** ${subagents.length}
- **Estado:** Completado exitosamente

## 🔬 Resultados Principales

### Análisis Genético
- Polimorfismos identificados y su significancia funcional
- Vías metabólicas afectadas a nivel molecular
- Interacciones gen-nutriente específicas

### Recomendaciones Clínicas
- Estrategias nutricionales personalizadas
- Protocolos de seguimiento sugeridos
- Consideraciones de seguridad

### Evidencia Científica
- Estudios recientes (2020-2024)
- Nivel de evidencia: Moderado-Alto
- Aplicabilidad clínica: Directa

---
*Investigación completada por Agente Nutrigenómico*`;
    
    const finalMessage: SimpleMessage = {
      id: `final-${Date.now()}`,
      type: 'agent',
      content: finalResponse,
      timestamp: new Date(),
      status: 'completed'
    };

    console.log("Agregando mensaje final...");
    setMessages(prev => [...prev, finalMessage]);
    setCurrentSubagents([]);
    setIsProcessing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    console.log("Iniciando nueva consulta:", inputValue);

    const userMessage: SimpleMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    const researchType = inputValue.toLowerCase().includes('caso clínico') || 
                        inputValue.toLowerCase().includes('paciente') || 
                        inputValue.toLowerCase().includes('polimorfismo') 
                        ? 'depth-first' : 'breadth-first';
    
    const systemMessage: SimpleMessage = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: `🔄 Iniciando investigación **${researchType === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, systemMessage]);

    try {
      await simulateResearch(inputValue, researchType);
    } catch (error) {
      console.error("Error en investigación:", error);
      setIsProcessing(false);
      setCurrentSubagents([]);
    }
  };

  const handleExampleClick = async (example: typeof researchExamples[0]) => {
    if (isProcessing) return;

    console.log("Ejemplo seleccionado:", example.title);

    const userMessage: SimpleMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: example.query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    const systemMessage: SimpleMessage = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: `🔄 Iniciando investigación **${example.type === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, systemMessage]);

    try {
      await simulateResearch(example.query, example.type);
    } catch (error) {
      console.error("Error en investigación:", error);
      setIsProcessing(false);
      setCurrentSubagents([]);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const downloadReport = (message: SimpleMessage) => {
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
        </div>
        
        {currentSubagents.length > 0 && (
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Subagentes Activos:</div>
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
                <h5 className="font-semibold text-gray-800 mb-2">{example.title}</h5>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{example.query}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                  example.type === 'depth-first' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {example.type === 'depth-first' ? 'Profundidad' : 'Amplitud'}
                </span>
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
                ) : (
                  <Bot className="w-5 h-5 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  
                  {/* Botones de acción */}
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
          💡 Versión simplificada del agente de investigación nutrigenómica
        </div>
      </div>
    </div>
  );
};

export default SimpleNutrigenomicsAgent;