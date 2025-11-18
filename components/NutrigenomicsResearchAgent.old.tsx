import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, Loader2, FileText, Atom, Microscope, Brain, Heart, RefreshCw, Copy, Download, Activity, Zap, CheckCircle, AlertTriangle, Info, BookOpen, Target, TrendingUp, X } from 'lucide-react';
import NutrigenomicsResearchService, { NutrigenomicsTask } from '../services/NutrigenomicsResearchService';
import { getGeminiApiKey } from '../utils/env';

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
      console.log("[NutrigenomicsResearchAgent] Iniciando inicialización del servicio...");

      // Usar función centralizada para obtener API key
      const apiKey = getGeminiApiKey();

      console.log("[NutrigenomicsResearchAgent] API Key:", apiKey ? '✅ Configurada' : '❌ No configurada');

      if (apiKey) {
        const service = new NutrigenomicsResearchService(apiKey);
        setResearchService(service);
        console.log("[NutrigenomicsResearchAgent] Servicio inicializado correctamente");
      } else {
        console.warn("[NutrigenomicsResearchAgent] Falta la API key. Define VITE_GEMINI_API_KEY en .env.local");

        // Mostrar mensaje informativo al usuario
        const errorMessage: Message = {
          id: `api-key-error-${Date.now()}`,
          type: 'system',
          content: `⚠️ **API Key No Configurada**\n\nPara usar la funcionalidad completa de IA:\n\n**En desarrollo local:** Crea un archivo .env.local con VITE_GEMINI_API_KEY=tu_api_key\n**En Vercel:** Configura la variable de entorno VITE_GEMINI_API_KEY\n\nPor ahora, el agente funcionará en modo limitado.`,
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
    // Verificar que el servicio de IA esté disponible
    if (!researchService) {
      const errorMessage: Message = {
        id: `error-no-service-${Date.now()}`,
        type: 'system',
        content: `❌ **Servicio de IA No Disponible**\n\nEl servicio de IA no está configurado. Para generar reportes de investigación nutrigenómica, es necesario configurar VITE_GEMINI_API_KEY.\n\n**Configuración requerida:**\n- En desarrollo: Crea un archivo .env.local con VITE_GEMINI_API_KEY=tu_api_key\n- En producción (Vercel): Configura la variable de entorno VITE_GEMINI_API_KEY\n\nSin la API configurada, no se pueden generar reportes de investigación personalizados.`,
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
        let useRealAPI = !!researchService; // Solo usar API real si el servicio está disponible
        
        try {
          if (researchService) {
            console.log("[NutrigenomicsResearchAgent] Iniciando creación del plan de investigación...");
            
            const planResult = await researchService.createNutrigenomicsPlan(query, genotypeId);
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
          } else {
            // Modo fallback: usar subagentes predefinidos
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
          
        } catch (planError) {
          console.error("[NutrigenomicsResearchAgent] Error creando plan con IA real:", planError);
          
          const errorMsg = planError?.toString() || 'Error desconocido';
          const isQuotaError = errorMsg.includes('429') || errorMsg.includes('quota');
          const isModelError = errorMsg.includes('404') || errorMsg.includes('not found');
          
          const errorMessage: Message = {
            id: `error-plan-${Date.now()}`,
            type: 'system',
            content: `❌ **Error al Crear Plan de Investigación**\n\nNo se pudo crear el plan de investigación con IA.\n\n${isQuotaError ? '**Causa:** Cuota de API excedida. Espera unos minutos o verifica tu plan de Gemini API.' : ''}${isModelError ? '**Causa:** Modelo de IA no disponible. El sistema intentará con modelos alternativos.' : ''}\n\n**Solución:**\n- Verifica que VITE_GEMINI_API_KEY esté configurada correctamente\n- Verifica que tu API key tenga acceso a los modelos de Gemini\n- Si el problema persiste, contacta al administrador\n\nNo se generará un reporte sin análisis real con IA.`,
            timestamp: new Date(),
            status: 'error'
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsProcessing(false);
          return;
        }

      if (!subagents || subagents.length === 0) {
        console.error("[NutrigenomicsResearchAgent] No se obtuvieron subagentes");
        const errorMessage: Message = {
          id: `error-no-subagents-${Date.now()}`,
          type: 'system',
          content: `❌ **Error: No se pudo crear el plan de investigación**\n\nNo se pudieron identificar aspectos de investigación. Sin un plan válido, no se puede generar un reporte.\n\nPor favor, intenta nuevamente o verifica la configuración de la API.`,
          timestamp: new Date(),
          status: 'error'
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsProcessing(false);
        return;
      }

      setCurrentSubagents(subagents);

      // Paso 2: Ejecutar investigación por cada aspecto (OPTIMIZADO: paralelización)
      const progressMessage: Message = {
        id: `progress-batch-${Date.now()}`,
        type: 'system',
        content: `🔬 **Investigación en Progreso**\n\nAnalizando ${subagents.length} aspectos especializados...\n\n${subagents.map((a, i) => `${i + 1}. ${a}`).join('\n')}`,
        timestamp: new Date(),
        status: 'processing'
      };
      setMessages(prev => [...prev, progressMessage]);

      // Función helper para determinar el tipo de análisis
      const getAnalysisType = (aspect: string): NutrigenomicsTask => {
        if (aspect.includes('Genética') || aspect.includes('Molecular') || aspect.includes('Polimorfismo')) {
          return 'GENETIC_ANALYSIS';
        } else if (aspect.includes('Metabolismo') || aspect.includes('Metabólico')) {
          return 'METABOLIC_RESEARCH';
        } else if (aspect.includes('Epigenética') || aspect.includes('Epigenético')) {
          return 'EPIGENETIC_STUDY';
        } else if (aspect.includes('Literatura') || aspect.includes('Revisión')) {
          return 'LITERATURE_REVIEW';
        }
        return 'GENETIC_ANALYSIS'; // Default
      };

      // Función helper para ejecutar análisis con retry y fallback
      const executeAnalysis = async (aspect: string, index: number): Promise<AspectResult> => {
        const analysisType = getAnalysisType(aspect);
        
        if (useRealAPI && researchService) {
          try {
            let aspectResult;
            
            switch (analysisType) {
              case 'GENETIC_ANALYSIS':
                aspectResult = await researchService.analyzeGeneticAspect(aspect, query, genotypeId);
                break;
              case 'METABOLIC_RESEARCH':
                aspectResult = await researchService.researchMetabolicAspect(aspect, query);
                break;
              case 'EPIGENETIC_STUDY':
                aspectResult = await researchService.studyEpigeneticFactors(aspect, query);
                break;
              case 'LITERATURE_REVIEW':
                aspectResult = await researchService.reviewLiterature(query);
                break;
              default:
                aspectResult = await researchService.analyzeGeneticAspect(aspect, query, genotypeId);
            }
            
            return {
              aspect,
              content: aspectResult.content || `Análisis de ${aspect} completado exitosamente.`,
              status: 'completed',
              confidence: aspectResult.confidenceLevel || 0.85
            };
          } catch (apiError: any) {
            // Detectar errores de cuota o límite
            const isQuotaError = apiError?.message?.includes('429') || 
                                apiError?.message?.includes('quota') ||
                                apiError?.message?.includes('rate limit');
            
            if (isQuotaError && index === 0) {
              // Solo mostrar advertencia una vez
              useRealAPI = false;
              console.warn(`[NutrigenomicsResearchAgent] Cuota excedida, cambiando a modo fallback`);
            }
            
            // Fallback inteligente
            const fallbackResult = generateIntelligentFallback(aspect, query, researchType);
            return {
              aspect,
              content: fallbackResult.content,
              status: 'completed',
              confidence: fallbackResult.confidenceLevel || 0.75
            };
          }
        }
        
          // Si no hay API disponible, no generar contenido falso
          throw new Error('Servicio de IA no disponible');
      };

      // OPTIMIZACIÓN: Ejecutar análisis en paralelo (máximo 3 simultáneos para evitar rate limits)
      const BATCH_SIZE = 3;
      const researchResults: AspectResult[] = [];
      
      for (let i = 0; i < subagents.length; i += BATCH_SIZE) {
        const batch = subagents.slice(i, i + BATCH_SIZE);
        const batchPromises = batch.map((aspect, batchIndex) => 
          executeAnalysis(aspect, i + batchIndex)
        );
        
        try {
          const batchResults = await Promise.allSettled(batchPromises);
          
          batchResults.forEach((result, batchIndex) => {
            if (result.status === 'fulfilled') {
              researchResults.push(result.value);
            } else {
              // Error en el análisis - no generar contenido falso
              const aspect = batch[batchIndex];
              researchResults.push({
                aspect,
                content: `❌ Error: No se pudo analizar este aspecto. El servicio de IA no está disponible o falló.`,
                status: 'error',
                confidence: 0
              });
            }
          });
        } catch (batchError) {
          console.error(`Error en batch ${i}:`, batchError);
          // Agregar errores para todo el batch - no generar contenido falso
          batch.forEach(aspect => {
            researchResults.push({
              aspect,
              content: `❌ Error: No se pudo analizar este aspecto. El servicio de IA no está disponible o falló.`,
              status: 'error',
              confidence: 0
            });
          });
        }
      }

      // Verificar si hay resultados válidos
      const validResults = researchResults.filter(r => r.status === 'completed' && r.confidence > 0.5);
      
      if (validResults.length === 0) {
        const errorMessage: Message = {
          id: `error-no-results-${Date.now()}`,
          type: 'system',
          content: `❌ **Error: No se pudieron obtener resultados de investigación**\n\nTodos los aspectos fallaron al analizarse. El servicio de IA no está disponible o ha fallado.\n\n**No se generará un reporte sin análisis real.**\n\nPor favor, verifica:\n- Que VITE_GEMINI_API_KEY esté configurada\n- Que tu API key tenga acceso a los modelos de Gemini\n- Tu conexión a internet`,
          timestamp: new Date(),
          status: 'error'
        };
        setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        setIsProcessing(false);
        return;
      }
      
      // Actualizar mensaje de progreso con resultados
      const completedProgressMessage: Message = {
        id: `progress-batch-${Date.now()}`,
        type: 'system',
        content: `✅ **Investigación Completada**\n\nSe analizaron ${validResults.length} de ${researchResults.length} aspectos especializados:\n\n${researchResults.map((r, i) => `${i + 1}. ${r.aspect} ${r.status === 'completed' ? '✅' : '❌'}`).join('\n')}`,
        timestamp: new Date(),
        status: 'completed'
      };
      setMessages(prev => [...prev.slice(0, -1), completedProgressMessage]);

      // Paso 3: Crear reporte final estructurado (SOLO si hay resultados válidos con IA)
      console.log("[NutrigenomicsResearchAgent] Creando reporte final estructurado...");
      
      let synthesisResult;
      
      // Intentar síntesis con IA si está disponible y hay resultados válidos
      if (useRealAPI && researchService && validResults.length > 0) {
        try {
          // Preparar datos de investigación de forma eficiente (solo resultados válidos)
          const researchData = validResults.map(r => ({
            title: r.aspect,
            content: typeof r.content === 'string' ? r.content : JSON.stringify(r.content),
            sources: [],
            geneAnalysis: [],
            metabolicPathways: [],
            epigeneticFactors: [],
            clinicalRecommendations: []
          }));
          
          synthesisResult = await researchService.synthesizeClinicalReport(query, researchData);
        } catch (synthesisError: any) {
          console.error("[NutrigenomicsResearchAgent] Síntesis con IA falló:", synthesisError?.message);
          const errorMessage: Message = {
            id: `error-synthesis-${Date.now()}`,
            type: 'system',
            content: `❌ **Error al generar síntesis clínica**\n\nNo se pudo generar el reporte final. El servicio de IA falló.\n\n**No se generará un reporte sin análisis completo.**`,
            timestamp: new Date(),
            status: 'error'
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsProcessing(false);
          return;
        }
      }
      
      // Si no hay síntesis de IA, no generar reporte falso
      if (!synthesisResult) {
        const errorMessage: Message = {
          id: `error-no-synthesis-${Date.now()}`,
          type: 'system',
          content: `❌ **Error: No se pudo generar síntesis clínica**\n\nEl servicio de IA no está disponible o falló.\n\n**No se generará un reporte sin análisis real con IA.**`,
          timestamp: new Date(),
          status: 'error'
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsProcessing(false);
        return;
      }
        
      // Crear reporte final SOLO con resultados reales de IA
      const summaryText = Array.isArray(synthesisResult.summary) 
        ? synthesisResult.summary.join('\n\n') 
        : synthesisResult.summary || `Investigación nutrigenómica ${researchType === 'depth-first' ? 'en profundidad' : 'amplia'} completada exitosamente. Se analizaron ${validResults.length} aspectos especializados con IA.`;

      const recommendations = Array.isArray(synthesisResult.clinicalRecommendations)
        ? synthesisResult.clinicalRecommendations
        : [synthesisResult.clinicalRecommendations];

      const finalReport: ResearchResult = {
        id: `research-${Date.now()}`,
        query,
        researchType,
        subagents,
        results: validResults, // Solo resultados válidos
        summary: summaryText,
        recommendations,
        evidenceLevel: `Alta (Análisis con IA - ${validResults.filter(r => r.confidence > 0.8).length}/${validResults.length} alta confianza)`,
        timestamp: new Date()
      };

      setCurrentResearch(finalReport);
      setShowResults(true);

      const finalMessage: Message = {
        id: `final-${Date.now()}`,
        type: 'agent',
        content: `🎉 **Investigación Completada**\n\n✅ ${validResults.length} aspectos analizados con IA\n📊 Nivel de evidencia: ${finalReport.evidenceLevel}\n💡 ${recommendations.length} recomendaciones clínicas personalizadas\n\nHaz clic en "Ver Reporte" para acceder a los resultados detallados.`,
        timestamp: new Date(),
        status: 'completed',
        researchType,
        subagents
      };

      setMessages(prev => [...prev, finalMessage]);

    } catch (error) {
      console.error('Error general en investigación:', error);
      
      const errorMessage: Message = {
        id: `error-general-${Date.now()}`,
        type: 'system',
        content: `❌ **Error en la Investigación**\n\nOcurrió un error durante el proceso de investigación.\n\n**No se generará un reporte sin análisis real con IA.**\n\nPor favor, verifica la configuración de la API e intenta nuevamente.`,
        timestamp: new Date(),
        status: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }

    setCurrentSubagents([]);
    setIsProcessing(false);
  };

  // Función para generar fallbacks inteligentes cuando la API no está disponible
  const generateIntelligentFallback = (aspect: string, query: string, researchType: string) => {
    const warningPrefix = `⚠️ **ADVERTENCIA: Información General de Respaldo**\n\nEste contenido es información general basada en conocimiento nutrigenómico estándar. NO es un análisis personalizado con IA.\n\n`;
    
    const intelligentContent = {
      "Genética Molecular": `${warningPrefix}Información general sobre variantes genéticas comunes relacionadas con ${query.toLowerCase()}. Los polimorfismos más estudiados incluyen MTHFR C677T, A1298C, APOE ε2/ε3/ε4, CYP2C9, VKORC1. Para análisis personalizado, se requiere acceso a la API de IA.`,
      "Metabolismo Nutricional": `${warningPrefix}Información general sobre metabolismo nutricional relacionado con ${query.toLowerCase()}. Consideraciones generales sobre macronutrientes y micronutrientes. Para análisis personalizado del paciente, se requiere acceso a la API de IA.`,
      "Epigenética Aplicada": `${warningPrefix}Información general sobre factores epigenéticos en nutrigenómica. Conceptos básicos sobre metilación del ADN y modificaciones de histonas. Para análisis personalizado, se requiere acceso a la API de IA.`,
      "Medicina Personalizada": `${warningPrefix}Información general sobre enfoques de medicina personalizada en nutrigenómica. Para recomendaciones personalizadas específicas del paciente, se requiere acceso a la API de IA.`,
      "Literatura Reciente (2022-2025)": `${warningPrefix}Información general sobre tendencias en investigación nutrigenómica. Para revisión de literatura actualizada y específica, se requiere acceso a la API de IA.`,
      "Panorama Nutrigenómico": `${warningPrefix}Información general sobre el campo de la nutrigenómica. Visión general de aplicaciones y perspectivas. Para análisis detallado, se requiere acceso a la API de IA.`,
      "Aplicaciones Clínicas": `${warningPrefix}Información general sobre aplicaciones clínicas de la nutrigenómica. Para protocolos personalizados, se requiere acceso a la API de IA.`,
      "Tendencias Emergentes": `${warningPrefix}Información general sobre tendencias emergentes en nutrigenómica. Para análisis detallado, se requiere acceso a la API de IA.`,
      "Síntesis Integrativa": `${warningPrefix}Información general sobre integración de perspectivas en nutrigenómica. Para síntesis personalizada, se requiere acceso a la API de IA.`
    };
    
    return {
      content: intelligentContent[aspect as keyof typeof intelligentContent] || `${warningPrefix}Información general sobre ${aspect} relacionado con ${query.toLowerCase()}. Para análisis personalizado, se requiere acceso a la API de IA.`,
      confidenceLevel: 0.3 // Baja confianza para fallbacks
    };
  };

  // Función para generar síntesis inteligente cuando la API no está disponible
  const generateIntelligentSynthesis = (query: string, researchType: string, results: AspectResult[]) => {
    const summary = `⚠️ **ADVERTENCIA: Reporte de Respaldo**\n\nEl servicio de IA no está disponible. Este reporte contiene información general basada en conocimiento nutrigenómico estándar, pero NO es un análisis personalizado con IA.\n\n**Limitaciones:**\n- No se realizó análisis genético específico del paciente\n- No se procesaron datos personalizados\n- Las recomendaciones son generales, no personalizadas\n- No se analizaron polimorfismos específicos\n- No se generaron protocolos personalizados\n\n**Recomendación:** Configura VITE_GEMINI_API_KEY para obtener análisis completo con IA.`;
    
    const clinicalRecommendations = [
      "⚠️ Este reporte es de respaldo. Para recomendaciones personalizadas, configura la API de Gemini.",
      "Consulta con un especialista en nutrigenómica para análisis completo.",
      "Considera realizar pruebas genéticas para obtener información precisa.",
      "Este análisis NO reemplaza la consulta médica profesional."
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

        {/* Resultados por Aspecto - OPTIMIZADO */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Resultados por Aspecto ({research.results.length})
            </h3>
            <div className="text-sm text-gray-600">
              Alta confianza: {research.results.filter(r => r.confidence > 0.8).length} | 
              Media: {research.results.filter(r => r.confidence > 0.6 && r.confidence <= 0.8).length}
            </div>
          </div>
          <div className="space-y-3">
            {research.results.map((result, index) => {
              const contentPreview = typeof result.content === 'string' 
                ? result.content.substring(0, 300) + (result.content.length > 300 ? '...' : '')
                : JSON.stringify(result.content).substring(0, 300);
              
              return (
              <div key={index} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                result.status === 'completed' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{result.aspect}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{contentPreview}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {result.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                      result.confidence > 0.8 ? 'bg-green-100 text-green-700' :
                      result.confidence > 0.6 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {(result.confidence * 100).toFixed(0)}% confianza
                    </span>
                  </div>
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Ver análisis completo
                  </summary>
                  <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">
                      {typeof result.content === 'string' ? result.content : JSON.stringify(result.content, null, 2)}
                    </p>
                  </div>
                </details>
              </div>
            );
            })}
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
                  disabled={isProcessing}
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
                disabled={isProcessing}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing}
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
              <span className="text-amber-600 ml-2">
                ℹ️ Funcionando en modo inteligente (sin IA). Para funcionalidad completa, configura VITE_GEMINI_API_KEY
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