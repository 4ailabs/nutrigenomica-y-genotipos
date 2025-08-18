import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Award, Clock, Download, Trash2 } from 'lucide-react';
import type { BiometricResult, GenotypeStrengthData } from '../types';
import { getGenotypeStrengthMeter } from '../genotypeStrengthData';

interface GenotypeStrengthHistoryProps {
    onLoadResult: (result: BiometricResult) => void;
    onDeleteResult: (genotypeId: number) => void;
}

const GenotypeStrengthHistory: React.FC<GenotypeStrengthHistoryProps> = ({ 
    onLoadResult, 
    onDeleteResult 
}) => {
    const [historyData, setHistoryData] = useState<GenotypeStrengthData | null>(null);
    const [selectedResult, setSelectedResult] = useState<BiometricResult | null>(null);

    // Cargar historial desde localStorage
    useEffect(() => {
        const loadHistory = () => {
            try {
                const savedData = localStorage.getItem('genotypeStrengthData');
                if (savedData) {
                    const parsedData: GenotypeStrengthData = JSON.parse(savedData);
                    setHistoryData(parsedData);
                }
            } catch (error) {
                console.error('Error al cargar historial:', error);
            }
        };

        loadHistory();
        // Escuchar cambios en localStorage
        window.addEventListener('storage', loadHistory);
        return () => window.removeEventListener('storage', loadHistory);
    }, []);

    // Función para obtener el nombre del genotipo
    const getGenotypeName = (genotypeId: number): string => {
        const meter = getGenotypeStrengthMeter(genotypeId);
        return meter ? meter.genotypeName : `Genotipo ${genotypeId}`;
    };

    // Función para obtener el color del genotipo
    const getGenotypeColor = (genotypeId: number): string => {
        const colors = {
            1: 'bg-red-100 text-red-800 border-red-200',
            2: 'bg-orange-100 text-orange-800 border-orange-200',
            3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            4: 'bg-green-100 text-green-800 border-green-200',
            5: 'bg-blue-100 text-blue-800 border-blue-200',
            6: 'bg-purple-100 text-purple-800 border-purple-200'
        };
        return colors[genotypeId as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Función para obtener el texto de la fuerza
    const getStrengthText = (percentage: number): string => {
        if (percentage >= 80) return 'Excelente';
        if (percentage >= 60) return 'Buena';
        if (percentage >= 40) return 'Regular';
        return 'Baja';
    };

    // Función para obtener el icono de la fuerza
    const getStrengthIcon = (percentage: number) => {
        if (percentage >= 80) return <Award className="w-4 h-4 text-green-600" />;
        if (percentage >= 60) return <TrendingUp className="w-4 h-4 text-yellow-600" />;
        if (percentage >= 40) return <TrendingUp className="w-4 h-4 text-orange-600" />;
        return <TrendingUp className="w-4 h-4 text-red-600" />;
    };

    // Función para formatear fecha
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Función para exportar resultado en PDF (simulado)
    const exportToPDF = (result: BiometricResult) => {
        // Aquí se implementaría la exportación real a PDF
        alert(`Exportando resultado del ${getGenotypeName(result.genotypeId)} a PDF...`);
    };

    // Función para eliminar resultado
    const handleDeleteResult = (genotypeId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este resultado?')) {
            onDeleteResult(genotypeId);
            // Actualizar estado local
            if (historyData) {
                const updatedResults = historyData.results.filter(r => r.genotypeId !== genotypeId);
                setHistoryData({
                    ...historyData,
                    results: updatedResults
                });
            }
        }
    };

    if (!historyData || historyData.results.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">Sin Historial</h3>
                <p className="text-gray-600">
                    Aún no has realizado evaluaciones de fuerza del genotipo.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header del Historial */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Historial de Evaluaciones
                    </h3>
                    <div className="text-sm text-gray-500">
                        {historyData.results.length} evaluación{historyData.results.length !== 1 ? 'es' : ''}
                    </div>
                </div>
                <p className="text-gray-600">
                    Última actualización: {formatDate(historyData.lastUpdated.toString())}
                </p>
            </div>

            {/* Lista de Resultados */}
            <div className="space-y-4">
                {historyData.results
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((result) => (
                        <div
                            key={`${result.genotypeId}-${result.timestamp}`}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-200"
                        >
                            {/* Header del Resultado */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getGenotypeColor(result.genotypeId)}`}>
                                            {getGenotypeName(result.genotypeId)}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getStrengthIcon(result.strengthPercentage)}
                                            <span className="text-sm font-medium text-gray-600">
                                                {getStrengthText(result.strengthPercentage)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {result.strengthPercentage}%
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {result.totalPoints} / {getGenotypeStrengthMeter(result.genotypeId)?.maxPoints || 37} pts
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detalles del Resultado */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-gray-700">
                                            {result.selectedMeasurements.length}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Características evaluadas
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-gray-700">
                                            {result.totalPoints}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Puntos totales
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-gray-700">
                                            {formatDate(result.timestamp.toString())}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Fecha de evaluación
                                        </div>
                                    </div>
                                </div>

                                {/* Barra de Progreso */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Fuerza del Genotipo</span>
                                        <span>{result.strengthPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${
                                                result.strengthPercentage >= 80 ? 'bg-green-500' :
                                                result.strengthPercentage >= 60 ? 'bg-yellow-500' :
                                                result.strengthPercentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${result.strengthPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Botones de Acción */}
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => onLoadResult(result)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Cargar Resultado
                                    </button>
                                    <button
                                        onClick={() => exportToPDF(result)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Exportar PDF
                                    </button>
                                    <button
                                        onClick={() => handleDeleteResult(result.genotypeId)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Estadísticas del Historial */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    Estadísticas del Historial
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {historyData.results.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total evaluaciones
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {Math.round(historyData.results.reduce((acc, r) => acc + r.strengthPercentage, 0) / historyData.results.length)}%
                        </div>
                        <div className="text-sm text-gray-600">
                            Promedio de fuerza
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {Math.max(...historyData.results.map(r => r.strengthPercentage))}%
                        </div>
                        <div className="text-sm text-gray-600">
                            Mejor resultado
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {new Set(historyData.results.map(r => r.genotypeId)).size}
                        </div>
                        <div className="text-sm text-gray-600">
                            Genotipos evaluados
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenotypeStrengthHistory;
