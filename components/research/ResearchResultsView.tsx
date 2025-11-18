import React from 'react';
import { Download, X, Info, CheckCircle, Target, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';

export interface AspectResult {
  aspect: string;
  content: string;
  status: 'completed' | 'error';
  confidence: number;
}

export interface ResearchResult {
  id: string;
  query: string;
  researchType: 'depth-first' | 'breadth-first';
  subagents: string[];
  results: AspectResult[];
  summary: string;
  recommendations: string[];
  evidenceLevel: string;
  timestamp: Date;
}

interface ResearchResultsViewProps {
  research: ResearchResult;
  onClose: () => void;
  onDownload: (research: ResearchResult) => void;
}

export const ResearchResultsView: React.FC<ResearchResultsViewProps> = ({
  research,
  onClose,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Reporte de Investigación</h2>
            <p className="text-green-100 mt-1">Resultados comprehensivos de la investigación nutrigenómica</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDownload(research)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Información General
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>Tipo:</strong> {research.researchType === 'depth-first' ? 'Profundidad' : 'Amplitud'}</p>
              <p><strong>Aspectos:</strong> {research.subagents.length}</p>
              <p><strong>Fecha:</strong> {research.timestamp.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Estado de la Investigación
            </h3>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>Nivel de Evidencia:</strong> {research.evidenceLevel}</p>
              <p><strong>Resultados:</strong> {research.results.length} aspectos analizados</p>
              <p><strong>Confianza:</strong> Alta</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Resumen Ejecutivo
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{research.summary}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Resultados por Aspecto ({research.results.length})
            </h3>
            <div className="text-sm text-gray-600">
              Alta confianza: {research.results.filter(r => r.confidence > 0.8).length} | 
              Media: {research.results.filter(r => r.confidence > 0.6 && r.confidence <= 0.8).length}
            </div>
          </div>
          <div className="space-y-3">
            {research.results.map((result, index) => {
              const contentPreview = typeof result.content === 'string' 
                ? result.content.substring(0, 300) + (result.content.length > 300 ? '...' : '')
                : JSON.stringify(result.content).substring(0, 300);
              
              return (
                <div key={index} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  result.status === 'completed' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{result.aspect}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{contentPreview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      {result.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        result.confidence > 0.8 ? 'bg-green-100 text-green-700' :
                        result.confidence > 0.6 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {(result.confidence * 100).toFixed(0)}% confianza
                      </span>
                    </div>
                  </div>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Ver análisis completo
                    </summary>
                    <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">
                        {typeof result.content === 'string' ? result.content : JSON.stringify(result.content, null, 2)}
                      </p>
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recomendaciones Clínicas
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-purple-700">
            {research.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

