import type React from 'react';

export type Sex = 'hombre' | 'mujer';
export type FingerRelation = 'indice_mas_largo' | 'anular_mas_largo' | 'diferentes';
export type BloodType = 'A' | 'AB' | 'B' | 'O';
export type RhFactor = '+' | '-';
export type SecretorStatus = 'secretor' | 'no_secretor';

export interface BodyMeasurements {
    heightStanding: number;
    heightSitting: number;
    chairHeight: number;
    upperLegLength: number;
    lowerLegLength: number;
    indexFingerLeft: number;
    ringFingerLeft: number;
    indexFingerRight: number;
    ringFingerRight: number;
}

export interface CalculatedProportions {
    torsoLength: number;
    legLength: number;
    torsoLonger: boolean;
    upperSegmentLonger: boolean;
    fingerRelation: FingerRelation;
}

export interface UserData extends CalculatedProportions {
    bloodType: BloodType;
    rhFactor: RhFactor;
    secretorStatus: SecretorStatus;
    sex: Sex;
}

// Types for the complex genotype data structure in constants.ts
type GenotypeArray = number[];
type GenotypeBySex = { [key in Sex]?: number | GenotypeArray };
type GenotypeResult = number | GenotypeArray | GenotypeBySex;

export type SecretorData = {
    secretor: GenotypeResult;
    no_secretor: GenotypeResult;
};

export type BloodGroupData = {
    [bloodGroup: string]: SecretorData;
};

export type GenotypeTable = {
    [line: string]: BloodGroupData;
};

export interface GenotypeDetailData {
    id: number;
    name: string;
    title: string;
    tagline: string;
    essence: {
        title: string;
        quote: string;
        description: string;
    };
    characteristics1: {
        title: string;
        description: string;
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        iconBgColor: string;
    }[];
    characteristics2: {
        title: string;
        description: string;
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        iconBgColor: string;
    }[];
    physicalAndMetabolic: {
        title: string;
        points: string[];
    }[];
    foodPlan: {
        title: string;
        description: string;
        sections: {
            title: string;
            points: string[];
        }[];
    };
    foodsToAvoid: {
        title: string;
        description: string;
        sections: {
            title: string;
            points: string[];
        }[];
    };
}

// Types for Genotype Strength Meter System
export interface BiometricMeasurement {
    id: string;
    statement: string;
    points: number;
    category: 'fingerprints' | 'taste' | 'physical' | 'dental' | 'family_history' | 'caffeine_sensitivity' | 'body_type' | 'head_shape';
}

export interface GenotypeStrengthMeter {
    genotypeId: number;
    genotypeName: string;
    measurements: BiometricMeasurement[];
    maxPoints: number;
}

export interface BiometricResult {
    genotypeId: number;
    selectedMeasurements: string[];
    totalPoints: number;
    strengthPercentage: number;
    timestamp: Date;
}

export interface GenotypeStrengthData {
    userId?: string;
    results: BiometricResult[];
    calculatedGenotype?: number;
    lastUpdated: Date;
}

// New Types for Food Guide
export interface FoodItem {
  nombre: string;
  estado: "Superalimento" | "Toxina";
  marcador_especial: string | null;
  notas: string | null;
}

export type FoodCategory = FoodItem[];

export interface SpecialSymbol {
    etiqueta: string;
    descripcion: string;
}

export interface GenotypeInfo {
    nombre: string;
    descripcion: string;
    fuente: string;
    regla_neutros: string;
    simbolos: {
        [key: string]: SpecialSymbol;
    };
}

export interface FoodGuideData {
    genotipo_info: GenotypeInfo;
    categorias_alimentos: {
        [categoryName: string]: FoodCategory;
    };
}

// AI Assistant Types
export interface AIPersonalData {
  // Datos básicos
  age: string;
  sex: 'masculino' | 'femenino' | 'otro';
  
  // Datos físicos
  height: string;
  weight: string;
  activityLevel: 'sedentario' | 'ligero' | 'moderado' | 'activo' | 'muy_activo';
  
  // Datos clínicos
  healthConditions: string;
  allergies: string;
  medications: string;
  bloodType: 'A' | 'AB' | 'B' | 'O' | '';
  rhFactor: '+' | '-' | '';
  
  // Historial médico
  familyHistory: string;
  previousSurgeries: string;
  chronicConditions: string;
  
  // Objetivos y preferencias
  goals: string;
  dietaryRestrictions: string;
  foodPreferences: string;
  
  // Estilo de vida
  sleepHours: string;
  stressLevel: 'bajo' | 'moderado' | 'alto' | 'muy_alto';
  exerciseFrequency: string;
}

export interface AIAssistantProps {
  foodData: FoodGuideData;
}

// Chatbot types
export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}