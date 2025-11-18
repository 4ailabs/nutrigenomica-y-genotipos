import { NutrigenomicsTask } from '../services/NutrigenomicsResearchService';

export function determineResearchType(query: string): 'depth-first' | 'breadth-first' {
  const depthKeywords = ['caso clínico', 'paciente', 'polimorfismo', 'variante', 'gen', 'mthfr', 'apoe', 'cyp2c9', 'vkorc1'];
  const hasDepthKeywords = depthKeywords.some(keyword => query.toLowerCase().includes(keyword));
  return hasDepthKeywords ? 'depth-first' : 'breadth-first';
}

export function determineTask(query: string, researchType: 'depth-first' | 'breadth-first'): NutrigenomicsTask {
  if (query.toLowerCase().includes('mthfr') || query.toLowerCase().includes('polimorfismo')) {
    return 'GENETIC_ANALYSIS';
  } else if (query.toLowerCase().includes('metabolismo') || query.toLowerCase().includes('apoe')) {
    return 'METABOLIC_RESEARCH';
  } else if (query.toLowerCase().includes('epigenética') || query.toLowerCase().includes('obesidad')) {
    return 'EPIGENETIC_STUDY';
  } else if (query.toLowerCase().includes('warfarina') || query.toLowerCase().includes('farmacogenómica')) {
    return 'CLINICAL_SYNTHESIS';
  } else if (query.toLowerCase().includes('revisión') || query.toLowerCase().includes('literatura')) {
    return 'LITERATURE_REVIEW';
  } else {
    return researchType === 'depth-first' ? 'GENETIC_ANALYSIS' : 'LITERATURE_REVIEW';
  }
}

export function generateSubagents(query: string, researchType: 'depth-first' | 'breadth-first'): string[] {
  const baseSubagents = [
    "Genética Molecular",
    "Metabolismo Nutricional", 
    "Epigenética Aplicada",
    "Medicina Personalizada"
  ];
  
  if (researchType === 'depth-first') {
    return baseSubagents.slice(0, 3);
  } else {
    return [
      ...baseSubagents,
      "Literatura Reciente (2022-2025)",
      "Panorama Nutrigenómico",
      "Aplicaciones Clínicas",
      "Tendencias Emergentes",
      "Síntesis Integrativa"
    ];
  }
}

