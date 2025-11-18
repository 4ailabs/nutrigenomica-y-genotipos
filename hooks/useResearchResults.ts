import { useState, useCallback } from 'react';
import { ResearchResult, AspectResult } from '../components/research/ResearchResultsView';
import { ResearchSynthesis } from '../services/research/ResearchOrchestrator';

export function useResearchResults() {
  const [currentResearch, setCurrentResearch] = useState<ResearchResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const createResearchResult = useCallback((
    query: string,
    researchType: 'depth-first' | 'breadth-first',
    subagents: string[],
    results: AspectResult[],
    synthesis: ResearchSynthesis
  ): ResearchResult => {
    const summaryText = Array.isArray(synthesis.summary) 
      ? synthesis.summary.join('\n\n') 
      : synthesis.summary || '';

    const recommendations = Array.isArray(synthesis.clinicalRecommendations)
      ? synthesis.clinicalRecommendations
      : [synthesis.clinicalRecommendations];

    const validResults = results.filter(r => r.status === 'completed' && r.confidence > 0.5);

    return {
      id: `research-${Date.now()}`,
      query,
      researchType,
      subagents,
      results: validResults,
      summary: summaryText,
      recommendations,
      evidenceLevel: synthesis.evidenceLevel || `Alta (Análisis con IA - ${validResults.filter(r => r.confidence > 0.8).length}/${validResults.length} alta confianza)`,
      timestamp: new Date(),
    };
  }, []);

  const setResearch = useCallback((research: ResearchResult | null) => {
    setCurrentResearch(research);
    if (research) {
      setShowResults(true);
    }
  }, []);

  const clearResearch = useCallback(() => {
    setCurrentResearch(null);
    setShowResults(false);
  }, []);

  const generateReportContent = useCallback((research: ResearchResult): string => {
    return `# 🧬 Reporte de Investigación Nutrigenómica

## 📋 Información General
- **ID de Investigación:** ${research.id}
- **Consulta:** ${research.query}
- **Tipo de Investigación:** ${research.researchType === 'depth-first' ? 'Profundidad (Depth-first)' : 'Amplitud (Breadth-first)'}
- **Fecha:** ${research.timestamp.toLocaleDateString()}
- **Hora:** ${research.timestamp.toLocaleTimeString()}

## 📊 Resumen Ejecutivo
${research.summary}

## 🔬 Resultados por Aspecto
${research.results.map(result => `### ${result.aspect}
**Estado:** ${result.status === 'completed' ? '✅ Completado' : '⚠️ Con Limitaciones'}
**Confianza:** ${(result.confidence * 100).toFixed(0)}%

${result.content}

---`).join('\n\n')}

## 🎯 Recomendaciones Clínicas
${research.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

## 📈 Nivel de Evidencia
**Calidad:** ${research.evidenceLevel}

## 📚 Aspectos Analizados
${research.subagents.map((aspect, index) => `${index + 1}. ${aspect}`).join('\n')}

---
*Reporte generado por Agente de Investigación Nutrigenómica*
*Análisis basado en ${research.results.length} perspectivas científicas*`;
  }, []);

  const downloadReport = useCallback((research: ResearchResult) => {
    const reportContent = generateReportContent(research);
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrigenomics-research-${research.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateReportContent]);

  return {
    currentResearch,
    showResults,
    setShowResults,
    createResearchResult,
    setResearch,
    clearResearch,
    downloadReport,
  };
}

