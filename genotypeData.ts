import type { GenotypeDetailData } from './types';
import {
    // Hunter
    ImmuneSystemIcon, AdrenergicResponseIcon, PulsatileEnergyIcon,
    DetailOrientationIcon, BloodTypeIcon, EfficientMetabolismIcon,
    HighEnergyIcon, MetabolicEfficiencyIcon, InnatePhysicalResistanceIcon,
    // Gatherer
    MetabolicSystemIcon, MentalEffortIcon, AdaptiveMetabolismIcon,
    AlgorithmicMindIcon, MetabolicEconomyIcon, MentalResistanceIcon,
    ResourceAdaptabilityIcon, InnateFertilityIcon,
    // Master
    TolerantImmuneSystemIcon, InnateCreativityIcon, SurprisingAdaptabilityIcon,
    MetaAnalyticCapacityIcon, VersatileMetabolismIcon, MindBodyBalanceIcon,
    PotentialLongevityIcon, StructuralFlexibilityIcon,
    // Explorer
    DetoxSystemIcon, GeneticRegenerationIcon, PhysicalResistanceIcon,
    HighRepairCapacityIcon, VisualSimultaneityIcon,
    // Nomad
    ExtremeStaturesIcon
} from './components/Icons';

export const GENOTYPE_DATA: { [key: number]: GenotypeDetailData } = {
    1: {
        id: 1,
        name: "Hunter",
        title: "Genotipo Hunter",
        tagline: "Tu perfil genético ancestral: Fuerza, agilidad y resiliencia para el mundo moderno.",
        essence: {
            title: "La esencial del Hunter",
            quote: "“Primero dispara y luego preguntas”",
            description: "Esta frase captura perfectamente tu naturaleza reactiva e instintiva: eres una persona de acción rápida y decisiva, optimizada para responder con inmediatez ante desafíos y oportunidades."
        },
        characteristics1: [
            {
                title: "Sistema inmune reactivo",
                description: "Mayor tendencia a respuestas inflamatorias cuando tu alimentación no es óptima.",
                icon: ImmuneSystemIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Respuesta adrenérgica elevada",
                description: "Tu cuerpo produce y responde con más intensidad a la adrenalina, lo que te da ventajas en situaciones de presión.",
                icon: AdrenergicResponseIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Energía pulsátil",
                description: "Funcionas mejor con ciclos de actividad y descanso seguidos. Te desempeñas bien con estrés constante de baja intensidad.",
                icon: PulsatileEnergyIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        characteristics2: [
            {
                title: "Orientación al detalle",
                description: "Tu mente es naturalmente analítica y meticulosa, capaz de detectar patrones y detalles que otros pasan por alto.",
                icon: DetailOrientationIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Grupo sanguíneo O",
                description: "Todos los Hunter pertenecen a este grupo, el más antiguo en la evolución humana.",
                icon: BloodTypeIcon,
                iconBgColor: "bg-cyan-500",
            },
            {
                title: "Metabolizador eficiente",
                description: "Tu cuerpo está diseñado para procesar mejor las proteínas animales y grasas saludables.",
                icon: EfficientMetabolismIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Altos niveles de energía",
                description: "Capacidad natural para generar y sostener energía cuando estás equilibrado.",
                icon: HighEnergyIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Eficiencia metabólica",
                description: "Con buena salud, puedes comer abundantemente sin engordar, dirigiendo las calorías donde sean necesarias para lograr fuerza y resistencia óptimas.",
                icon: MetabolicEfficiencyIcon,
                iconBgColor: "bg-orange-500",
            },
            {
                title: "Resistencia física innata",
                description: "Especialmente para esfuerzos intensos de corta duración, como los necesarios en situaciones decisivas.",
                icon: InnatePhysicalResistanceIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        physicalAndMetabolic: [
            {
                title: "Cuerpo",
                points: [
                    "Tendencia a un cuerpo muscular. Ándrico, tiende al cuerpo masculino.",
                    "Un cuerpo preparado para la actividad física.",
                    "Problemas digestivos: Posible mala asimilación de nutrientes si no sigues una alimentación adecuada a tu genotipo."
                ]
            },
            {
                title: "Mente y conducta",
                points: [
                    "Tendencia a frustrarse con tareas repetitivas o de progreso lento.",
                    "Conducta competitiva y emprendedora. Si no gana se frustra.",
                    "Sin actividad física tienden a acumular el estrés. Excelente manejando el estrés cuando está bien nutrido y en equilibrio, pero cuando se combinan la mala alimentación y el estrés, ¡cuidado!"
                ]
            },
            {
                title: "Vulnerabilidades",
                points: [
                    "Respuesta impulsiva a infecciones. Tendencia a respuestas autinmunes frente a virus y agentes alergénicos.",
                    "Órganos de estrés vulnerables: Especialmente las glándulas adrenales y pituitaria, que pueden agotarse con el estrés crónico.",
                    "Vulnerabilidad al envejecimiento prematuro. Sin la dieta adecuada o sin mitigadores del estrés puedes envejecer más rápidamente."
                ]
            },
            {
                title: "Riesgos para la Salud",
                points: [
                    "Alergias, condiciones autoinmunes, como asma o artritis reumatoide. Permeabilidad intestinal elevada.",
                    "Problemas articulares, Problemas intestinales similares a la celiaquía. Síndrome de fatiga adrenal Agotamiento de reservas hormonales por estrés crónico.",
                    "Depresión, cánceres reproductivos (más en hombres) con la edad avanzada. Trastornos del sueño Dificultad para conciliar el sueño por alta activación."
                ]
            }
        ],
        foodPlan: {
            title: "Características del plan de alimentos",
            description: "La dieta del genotipo 1 es una dieta carnívora, baja en lectinas y baja en gluten, diseñada específicamente para optimizar tu salud y rendimiento.",
            sections: [
                { title: "Salud Digestiva", points: ["Los alimentos deben curar y regenerar el tracto digestivo, ayudando a mantener y mejorar la salud del sistema digestivo."] },
                { title: "Reducción de Inflamación", points: ["El plan debe reducir la inflamación al disminuir la reactividad a los alérgenos dietéticos y lectinas."] },
                { title: "Manejo del Estrés", points: ["Debe mejorar la capacidad para controlar la tensión y el estrés, contribuyendo a un mejor manejo del estrés."] },
                { title: "Rico en Antioxidantes", points: ["El plan debe ser rico en antioxidantes para ayudar a combatir el estrés oxidativo y promover la salud en general."] },
                { title: "Balance Ácido", points: ["Debe equilibrar el terreno ácido-reducido/oxidado, manteniendo un equilibrio adecuado en el cuerpo."] },
                { title: "Bienestar Emocional", points: ["El plan debe proporcionar bienestar y recompensa en el sistema emocional, promoviendo un estado emocional positivo y bienestar."] },
                { title: "Salud Intestinal", points: ["Debe tener un efecto regulador de la microbiota y disminuir el biofilm intestinal, ayudando a prevenir la formación de biopelículas bacterianas en el intestino."] },
                { title: "Composición Corporal Saludable", points: ["El plan debe aumentar la masa muscular y reducir la grasa corporal, favoreciendo una composición corporal saludable."] },
                { title: "Mejora Genética", points: ["Los superalimentos incluidos deben ser ricos en purinas y nucleótidos provenientes de alimentos proteicos y cultivados."] },
                { title: "Protección de Tejidos", points: ["Los fitoquímicos en el plan deben eliminar los radicales libres que dañan los tejidos y ralentizar la tendencia del Hunter al envejecimiento rápido."] }
            ]
        },
        foodsToAvoid: {
            title: "Alimentos a evitar",
            description: "La dieta del genotipo 1 es una dieta carnívora, baja en lectinas y baja en gluten, diseñada específicamente para optimizar tu salud y rendimiento.",
            sections: [
                { title: "Alimentos que ralentizan el metabolismo", points: ["Cereales y ciertas semillas. Muchos granos, nueces y semillas pueden interferir con la función adecuada de la insulina, causando que incluso los Hunters normalmente delgados tengan dificultades para mantener su peso."] },
                { title: "Alimentos con grasas poco saludables", points: ["Elige alimentos con un equilibrio adecuado entre ácidos grasos omega-3 y omega-6, evitando grasas trans y saturadas. Las grasas malas aumentan la inflamación y pueden causar daño a las paredes de las arterias."] },
                { title: "Alimentos altos en azucar", points: ["Reduce el consumo de alimentos con azúcares simples y glicados altos. Los altos niveles de azúcar fomentan el crecimiento excesivo de bacterias, lo que aumenta la inflamación en el tracto digestivo."] },
                { title: "Irritantes intestinales", points: ["Productos lácteos y alimentos que contienen moho y hongos. Muchos alimentos que contienen moho y hongos pueden causar un aumento de la inflamación en los Hunters."] },
                { title: "Alergenos y antinutrientes", points: ["Alimentos que contienen gluten, lectinas, gliadina, quitinasa y fenoles. El gluten es una proteína que se encuentra en muchos granos que puede irritar el revestimiento del intestino en individuos sensibles. La quitinasa es una enzima que puede iniciar una reacción alérgica en el intestino. Las lectinas son proteínas que pueden interferir con la función digestiva e inmune adecuada. Los fenoles son compuestos vegetales que pueden causar reacciones alérgicas en muchos Hunters."] }
            ]
        }
    },
    2: {
        id: 2,
        name: "Gatherer",
        title: "Genotipo Gatherer",
        tagline: "Tu perfil genético ancestral: Eficiencia metabólica y resistencia para el mundo moderno.",
        essence: {
            title: "La esencial del gatherer",
            quote: "“Acumular para sobrevivir”",
            description: "Esta frase captura perfectamente tu naturaleza ahorrativa e ingeniosa: eres una persona con una increíble capacidad para la concentración mental sostenida y resolución de problemas, optimizada para maximizar recursos y minimizar el desperdicio."
        },
        characteristics1: [
            {
                title: "Sistema metabólico eficiente",
                description: "Mayor tendencia a conservar energía cuando tu alimentación no es óptima. Tu cuerpo está programado para almacenar recursos de forma eficiente.",
                icon: MetabolicSystemIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Alta capacidad para esfuerzos mentales",
                description: "Tu mente es capaz de mantener largos períodos de concentración intensa. Posees una gran capacidad para resolver problemas complejos.",
                icon: MentalEffortIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Metabolismo adaptativo",
                description: "Funcionas mejor con comidas regulares y estables. Tu cuerpo está diseñado para períodos alternados de abundancia y escasez.",
                icon: AdaptiveMetabolismIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        characteristics2: [
            {
                title: "Mentalidad algorítmica",
                description: "Tu mente es naturalmente analítica y estructurada, capaz de encontrar soluciones sistemáticas donde otros ven caos.",
                icon: AlgorithmicMindIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Grupo sanguíneo O o B",
                description: "Los Recolectores suelen pertenecer a estos grupos, mostrando una adaptación ancestral a determinados entornos.",
                icon: BloodTypeIcon,
                iconBgColor: "bg-cyan-500",
            },
            {
                title: "Economía metabólica",
                description: "Tu cuerpo está diseñado para aprovechar al máximo los nutrientes y almacenar energía eficientemente.",
                icon: MetabolicEconomyIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Gran resistencia mental",
                description: "Capacidad natural para mantener esfuerzos mentales prolongados y concentrados.",
                icon: MentalResistanceIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Adaptabilidad a diferentes recursos",
                description: "Con buena salud puedes adaptarte a diferentes entornos nutricionales, maximizando lo disponible.",
                icon: ResourceAdaptabilityIcon,
                iconBgColor: "bg-orange-500",
            },
            {
                title: "Alta fertilidad innata",
                description: "Especialmente diseñado para prosperar y mantener buenos niveles hormonales en diversas condiciones.",
                icon: InnateFertilityIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        physicalAndMetabolic: [
            {
                title: "Cuerpo",
                points: ["Tendencia a un cuerpo endomorfo. Gínico, tiende al cuerpo femenino.", "Un cuerpo que parece acolchado incluso con peso adecuado.", "Problemas digestivos: Puede tener dificultades para procesar ciertos alimentos si no sigue una alimentación adecuada a su genotipo."]
            },
            {
                title: "Mente y conducta",
                points: ["Tendencia a adoptar ideas nuevas y revolucionarias.", "Conducta afable con ciertos altibajos emocionales.", "Sin actividad mental adecuada tiende a aburrirse fácilmente. Excelente para resolver problemas complejos de forma sistemática."]
            },
            {
                title: "Vulnerabilidades",
                points: ["Tendencia a la resistencia a la insulina y obesidad.", "Dificultad para seguir dietas estrictas y tendencia a acumular calorías. La regulación del appetito puede ser un problema.", "Vulnerabilidad a acumular sustancias químicas dañinas en los tejidos."]
            },
            {
                title: "Riesgos para la Salud",
                points: ["Depresión, hipertensión y diabetes.", "Baja actividad física y acumulación de peso.", "Cánceres reproductivos (más en mujeres) en edad avanzada. Hipotiroidismo: provoca retención de líquidos, debilidad muscular y baja temperatura corporal."]
            }
        ],
        foodPlan: {
            title: "Características del plan de alimentos",
            description: "La dieta del genotipo 2 es alta en proteínas, con alimentos de índice glucémico bajo, rica en antioxidantes y baja en glicotoxinas, diseñada específicamente para optimizar tu salud y rendimiento.",
            sections: [
                { title: "Aumento de masa muscular", points: ["El plan debe aumentar la masa muscular y reducir la grasa corporal, favorecendo una composición corporal saludable."] },
                { title: "Limpieza tisular", points: ["Los alimentos deben limpiar los tejidos grasos de xenobióticos, ayudando a desintoxicar el cuerpo."] },
                { title: "Mejora de sensibilidad a la insulina", points: ["Debe mejorar la respuesta biológica a la resistencia a la insulina, optimizando la sensibilidad a esta hormona."] },
                { title: "Equilibrio hormonal", points: ["El plan mantiene equilibrado el sistema hormonal, ayudando a regular las hormonas del cuerpo."] },
                { title: "Reprogramación epigenética", points: ["Los alimentos deben reprogramar epigenéticamente los genes ahorrativos, contribuyendo a una mejor gestión energética y metabólica."] },
                { title: "Bienestar Emocional", points: ["Debe proporcionar bienestar y recompensa en el sistema emocional, promoviendo un estado emocional positivo."] },
                { title: "Adaptabilidad a crisis", points: ["El plan ayuda al recolector a adaptarse en situaciones de crisis, mejorando la resiliencia en momentos de estrés."] }
            ]
        },
        foodsToAvoid: {
            title: "Alimentos a evitar",
            description: "La dieta del genotipo 2 es alta en proteínas, con alimentos de índice glucémico bajo, rica en antioxidantes y baja en glicotoxinas, diseñada específicamente para optimizar tu salud y rendimiento.",
            sections: [
                { title: "Alimentos que ralentizan el metabolismo", points: ["Cereales, frutos secos y semillas que interfieren con la sensibilidad a la insulina. Muchos de estos alimentos pueden interferir con la función adecuada de la insulina, causando dificultades para mantener el peso."] },
                { title: "Alimentos hiperglucémicos", points: ["Evita alimentos con alto índice glucémico que elevan rápidamente los niveles de azúcar en sangre. Estos alimentos pueden empeorar la resistencia a la insulina característica del Recolector."] },
                { title: "Alimentos que interfieren con el funcionamiento hormonal", points: ["Mantén alejados los alimentos que afecten negativamente las hormonas. El equilibrio hormonal es crucial para la salud del Recolector."] },
                { title: "Alimentos con elevados azúcares simples", points: ["Reduce el consumo de alimentos con azúcares simples y glicados altos. Los azúcares simples pueden alterar el metabolismo ya comprometido del Recolector."] },
                { title: "Alimentos procesados e industriales", points: ["Los alimentos altamente procesados contienen aditivos y conservantes que pueden acumularse en los tejidos grasos, contribuyendo a problemas metabólicos a largo plazo."] }
            ]
        }
    },
    3: {
        id: 3,
        name: "Master",
        title: "GenoTipo Master",
        tagline: "Tu perfil genético ancestral: Equilibrio, adaptabilidad y creatividad para el mundo moderno.",
        essence: {
            title: "La esencial del master",
            quote: "“El equilibrio entre fuerzas opuestas”",
            description: "Esta frase captura perfectamente tu naturaleza adaptable y flexible: eres una persona con un sistema inmune tolerante, una profunda relación con la naturaleza y un equilibrio único entre las fuerzas que otros genotipos experimentan como contradictorias."
        },
        characteristics1: [
            {
                title: "Sistema inmune tolerante",
                description: "Menor tendencia a la inflamación y alergias cuando tu alimentación es óptima. Tu cuerpo está programado para adaptarse a diversos entornos con flexibilidad.",
                icon: TolerantImmuneSystemIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Creatividad innata",
                description: "Tu mente tiene una capacidad natural para el metaanálisis y la síntesis de información. Posees un alma de artista con necesidad de expresión creativa para mantener la salud.",
                icon: InnateCreativityIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Adaptabilidad sorprendente",
                description: "Funcionas mejor con equilibrio en la dieta, ejercicio y ciclos de sueño-vigilia. Tu cuerpo responde rápidamente a cambios positivos en el estilo de vida.",
                icon: SurprisingAdaptabilityIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        characteristics2: [
            {
                title: "Capacidad metaanalítica",
                description: "Tu mente es naturalmente capaz de evaluar numerosos tipos de datos y sintetizar su esencia, viendo patrones donde otros solo ven fragmentos.",
                icon: MetaAnalyticCapacityIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Grupo sanguíneo A o AB",
                description: "Los Maestros suelen pertenecer a estos grupos, reflejando su adaptabilidad a las transiciones históricas.",
                icon: BloodTypeIcon,
                iconBgColor: "bg-cyan-500",
            },
            {
                title: "Metabolismo versátil",
                description: "Tu cuerpo está diseñado para procesar una gran variedad de alimentos frescos, cereales y mariscos, aunque con limitada capacidad para metabolizar grasas animales.",
                icon: VersatileMetabolismIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Equilibrio mental-físico",
                description: "Capacidad natural para mantener una actitud calmada y centrada cuando estás en equilibrio.",
                icon: MindBodyBalanceIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Longevidad potencial",
                description: "Con el estilo de vida adecuado, tienes una tendencia natural a envejecer con gracia y alcanzar edades significativas.",
                icon: PotentialLongevityIcon,
                iconBgColor: "bg-orange-500",
            },
            {
                title: "Flexibilidad estructural",
                description: "Nervudo y flexible físicamente, reflejando tu adaptabilidad mental y biológica.",
                icon: StructuralFlexibilityIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        physicalAndMetabolic: [
            {
                title: "Cuerpo",
                points: ["Tendencia a un cuerpo nervudo y flexible, con tendones visibles.", "Torso habitualmente más largo que las piernas, generalmente de estatura media a baja.", "Sistema digestivo sensible: necesita una dieta específica para evitar el crecimiento bacteriano excesivo en el tracto digestivo."]
            },
            {
                title: "Mente y conducta",
                points: ["Actitud calmada, centrada y con exuberancia natural.", "Profunda relación con la naturaleza y alma de artista.", "Necesidad de expresión creativa para mantener la salud y el equilibrio. Equilibrio mental que puede verse comprometido con una mala alimentación o estrés excesivo."]
            },
            {
                title: "Vulnerabilidades",
                points: ["Sistema inmune que tarda en activarse contra bacterias y parásitos.", "Tendencia a tolerar microbios malignos en vez de eliminarlos.", "Riesgo de crecimiento bacteriano excesivo en el tracto digestivo con dietas inadecuadas. Puede volverse excesivamente centrado en los detalles cuando está desequilibrado."]
            },
            {
                title: "Riesgos para la Salud",
                points: ["Infecciones de oído crónicas en la infancia.", "Problemas pulmonares, estomacales e intestinales crónicos. Infecciones bacterianas persistentes.", "Riesgo potencialmente elevado de cáncer de mama en edades avanzadas. Vigilancia inmune deficiente que implica vulnerabilidad a infecciones."]
            }
        ],
        foodPlan: {
            title: "Características del plan de alimentos",
            description: "La dieta del genotipo 3 se basa principalmente en vegetales, está diseñada para mantener un equilibrio saludable en tu flora intestinal y es rica en nutrientes metilantes y fitoquímicos, todo pensado especialmente para optimizar tu salud y rendimiento.",
            sections: [
                { title: "Nutrientes metilantes", points: ["Rico en nutrientes metilantes, incluyendo vitamina B12, colina y metionina para una óptima salud celular. Capacidad de activar o desactivar genes."] },
                { title: "Composición corporal saludable", points: ["Aumenta la masa muscular y reduce la grasa corporal, favorecendo una composición corporal equilibrada."] },
                { title: "Equilibrio intestinal saludable", points: ["Evita el crecimiento excesivo de bacterias no beneficiosas en tu sistema digestivo, manteniendo un ambiente intestinal saludable."] },
                { title: "Fortalecimiento de defensas", points: ["Mantiene tu sistema inmunológico en un estado óptimo, ni demasiado activo ni demasiado pasivo, para protegerte adecuadamente."] },
                { title: "Limpieza natural y detoxificación eficiente", points: ["Apoya la capacidad natural de tu hígado para eliminar toxinas y sustancias dañinas, manteniendo tu cuerpo limpio por dentro."] },
                { title: "Mejora tu estado de ánimo", points: ["Incluye alimentos que favorecen la producción de neurotransmisores relacionados con la sensación de bienestar y satisfacción."] },
                { title: "Claridad mental", points: ["Contiene nutrientes específicos que ayudan a mantener la concentración, el equilibrio emocional y una mente serena."] }
            ]
        },
        foodsToAvoid: {
            title: "Alimentos a evitar",
            description: "La dieta del genotipo 3 está basada en vegetales, baja en crecimiento microbiano y glicotoxinas, rica en nutrientes y baja en glicotoxinas, diseñada específicamente para optimizar tu salud y rendimiento.",
            sections: [
                { title: "Exceso de proteína animal", points: ["Las carnes rojas y grasas animales pueden causar un crecimiento excesivo de bacterias en el tracto digestivo. Si basan su dieta en un exceso de carne, desarrollan gradualmente una gran cantidad de bacterias que pueden bloquear su metabolismo y sistema inmune."] },
                { title: "Alimentos que promueven la inflamación", points: ["Evita alimentos que aumenten la inflamación en el sistema digestivo. Estos pueden contribuir a problemas como gastritis y otras afecciones parecidas."] },
                { title: "Alimentos procesados", points: ["Los alimentos altamente procesados con conservantes y aditivos pueden sobrecargar el sistema detoxificante y comprometer la salud del Maestro."] },
                { title: "Grasas saturadas", points: ["El consumo excesivo de grasas saturadas puede ser problemático ya que los Maestros carecen de las enzimas necesarias para digerir y metabolizar adecuadamente la grasa animal."] },
                { title: "Alimentos que afectan el equilibrio intestinal", points: ["Algunos alimentos pueden alterar la flora intestinal beneficiosa y promover el crecimiento de bacterias patógenas, lo que es especialmente problemático para el Maestro."] }
            ]
        }
    },
    4: {
        id: 4,
        name: "Explorer",
        title: "GenoTipo Explorer",
        tagline: "Tu perfil genético ancestral: Adaptabilidad, innovación y resistencia para el mundo moderno.",
        essence: {
            title: "La esencial del explorer",
            quote: "“Solucionar lo inesperado”",
            description: "Esta frase captura perfectamente tu naturaleza adaptativa e ingeniosa: eres una persona con una increíble capacidad para resolver problemas biológicos de manera innata, adaptándote a los cambios del entorno con ingenio y creatividad."
        },
        characteristics1: [
            {
                title: "Sistema detoxificante eficiente",
                description: "Funcionas mejor con ciclos de desintoxicación regulares. Tu cuerpo tiene una notable capacidad para reparar genes y recuperarse de enfermedades.",
                icon: DetoxSystemIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Sensibilidad química elevada",
                description: "Tu cuerpo reacciona intensamente a sustancias como la cafeína, perfumes y medicamentos. Posees una sensibilidad que te convierte en un “canario en la mina” para detectar sustancias dañinas.",
                icon: AdrenergicResponseIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Regeneración genética",
                description: "Funcionas mejor con ciclos de desintoxicación regulares. Tu cuerpo tiene una notable capacidad para reparar genes y recuperarse de enfermedades.",
                icon: GeneticRegenerationIcon,
                iconBgColor: "bg-cyan-500",
            },
        ],
        characteristics2: [
            {
                title: "Pensamiento lateral",
                description: "Tu mente es naturalmente divergente y creativa, capaz de encontrar soluciones innovadoras y ver conexiones que otros no perciben.",
                icon: DetailOrientationIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Multiusos genético",
                description: "Los Exploradores pueden pertenecer a cualquier grupo sanguíneo, mostrando una flexibilidad biológica excepcional.",
                icon: BloodTypeIcon,
                iconBgColor: "bg-cyan-500",
            },
            {
                title: "Metabolismo detoxificante",
                description: "Tu hígado suele ser muy eficaz en la eliminación de toxinas, aunque requiere el apoyo adecuado de nutrientes específicos.",
                icon: EfficientMetabolismIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Resistencia física",
                description: "Capacidad natural para resistir y recuperarse de desafíos físicos cuando estás en equilibrio.",
                icon: PhysicalResistanceIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Alta capacidad de reparación",
                description: "Con buena nutrición, tu capacidad para reparar daños celulares y ADN es superior a la media.",
                icon: HighRepairCapacityIcon,
                iconBgColor: "bg-orange-500",
            },
            {
                title: "Simultaneidad visual",
                description: "Especial habilidad para escanear y procesar diversos estímulos visuales y sensoriales al mismo tiempo.",
                icon: VisualSimultaneityIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        physicalAndMetabolic: [
            {
                title: "Cuerpo",
                points: ["Tendencia a un cuerpo musculoso (mesomorfo).", "Cabeza ancha con rasgos faciales cincelados y mandíbula cuadrada. A menudo el torso es más largo que las piernas.", "Asimetría natural: los dedos índice y anular suelen tener huellas dactilares diferentes."]
            },
            {
                title: "Mente y conducta",
                points: ["Pensador lateral, enfocado en conceptos y percepciones cambiantes.", "Personalidad creativa y estrafalaria con alta capacidad emprendedora.", "Inteligencia por encima de la media con gran curiosidad. Alto rendimiento en actividades que requieren pensamiento innovador y adaptación rápida."]
            },
            {
                title: "Vulnerabilidades",
                points: ["Hipersensibilidad ambiental y química.", "Propenso a accidentes por su tendencia a la exploración. Puede ser difícil de diagnosticar médicamente.", "Tendencia a irregularidades en la sangre y posible anemia."]
            },
            {
                title: "Riesgos para la Salud",
                points: ["Diabetes tipo 1.", "Alergias a alimentos y al entorno. Autismo, dislexia, epilepsia en algunos casos.", "Problemas de hígado e infecciones por levaduras. Posible riesgo de cáncer de mama (especialmente en mujeres del tipo sanguíneo A y zurdas)."]
            }
        ],
        foodPlan: {
            title: "Características del plan de alimentos",
            description: "La dieta del Explorador está diseñada para desintoxicar y nutrir la sangre y la médula ósea, ayudándote a mantener tu capacidad adaptativa y energía óptima.",
            sections: [
                { title: "Soporte a la desintoxicación", points: ["Incluye alimentos que ayudan a tu cuerpo a eliminar toxinas de manera eficiente, apoyando tu habilidad natural para la desintoxicación."] },
                { title: "Fortalecimiento sanguíneo", points: ["Alimentos ricos en nutrientes que fortalecen la sangre con elementos esenciales como selenio, hierro y vitaminas del complejo B."] },
                { title: "Apoyo hepático", points: ["Contiene ingredientes que estimulan el hígado en sus mecanismos de biotransformación, mejorando tu capacidad de procesamiento de toxinas."] },
                { title: "Desintoxicación integral", points: ["Mejora las vías de desintoxicación hepática de Fase I y Fase II, así como la vía renal, para una limpieza completa del organismo."] },
                { title: "Nutrición celular optimizada", points: ["Proporciona nutrientes específicos que ayudan a la regeneración celular y la reparación del ADN."] },
                { title: "Equilibrio bioquímico", points: ["Ayuda a mantener el equilibrio de neurotransmisores y hormonas para un óptimo funcionamiento mental."] },
                { title: "Protección antioxidante", points: ["Rica en antioxidantes que protegen contra el daño oxidativo celular, especialmente importante para tu perfil genético."] }
            ]
        },
        foodsToAvoid: {
            title: "Alimentos a evitar",
            description: "Tu perfil Explorador requiere una alimentación desintoxicante y nutritiva para la sangre, evitando ciertos alimentos que pueden comprometer tu energía y bienestar.",
            sections: [
                { title: "Toxinas y mohos", points: ["Evita alimentos con potencial de contaminación por mohos como algunos cereales, nueces, semillas y lácteos. Estos pueden sobrecargar tu sistema de desintoxicación hepática."] },
                { title: "Posibles carcinógenos", points: ["Mantén distancia de alimentos procesados, ahumados o con aditivos que puedan contener sustancias potencialmente dañinas para tu ADN."] },
                { title: "Alimentos con lectinas problemáticas", points: ["Algunos alimentos contienen lectinas que pueden afectar negativamente tu sistema digestivo e inmunológico, siendo importantes a evitar para tu genotipo."] },
                { title: "Irritantes intestinales", points: ["Productos lácteos y alimentos que contienen moho y hongos. Muchos alimentos que contienen moho y hongos pueden causar un aumento de la inflamación en los Hunters."] },
                { title: "Alergenos comunes", points: ["Presta especial atención a alimentos que frecuentemente causan reacciones en exploradores, como ciertos frutos secos, lácteos, gluten o mariscos específicos."] }
            ]
        }
    },
    5: {
        id: 5,
        name: "Warrior",
        title: "Genotipo Warrior",
        tagline: "Tu perfil genético ancestral: Fuerza, determinación y resistencia para el mundo moderno.",
        essence: {
            title: "La esencial del warrior",
            quote: "“Perseverar hasta dominar”",
            description: "Esta frase captura perfectamente tu naturaleza determinada y tenaz: eres una persona con una increíble capacidad para la concentración intensa, optimizada para superar desafíos complejos y dominar habilidades con determinación inquebrantable."
        },
        characteristics1: [
            {
                title: "Sistema circulatorio activo",
                description: "Mayor tendencia a la circulación rápida y la coagulación eficiente. Tu cuerpo produce y responde intensamente a señales circulatorias, con tendencia al rubor facial.",
                icon: ImmuneSystemIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Capacidad cognitiva elevada",
                description: "Tu mente trabaja como un ordenador: rápida, ágil y persistente ante desafíos mentales. Posees una capacidad excepcional para la concentración profunda cuando un tema te interesa.",
                icon: AdrenergicResponseIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Metabolismo cambiante",
                description: "Funcionas con gran eficiencia en la juventud, pero requieres ajustes específicos en la mediana edad. Tu metabolismo ahorrativo tiende a cambiar significativamente a lo largo de la vida.",
                icon: PulsatileEnergyIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        characteristics2: [
            {
                title: "Temperamento colérico",
                description: "Tu mente es naturalmente carismática e intensa, capaz de grandes logros cuando canalizas tu energía adecuadamente.",
                icon: DetailOrientationIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Grupo sanguíneo A o AB",
                description: "Los Guerreros suelen pertenecer a estos grupos, reflejando su evolución en entornos más sedentarios y organizados.",
                icon: BloodTypeIcon,
                iconBgColor: "bg-cyan-500",
            },
            {
                title: "Fuerza impresionante",
                description: "Cabeza dolicocéfala (alargada) y piernas proporcionalmente más largas que el torso, mostrando tu adaptación única.",
                icon: EfficientMetabolismIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Fuerza impresionante",
                description: "\"Fuerte como un buey\" describe tu capacidad física natural, especialmente en tu juventud.",
                icon: HighEnergyIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Cambio metabólico",
                description: "Esbelto en la juventud, con tendencia a acumular peso en la mediana edad si no se mantiene el estilo de vida adecuado.",
                icon: MetabolicEfficiencyIcon,
                iconBgColor: "bg-orange-500",
            },
            {
                title: "Mente incansable",
                description: "Inexorable frente a los desafíos mentales hasta dominarlos, con una capacidad de concentración que hace que \"el tiempo pase volando\".",
                icon: InnatePhysicalResistanceIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        physicalAndMetabolic: [
            {
                title: "Cuerpo",
                points: ["Piernas habitualmente más largas que el torso.", "Cabeza dolicocéfala (alargada) con perfil de mandíbula ovalado y suave. Esbelto de joven; con tendencia a ensancharse en el pecho o formar figura de pera con la edad.", "Piel con tendencia a ruborizarse por su actividad circulatoria elevada."]
            },
            {
                title: "Mente y conducta",
                points: ["Temperamento colérico: carismático aunque ocasionalmente de mal humor.", "Mente rápida y ágil que necesita estímulo constante. Necesita aprender técnicas de relajación para equilibrarse.", "Capacidad de concentración intensa que hace que pierda la noción del tiempo."]
            },
            {
                title: "Vulnerabilidades",
                points: ["Resistencia a la insulina y tendencia a la obesidad en la mediana edad.", "Problemas digestivos crónicos: retortijones o hinchazón abdominal. Metabolismo ahorrativo que acumula calorías como grasa.", "La tensión tiende a suprimir el sistema inmune y espesar la sangre."]
            },
            {
                title: "Riesgos para la Salud",
                points: ["Enfermedades cardiovasculares.", "Desequilibrio hormonal e infertilidad en personas jóvenes. Síndrome metabólico.", "Tendencia al envejecimiento prematuro si no se mantiene el estilo de vida adecuado. Problemas circulatorios."]
            }
        ],
        foodPlan: {
            title: "Características del plan de alimentos",
            description: "La dieta del Guerrero se basa en principios mediterráneos modificados, incorporando pescados, aceites saludables, granos, vegetales y frutas específicas para tu perfil genético.",
            sections: [
                { title: "Nutrición epigenética", points: ["Rica en nutrientes que regulan la expresión genética, ayudando a reprogramar positivamente tus genes para un mejor funcionamiento."] },
                { title: "Protección cardiovascular", points: ["Contiene alimentos ricos en nutrientes que protegen las arterias y el corazón, fundamentales para tu sistema circulatorio activo."] },
                { title: "Propiedades anti-envejecimiento", points: ["Incluye ingredientes que ayudan a ralentizar tu reloj biológico, contrarrestando la tendencia natural al envejecimiento acelerado."] },
                { title: "Balance de ácidos grasos", points: ["Proporciona un equilibrio óptimo entre ácidos grasos omega-3 y omega-6, cruciales para mantener la inflamación bajo control."] },
                { title: "Abundancia de fitonutrientes", points: ["Rica en compuestos vegetales protectores que actúan como escudo contra el deterioro celular."] },
                { title: "Regulación del azúcar sanguíneo", points: ["Ayuda a estabilizar los niveles de glucosa, previniendo los picos que contribuyen al síndrome metabólico."] },
                { title: "Apoyo hormonal", points: ["Contiene alimentos que favorecen el equilibrio hormonal, especialmente importante en tu perfil metabólico cambiante."] }
            ]
        },
        foodsToAvoid: {
            title: "Alimentos a evitar",
            description: "Tu perfil Guerrero requiere una alimentación que proteja tu sistema cardiovascular y equilibre tu metabolismo cambiante para mantener salud y vitalidad.",
            sections: [
                { title: "Carnes rojas y grasas trans", points: ["Evita estos alimentos que pueden incrementar la inflamación arterial y comprometer tu salud cardiovascular, especialmente vulnerable en tu genotipo."] },
                { title: "Alimentos de alto índice glucémico", points: ["Reduce el consumo de alimentos que elevan rápidamente el azúcar en sangre, ya que pueden empeorar la resistencia a la insulina que tiende a desarrollarse en la mediana edad."] },
                { title: "Irritantes digestivos", points: ["Limita alimentos que puedan agravar tus problemas digestivos crónicos como el hinchazón abdominal o los retortijones intestinales."] },
                { title: "Alimentos procesados", points: ["Los alimentos altamente procesados con conservantes y aditivos artificiales pueden acelerar el proceso de envejecimiento, ya de por sí acelerado en tu perfil genético."] },
                { title: "Estimulantes fuertes", points: ["El exceso de cafeína y otros estimulantes puede aumentar la tensión, que en tu caso tiende a suprimir el sistema inmune y espesar la sangre, comprometiendo tu salud general."] }
            ]
        }
    },
    6: {
        id: 6,
        name: "Nomad",
        title: "Genotipo Nomad",
        tagline: "Tu perfil genético ancestral: Adaptabilidad, resiliencia y sensibilidad para el mundo moderno.",
        essence: {
            title: "La esencial del nomad:",
            quote: "“Capear el temporal con ingenio”",
            description: "Esta frase captura perfectamente tu naturaleza resiliente y adaptativa: eres una persona con una increíble conexión mente-cuerpo, optimizada para adaptarse a entornos cambiantes y altitudes diversas con una silenciosa pero poderosa determinación."
        },
        characteristics1: [
            {
                title: "Sensibilidad ambiental única",
                description: "Mayor sensibilidad a las condiciones del entorno, especialmente a los cambios de altitud y presión atmosférica. Tu cuerpo responde intensamente a las variaciones geográficas y ambientales.",
                icon: TolerantImmuneSystemIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Fortaleza mental silenciosa",
                description: "Personalidad flemática, capaz de mantener la calma ante situaciones adversas. Gran capacidad para utilizar la visualización para mejorar tu salud y recuperación.",
                icon: MentalResistanceIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Conexión mente-cuerpo excepcional",
                description: "Funcionas mejor cuando cultivas la armonía entre los aspectos físicos y mentales. Posees una capacidad natural para el manejo del estrés cuando estás en equilibrio.",
                icon: MindBodyBalanceIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        characteristics2: [
            {
                title: "Temperamento flemático",
                description: "Tu personalidad es naturalmente calmada y racional, con tendencia al optimismo y amor por la diversión, aunque sueles ocultar tus emociones.",
                icon: DetailOrientationIcon,
                iconBgColor: "bg-pink-500",
            },
            {
                title: "Grupo sanguíneo A o AB",
                description: "Los Nómadas suelen pertenecer a estos grupos, reflejando una historia evolutiva específica.",
                icon: BloodTypeIcon,
                iconBgColor: "bg-cyan-500",
            },
            {
                title: "Estaturas extremas",
                description: "Tu desarrollo fetal fue influenciado por la altitud, resultando en personas particularmente altas o bajas, raramente de estatura promedio.",
                icon: ExtremeStaturesIcon,
                iconBgColor: "bg-green-500",
            },
            {
                title: "Visualización natural",
                description: "Capacidad innata para utilizar técnicas de visualización que benefician tu salud y procesos de recuperación.",
                icon: PhysicalResistanceIcon,
                iconBgColor: "bg-purple-500",
            },
            {
                title: "Sistema inmune equilibrado",
                description: "Cuando estás sano, tu sistema inmunológico mantiene un balance óptimo, siendo menos propenso a alergias e inflamación.",
                icon: HighRepairCapacityIcon,
                iconBgColor: "bg-orange-500",
            },
            {
                title: "Líneas blancas en huellas dactilares",
                description: "Marca distintiva de tu genotipo, relacionada con la sensibilidad digestiva e intolerancia al gluten.",
                icon: VisualSimultaneityIcon,
                iconBgColor: "bg-blue-500",
            },
        ],
        physicalAndMetabolic: [
            {
                title: "Cuerpo",
                points: ["Físicamente simétrico con piernas normalmente más largas que el torso.", "Cabeza cuadrada y dientes pequeños, a menudo con incisivos en forma de pala. Mayor frecuencia de pelirrojos y personas con ojos verdes que la población general.", "Alta frecuencia de huellas dactilares con lazos cubitales, un patrón distintivo."]
            },
            {
                title: "Mente y conducta",
                points: ["Personalidad silenciosa pero ingeniosa y generalmente optimista.", "Racional y amante de la diversión, aunque con tendencia a ocultar emociones. Gran capacidad para utilizar técnicas de visualización para mejorar la salud.", "Personalidad “de capear el temporal” con calma ante la adversidad."]
            },
            {
                title: "Vulnerabilidades",
                points: ["Tracto digestivo sensible, posible intolerancia al gluten.", "Los efectos variables dificultan el diagnóstico médico preciso. Tendencia a infecciones lentas y persistentes como trastornos virales, verrugas o parásitos.", "Se cansan con facilidad si no mantienen el equilibrio adecuado."]
            },
            {
                title: "Riesgos para la Salud",
                points: ["Enfermedades neurodegenerativas de evolución lenta.", "Problemas con el óxido nítrico que pueden interferir en un envejecimiento saludable. Mayor índice de enfermedades autoinmunes como lupus o esclerosis múltiple.", "El hígado y el bazo pueden ser áreas problemáticas, con riesgo de enfermedades inflamatorias."]
            }
        ],
        foodPlan: {
            title: "Características del plan de alimentos",
            description: "La dieta del Nómada es omnívora, baja en lectinas y gluten, diseñada para optimizar la producción de óxido nítrico y regenerar la mucosa intestinal.",
            sections: [
                { title: "Nutrición epigenética optimizada", points: ["Rica en nutrientes que regulan la expresión de tus genes, proporcionando las señales adecuadas para un funcionamiento óptimo de tu organismo."] },
                { title: "Equilibro de óxido nítrico", points: ["Contiene alimentos que optimizan la producción y regulación del óxido nítrico, fundamental para tu salud cardiovascular y neurológica."] },
                { title: "Regeneración intestinal", points: ["Incluye ingredientes que ayudan a sanar y regenerar la mucosa intestinal, mejorando tu sensibilidad digestiva característica."] },
                { title: "Estabilización de glucosa", points: ["Alimentos que mantienen niveles estables de azúcar en sangre, evitando la hipoglucemia a la que puedes ser propenso."] },
                { title: "Soporte neurológico", points: ["Contiene nutrientes especiales que protegen el sistema nervioso, previniendo problemas neurodegenerativos a largo plazo."] },
                { title: "Desintoxicación hepática", points: ["Apoya la función de tu hígado, uno de tus órganos más vulnerables, favoreciendo la eliminación eficiente de toxinas."] },
                { title: "Fortalecimiento inmunológico", points: ["Ayuda a mantener el equilibrio de tu sistema inmune, reduciendo el riesgo de enfermedades autoinmunes sin comprometer tu defensa contra infecciones."] }
            ]
        },
        foodsToAvoid: {
            title: "Alimentos a evitar",
            description: "La dieta del Nómada es omnívora, baja en lectinas y gluten. Evitar ciertos alimentos es clave para optimizar la producción de óxido nítrico y la salud intestinal.",
            sections: [
                { title: "Alimentos con gluten", points: ["Evita productos que contengan gluten, ya que tu tracto digestivo tiende a ser particularmente sensible a esta proteína, pudiendo causar inflamación y daño intestinal."] },
                { title: "Irritantes intestinales", points: ["Limita alimentos que puedan irritar tu mucosa intestinal, como ciertos lácteos, alimentos picantes o estimulantes fuertes, que pueden comprometer tu salud digestiva."] },
                { title: "Alimentos que causan hipoglucemia", points: ["Reduce el consumo de carbohidratos refinados y azúcares simples que pueden provocar bajadas bruscas de glucosa, afectando tu energía y claridad mental."] },
                { title: "Alimentos ricos en lectinas problemáticas", points: ["Algunos alimentos con alto contenido de lectinas pueden ser especialmente problemáticos para tu genotipo, aumentando la permeabilidad intestinal."] },
                { title: "Alimentos procesados con aditivos", points: ["Los productos altamente procesados pueden contener compuestos que interfieren con la producción óptima de óxido nítrico, fundamental para tu salud."] }
            ]
        }
    }
};