import React from 'react';
import { Bot, User, RefreshCw, Copy, FileText } from 'lucide-react';
import { Message } from '../../hooks/useResearchMessages';

interface ResearchMessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onCopyMessage: (content: string) => void;
  onShowReport?: () => void;
  hasReport?: boolean;
}

export const ResearchMessageList: React.FC<ResearchMessageListProps> = ({
  messages,
  messagesEndRef,
  onCopyMessage,
  onShowReport,
  hasReport = false,
}) => {
  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>Inicia una investigación para ver los resultados</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
              ) : message.type === 'system' ? (
                <RefreshCw className={`w-5 h-5 mt-1 flex-shrink-0 ${message.status === 'processing' ? 'animate-spin' : ''}`} />
              ) : (
                <Bot className="w-5 h-5 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
                
                {message.type === 'agent' && message.status === 'completed' && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onCopyMessage(message.content)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      Copiar
                    </button>
                    {hasReport && onShowReport && (
                      <button
                        onClick={onShowReport}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded text-xs text-purple-700 transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        Ver Reporte
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

