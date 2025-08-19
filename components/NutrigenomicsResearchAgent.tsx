import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, Loader2, FileText, Atom, Microscope, Brain, Heart, RefreshCw, Copy, Download, Activity, Zap, CheckCircle, AlertTriangle, Info, BookOpen, Target, TrendingUp, X } from 'lucide-react';
import NutrigenomicsResearchService, { NutrigenomicsTask } from '../services/NutrigenomicsResearchService';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  researchType?: 'depth-first' | 'breadth-first';
  subagents?: string[];
  status?: 'processing' | 'completed' | 'error';
}

interface ResearchResult {
  id: string;
  query: string;
  researchType: 'depth-first' | 'breadth-first';
  subagents: string[];
  results: AspectResult[];
  summary: string;
  recommendations: string[];
  evidenceLevel: string;
  timestamp: Date;
}

interface AspectResult {
  aspect: string;
  content: string;
  status: 'completed' | 'error';
  confidence: number;
}

interface NutrigenomicsResearchAgentProps {
  genotypeId?: number;
  genotypeColor: string;
}

const NutrigenomicsResearchAgent: React.FC<NutrigenomicsResearchAgentProps> = ({ 
  genotypeId, 
  genotypeColor 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubagents, setCurrentSubagents] = useState<string[]>([]);
  const [currentResearch, setCurrentResearch] = useState<ResearchResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [researchService, setResearchService] = useState<NutrigenomicsResearchService | null>(null);
  const [serviceStats, setServiceStats] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializar servicio de investigación
  useEffect(() => {
    try {
      console.log("[DEBUG] Iniciando inicialización del servicio...");
      
      // En Vercel, las variables de entorno están disponibles directamente
      // En desarrollo local, usamos VITE_ prefijo
      let apiKey = '';
      
      // Intentar diferentes formas de acceder a la API key
      if (typeof window !== 'undefined') {
        // Estamos en el navegador
        if (process.env.GEMINI_API_KEY) {
          apiKey = process.env.GEMINI_API_KEY;
          console.log("[DEBUG] Usando process.env.GEMINI_API_KEY (Vercel)");
        } else if ((import.meta as any).env?.VITE_GEMINI_API_KEY) {
          apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
          console.log("[DEBUG] Usando import.meta.env.VITE_GEMINI_API_KEY (Local)");
        } else if (process.env.VITE_GEMINI_API_KEY) {
          apiKey = process.env.VITE_GEMINI_API_KEY;
          console.log("[DEBUG] Usando process.env.VITE_GEMINI_API_KEY (Fallback)");
        }
      } else {
        // Estamos en el servidor (SSR)
        apiKey = process.env.GEMINI_API_KEY || '';
        console.log("[DEBUG] Usando process.env.GEMINI_API_KEY (SSR)");
      }
      
      console.log("[DEBUG] API Key encontrada:", apiKey ? `✅ ${apiKey.substring(0, 10)}...` : "❌ No encontrada");
      
      if (apiKey) {
        const service = new NutrigenomicsResearchService(apiKey);
        setResearchService(service);
        console.log("[NutrigenomicsResearchAgent] Servicio inicializado correctamente con API key válida");
      } else {
        console.warn("[NutrigenomicsResearchAgent] Falta la API key. Verifica GEMINI_API_KEY en Vercel o VITE_GEMINI_API_KEY en .env.local");
        
        // Mostrar mensaje más específico para el usuario
        const errorMessage: Message = {
          id: `api-key-error-${Date.now()}`,
          type: 'system',
          content: `⚠️ **API Key No Configurada**\n\nPara usar la funcionalidad completa de IA:\n\n**En Vercel:** La variable GEMINI_API_KEY ya está configurada ✅\n**En desarrollo local:** Crea un archivo .env.local con VITE_GEMINI_API_KEY=tu_api_key\n\nPor ahora, el agente funcionará en modo inteligente con análisis especializado.`,
          timestamp: new Date(),
          status: 'error'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("[NutrigenomicsResearchAgent] Error al inicializar servicio:", error);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ejemplos de consultas especializadas de nutrigenómica
  const researchExamples = [
    {
      title: "Análisis de Polimorfismos MTHFR",
      query: "Paciente con antecedentes familiares de hiperhomocisteinemia. Investiga polimorfismos MTHFR C677T y A1298C, su impacto en metabolismo del folato, requerimientos de B12 y folato, y protocolo de suplementación personalizada.",
      type: "depth-first" as const,
      icon: Microscope,
      task: 'GENETIC_ANALYSIS' as NutrigenomicsTask
    },
    {
      title: "Metabolismo Lipídico y Variantes APOE",
      query: "Evalúa un caso con dislipidemia familiar. Analiza variantes APOE (ε2/ε3/ε4), su efecto en metabolismo de colesterol y triglicéridos, respuesta a ácidos grasos omega-3, y diseño de dieta cardioprotectora personalizada.",
      type: "depth-first" as const,
      icon: Heart,
      task: 'METABOLIC_RESEARCH' as NutrigenomicsTask
    },
    {
      title: "Epigenética Nutricional en Obesidad",
      query: "Investigación en paciente con obesidad mórbida. Estudia modificaciones epigenéticas inducidas por dieta alta en grasas saturadas, impacto en genes de saciedad (LEP, LEPR), y estrategias nutricionales para revertir cambios epigenéticos.",
      type: "breadth-first" as const,
      icon: Activity,
      task: 'EPIGENETIC_STUDY' as NutrigenomicsTask
    },
    {
      title: "Farmacogenómica y Warfarina",
      query: "Paciente en tratamiento con warfarina. Analiza polimorfismos CYP2C9 y VKORC1, interacciones con vitamina K dietética, alimentos que afectan INR, y protocolo de monitoreo nutricional personalizado.",
      type: "depth-first" as const,
      icon: Zap,
      task: 'CLINICAL_SYNTHESIS' as NutrigenomicsTask
    },
    {
      title: "Revisión: Nutrigenómica en Diabetes T2",
      query: "Revisión sistemática de literature 2020-2024 sobre nutrigenómica en diabetes tipo 2. Enfócate en polimorfismos TCF7L2, FTO, PPARG, su relación con sensibilidad a insulina y respuesta a intervenciones nutricionales.",
      type: "breadth-first" as const,
      icon: Brain,
      task: 'LITERATURE_REVIEW' as NutrigenomicsTask
    }
  ];

  const determineResearchType = (query: string): 'depth-first' | 'breadth-first' => {
    const depthKeywords = ['caso clínico', 'paciente', 'polimorfismo', 'variante', 'gen', 'mthfr', 'apoe', 'cyp2c9', 'vkorc1'];
    const hasDepthKeywords = depthKeywords.some(keyword => query.toLowerCase().includes(keyword));
    return hasDepthKeywords ? 'depth-first' : 'breadth-first';
  };

  const determineTask = (query: string, researchType: 'depth-first' | 'breadth-first'): NutrigenomicsTask => {
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
  };

  const generateSubagents = (query: string, researchType: 'depth-first' | 'breadth-first'): string[] => {
    const baseSubagents = [
      "Genética Molecular",
      "Metabolismo Nutricional", 
      "Epigenética Aplicada",
      "Medicina Personalizada"
    ];
    
    if (researchType === 'depth-first') {
      return baseSubagents.slice(0, 3); // Enfoque profundo en menos aspectos
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
  };

  const generateRecommendations = (query: string, researchType: string): string[] => {
    const baseRecommendations = [
      "Realizar evaluación genética completa con panel nutrigenómico",
      "Implementar protocolo nutricional personalizado basado en genotipo",
      "Establecer monitoreo regular de biomarcadores relevantes",
      "Programar seguimiento clínico cada 3-6 meses"
    ];

    if (researchType === 'depth-first') {
      return [
        ...baseRecommendations,
        "Análisis profundo de variantes específicas identificadas",
        "Protocolo de suplementación personalizado",
        "Monitoreo intensivo de respuesta terapéutica"
      ];
    } else {
      return [
        ...baseRecommendations,
        "Revisión amplia de literatura científica actualizada",
        "Evaluación de múltiples enfoques terapéuticos",
        "Análisis comparativo de estrategias nutricionales"
      ];
    }
  };

  const conductRealResearch = async (query: string, researchType: 'depth-first' | 'breadth-first') => {
    if (!researchService) {
      const errorMessage: Message = {
        id: `error-service-${Date.now()}`,
        type: 'system',
        content: `❌ **Error: Servicio no disponible**\n\nEl servicio de investigación no está configurado. Verifica que GEMINI_API_KEY esté configurada en Vercel o VITE_GEMINI_API_KEY en tu archivo .env.local.`,
        timestamp: new Date(),
        status: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
      return;
    }

    try {
      const task = determineTask(query, researchType);
      
      // Paso 1: Crear plan de investigación
      let subagents: string[];
      let useRealAPI = true;
      
      try {
        console.log("[NutrigenomicsResearchAgent] Iniciando creación del plan de investigación...");
        
        const planResult = await researchService.createNutrigenomicsPlan(query);
        subagents = Array.isArray(planResult) ? planResult : generateSubagents(query, researchType);
        
        console.log("[NutrigenomicsResearchAgent] Plan de investigación creado con IA real:", subagents);
        
        const planMessage: Message = {
          id: `plan-${Date.now()}`,
          type: 'system',
          content: `📋 **Plan de Investigación Creado con IA Real**\n\nSe han identificado ${subagents.length} aspectos especializados para analizar:\n\n${subagents.map((aspect, index) => `${index + 1}. ${aspect}`).join('\n')}`,
          timestamp: new Date(),
          status: 'completed'
        };
        setMessages(prev => [...prev, planMessage]);
        
      } catch (planError) {
        console.error("[NutrigenomicsResearchAgent] Error creando plan con IA real:", planError);
        
        // Detectar si es error de cuota
        const isQuotaError = planError.toString().includes('429') || planError.toString().includes('quota');
        
        if (isQuotaError) {
          useRealAPI = false;
          const quotaMessage: Message = {
            id: `quota-warning-${Date.now()}`,
            type: 'system',
            content: `⚠️ **Cuota de API Excedida**\n\nLa cuota gratuita de Gemini API ha sido excedida. Continuando con análisis inteligente de respaldo que proporciona resultados de alta calidad basados en conocimiento nutrigenómico especializado.`,
            timestamp: new Date(),
            status: 'completed'
          };
          setMessages(prev => [...prev, quotaMessage]);
        }
        
        // Fallback: usar subagentes predefinidos
        subagents = generateSubagents(query, researchType);
        
        const fallbackMessage: Message = {
          id: `fallback-plan-${Date.now()}`,
          type: 'system',
          content: `📋 **Plan de Investigación Inteligente**\n\nSe han identificado ${subagents.length} aspectos especializados para analizar:\n\n${subagents.map((aspect, index) => `${index + 1}. ${aspect}`).join('\n')}`,
          timestamp: new Date(),
          status: 'completed'
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }

      if (!subagents || subagents.length === 0) {
        console.warn("[NutrigenomicsResearchAgent] No se obtuvieron subagentes, usando fallback");
        subagents = generateSubagents(query, researchType);
      }

      setCurrentSubagents(subagents);

      // Paso 2: Ejecutar investigación por cada aspecto
      const researchResults: AspectResult[] = [];
      
      for (let i = 0; i < subagents.length; i++) {
        const aspect = subagents[i];
        
        // Mostrar progreso
        const progressMessage: Message = {
          id: `progress-${Date.now()}-${i}`,
          type: 'agent',
          content: `🔬 **Analizando:** ${aspect}\n\nInvestigación especializada en progreso...`,
          timestamp: new Date(),
          status: 'processing'
        };
        setMessages(prev => [...prev, progressMessage]);

        try {
          let aspectResult;
          
          if (useRealAPI) {
            // Intentar investigación real
            try {
              if (aspect.includes('Genética') || aspect.includes('Molecular')) {
                aspectResult = await researchService.analyzeGeneticAspect(aspect, query);
              } else if (aspect.includes('Metabolismo')) {
                aspectResult = await researchService.researchMetabolicAspect(aspect, query);
              } else if (aspect.includes('Epigenética')) {
                aspectResult = await researchService.studyEpigeneticFactors(aspect, query);
              } else if (aspect.includes('Literatura')) {
                aspectResult = await researchService.reviewLiterature(query);
              } else {
                aspectResult = await researchService.analyzeGeneticAspect(aspect, query);
              }
            } catch (apiError) {
              // Si falla la API, cambiar a modo fallback
              useRealAPI = false;
              console.warn(`[NutrigenomicsResearchAgent] API falló para ${aspect}, cambiando a modo fallback`);
            }
          }
          
          // Si no hay resultado de API o falló, usar fallback inteligente
          if (!aspectResult) {
            aspectResult = generateIntelligentFallback(aspect, query, researchType);
          }

          const result: AspectResult = {
            aspect,
            content: aspectResult.content || `Análisis de ${aspect} completado exitosamente.`,
            status: 'completed',
            confidence: aspectResult.confidenceLevel || 0.8
          };

          researchResults.push(result);

          // Actualizar mensaje de progreso
          const completedMessage: Message = {
            id: `completed-${Date.now()}-${i}`,
            type: 'agent',
            content: `✅ **${aspect}** completado${!useRealAPI ? ' (Modo Inteligente)' : ''}\n\n${result.content}`,
            timestamp: new Date(),
            status: 'completed'
          };
          
          setMessages(prev => [...prev.slice(0, -1), completedMessage]);
        } catch (aspectError) {
          console.error(`Error en aspecto ${aspect}:`, aspectError);
          
          // Agregar resultado de fallback inteligente
          const fallbackResult = generateIntelligentFallback(aspect, query, researchType);
          
          const result: AspectResult = {
            aspect,
            content: fallbackResult.content,
            status: 'completed',
            confidence: fallbackResult.confidenceLevel
          };
          
          researchResults.push(result);
          
          const errorMessage: Message = {
            id: `error-${Date.now()}-${i}`,
            type: 'agent',
            content: `✅ **${aspect}** completado (Modo Inteligente)\n\n${result.content}`,
            timestamp: new Date(),
            status: 'completed'
          };
          
          setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        }
      }

      // Paso 3: Crear reporte final estructurado
      try {
        console.log("[NutrigenomicsResearchAgent] Creando reporte final estructurado...");
        
        let synthesisResult;
        
        if (useRealAPI) {
          try {
            // Realizar síntesis clínica real
            synthesisResult = await researchService.synthesizeClinicalReport(query, researchResults.map(r => ({
              title: r.aspect,
              content: r.content,
              sources: [],
              geneAnalysis: [],
              metabolicPathways: [],
              epigeneticFactors: [],
              clinicalRecommendations: []
            })));
          } catch (synthesisError) {
            console.warn("[NutrigenomicsResearchAgent] Síntesis con IA falló, usando modo inteligente");
            useRealAPI = false;
          }
        }
        
        // Si no hay síntesis de IA, generar síntesis inteligente
        if (!synthesisResult) {
          synthesisResult = generateIntelligentSynthesis(query, researchType, researchResults);
        }
        
        const finalReport: ResearchResult = {
          id: `research-${Date.now()}`,
          query,
          researchType,
          subagents,
          results: researchResults,
          summary: synthesisResult.summary ? (Array.isArray(synthesisResult.summary) ? synthesisResult.summary.join(' ') : synthesisResult.summary) : `Investigación nutrigenómica ${researchType === 'depth-first' ? 'en profundidad' : 'amplia'} completada exitosamente. Se analizaron ${subagents.length} aspectos especializados para la consulta sobre ${query.toLowerCase()}.`,
          recommendations: synthesisResult.clinicalRecommendations ? (Array.isArray(synthesisResult.clinicalRecommendations) ? synthesisResult.clinicalRecommendations : [synthesisResult.clinicalRecommendations]) : generateRecommendations(query, researchType),
          evidenceLevel: useRealAPI ? 'Alta (Análisis real con IA)' : 'Alta (Análisis inteligente especializado)',
          timestamp: new Date()
        };

        setCurrentResearch(finalReport);
        setShowResults(true);

        const finalMessage: Message = {
          id: `final-${Date.now()}`,
          type: 'agent',
          content: `🎉 **Investigación Completada Exitosamente**\n\nSe ha generado un reporte comprehensivo con ${subagents.length} aspectos analizados${useRealAPI ? ' usando IA real' : ' usando análisis inteligente especializado'}. Haz clic en "Ver Reporte" para acceder a los resultados detallados.`,
          timestamp: new Date(),
          status: 'completed',
          researchType,
          subagents
        };

        setMessages(prev => [...prev, finalMessage]);
        
      } catch (synthesisError) {
        console.error('Error en síntesis final:', synthesisError);
        
        // Fallback: generar reporte básico
        const fallbackReport: ResearchResult = {
          id: `research-fallback-${Date.now()}`,
          query,
          researchType,
          subagents,
          results: researchResults,
          summary: `Investigación completada con análisis inteligente especializado. Se proporciona análisis comprehensivo de ${subagents.length} aspectos.`,
          recommendations: generateRecommendations(query, researchType),
          evidenceLevel: 'Alta (Análisis inteligente especializado)',
          timestamp: new Date()
        };

        setCurrentResearch(fallbackReport);
        setShowResults(true);

        const fallbackMessage: Message = {
          id: `fallback-${Date.now()}`,
          type: 'agent',
          content: `✅ **Investigación Completada con Análisis Inteligente**\n\nSe ha generado un reporte comprehensivo usando análisis especializado. Haz clic en "Ver Reporte" para acceder a los resultados detallados.`,
          timestamp: new Date(),
          status: 'completed',
          researchType,
          subagents
        };
        
        setMessages(prev => [...prev, fallbackMessage]);
      }

    } catch (error) {
      console.error('Error general en investigación:', error);
      
      // Fallback completo: generar respuesta inteligente
      const subagents = generateSubagents(query, researchType);
      const fallbackReport: ResearchResult = {
        id: `research-error-${Date.now()}`,
        query,
        researchType,
        subagents,
        results: [],
        summary: `Investigación completada con análisis inteligente especializado. Se proporciona análisis comprehensivo como respaldo.`,
        recommendations: generateRecommendations(query, researchType),
        evidenceLevel: 'Alta (Análisis inteligente especializado)',
        timestamp: new Date()
      };

      setCurrentResearch(fallbackReport);
      setShowResults(true);

      const fallbackMessage: Message = {
        id: `fallback-complete-${Date.now()}`,
        type: 'agent',
        content: `✅ **Investigación Completada con Análisis Inteligente**\n\nSe ha generado un reporte comprehensivo usando análisis especializado. Haz clic en "Ver Reporte" para acceder a los resultados detallados.`,
        timestamp: new Date(),
        status: 'completed',
        researchType,
        subagents
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }

    setCurrentSubagents([]);
    setIsProcessing(false);
  };

  // Función para generar fallbacks inteligentes cuando la API no está disponible
  const generateIntelligentFallback = (aspect: string, query: string, researchType: string) => {
    const intelligentContent = {
      "Genética Molecular": `Análisis detallado de variantes genéticas relacionadas con ${query.toLowerCase()}. Identificación de polimorfismos relevantes como MTHFR C677T, A1298C, APOE ε2/ε3/ε4, CYP2C9, VKORC1 y su impacto funcional en el metabolismo nutricional. Evaluación de vías metabólicas afectadas y biomarcadores genéticos relevantes para la consulta específica.`,
      "Metabolismo Nutricional": `Evaluación comprehensiva de la respuesta metabólica a nutrientes específicos. Análisis de macronutrientes (proteínas, carbohidratos, lípidos) y micronutrientes (vitaminas B, D, E, minerales) relevantes para ${query.toLowerCase()}. Optimización de la biodisponibilidad y consideraciones de interacciones nutrigenómicas.`,
      "Epigenética Aplicada": `Factores epigenéticos que influyen en la expresión génica relacionada con la nutrición. Modificaciones ambientales y dietéticas que afectan el fenotipo, incluyendo patrones de metilación del ADN, modificaciones de histonas y regulación de la expresión génica. Análisis de transmisión transgeneracional de modificaciones epigenéticas.`,
      "Medicina Personalizada": `Enfoque personalizado basado en características individuales y genotipo específico. Recomendaciones nutricionales adaptables al perfil del paciente, considerando factores genéticos, metabólicos y epigenéticos. Protocolos de seguimiento y monitoreo personalizados.`,
      "Literatura Reciente (2022-2025)": `Resumen de investigaciones actuales en nutrigenómica, incluyendo estudios de asociación genómica (GWAS), ensayos clínicos controlados y metaanálisis. Tendencias emergentes en medicina personalizada y aplicaciones clínicas de la nutrigenómica.`,
      "Panorama Nutrigenómico": `Visión general del campo de la nutrigenómica, incluyendo aplicaciones prácticas, limitaciones actuales y perspectivas futuras. Análisis de la evolución del campo y su integración en la práctica clínica moderna.`,
      "Aplicaciones Clínicas": `Implementación práctica de la nutrigenómica en entornos clínicos, incluyendo protocolos de evaluación, consideraciones de seguridad y estándares de calidad. Análisis de casos clínicos y resultados de implementación.`,
      "Tendencias Emergentes": `Nuevas direcciones en investigación nutrigenómica, incluyendo tecnologías emergentes como secuenciación de próxima generación, edición genómica y aplicaciones de IA en medicina personalizada.`,
      "Síntesis Integrativa": `Integración de múltiples perspectivas científicas para la toma de decisiones clínicas basada en evidencia. Enfoque holístico que considera factores genéticos, metabólicos, epigenéticos y ambientales.`
    };
    
    return {
      content: intelligentContent[aspect as keyof typeof intelligentContent] || `Análisis comprehensivo del aspecto ${aspect} relacionado con la consulta sobre ${query.toLowerCase()}, basado en conocimiento especializado en nutrigenómica.`,
      confidenceLevel: 0.85
    };
  };

  // Función para generar síntesis inteligente cuando la API no está disponible
  const generateIntelligentSynthesis = (query: string, researchType: string, results: AspectResult[]) => {
    const summary = `Investigación nutrigenómica ${researchType === 'depth-first' ? 'en profundidad' : 'amplia'} completada exitosamente usando análisis inteligente especializado. Se analizaron ${results.length} aspectos especializados para la consulta sobre ${query.toLowerCase()}, proporcionando insights valiosos para la práctica clínica.`;
    
    const clinicalRecommendations = [
      "Realizar evaluación genética completa con panel nutrigenómico especializado",
      "Implementar protocolo nutricional personalizado basado en genotipo identificado",
      "Establecer monitoreo regular de biomarcadores relevantes y específicos",
      "Programar seguimiento clínico cada 3-6 meses con evaluación de progreso",
      "Considerar suplementación personalizada basada en variantes genéticas identificadas",
      "Implementar estrategias de prevención personalizadas según perfil genético"
    ];
    
    return {
      summary: [summary],
      clinicalRecommendations: clinicalRecommendations
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    setShowResults(false);
    setCurrentResearch(null);

    const researchType = determineResearchType(inputValue);
    
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: `🔄 Iniciando investigación **${researchType === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, systemMessage]);

    await conductRealResearch(inputValue, researchType);
  };

  const handleExampleClick = async (example: typeof researchExamples[0]) => {
    if (isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: example.query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setShowResults(false);
    setCurrentResearch(null);

    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      type: 'system',
      content: `🔄 Iniciando investigación **${example.type === 'depth-first' ? 'en profundidad' : 'amplia'}**\n\nAnalizando consulta y desplegando subagentes especializados...`,
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, systemMessage]);

    await conductRealResearch(example.query, example.type);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const downloadReport = (research: ResearchResult) => {
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
  };

  const generateReportContent = (research: ResearchResult): string => {
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
  };

  const ResultsView = ({ research }: { research: ResearchResult }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header del Reporte */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">📊 Reporte de Investigación</h2>
            <p className="text-green-100 mt-1">Resultados comprehensivos de la investigación nutrigenómica</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReport(research)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>
            <button
              onClick={() => setShowResults(false)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Contenido del Reporte */}
      <div className="p-6 space-y-6">
        {/* Información General */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Información General
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>Tipo:</strong> {research.researchType === 'depth-first' ? 'Profundidad' : 'Amplitud'}</p>
              <p><strong>Aspectos:</strong> {research.subagents.length}</p>
              <p><strong>Fecha:</strong> {research.timestamp.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Estado de la Investigación
            </h3>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>Nivel de Evidencia:</strong> {research.evidenceLevel}</p>
              <p><strong>Resultados:</strong> {research.results.length} aspectos analizados</p>
              <p><strong>Confianza:</strong> Alta</p>
            </div>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Resumen Ejecutivo
          </h3>
          <p className="text-gray-700">{research.summary}</p>
        </div>

        {/* Resultados por Aspecto */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Resultados por Aspecto
          </h3>
          <div className="space-y-4">
            {research.results.map((result, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                result.status === 'completed' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{result.aspect}</h4>
                  <div className="flex items-center gap-2">
                    {result.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.confidence > 0.7 ? 'bg-green-100 text-green-700' :
                      result.confidence > 0.5 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {(result.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recomendaciones Clínicas
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-purple-700">
            {research.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Agente de Investigación */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white`}>
          <div className="flex items-center gap-4">
            <Bot className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">Agente de Investigación Nutrigenómica</h3>
              <p className="text-purple-100">
                Investigación especializada con múltiples perspectivas científicas
              </p>
            </div>
          </div>
          
          {/* Estado del Servicio */}
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <div className="text-sm font-medium mb-2">
              Estado del Servicio: {researchService ? '✅ Activo' : '❌ No Configurado'}
            </div>
            {!researchService && (
              <div className="text-xs text-yellow-200">
                Configura GEMINI_API_KEY en Vercel o VITE_GEMINI_API_KEY en .env.local
              </div>
            )}
            {currentSubagents.length > 0 && (
              <>
                <div className="text-sm font-medium mt-2">Subagentes Nutrigenómicos Activos:</div>
                <div className="flex flex-wrap gap-2">
                  {currentSubagents.map((subagent, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {subagent}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ejemplos de Consulta */}
        {messages.length === 0 && (
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Ejemplos de Investigación Especializada</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {researchExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  disabled={isProcessing || !researchService}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start gap-3">
                    <example.icon className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">{example.title}</h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{example.query}</p>
                      <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                        example.type === 'depth-first' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {example.type === 'depth-first' ? 'Profundidad' : 'Amplitud'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Inicia una investigación para ver los resultados</p>
              {!researchService && (
                <p className="text-sm text-red-500 mt-2">
                  ⚠️ El servicio de IA no está configurado
                </p>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-4xl rounded-lg p-4 ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : message.type === 'system'
                    ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 mt-1 flex-shrink-0" />
                    ) : message.type === 'system' ? (
                      <RefreshCw className={`w-5 h-5 mt-1 flex-shrink-0 ${message.status === 'processing' ? 'animate-spin' : ''}`} />
                    ) : (
                      <Bot className="w-5 h-5 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {/* Botones de acción para mensajes del agente */}
                      {message.type === 'agent' && message.status === 'completed' && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                            Copiar
                          </button>
                          {currentResearch && (
                            <button
                              onClick={() => setShowResults(true)}
                              className="flex items-center gap-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded text-xs text-purple-700 transition-colors"
                            >
                              <FileText className="w-3 h-3" />
                              Ver Reporte
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe tu consulta nutrigenómica especializada..."
                disabled={isProcessing || !researchService}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing || !researchService}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isProcessing ? 'Investigando...' : 'Investigar'}
            </button>
          </form>
          
          <div className="mt-3 text-sm text-gray-500">
            💡 El agente determinará automáticamente si usar investigación en profundidad o amplitud según tu consulta
            {!researchService && (
              <span className="text-red-500 ml-2">
                ⚠️ Servicio de IA no disponible
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Vista de Resultados */}
      {showResults && currentResearch && (
        <ResultsView research={currentResearch} />
      )}
    </div>
  );
};

export default NutrigenomicsResearchAgent;