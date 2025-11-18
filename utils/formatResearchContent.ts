/**
 * Formatea contenido de investigación para que sea legible y organizado
 */

export function formatResearchContent(content: any): string {
  if (!content) return '';

  // Si es string, devolverlo directamente
  if (typeof content === 'string') {
    // Si parece JSON, intentar parsearlo y formatearlo
    if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(content);
        return formatJSONContent(parsed);
      } catch {
        // Si no se puede parsear, devolver el string original
        return content;
      }
    }
    return content;
  }

  // Si es objeto, formatearlo
  if (typeof content === 'object') {
    return formatJSONContent(content);
  }

  return String(content);
}

function formatJSONContent(obj: any, depth: number = 0): string {
  if (obj === null || obj === undefined) return '';
  
  // Si es un array de strings, unirlos con saltos de línea
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '';
    
    // Si todos son strings, unirlos
    if (obj.every(item => typeof item === 'string')) {
      return obj.join('\n\n');
    }
    
    // Si son objetos, formatear cada uno
    return obj.map((item, index) => {
      if (typeof item === 'string') {
        return `${index + 1}. ${item}`;
      }
      return formatJSONContent(item, depth + 1);
    }).join('\n\n');
  }

  // Si es un objeto
  if (typeof obj === 'object') {
    const lines: string[] = [];
    
    // Priorizar campos importantes
    const priorityFields = ['content', 'summary', 'report', 'geneticProfile', 'metabolicAnalysis', 
                          'epigeneticFactors', 'clinicalRecommendations', 'description', 'text'];
    
    // Procesar campos prioritarios primero
    for (const field of priorityFields) {
      if (obj[field] !== undefined && obj[field] !== null) {
        const value = obj[field];
        if (typeof value === 'string' && value.trim()) {
          lines.push(value);
        } else if (Array.isArray(value)) {
          lines.push(formatJSONContent(value, depth + 1));
        } else if (typeof value === 'object') {
          lines.push(formatJSONContent(value, depth + 1));
        }
      }
    }
    
    // Procesar otros campos
    for (const [key, value] of Object.entries(obj)) {
      if (priorityFields.includes(key) || key === '_meta') continue;
      
      if (value !== undefined && value !== null) {
        if (typeof value === 'string' && value.trim()) {
          lines.push(`**${formatFieldName(key)}:** ${value}`);
        } else if (Array.isArray(value) && value.length > 0) {
          lines.push(`**${formatFieldName(key)}:**\n${formatJSONContent(value, depth + 1)}`);
        } else if (typeof value === 'object') {
          lines.push(`**${formatFieldName(key)}:**\n${formatJSONContent(value, depth + 1)}`);
        }
      }
    }
    
    return lines.join('\n\n');
  }

  return String(obj);
}

