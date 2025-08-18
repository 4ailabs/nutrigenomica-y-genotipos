import { useState, useEffect } from 'react';

const PREMIUM_PASSWORD = 'nutrigenetica2024'; // Contraseña para funciones premium
const PREMIUM_SESSION_KEY = 'premium_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

interface PremiumSession {
  authenticated: boolean;
  timestamp: number;
}

export const usePremiumAuth = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPremiumSession();
  }, []);

  const checkPremiumSession = () => {
    try {
      const sessionData = localStorage.getItem(PREMIUM_SESSION_KEY);
      if (sessionData) {
        const session: PremiumSession = JSON.parse(sessionData);
        const now = Date.now();
        
        // Verificar si la sesión no ha expirado
        if (session.authenticated && (now - session.timestamp) < SESSION_DURATION) {
          setIsPremium(true);
        } else {
          // Limpiar sesión expirada
          localStorage.removeItem(PREMIUM_SESSION_KEY);
          setIsPremium(false);
        }
      }
    } catch (error) {
      console.error('Error checking premium session:', error);
      setIsPremium(false);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticatePremium = (password: string): boolean => {
    if (password === PREMIUM_PASSWORD) {
      const session: PremiumSession = {
        authenticated: true,
        timestamp: Date.now()
      };
      
      localStorage.setItem(PREMIUM_SESSION_KEY, JSON.stringify(session));
      setIsPremium(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(PREMIUM_SESSION_KEY);
    setIsPremium(false);
  };

  const getRemainingTime = (): number => {
    try {
      const sessionData = localStorage.getItem(PREMIUM_SESSION_KEY);
      if (sessionData) {
        const session: PremiumSession = JSON.parse(sessionData);
        const elapsed = Date.now() - session.timestamp;
        const remaining = SESSION_DURATION - elapsed;
        return Math.max(0, remaining);
      }
    } catch (error) {
      console.error('Error getting remaining time:', error);
    }
    return 0;
  };

  return {
    isPremium,
    isLoading,
    authenticatePremium,
    logout,
    getRemainingTime
  };
};