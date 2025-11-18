import { useEffect, useRef } from 'react';

interface UseAutosaveOptions<T> {
    data: T;
    onSave: (data: T) => void;
    interval?: number; // milliseconds
    key: string; // localStorage key
}

export function useAutosave<T>({ data, onSave, interval = 3000, key }: UseAutosaveOptions<T>) {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const lastSavedRef = useRef<string>('');

    useEffect(() => {
        // Cargar datos guardados al montar
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                const parsed = JSON.parse(saved);
                onSave(parsed);
            }
        } catch (error) {
            console.error('[useAutosave] Error loading saved data:', error);
        }
    }, [key]);

    useEffect(() => {
        // Limpiar timeout anterior
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const currentData = JSON.stringify(data);
        
        // No guardar si no ha cambiado
        if (currentData === lastSavedRef.current) {
            return;
        }

        // Establecer nuevo timeout para autoguardar
        timeoutRef.current = setTimeout(() => {
            try {
                localStorage.setItem(key, currentData);
                lastSavedRef.current = currentData;
                console.log('[useAutosave] Autoguardado:', key);
            } catch (error) {
                console.error('[useAutosave] Error saving data:', error);
            }
        }, interval);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, interval, key]);

    const clearAutosave = () => {
        try {
            localStorage.removeItem(key);
            lastSavedRef.current = '';
            console.log('[useAutosave] Borrador eliminado:', key);
        } catch (error) {
            console.error('[useAutosave] Error clearing autosave:', error);
        }
    };

    return { clearAutosave };
}