function formatFieldName(key: string): string {
  const fieldNames: { [key: string]: string } = {
    'content': 'Contenido',
    'summary': 'Resumen',
    'report': 'Reporte',
    'geneticProfile': 'Perfil Genético',
    'metabolicAnalysis': 'Análisis Metabólico',
    'epigeneticFactors': 'Factores Epigenéticos',
    'clinicalRecommendations': 'Recomendaciones Clínicas',
    'geneAnalysis': 'Análisis Genético',
    'metabolicInsights': 'Insights Metabólicos',
    'epigeneticFindings': 'Hallazgos Epigenéticos',
    'clinicalApplications': 'Aplicaciones Clínicas',
    'sources': 'Referencias',
    'confidenceLevel': 'Nivel de Confianza',
    'evidenceLevel': 'Nivel de Evidencia',
  };
  
  return fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Formatea un resultado de aspecto para mostrar de forma legible
 */
export function formatAspectResult(result: any): string {
  if (!result) return '';

  // Si ya es string formateado, devolverlo
  if (typeof result === 'string') {
    return result;
  }

  // Si es objeto, formatearlo
  if (typeof result === 'object') {
    const parts: string[] = [];

    // Contenido principal
    if (result.content) {
      parts.push(formatResearchContent(result.content));
    }

    // Análisis genético
    if (result.geneAnalysis && Array.isArray(result.geneAnalysis) && result.geneAnalysis.length > 0) {
      parts.push('## Análisis Genético\n');
      result.geneAnalysis.forEach((gene: any, index: number) => {
        if (typeof gene === 'object') {
          parts.push(`### ${gene.gene || `Gen ${index + 1}`}`);
          if (gene.polymorphism) parts.push(`**Polimorfismo:** ${gene.polymorphism}`);
          if (gene.function) parts.push(`**Función:** ${gene.function}`);
          if (gene.impact) parts.push(`**Impacto:** ${gene.impact}`);
          if (gene.alleleFrequency) parts.push(`**Frecuencia Alélica:** ${gene.alleleFrequency}`);
          if (gene.clinicalSignificance) parts.push(`**Significado Clínico:** ${gene.clinicalSignificance}`);
          parts.push('');
        }
      });
    }

    // Insights metabólicos
    if (result.metabolicInsights && Array.isArray(result.metabolicInsights) && result.metabolicInsights.length > 0) {
      parts.push('## Insights Metabólicos\n');
      result.metabolicInsights.forEach((insight: string, index: number) => {
        parts.push(`${index + 1}. ${insight}`);
      });
      parts.push('');
    }

    // Hallazgos epigenéticos
    if (result.epigeneticFindings && Array.isArray(result.epigeneticFindings) && result.epigeneticFindings.length > 0) {
      parts.push('## Hallazgos Epigenéticos\n');
      result.epigeneticFindings.forEach((finding: string, index: number) => {
        parts.push(`${index + 1}. ${finding}`);
      });
      parts.push('');
    }

    // Aplicaciones clínicas
    if (result.clinicalApplications && Array.isArray(result.clinicalApplications) && result.clinicalApplications.length > 0) {
      parts.push('## Aplicaciones Clínicas\n');
      result.clinicalApplications.forEach((app: string, index: number) => {
        parts.push(`${index + 1}. ${app}`);
      });
      parts.push('');
    }

    // Referencias
    if (result.sources && Array.isArray(result.sources) && result.sources.length > 0) {
      parts.push('## Referencias\n');
      result.sources.forEach((source: any, index: number) => {
        if (typeof source === 'object' && source.title) {
          parts.push(`${index + 1}. ${source.title}${source.uri ? ` - ${source.uri}` : ''}`);
        } else if (typeof source === 'string') {
          parts.push(`${index + 1}. ${source}`);
        }
      });
    }

    return parts.join('\n');
  }

  return String(result);
}

/**
 * Formatea síntesis clínica para mostrar de forma legible
 */
export function formatSynthesis(synthesis: any): { summary: string; recommendations: string[] } {
  if (!synthesis) {
    return { summary: '', recommendations: [] };
  }

  let summary = '';
  let recommendations: string[] = [];

  // Procesar summary
  if (synthesis.summary) {
    if (Array.isArray(synthesis.summary)) {
      summary = synthesis.summary.join('\n\n');
    } else if (typeof synthesis.summary === 'string') {
      summary = synthesis.summary;
    } else {
      summary = formatResearchContent(synthesis.summary);
    }
  }

  // Procesar recommendations
  if (synthesis.clinicalRecommendations) {
    if (Array.isArray(synthesis.clinicalRecommendations)) {
      recommendations = synthesis.clinicalRecommendations.map((rec: any) => {
        if (typeof rec === 'string') return rec;
        return formatResearchContent(rec);
      });
    } else if (typeof synthesis.clinicalRecommendations === 'string') {
      // Intentar parsear si es JSON string
      try {
        const parsed = JSON.parse(synthesis.clinicalRecommendations);
        if (Array.isArray(parsed)) {
          recommendations = parsed;
        } else {
          recommendations = [synthesis.clinicalRecommendations];
        }
      } catch {
        recommendations = [synthesis.clinicalRecommendations];
      }
    } else {
      recommendations = [formatResearchContent(synthesis.clinicalRecommendations)];
    }
  }

  // Si hay report, agregarlo al summary
  if (synthesis.report && typeof synthesis.report === 'string') {
    summary = synthesis.report;
  } else if (synthesis.report) {
    summary = formatResearchContent(synthesis.report);
  }

  // Si hay otros campos importantes, agregarlos
  const additionalFields: string[] = [];
  if (synthesis.geneticProfile) {
    additionalFields.push(`## Perfil Genético Integrado\n\n${formatResearchContent(synthesis.geneticProfile)}`);
  }
  if (synthesis.metabolicAnalysis) {
    additionalFields.push(`## Análisis Metabólico Conjunto\n\n${formatResearchContent(synthesis.metabolicAnalysis)}`);
  }
  if (synthesis.epigeneticFactors) {
    additionalFields.push(`## Factores Epigenéticos\n\n${formatResearchContent(synthesis.epigeneticFactors)}`);
  }

  if (additionalFields.length > 0) {
    summary = summary + '\n\n' + additionalFields.join('\n\n');
  }

  return { summary, recommendations };
}

