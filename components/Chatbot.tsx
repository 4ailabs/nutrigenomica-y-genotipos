import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponse } from '../utils/gemini';
import type { ChatMessage } from '../types';
import { SendHorizonal, Bot, X, Copy, Check } from 'lucide-react';
import '../styles/chatbot.css';

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    contextGenotypeId: number | null;
    isIntegrated?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, contextGenotypeId, isIntegrated = false }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getInitialMessage = (genotypeId: number | null) => {
        const genotypeNames: { [key: number]: string } = {
            1: "Hunter",
            2: "Gatherer", 
            3: "Master",
            4: "Explorer",
            5: "Warrior",
            6: "Nomad"
        };
        
        if (genotypeId && genotypeNames[genotypeId]) {
            return `**Asistente Nutrigenómico Profesional**

**Contexto del Paciente**: GenoTipo ${genotypeId} (${genotypeNames[genotypeId]})

**Información disponible para presentar al paciente:**

📋 **Recomendaciones dietéticas específicas**
🧬 **Características genotípicas del ${genotypeNames[genotypeId]}**
⚠️ **Alimentos a evitar y superalimentos recomendados**
📊 **Comparativas con otros genotipos**
📝 **Información lista para explicar al paciente**

¿Qué información necesita generar para su paciente?`;
        }
        
        return `**Asistente Nutrigenómico Profesional**

**Sistema de 6 GenoTipos Nutricionales disponibles:**

• **GenoTipo 1 - Hunter** (Cazador)
• **GenoTipo 2 - Gatherer** (Recolector)
• **GenoTipo 3 - Master** (Maestro)
• **GenoTipo 4 - Explorer** (Explorador)
• **GenoTipo 5 - Warrior** (Guerrero)
• **GenoTipo 6 - Nomad** (Nómada)

**Capacidades del asistente:**
- Generar explicaciones para pacientes
- Crear listas de alimentos personalizadas
- Proporcionar fundamentos científicos
- Comparar perfiles genotípicos

¿Sobre qué genotipo necesita información para su paciente?`;
    };

    useEffect(() => {
        if (isOpen) {
            setMessages([{ role: 'model', content: getInitialMessage(contextGenotypeId) }]);
        }
    }, [contextGenotypeId, isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await generateChatResponse(newMessages, contextGenotypeId);
            const modelMessage: ChatMessage = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', content: 'Error. Inténtalo de nuevo.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyMessage = async (content: string, index: number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (!isOpen) return null;

    const containerClasses = isIntegrated 
        ? "w-full h-full bg-white border border-gray-200 flex flex-col"
        : "fixed bottom-24 right-6 w-full max-w-md h-[75vh] max-h-[700px] bg-white border border-gray-200 flex flex-col z-50";

    return (
        <div className={containerClasses}>
            {/* Header minimalista */}
            <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center text-white">
                        <Bot size={16} />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 text-sm">Asistente Nutrigenómico</h3>
                        <p className="text-xs text-gray-600">Uso Médico Profesional</p>
                    </div>
                </div>
                {!isIntegrated && (
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-6 h-6 text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-sm px-3 py-2 rounded-lg ${
                            msg.role === 'user' 
                                ? 'bg-gray-800 text-white' 
                                : 'bg-gray-100 text-gray-800'
                        } ${msg.role === 'model' ? 'relative group' : ''}`}>
                            <div className="text-sm">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                            </div>
                            {msg.role === 'model' && (
                                <button
                                    onClick={() => handleCopyMessage(msg.content, index)}
                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded p-1 shadow-sm border text-gray-600 hover:text-gray-800"
                                    title="Copiar para compartir con paciente"
                                >
                                    {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="px-3 py-2 rounded-lg bg-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 text-sm"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleSend} 
                        disabled={isLoading || !input.trim()} 
                        className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <SendHorizonal size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;