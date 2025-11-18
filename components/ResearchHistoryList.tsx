import React, { useState } from 'react';
import { Search, Download, Upload, Trash2, History, FolderOpen, AlertCircle } from 'lucide-react';
import type { ResearchPatientCase } from '../types';
import CaseCard from './CaseCard';

interface ResearchHistoryListProps {
    cases: ResearchPatientCase[];
    onViewCase: (caseItem: ResearchPatientCase) => void;
    onDeleteCase: (caseId: string) => void;
    onExport: () => void;
    onImport: (jsonData: string) => void;
    onClearHistory: () => void;
}

const ResearchHistoryList: React.FC<ResearchHistoryListProps> = ({
    cases,
    onViewCase,
    onDeleteCase,
    onExport,
    onImport,
    onClearHistory
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [importError, setImportError] = useState<string | null>(null);

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = event.target?.result as string;
                onImport(jsonData);
                setImportError(null);
            } catch (err) {
                setImportError('Error al leer el archivo. Verifica que sea un archivo JSON válido.');
            }
        };
        reader.onerror = () => {
            setImportError('Error al leer el archivo.');
        };
        reader.readAsText(file);

        // Reset input
        e.target.value = '';
    };

    const handleClearHistory = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar TODO el historial? Esta acción no se puede deshacer.')) {
            onClearHistory();
        }
    };

    // Filtrar casos por término de búsqueda
    const filteredCases = cases.filter(c => {
        const searchLower = searchTerm.toLowerCase();
        return (
            c.patientName?.toLowerCase().includes(searchLower) ||
            c.genotypeName?.toLowerCase().includes(searchLower) ||
            c.researchFocus?.toLowerCase().includes(searchLower) ||
            c.symptoms?.toLowerCase().includes(searchLower)
        );
    });

    // Ordenar por fecha más reciente
    const sortedCases = [...filteredCases].sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <History className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Historial de Casos</h2>
                        <p className="text-sm opacity-90">
                            {cases.length} caso{cases.length !== 1 ? 's' : ''} guardado{cases.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={onExport}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-all duration-200"
                        disabled={cases.length === 0}
                    >
                        <Download className="w-4 h-4" />
                        <span>Exportar</span>
                    </button>

                    <label className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Importar</span>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileImport}
                            className="hidden"
                        />
                    </label>

                    <button
                        onClick={handleClearHistory}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg font-medium transition-all duration-200"
                        disabled={cases.length === 0}
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Limpiar Todo</span>
                    </button>
                </div>
            </div>

            {/* Error de Importación */}
            {importError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-red-900">Error al importar</p>
                        <p className="text-sm text-red-700 mt-1">{importError}</p>
                    </div>
                </div>
            )}

            {/* Búsqueda */}
            {cases.length > 0 && (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, genotipo, síntomas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                        />
                    </div>
                    {searchTerm && (
                        <p className="text-sm text-gray-600 mt-2">
                            Mostrando {filteredCases.length} de {cases.length} casos
                        </p>
                    )}
                </div>
            )}

            {/* Lista de Casos */}
            {sortedCases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCases.map((caseItem) => (
                        <CaseCard
                            key={caseItem.id}
                            patientCase={caseItem}
                            onView={onViewCase}
                            onDelete={onDeleteCase}
                        />
                    ))}
                </div>
            ) : cases.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        No hay casos guardados
                    </h3>
                    <p className="text-gray-600">
                        Crea tu primer caso para comenzar a generar prompts de investigación.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        No se encontraron casos
                    </h3>
                    <p className="text-gray-600">
                        Intenta con otros términos de búsqueda.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResearchHistoryList;

