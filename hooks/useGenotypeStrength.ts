import { useState, useCallback, useMemo } from 'react';
import type { BiometricResult, GenotypeStrengthData } from '../types';
import { getGenotypeStrengthMeter } from '../genotypeStrengthData';

export const useGenotypeStrength = () => {
    const [selectedMeasurements, setSelectedMeasurements] = useState<Set<string>>(new Set());
    const [currentGenotypeId, setCurrentGenotypeId] = useState<number | null>(null);

    // Obtener el medidor de fuerza para el genotipo actual
    const currentMeter = useMemo(() => {
        if (!currentGenotypeId) return null;
        return getGenotypeStrengthMeter(currentGenotypeId);
    }, [currentGenotypeId]);

    // Calcular puntos totales
    const totalPoints = useMemo(() => {
        if (!currentMeter) return 0;
        
        return currentMeter.measurements
            .filter(measurement => selectedMeasurements.has(measurement.id))
            .reduce((total, measurement) => total + measurement.points, 0);
    }, [currentMeter, selectedMeasurements]);

    // Calcular porcentaje de fuerza
    const strengthPercentage = useMemo(() => {
        if (!currentMeter) return 0;
        return Math.round((totalPoints / currentMeter.maxPoints) * 100);
    }, [totalPoints, currentMeter]);

    // Alternar selección de una medición
    const toggleMeasurement = useCallback((measurementId: string) => {
        setSelectedMeasurements(prev => {
            const newSet = new Set(prev);
            if (newSet.has(measurementId)) {
                newSet.delete(measurementId);
            } else {
                newSet.add(measurementId);
            }
            return newSet;
        });
    }, []);

    // Seleccionar genotipo para evaluar
    const selectGenotype = useCallback((genotypeId: number) => {
        setCurrentGenotypeId(genotypeId);
        setSelectedMeasurements(new Set()); // Resetear selecciones
    }, []);

    // Limpiar todas las selecciones
    const clearSelections = useCallback(() => {
        setSelectedMeasurements(new Set());
    }, []);

    // Obtener resultado actual
    const getCurrentResult = useCallback((): BiometricResult | null => {
        if (!currentGenotypeId || !currentMeter) return null;

        return {
            genotypeId: currentGenotypeId,
            selectedMeasurements: Array.from(selectedMeasurements),
            totalPoints,
            strengthPercentage,
            timestamp: new Date()
        };
    }, [currentGenotypeId, currentMeter, selectedMeasurements, totalPoints, strengthPercentage]);

    // Guardar resultado (simulado - en implementación real se guardaría en base de datos)
    const saveResult = useCallback(async (): Promise<boolean> => {
        const result = getCurrentResult();
        if (!result) return false;

        try {
            // Aquí se implementaría la lógica para guardar en base de datos
            // Por ahora simulamos el guardado
            console.log('Resultado guardado:', result);
            
            // Guardar en localStorage como respaldo
            const existingData = localStorage.getItem('genotypeStrengthData');
            const parsedData: GenotypeStrengthData = existingData ? JSON.parse(existingData) : {
                results: [],
                lastUpdated: new Date()
            };

            // Actualizar o agregar resultado
            const existingIndex = parsedData.results.findIndex(r => r.genotypeId === result.genotypeId);
            if (existingIndex >= 0) {
                parsedData.results[existingIndex] = result;
            } else {
                parsedData.results.push(result);
            }

            parsedData.lastUpdated = new Date();
            localStorage.setItem('genotypeStrengthData', JSON.stringify(parsedData));

            return true;
        } catch (error) {
            console.error('Error al guardar resultado:', error);
            return false;
        }
    }, [getCurrentResult]);

    // Cargar resultado guardado
    const loadSavedResult = useCallback((genotypeId: number): BiometricResult | null => {
        try {
            const existingData = localStorage.getItem('genotypeStrengthData');
            if (!existingData) return null;

            const parsedData: GenotypeStrengthData = JSON.parse(existingData);
            const savedResult = parsedData.results.find(r => r.genotypeId === genotypeId);
            
            if (savedResult) {
                // Restaurar selecciones
                setSelectedMeasurements(new Set(savedResult.selectedMeasurements));
                return savedResult;
            }
        } catch (error) {
            console.error('Error al cargar resultado guardado:', error);
        }
        
        return null;
    }, []);

    return {
        // Estado
        selectedMeasurements,
        currentGenotypeId,
        currentMeter,
        
        // Valores calculados
        totalPoints,
        strengthPercentage,
        
        // Acciones
        toggleMeasurement,
        selectGenotype,
        clearSelections,
        getCurrentResult,
        saveResult,
        loadSavedResult,
        
        // Utilidades
        hasSelections: selectedMeasurements.size > 0,
        isComplete: currentMeter ? selectedMeasurements.size === currentMeter.measurements.length : false
    };
};
