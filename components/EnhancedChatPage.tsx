import React, { useState, useEffect, useRef } from 'react';
import { Send, Download, Upload, Trash2, MessageSquare, Settings, Brain } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import ChatSessionManager from './ChatSessionManager';
import { ChatMessage } from '../hooks/useChatStorage';

interface EnhancedChatPageProps {
  onBackToPortal: () => void;
  onNavigateToMain?: () => void;
  contextGenotypeId?: number | null;
}

const EnhancedChatPage: React.FC<EnhancedChatPageProps> = ({
  onBackToPortal,
  onNavigateToMain,
  contextGenotypeId
}) => {
  const {
    activeSession,
    activeSessionId,
    createSession,
    addMessage,
    setActiveSession
  } = useChat();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Crear sesión inicial si no hay ninguna activa
  useEffect(() => {
    if (!activeSessionId) {
      const sessionTitle = contextGenotypeId 
        ? `Consulta Genotipo ${contextGenotypeId}`
        : 'Nueva Consulta Nutrigenómica';
      
      const metadata = contextGenotypeId ? {
        genotypeId: contextGenotypeId,
        context: 'nutrigenomics',
        tags: ['nutrigenómica', 'consulta']
      } : {
        context: 'general',
        tags: ['consulta']
      };

      createSession(sessionTitle, metadata);
    }
  }, [activeSessionId, createSession, contextGenotypeId]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages]);

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeSessionId || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Agregar mensaje del usuario
    addMessage(activeSessionId, {
      role: 'user',
      content: userMessage,
      metadata: {
        genotypeId: contextGenotypeId,
        context: 'user_input'
      }
    });

    try {
      // Simular respuesta de IA (aquí puedes integrar con tu API real)
      const aiResponse = await generateAIResponse(userMessage, contextGenotypeId);
      
      // Agregar respuesta de la IA
      addMessage(activeSessionId, {
        role: 'assistant',
        content: aiResponse,
        metadata: {
          genotypeId: contextGenotypeId,
          context: 'ai_response'
        }
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Agregar mensaje de error
      addMessage(activeSessionId, {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo.',
        metadata: {
          context: 'error'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generar respuesta de IA (simulada)
  const generateAIResponse = async (message: string, genotypeId?: number | null): Promise<string> => {
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = message.toLowerCase();
    
    if (genotypeId) {
      // Respuestas específicas para genotipos
      if (lowerMessage.includes('alimento') || lowerMessage.includes('comida')) {
        return `Para el Genotipo ${genotypeId}, te recomiendo enfocarte en alimentos que optimicen tu metabolismo específico. ¿Te gustaría que te proporcione una lista detallada de alimentos recomendados?`;
      }
      
      if (lowerMessage.includes('ejercicio') || lowerMessage.includes('actividad')) {
        return `El Genotipo ${genotypeId} responde mejor a ejercicios de intensidad moderada y entrenamiento de resistencia. ¿Quieres que te explique más sobre las rutinas recomendadas?`;
      }
      
      return `Excelente pregunta sobre el Genotipo ${genotypeId}. Este genotipo tiene características metabólicas únicas que requieren un enfoque personalizado. ¿En qué aspecto específico te gustaría que profundice?`;
    }

    // Respuestas generales
    if (lowerMessage.includes('nutrigenómica') || lowerMessage.includes('genética')) {
      return 'La nutrigenómica es la ciencia que estudia cómo los genes influyen en la respuesta individual a los nutrientes. Cada persona tiene un perfil genético único que determina qué alimentos le benefician más.';
    }
    
    if (lowerMessage.includes('dieta') || lowerMessage.includes('nutrición')) {
      return 'La nutrición personalizada basada en genotipos es más efectiva que las dietas generales. Tu perfil genético determina cómo metabolizas carbohidratos, proteínas y grasas.';
    }
    
    if (lowerMessage.includes('salud') || lowerMessage.includes('bienestar')) {
      return 'La salud óptima se logra cuando la nutrición se alinea con tu genotipo. Esto puede mejorar tu energía, digestión, y respuesta inmune.';
    }

    return 'Gracias por tu consulta. Como asistente nutrigenómico, puedo ayudarte con información sobre nutrición personalizada, genotipos, y recomendaciones específicas. ¿En qué puedo ayudarte hoy?';
  };

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Seleccionar sesión
  const handleSessionSelect = (sessionId: string) => {
    setActiveSession(sessionId);
    setShowSessionManager(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToPortal}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Volver al Portal
              </button>
              
              {onNavigateToMain && (
                <button
                  onClick={onNavigateToMain}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  🏠 Inicio
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSessionManager(!showSessionManager)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Conversaciones
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panel lateral de sesiones */}
          <div className="lg:col-span-1">
            {showSessionManager && (
              <ChatSessionManager
                onSessionSelect={handleSessionSelect}
                className="sticky top-8"
              />
            )}
          </div>

          {/* Chat principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Header del chat */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Asistente IA Nutrigenómico</h2>
                    <p className="text-blue-100 text-sm">
                      {activeSession?.title || 'Nueva conversación'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {activeSession?.messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">¡Hola! Soy tu asistente nutrigenómico</h3>
                    <p className="text-sm">
                      Puedo ayudarte con consultas sobre nutrición personalizada, genotipos, y recomendaciones específicas.
                    </p>
                  </div>
                ) : (
                  activeSession?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input del mensaje */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu consulta nutrigenómica..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatPage;
