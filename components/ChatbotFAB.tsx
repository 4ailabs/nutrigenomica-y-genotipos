import React from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

interface ChatbotFABProps {
    isOpen: boolean;
    onClick: () => void;
}

const ChatbotFAB: React.FC<ChatbotFABProps> = ({ isOpen, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 z-50 group"
            aria-label={isOpen ? "Cerrar chat" : "Abrir chat de ayuda"}
        >
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Indicador de estado en línea */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            
            <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Icono de chat */}
                <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 scale-50 rotate-12' : 'opacity-100 scale-100 rotate-0'}`}>
                    <MessageCircle size={28} />
                </div>
                
                {/* Icono de cerrar */}
                <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`}>
                    <X size={28} />
                </div>
                
                {/* Icono de sparkles para hover - más sutil */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-1 -right-1">
                    <Sparkles size={14} className="text-blue-100" />
                </div>
            </div>
            
            {/* Tooltip - más sutil */}
            <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {isOpen ? "Cerrar chat" : "Chat de ayuda"}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
        </button>
    );
};

export default ChatbotFAB;
