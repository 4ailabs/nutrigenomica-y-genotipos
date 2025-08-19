import { useCallback, useRef } from 'react';

export interface NavigationState {
  currentPage: string;
  previousPage: string | null;
  breadcrumbs: string[];
}

export const useNavigation = () => {
  const navigationHistory = useRef<string[]>(['landing']);
  const currentPageIndex = useRef(0);

  const navigateTo = useCallback((page: string) => {
    // Agregar la nueva página al historial
    navigationHistory.current = navigationHistory.current.slice(0, currentPageIndex.current + 1);
    navigationHistory.current.push(page);
    currentPageIndex.current = navigationHistory.current.length - 1;
    
    // Actualizar el historial del navegador
    window.history.pushState({ page, index: currentPageIndex.current }, '', `#${page}`);
    
    return page;
  }, []);

  const goBack = useCallback(() => {
    if (currentPageIndex.current > 0) {
      currentPageIndex.current--;
      const previousPage = navigationHistory.current[currentPageIndex.current];
      
      // Actualizar el historial del navegador
      window.history.go(-1);
      
      return previousPage;
    }
    return null;
  }, []);

  const goToMain = useCallback(() => {
    // Ir directamente al inicio, limpiando el historial
    navigationHistory.current = ['landing'];
    currentPageIndex.current = 0;
    
    // Actualizar el historial del navegador
    window.history.replaceState({ page: 'landing', index: 0 }, '', '#landing');
    
    return 'landing';
  }, []);

  const getBreadcrumbs = useCallback(() => {
    return navigationHistory.current.slice(0, currentPageIndex.current + 1);
  }, []);

  const getCurrentPage = useCallback(() => {
    return navigationHistory.current[currentPageIndex.current];
  }, []);

  const getPreviousPage = useCallback(() => {
    if (currentPageIndex.current > 0) {
      return navigationHistory.current[currentPageIndex.current - 1];
    }
    return null;
  }, []);

  return {
    navigateTo,
    goBack,
    goToMain,
    getBreadcrumbs,
    getCurrentPage,
    getPreviousPage,
    canGoBack: currentPageIndex.current > 0
  };
};
