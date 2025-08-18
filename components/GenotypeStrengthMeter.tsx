import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle, Target, TrendingUp, Zap, Award, History, BarChart3, ArrowLeft } from 'lucide-react';
import { useGenotypeStrength } from '../hooks/useGenotypeStrength';
import { getAllGenotypeStrengthMeters } from '../genotypeStrengthData';
import GenotypeStrengthHistory from './GenotypeStrengthHistory';
import type { BiometricResult } from '../types';

interface GenotypeStrengthMeterProps {
    onResultChange?: (result: any) => void;
    onBackToPortal?: () => void;
}

const GenotypeStrengthMeter: React.FC<GenotypeStrengthMeterProps> = ({ onResultChange, onBackToPortal }) => {
    const [activeTab, setActiveTab] = useState<'meter' | 'history'>('meter');
    
    const {
        selectedMeasurements,
        currentGenotypeId,
        currentMeter,
        totalPoints,
        strengthPercentage,
        toggleMeasurement,
        selectGenotype,
        clearSelections,
        saveResult,
        loadSavedResult,
        loadResultFromHistory,
        deleteResult,
        hasSelections
    } = useGenotypeStrength();

    const allMeters = getAllGenotypeStrengthMeters();

    // Efecto para notificar cambios en el resultado
    useEffect(() => {
        if (onResultChange && currentMeter) {
            onResultChange({
                genotypeId: currentGenotypeId,
                totalPoints,
                strengthPercentage,
                hasSelections
            });
        }
    }, [onResultChange, currentGenotypeId, currentMeter, totalPoints, strengthPercentage, hasSelections]);

    // Función para obtener el color del genotipo
    const getGenotypeColor = (genotypeId: number): string => {
        const colors = {
            1: 'from-red-500 to-red-600',
            2: 'from-orange-500 to-orange-600',
            3: 'from-yellow-500 to-yellow-600',
            4: 'from-green-500 to-green-600',
            5: 'from-blue-500 to-blue-600',
            6: 'from-purple-500 to-purple-600'
        };
        return colors[genotypeId as keyof typeof colors] || 'from-gray-500 to-gray-600';
    };

    // Función para obtener el color de la barra de progreso
    const getProgressColor = (percentage: number): string => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        if (percentage >= 40) return 'bg-orange-500';
        return 'bg-red-500';
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
        if (percentage >= 80) return <Award className="w-6 h-6 text-green-600" />;
        if (percentage >= 60) return <TrendingUp className="w-6 h-6 text-yellow-600" />;
        if (percentage >= 40) return <Target className="w-6 h-6 text-orange-600" />;
        return <Zap className="w-6 h-6 text-red-600" />;
    };

    // Función para cargar resultado guardado
    const handleGenotypeSelect = (genotypeId: number) => {
        selectGenotype(genotypeId);
        loadSavedResult(genotypeId);
    };

    // Función para guardar resultado
    const handleSaveResult = async () => {
        const success = await saveResult();
        if (success) {
            alert('Resultado guardado exitosamente');
            setActiveTab('history');
        } else {
            alert('Error al guardar el resultado');
        }
    };

    // Función para cargar resultado del historial
    const handleLoadFromHistory = (result: BiometricResult) => {
        loadResultFromHistory(result);
        setActiveTab('meter');
    };

    // Función para eliminar resultado del historial
    const handleDeleteFromHistory = (genotypeId: number) => {
        const success = deleteResult(genotypeId);
        if (success) {
            alert('Resultado eliminado exitosamente');
        } else {
            alert('Error al eliminar el resultado');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header con Botón de Regreso */}
            <div className="relative mb-8">
                {onBackToPortal && (
                    <button
                        onClick={onBackToPortal}
                        className="absolute left-0 top-0 flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Regresar al Portal</span>
                    </button>
                    )}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Medidor de Fuerza del Genotipo
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Evalúa la fuerza de tu genotipo basado en características biométricas
                    </p>
                </div>
            </div>

            {/* Pestañas de Navegación */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('meter')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                            activeTab === 'meter'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="w-4 h-4" />
                            <span>Medidor</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                            activeTab === 'history'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <History className="w-4 h-4" />
                            <span>Historial</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Contenido de las Pestañas */}
            {activeTab === 'meter' && (
                <>
                    {/* Selector de Genotipo */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Selecciona tu Genotipo:
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {allMeters.map((meter) => (
                                <button
                                    key={meter.genotypeId}
                                    onClick={() => handleGenotypeSelect(meter.genotypeId)}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                                        currentGenotypeId === meter.genotypeId
                                            ? `border-2 bg-gradient-to-r ${getGenotypeColor(meter.genotypeId)} text-white shadow-lg`
                                            : 'border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-700'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-lg font-bold mb-1">
                                            {meter.genotypeName}
                                        </div>
                                        <div className="text-sm opacity-90">
                                            Máx: {meter.maxPoints} pts
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Medidor de Fuerza */}
                    {currentMeter && (
                        <div className="space-y-6">
                            {/* Información del Genotipo */}
                            <div className="bg-gradient-to-r p-6 rounded-lg text-white shadow-lg"
                                 style={{ background: `linear-gradient(135deg, ${getGenotypeColor(currentMeter.genotypeId).split(' ')[1]}, ${getGenotypeColor(currentMeter.genotypeId).split(' ')[3]})` }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">
                                            {currentMeter.genotypeName}
                                        </h3>
                                        <p className="text-lg opacity-90">
                                            Puntuación actual: {totalPoints} / {currentMeter.maxPoints} puntos
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold mb-1">
                                            {strengthPercentage}%
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStrengthIcon(strengthPercentage)}
                                            <span className="text-lg font-semibold">
                                                {getStrengthText(strengthPercentage)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Barra de Progreso */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Fuerza del Genotipo</span>
                                    <span>{strengthPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(strengthPercentage)}`}
                                        style={{ width: `${strengthPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Lista de Biomediciones */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Características Biométricas
                                    </h4>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={clearSelections}
                                            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                        >
                                            Limpiar
                                        </button>
                                        <button
                                            onClick={handleSaveResult}
                                            disabled={!hasSelections}
                                            className={`px-3 py-1 text-sm rounded transition-colors ${
                                                hasSelections
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    {currentMeter.measurements.map((measurement) => (
                                        <div
                                            key={measurement.id}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:border-blue-300 ${
                                                selectedMeasurements.has(measurement.id)
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                            }`}
                                            onClick={() => toggleMeasurement(measurement.id)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 mt-1">
                                                    {selectedMeasurements.has(measurement.id) ? (
                                                        <CheckCircle className="w-5 h-5 text-blue-600" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-800 font-medium">
                                                        {measurement.statement}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-sm text-gray-500">
                                                            Categoría: {measurement.category.replace('_', ' ')}
                                                        </span>
                                                        <span className="text-sm font-semibold text-blue-600">
                                                            +{measurement.points} puntos
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resumen de Resultados */}
                            {hasSelections && (
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                        Resumen de la Evaluación
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">
                                                {selectedMeasurements.size}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Características seleccionadas
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">
                                                {totalPoints}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Puntos totales
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">
                                                {strengthPercentage}%
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Fuerza del genotipo
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mensaje cuando no hay genotipo seleccionado */}
                    {!currentGenotypeId && (
                        <div className="text-center py-12 text-gray-500">
                            <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">
                                Selecciona un genotipo para comenzar la evaluación
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* Pestaña de Historial */}
            {activeTab === 'history' && (
                <GenotypeStrengthHistory
                    onLoadResult={handleLoadFromHistory}
                    onDeleteResult={handleDeleteFromHistory}
                />
            )}

            {/* Espacio adicional en la parte inferior para mejor navegación */}
            <div className="h-16 md:h-24"></div>

            {/* Footer de la Página */}
            <footer className="mt-16 border-t border-gray-200 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <Target className="w-6 h-6 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-800">
                                Sistema de Evaluación GenoTipo
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Herramienta profesional para la evaluación de fuerza del genotipo nutricional
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                            <span>© 2024 Nutrigenómica y GenoTipos</span>
                            <span>•</span>
                            <span>Sistema Médico Profesional</span>
                            <span>•</span>
                            <span>Evaluación Biométrica Avanzada</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GenotypeStrengthMeter;
