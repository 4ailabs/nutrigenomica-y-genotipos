import { useEffect, useCallback } from 'react';

interface UseBrowserNavigationProps {
    onBack?: () => void;
    onForward?: () => void;
    onRefresh?: () => void;
    enablePopState?: boolean;
}

export const useBrowserNavigation = ({
    onBack,
    onForward,
    onRefresh,
    enablePopState = true
}: UseBrowserNavigationProps = {}) => {
    
    // Función para ir hacia atrás
    const goBack = useCallback(() => {
        if (onBack) {
            onBack();
        } else {
            // Fallback: usar history.back() si no hay función personalizada
            if (window.history.length > 1) {
                window.history.back();
            }
        }
    }, [onBack]);

    // Función para ir hacia adelante
    const goForward = useCallback(() => {
        if (onForward) {
            onForward();
        } else {
            // Fallback: usar history.forward() si no hay función personalizada
            window.history.forward();
        }
    }, [onForward]);

    // Función para refrescar
    const refresh = useCallback(() => {
        if (onRefresh) {
            onRefresh();
        } else {
            // Fallback: usar location.reload() si no hay función personalizada
            window.location.reload();
        }
    }, [onRefresh]);

    // Función para navegar a una página específica
    const navigateTo = useCallback((page: string, replace: boolean = false) => {
        if (replace) {
            window.history.replaceState({ page }, '', `#${page}`);
        } else {
            window.history.pushState({ page }, '', `#${page}`);
        }
    }, []);

    // Función para obtener la página actual
    const getCurrentPage = useCallback(() => {
        return window.location.hash.slice(1) || 'landing';
    }, []);

    // Manejar eventos de popstate (botones atrás/siguiente del navegador)
    useEffect(() => {
        if (!enablePopState) return;

        const handlePopState = (event: PopStateEvent) => {
            // Safari puede disparar popstate en diferentes momentos
            // Verificar si realmente cambió la página
            const currentPage = getCurrentPage();
            const previousPage = event.state?.page || 'landing';
            
            if (currentPage !== previousPage) {
                // La página cambió, ejecutar la función correspondiente
                if (onBack && event.state?.direction === 'back') {
                    onBack();
                } else if (onForward && event.state?.direction === 'forward') {
                    onForward();
                }
            }
        };

        // Agregar listener para popstate
        window.addEventListener('popstate', handlePopState);

        // Limpiar listener
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [enablePopState, onBack, onForward, getCurrentPage]);

    // Función para configurar el historial inicial
    const setupHistory = useCallback((initialPage: string) => {
        if (window.history.state === null) {
            window.history.replaceState({ page: initialPage }, '', `#${initialPage}`);
        }
    }, []);

    // Función para limpiar el historial
    const clearHistory = useCallback(() => {
        // En Safari, es mejor usar replaceState para evitar problemas
        window.history.replaceState({ page: 'landing' }, '', '#landing');
    }, []);

    return {
        goBack,
        goForward,
        refresh,
        navigateTo,
        getCurrentPage,
        setupHistory,
        clearHistory
    };
};
