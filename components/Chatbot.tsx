import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponse } from '../utils/gemini';
import type { ChatMessage } from '../types';
import { SendHorizonal, Bot, X, MessageCircle, Sparkles } from 'lucide-react';
import '../styles/chatbot.css';

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    contextGenotypeId: number | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, contextGenotypeId }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getInitialMessage = (genotypeId: number | null) => {
        return genotypeId
            ? `¡Hola! Soy tu asistente especializado en el **Genotipo ${genotypeId}**. 🧬\n\nPuedo ayudarte con:\n• Planes de alimentación personalizados\n• Recomendaciones nutricionales\n• Dudas sobre tu GenoTipo\n• Consejos de salud general\n\n¿En qué puedo ayudarte hoy?`
            : "¡Hola! Soy tu asistente del programa **GenoTipo** 🧬\n\nEstoy aquí para ayudarte con:\n• Información sobre GenoTipos\n• Nutrición personalizada\n• Dudas sobre el programa\n• Consejos de bienestar\n\n¿En qué puedo ayudarte hoy?";
    };

    useEffect(() => {
        // Reset chat when context changes or when opening
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
            const errorMessage: ChatMessage = { role: 'model', content: 'Lo siento, algo salió mal. Inténtalo de nuevo.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[75vh] max-h-[700px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 animate-fadeInUp border border-gray-100 chatbot-container">
            {/* Header Mejorado */}
            <div className="flex-shrink-0 p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl flex items-center justify-between chat-header">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Asistente IA</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full online-indicator"></div>
                            <p className="text-sm text-gray-600">En línea • Experto en GenoTipo</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200 close-button"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-sm px-5 py-3 rounded-2xl shadow-sm chat-message ${
                            msg.role === 'user' 
                                ? 'user-message text-white' 
                                : index === 0 ? 'bot-message initial-message' : 'bot-message'
                        }`}>
                            <div className="prose prose-sm max-w-none text-inherit chat-message-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Loading State Mejorado */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-sm px-5 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm bot-message">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full loading-dots"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full loading-dots"></div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full loading-dots"></div>
                                </div>
                                <span className="text-sm text-gray-600">Escribiendo...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area Mejorada */}
            <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white rounded-b-3xl chat-input-area">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Escribe tu pregunta sobre GenoTipo..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 pr-12 chat-input"
                            disabled={isLoading}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Sparkles size={16} className="text-gray-400" />
                        </div>
                    </div>
                    <button 
                        onClick={handleSend} 
                        disabled={isLoading || !input.trim()} 
                        className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-md send-button"
                    >
                        <SendHorizonal size={20} />
                    </button>
                </div>
                
                {/* Footer del Chat */}
                <div className="mt-4 text-center chat-footer">
                    <p className="text-xs text-gray-500">
                        💡 Tip: Puedes preguntar sobre nutrición, GenoTipos o planes alimenticios
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;