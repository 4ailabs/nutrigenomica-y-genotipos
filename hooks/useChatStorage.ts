import { useState, useEffect, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  metadata?: {
    genotypeId?: number;
    context?: string;
    tags?: string[];
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  metadata?: {
    genotypeId?: number;
    context?: string;
    tags?: string[];
  };
}

export interface ChatStorage {
  sessions: ChatSession[];
  activeSessionId: string | null;
  maxSessions: number;
  maxMessagesPerSession: number;
}

const STORAGE_KEY = 'nutrigenomics_chat_storage';
const DEFAULT_MAX_SESSIONS = 10;
const DEFAULT_MAX_MESSAGES = 100;

export const useChatStorage = () => {
  const [storage, setStorage] = useState<ChatStorage>({
    sessions: [],
    activeSessionId: null,
    maxSessions: DEFAULT_MAX_SESSIONS,
    maxMessagesPerSession: DEFAULT_MAX_MESSAGES
  });

  // Cargar storage desde localStorage al inicializar
  useEffect(() => {
    const loadStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setStorage(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Error loading chat storage:', error);
        // Si hay error, crear storage limpio
        setStorage(prev => ({
          ...prev,
          sessions: [],
          activeSessionId: null
        }));
      }
    };

    loadStorage();
  }, []);

  // Guardar storage en localStorage cuando cambie
  useEffect(() => {
    const saveStorage = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
      } catch (error) {
        console.error('Error saving chat storage:', error);
      }
    };

    saveStorage();
  }, [storage]);

  // Crear nueva sesión de chat
  const createSession = useCallback((title: string, metadata?: ChatSession['metadata']) => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      metadata
    };

    setStorage(prev => {
      const newSessions = [newSession, ...prev.sessions];
      
      // Limitar número de sesiones
      if (newSessions.length > prev.maxSessions) {
        newSessions.splice(prev.maxSessions);
      }

      return {
        ...prev,
        sessions: newSessions,
        activeSessionId: newSession.id
      };
    });

    return newSession.id;
  }, []);

  // Agregar mensaje a una sesión
  const addMessage = useCallback((sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    setStorage(prev => {
      const sessionIndex = prev.sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) return prev;

      const session = prev.sessions[sessionIndex];
      const newMessages = [...session.messages, newMessage];
      
      // Limitar número de mensajes por sesión
      if (newMessages.length > prev.maxMessagesPerSession) {
        newMessages.splice(0, newMessages.length - prev.maxMessagesPerSession);
      }

      const updatedSession = {
        ...session,
        messages: newMessages,
        updatedAt: Date.now()
      };

      const newSessions = [...prev.sessions];
      newSessions[sessionIndex] = updatedSession;

      return {
        ...prev,
        sessions: newSessions
      };
    });
  }, []);

  // Actualizar título de sesión
  const updateSessionTitle = useCallback((sessionId: string, newTitle: string) => {
    setStorage(prev => {
      const sessionIndex = prev.sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex === -1) return prev;

      const newSessions = [...prev.sessions];
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        title: newTitle,
        updatedAt: Date.now()
      };

      return {
        ...prev,
        sessions: newSessions
      };
    });
  }, []);

  // Eliminar sesión
  const deleteSession = useCallback((sessionId: string) => {
    setStorage(prev => {
      const newSessions = prev.sessions.filter(s => s.id !== sessionId);
      let newActiveSessionId = prev.activeSessionId;
      
      // Si se eliminó la sesión activa, activar la primera disponible
      if (prev.activeSessionId === sessionId) {
        newActiveSessionId = newSessions.length > 0 ? newSessions[0].id : null;
      }

      return {
        ...prev,
        sessions: newSessions,
        activeSessionId: newActiveSessionId
      };
    });
  }, []);

  // Cambiar sesión activa
  const setActiveSession = useCallback((sessionId: string | null) => {
    setStorage(prev => ({
      ...prev,
      activeSessionId: sessionId
    }));
  }, []);

  // Obtener sesión activa
  const getActiveSession = useCallback(() => {
    return storage.sessions.find(s => s.id === storage.activeSessionId) || null;
  }, [storage.sessions, storage.activeSessionId]);

  // Limpiar todas las sesiones
  const clearAllSessions = useCallback(() => {
    setStorage(prev => ({
      ...prev,
      sessions: [],
      activeSessionId: null
    }));
  }, []);

  // Exportar conversaciones
  const exportConversations = useCallback(() => {
    try {
      const dataStr = JSON.stringify(storage, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `nutrigenomics_chat_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting conversations:', error);
    }
  }, [storage]);

  // Importar conversaciones
  const importConversations = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          
          // Validar estructura
          if (imported.sessions && Array.isArray(imported.sessions)) {
            setStorage(prev => ({
              ...prev,
              sessions: imported.sessions,
              activeSessionId: imported.sessions.length > 0 ? imported.sessions[0].id : null
            }));
            resolve();
          } else {
            reject(new Error('Formato de archivo inválido'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Error leyendo archivo'));
      reader.readAsText(file);
    });
  }, []);

  // Buscar en conversaciones
  const searchConversations = useCallback((query: string) => {
    if (!query.trim()) return storage.sessions;
    
    const lowerQuery = query.toLowerCase();
    return storage.sessions.filter(session => {
      // Buscar en título
      if (session.title.toLowerCase().includes(lowerQuery)) return true;
      
      // Buscar en mensajes
      return session.messages.some(message => 
        message.content.toLowerCase().includes(lowerQuery)
      );
    });
  }, [storage.sessions]);

  return {
    // Estado
    sessions: storage.sessions,
    activeSessionId: storage.activeSessionId,
    activeSession: getActiveSession(),
    
    // Acciones
    createSession,
    addMessage,
    updateSessionTitle,
    deleteSession,
    setActiveSession,
    clearAllSessions,
    
    // Utilidades
    exportConversations,
    importConversations,
    searchConversations,
    
    // Configuración
    maxSessions: storage.maxSessions,
    maxMessagesPerSession: storage.maxMessagesPerSession
  };
};
