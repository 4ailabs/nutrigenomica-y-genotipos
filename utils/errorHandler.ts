/**
 * Utilidades para manejo de errores con retry automático
 */

export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  retryCondition?: (error: any) => boolean;
  onRetry?: (attempt: number, error: any) => void;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Determina si un error es de red y puede ser reintentado
 */
export const isRetryableError = (error: any): boolean => {
  // Errores de red
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  
  // Errores de timeout
  if (error?.name === 'TimeoutError' || error?.message?.includes('timeout')) {
    return true;
  }
  
  // Errores 5xx del servidor
  if (error?.statusCode >= 500 && error?.statusCode < 600) {
    return true;
  }
  
  // Errores 429 (Too Many Requests)
  if (error?.statusCode === 429) {
    return true;
  }
  
  return false;
};

/**
 * Espera un tiempo antes de reintentar (exponential backoff)
 */
const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Ejecuta una función con retry automático
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    retryCondition = isRetryableError,
    onRetry,
  } = options;

  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Si no es el último intento y el error es reintentable
      if (attempt < maxRetries && retryCondition(error)) {
        const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
        onRetry?.(attempt + 1, error);
        await wait(delay);
        continue;
      }
      
      // Si no es reintentable o se agotaron los intentos, lanzar error
      throw error;
    }
  }
  
  throw lastError;
}

/**
 * Obtiene un mensaje de error amigable para el usuario
 */
export const getErrorMessage = (error: any): string => {
  // Errores de red
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
  }
  
  // Errores de timeout
  if (error?.name === 'TimeoutError' || error?.message?.includes('timeout')) {
    return 'La solicitud tardó demasiado. Por favor, intenta de nuevo.';
  }
  
  // Errores de API
  if (error?.statusCode) {
    switch (error.statusCode) {
      case 400:
        return 'Solicitud inválida. Por favor, verifica los datos ingresados.';
      case 401:
        return 'No autorizado. Por favor, verifica tus credenciales.';
      case 403:
        return 'Acceso denegado. No tienes permisos para esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 429:
        return 'Demasiadas solicitudes. Por favor, espera un momento e intenta de nuevo.';
      case 500:
        return 'Error del servidor. Por favor, intenta más tarde.';
      case 503:
        return 'Servicio no disponible. Por favor, intenta más tarde.';
      default:
        return `Error del servidor (${error.statusCode}). Por favor, intenta de nuevo.`;
    }
  }
  
  // Errores de API key
  if (error?.message?.includes('API key') || error?.message?.includes('API_KEY')) {
    return 'Error de configuración. La clave de API no está configurada correctamente.';
  }
  
  // Errores de Gemini
  if (error?.message?.includes('Gemini') || error?.message?.includes('genai')) {
    return 'Error al comunicarse con el servicio de IA. Por favor, intenta de nuevo.';
  }
  
  // Error genérico
  if (error?.message) {
    return error.message;
  }
  
  return 'Ocurrió un error inesperado. Por favor, intenta de nuevo.';
};

/**
 * Log de errores (puede extenderse para enviar a un servicio de logging)
 */
export const logError = (error: any, context?: string) => {
  const errorInfo = {
    message: error?.message || 'Unknown error',
    stack: error?.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };
  
  console.error('Error logged:', errorInfo);
  
  // Aquí podrías enviar a un servicio de logging como Sentry
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { extra: errorInfo });
  // }
};

