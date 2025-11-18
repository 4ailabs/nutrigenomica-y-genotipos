import { useState, useEffect, useCallback } from 'react';
import type { BodyMeasurements, BloodType, RhFactor, SecretorStatus, Sex } from '../types';

interface CalculatorData {
  measurements: Partial<BodyMeasurements>;
  bloodType: BloodType | null;
  rhFactor: RhFactor | null;
  secretorStatus: SecretorStatus | null;
  sex: Sex | null;
  lastSaved: number;
}

const STORAGE_KEY = 'nutrigenomics_calculator_data';
const STORAGE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 días

export const useCalculatorStorage = () => {
  const [data, setData] = useState<CalculatorData | null>(null);

  // Cargar datos al inicializar
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as CalculatorData;
          
          // Verificar si los datos no han expirado
          const now = Date.now();
          if (parsed.lastSaved && (now - parsed.lastSaved) < STORAGE_EXPIRY) {
            setData(parsed);
          } else {
            // Datos expirados, limpiar
            localStorage.removeItem(STORAGE_KEY);
            setData(null);
          }
        }
      } catch (error) {
        console.error('Error loading calculator data:', error);
        localStorage.removeItem(STORAGE_KEY);
        setData(null);
      }
    };

    loadData();
  }, []);

  // Guardar datos
  const saveData = useCallback((calculatorData: Omit<CalculatorData, 'lastSaved'>) => {
    try {
      const dataToSave: CalculatorData = {
        ...calculatorData,
        lastSaved: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      setData(dataToSave);
    } catch (error) {
      console.error('Error saving calculator data:', error);
      // Si hay error (por ejemplo, storage lleno), intentar limpiar datos viejos
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Error clearing storage:', e);
      }
    }
  }, []);

  // Limpiar datos
  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(null);
    } catch (error) {
      console.error('Error clearing calculator data:', error);
    }
  }, []);

  // Actualizar solo las mediciones
  const updateMeasurements = useCallback((measurements: Partial<BodyMeasurements>) => {
    const currentData = data || {
      measurements: {},
      bloodType: null,
      rhFactor: null,
      secretorStatus: null,
      sex: null,
      lastSaved: Date.now(),
    };

    saveData({
      ...currentData,
      measurements: { ...currentData.measurements, ...measurements },
    });
  }, [data, saveData]);

  // Actualizar tipo de sangre
  const updateBloodData = useCallback((
    bloodType: BloodType | null,
    rhFactor: RhFactor | null,
    secretorStatus: SecretorStatus | null,
    sex: Sex | null
  ) => {
    const currentData = data || {
      measurements: {},
      bloodType: null,
      rhFactor: null,
      secretorStatus: null,
      sex: null,
      lastSaved: Date.now(),
    };

    saveData({
      ...currentData,
      bloodType,
      rhFactor,
      secretorStatus,
      sex,
    });
  }, [data, saveData]);

  return {
    data,
    saveData,
    clearData,
    updateMeasurements,
    updateBloodData,
    hasData: data !== null,
  };
};

