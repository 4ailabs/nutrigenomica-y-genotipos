import { Message } from '../../hooks/useResearchMessages';

export class ResearchErrorHandler {
  static createErrorMessage(error: any, context: string): Omit<Message, 'id' | 'timestamp'> {
    const errorMsg = error?.message || error?.toString() || 'Error desconocido';
    
    const isQuotaError = errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('rate limit');
    const isModelError = errorMsg.includes('404') || errorMsg.includes('not found') || errorMsg.includes('is not found');
    const isAuthError = errorMsg.includes('401') || errorMsg.includes('403') || errorMsg.includes('API key');
    const isNetworkError = errorMsg.includes('fetch') || errorMsg.includes('network') || errorMsg.includes('timeout');

    let content = `❌ **Error: ${context}**\n\n`;
    
    if (isQuotaError) {
      content += `**Causa:** Cuota de API excedida.\n\n**Solución:**\n- Espera unos minutos\n- Verifica tu plan de Gemini API\n- Considera actualizar tu plan si es necesario\n\n`;
    } else if (isModelError) {
      content += `**Causa:** Modelo de IA no disponible.\n\n**Solución:**\n- El sistema intentará con modelos alternativos automáticamente\n- Verifica que tu API key tenga acceso a los modelos de Gemini\n\n`;
    } else if (isAuthError) {
      content += `**Causa:** Error de autenticación.\n\n**Solución:**\n- Verifica que VITE_GEMINI_API_KEY esté configurada correctamente\n- Verifica que la API key sea válida\n\n`;
    } else if (isNetworkError) {
      content += `**Causa:** Error de conexión.\n\n**Solución:**\n- Verifica tu conexión a internet\n- Intenta nuevamente en unos momentos\n\n`;
    } else {
      content += `**Causa:** ${errorMsg}\n\n**Solución:**\n- Verifica la configuración de la API\n- Si el problema persiste, contacta al administrador\n\n`;
    }

    content += `**No se generará un reporte sin análisis real con IA.**`;

    return {
      type: 'system' as const,
      content,
      status: 'error' as const,
    };
  }

  static isRecoverableError(error: any): boolean {
    const errorMsg = error?.message || error?.toString() || '';
    // Errores recuperables: modelo no encontrado (404), rate limit temporal
    return errorMsg.includes('404') || 
           errorMsg.includes('not found') || 
           (errorMsg.includes('429') && !errorMsg.includes('quota exceeded'));
  }
}

