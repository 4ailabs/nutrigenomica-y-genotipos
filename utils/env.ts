/**
 * Utilidad centralizada para acceder a variables de entorno
 * de forma segura y consistente en toda la aplicación
 */

/**
 * Obtiene una variable de entorno de forma segura
 * Funciona tanto en desarrollo (Vite) como en producción (Vercel)
 *
 * @param key - Nombre de la variable sin el prefijo VITE_
 * @param required - Si es true, lanza un error si la variable no existe
 * @returns El valor de la variable de entorno o undefined
 */
export function getEnvVariable(key: string, required: boolean = false): string | undefined {
  // En Vite, todas las variables deben tener el prefijo VITE_
  const viteKey = key.startsWith('VITE_') ? key : `VITE_${key}`;

  let value: string | undefined;

  // Intentar obtener la variable de diferentes fuentes en orden de prioridad
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // Desarrollo con Vite
    value = import.meta.env[viteKey] as string | undefined;
  }

  // Fallback para Node.js (si estamos en SSR o build time)
  if (!value && typeof process !== 'undefined' && process.env) {
    value = process.env[viteKey] || process.env[key];
  }

  // Si la variable es requerida y no se encontró, lanzar error en desarrollo
  if (required && !value) {
    const errorMsg = `Variable de entorno requerida no encontrada: ${viteKey}`;

    if (import.meta.env?.DEV) {
      throw new Error(errorMsg);
    } else {
      console.error(errorMsg);
    }
  }

  return value;
}

/**
 * Obtiene la API key de Gemini de forma segura
 * @returns La API key o undefined si no está configurada
 */
export function getGeminiApiKey(): string | undefined {
  return getEnvVariable('GEMINI_API_KEY', false);
}

/**
 * Verifica si estamos en modo desarrollo
 */
export function isDevelopment(): boolean {
  return import.meta.env?.DEV === true;
}

/**
 * Verifica si estamos en modo producción
 */
export function isProduction(): boolean {
  return import.meta.env?.PROD === true;
}

/**
 * Obtiene la URL base de la aplicación
 */
export function getAppUrl(): string {
  return getEnvVariable('APP_URL') || window.location.origin;
}

/**
 * Obtiene el nombre de la aplicación
 */
export function getAppName(): string {
  return getEnvVariable('APP_NAME') || 'Nutrigenómica y Genotipos';
}

/**
 * Obtiene la versión de la aplicación
 */
export function getAppVersion(): string {
  return getEnvVariable('APP_VERSION') || '1.0.0';
}

/**
 * Log de configuración de variables de entorno (solo en desarrollo)
 */
export function logEnvConfig(): void {
  if (isDevelopment()) {
    console.group('🔧 Configuración de Variables de Entorno');
    console.log('Modo:', import.meta.env.MODE);
    console.log('Desarrollo:', isDevelopment());
    console.log('Producción:', isProduction());
    console.log('App Name:', getAppName());
    console.log('App Version:', getAppVersion());
    console.log('App URL:', getAppUrl());
    console.log('Gemini API Key:', getGeminiApiKey() ? '✅ Configurada' : '❌ No configurada');
    console.groupEnd();
  }
}

export default {
  getEnvVariable,
  getGeminiApiKey,
  isDevelopment,
  isProduction,
  getAppUrl,
  getAppName,
  getAppVersion,
  logEnvConfig
};
