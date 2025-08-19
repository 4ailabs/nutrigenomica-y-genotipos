import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Upload, 
  Trash2, 
  MessageSquare, 
  Clock, 
  Tag,
  MoreVertical,
  Edit3,
  X
} from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { ChatSession } from '../hooks/useChatStorage';

interface ChatSessionManagerProps {
  onSessionSelect: (sessionId: string) => void;
  className?: string;
}

const ChatSessionManager: React.FC<ChatSessionManagerProps> = ({ 
  onSessionSelect, 
  className = '' 
}) => {
  const {
    sessions,
    activeSessionId,
    createSession,
    deleteSession,
    updateSessionTitle,
    exportConversations,
    importConversations,
    searchConversations,
    clearAllSessions
  } = useChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [showImportInput, setShowImportInput] = useState(false);

  // Filtrar sesiones por búsqueda
  const filteredSessions = searchConversations(searchQuery);

  // Crear nueva sesión
  const handleCreateSession = () => {
    const sessionId = createSession('Nueva Conversación');
    onSessionSelect(sessionId);
  };

  // Iniciar edición de título
  const startEditTitle = (session: ChatSession) => {
    setEditingTitle(session.id);
    setNewTitle(session.title);
  };

  // Guardar título editado
  const saveTitle = (sessionId: string) => {
    if (newTitle.trim()) {
      updateSessionTitle(sessionId, newTitle.trim());
    }
    setEditingTitle(null);
    setNewTitle('');
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingTitle(null);
    setNewTitle('');
  };

  // Importar conversaciones
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importConversations(file);
        setShowImportInput(false);
      } catch (error) {
        alert('Error al importar: ' + error);
      }
    }
  };

  // Formatear fecha
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (days === 1) {
      return 'Ayer';
    } else if (days < 7) {
      return `Hace ${days} días`;
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Conversaciones
          </h3>
          <button
            onClick={handleCreateSession}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Nueva
          </button>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en conversaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={exportConversations}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            title="Exportar conversaciones"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          
          <button
            onClick={() => setShowImportInput(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            title="Importar conversaciones"
          >
            <Upload className="w-4 h-4" />
            Importar
          </button>

          {sessions.length > 0 && (
            <button
              onClick={clearAllSessions}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
              title="Limpiar todas las conversaciones"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar
            </button>
          )}
        </div>

        {/* Input de importación oculto */}
        {showImportInput && (
          <div className="mt-3">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={() => setShowImportInput(false)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Lista de sesiones */}
      <div className="max-h-96 overflow-y-auto">
        {filteredSessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? 'No se encontraron conversaciones' : 'No hay conversaciones aún'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  activeSessionId === session.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                }`}
                onClick={() => onSessionSelect(session.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Título editable */}
                    {editingTitle === session.id ? (
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-medium"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTitle(session.id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                        />
                        <button
                          onClick={() => saveTitle(session.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-700"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <h4 className="font-medium text-gray-900 mb-1 truncate">
                        {session.title}
                      </h4>
                    )}

                    {/* Metadatos */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(session.updatedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {session.messages.length} mensajes
                      </span>
                    </div>

                    {/* Tags */}
                    {session.metadata?.tags && session.metadata.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {session.metadata.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditTitle(session);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      title="Editar título"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                      title="Eliminar conversación"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer con estadísticas */}
      {sessions.length > 0 && (
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
          {filteredSessions.length} de {sessions.length} conversaciones
          {searchQuery && ` (filtradas por "${searchQuery}")`}
        </div>
      )}
    </div>
  );
};

export default ChatSessionManager;
