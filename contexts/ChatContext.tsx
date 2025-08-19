import React, { createContext, useContext, ReactNode } from 'react';
import { useChatStorage, ChatMessage, ChatSession } from '../hooks/useChatStorage';

interface ChatContextType {
  // Estado del chat
  sessions: ChatSession[];
  activeSessionId: string | null;
  activeSession: ChatSession | null;
  
  // Acciones del chat
  createSession: (title: string, metadata?: ChatSession['metadata']) => string;
  addMessage: (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateSessionTitle: (sessionId: string, newTitle: string) => void;
  deleteSession: (sessionId: string) => void;
  setActiveSession: (sessionId: string | null) => void;
  clearAllSessions: () => void;
  
  // Utilidades
  exportConversations: () => void;
  importConversations: (file: File) => Promise<void>;
  searchConversations: (query: string) => ChatSession[];
  
  // Configuración
  maxSessions: number;
  maxMessagesPerSession: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chatStorage = useChatStorage();

  return (
    <ChatContext.Provider value={chatStorage}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
