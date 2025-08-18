import type { GenotypeStrengthMeter } from './types';

export const genotypeStrengthMeters: GenotypeStrengthMeter[] = [
    {
        genotypeId: 1,
        genotypeName: "GT1 Cazador",
        maxPoints: 37,
        measurements: [
            {
                id: "gt1_01",
                statement: "Líneas blancas en tus huellas dactilares",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt1_02",
                statement: "Supergustador de PROP",
                points: 5,
                category: "taste"
            },
            {
                id: "gt1_03",
                statement: "Comparando las manos derecha e izquierda, cuatro huellas dactilares o más coinciden",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt1_04",
                statement: "Incisivos en forma de pala",
                points: 3,
                category: "dental"
            },
            {
                id: "gt1_05",
                statement: "Cuerpo larguirucho (ectomorfo)",
                points: 3,
                category: "body_type"
            },
            {
                id: "gt1_06",
                statement: "Rodillas muy separadas",
                points: 3,
                category: "physical"
            },
            {
                id: "gt1_07",
                statement: "Mandíbula cuadrada",
                points: 3,
                category: "dental"
            },
            {
                id: "gt1_08",
                statement: "Entre los padres, abuelos hermanos y en el paciente ha habido dos casos o más de enfermedad autoinmune (lupus, artritis reumatoide, esclerosis múltiple)",
                points: 3,
                category: "family_history"
            }
        ]
    },
    {
        genotypeId: 2,
        genotypeName: "GT2 Recolector",
        maxPoints: 37,
        measurements: [
            {
                id: "gt2_01",
                statement: "Comparando las manos derecha e izquierda, hay tres huellas dactilares o más que no coinciden",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt2_02",
                statement: "No gustador de PROP",
                points: 5,
                category: "taste"
            },
            {
                id: "gt2_03",
                statement: "La piel se ve acolchada, e incluso en las zonas donde no hay tejido graso",
                points: 5,
                category: "physical"
            },
            {
                id: "gt2_04",
                statement: "Cúspide adicional en el primer molar",
                points: 3,
                category: "dental"
            },
            {
                id: "gt2_05",
                statement: "Mandíbula y la cara en forma de almendra (ángulo gonial abierto)",
                points: 3,
                category: "dental"
            },
            {
                id: "gt2_06",
                statement: "Cuerpo redondeado (endomorfo) o una proporción cintura-caderas alta",
                points: 3,
                category: "body_type"
            },
            {
                id: "gt2_07",
                statement: "Rodillas poco separadas o incluso se tocan",
                points: 3,
                category: "physical"
            },
            {
                id: "gt2_08",
                statement: "Entre los padres, abuelos hermanos y en el paciente ha habido dos casos o más de diabetes, ataque al corazón o presión sanguínea alta",
                points: 3,
                category: "family_history"
            }
        ]
    },
    {
        genotypeId: 3,
        genotypeName: "GT3 Maestro",
        maxPoints: 37,
        measurements: [
            {
                id: "gt3_01",
                statement: "Cinco huellas dactilares o más en forma de espiral",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt3_02",
                statement: "Se pueden ver los tendones bajo la piel de la muñeca",
                points: 5,
                category: "physical"
            },
            {
                id: "gt3_03",
                statement: "Un gustador de PROP",
                points: 5,
                category: "taste"
            },
            {
                id: "gt3_04",
                statement: "Cúspide adicional en el primer molar",
                points: 3,
                category: "dental"
            },
            {
                id: "gt3_05",
                statement: "Mandíbula y la cara cuadrada (ángulo gonial cerrado)",
                points: 3,
                category: "dental"
            },
            {
                id: "gt3_06",
                statement: "Cuerpo esbelto y musculoso (meso-ectomorfo) o una proporción cintura-caderas ideal",
                points: 3,
                category: "body_type"
            },
            {
                id: "gt3_07",
                statement: "Rodillas muy separadas",
                points: 3,
                category: "physical"
            },
            {
                id: "gt3_08",
                statement: "Entre los padres, abuelos hermanos y el paciente ha habido dos casos o más de cancer",
                points: 3,
                category: "family_history"
            }
        ]
    },
    {
        genotypeId: 4,
        genotypeName: "GT4 Explorador",
        maxPoints: 37,
        measurements: [
            {
                id: "gt4_01",
                statement: "Rh negativo",
                points: 5,
                category: "physical"
            },
            {
                id: "gt4_02",
                statement: "Un supergustador de PROP",
                points: 5,
                category: "taste"
            },
            {
                id: "gt4_03",
                statement: "Sensible a la cafeína. Tomar cafe con la cena te mantiene despierto toda la noche",
                points: 5,
                category: "caffeine_sensitivity"
            },
            {
                id: "gt4_04",
                statement: "Zurdo o ambidextro",
                points: 3,
                category: "physical"
            },
            {
                id: "gt4_05",
                statement: "Mandíbula y la cara cuadrada (ángulo gonial cerrado)",
                points: 3,
                category: "dental"
            },
            {
                id: "gt4_06",
                statement: "Cuerpo musculoso (mesomorfo) o una proporción cintura-caderas ideal",
                points: 3,
                category: "body_type"
            },
            {
                id: "gt4_07",
                statement: "Cabeza ancha y corta (braquicéfalo)",
                points: 3,
                category: "head_shape"
            },
            {
                id: "gt4_08",
                statement: "Dedos índices tienen huellas dactilares diferentes",
                points: 3,
                category: "fingerprints"
            }
        ]
    },
    {
        genotypeId: 5,
        genotypeName: "GT5 Guerrero",
        maxPoints: 37,
        measurements: [
            {
                id: "gt5_01",
                statement: "Cabeza alargada (dolicocéfalo)",
                points: 5,
                category: "head_shape"
            },
            {
                id: "gt5_02",
                statement: "No gustador de PROP",
                points: 5,
                category: "taste"
            },
            {
                id: "gt5_03",
                statement: "Dos huellas dactilares o más de tipo arco",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt5_04",
                statement: "Cuerpo entre musculoso y redondeado (mesoendomorfo) o una proporción cintura-caderas altas",
                points: 3,
                category: "body_type"
            },
            {
                id: "gt5_05",
                statement: "Mandíbula y la cara en forma de almendra (ángulo gonial abierto)",
                points: 3,
                category: "dental"
            },
            {
                id: "gt5_06",
                statement: "Cúspide adicional en el primer molar",
                points: 3,
                category: "dental"
            },
            {
                id: "gt5_07",
                statement: "Las bebidas con cafeína no afectan especialmente",
                points: 3,
                category: "caffeine_sensitivity"
            },
            {
                id: "gt5_08",
                statement: "Entre los padres, abuelos, hermanos y el paciente ha habido dos o más casos de diabetes, ataque al corazón o enfermedades cardiacas",
                points: 3,
                category: "family_history"
            }
        ]
    },
    {
        genotypeId: 6,
        genotypeName: "GT6 Nómada",
        maxPoints: 37,
        measurements: [
            {
                id: "gt6_01",
                statement: "Líneas blancas en tus huellas dactilares",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt6_02",
                statement: "Ocho huellas dactilares o más de tipo lazo",
                points: 5,
                category: "fingerprints"
            },
            {
                id: "gt6_03",
                statement: "Gustador de PROP",
                points: 5,
                category: "taste"
            },
            {
                id: "gt6_04",
                statement: "Comparando las manos derecha e izquierda, cuatro huellas dactilares o más coinciden",
                points: 3,
                category: "fingerprints"
            },
            {
                id: "gt6_05",
                statement: "Cabeza ancha y corta (braquicéfalo)",
                points: 3,
                category: "head_shape"
            },
            {
                id: "gt6_06",
                statement: "Incisivos en forma de pala",
                points: 3,
                category: "dental"
            },
            {
                id: "gt6_07",
                statement: "Mandíbula y la cara en forma de almendra (ángulo gonial abierto)",
                points: 3,
                category: "dental"
            },
            {
                id: "gt6_08",
                statement: "Entre los padres, abuelos, hermanos y el paciente ha habido dos o más casos de depresión clínica o disfunción cognitiva como el alzheimer",
                points: 3,
                category: "family_history"
            }
        ]
    }
];

// Función helper para obtener el medidor de fuerza por ID de genotipo
export const getGenotypeStrengthMeter = (genotypeId: number): GenotypeStrengthMeter | undefined => {
    return genotypeStrengthMeters.find(meter => meter.genotypeId === genotypeId);
};

// Función helper para obtener todos los medidores
export const getAllGenotypeStrengthMeters = (): GenotypeStrengthMeter[] => {
    return genotypeStrengthMeters;
};
