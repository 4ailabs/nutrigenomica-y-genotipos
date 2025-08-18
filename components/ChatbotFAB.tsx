import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotFABProps {
    isOpen: boolean;
    onClick: () => void;
}

const ChatbotFAB: React.FC<ChatbotFABProps> = ({ isOpen, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 z-50"
            aria-label={isOpen ? "Cerrar chat" : "Abrir chat de ayuda"}
        >
            <div className="relative w-8 h-8 flex items-center justify-center">
                 <div className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                    <MessageCircle size={32} />
                </div>
                 <div className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <X size={32} />
                </div>
            </div>
        </button>
    );
};

export default ChatbotFAB;
