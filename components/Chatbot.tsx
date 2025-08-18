import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponse } from '../utils/gemini';
import type { ChatMessage } from '../types';
import { SendHorizonal, Bot } from 'lucide-react';

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
            ? `¡Hola! Soy tu asistente para el Genotipo ${genotypeId}. ¿Cómo puedo ayudarte con tu plan de alimentación?`
            : "¡Hola! Soy tu asistente del programa GenoTipo. ¿En qué puedo ayudarte hoy?";
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
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fadeInUp">
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b bg-gray-50 rounded-t-2xl flex items-center gap-3">
                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Asistente IA</h3>
                    <p className="text-xs text-gray-500">Respondiendo como experto en GenoTipo</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                             <div className="prose prose-sm max-w-none text-inherit prose-p:my-1">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                           <div className="flex items-center gap-2">
                               <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                               <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                               <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t bg-white rounded-b-2xl">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe tu pregunta..."
                        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition">
                        <SendHorizonal size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;