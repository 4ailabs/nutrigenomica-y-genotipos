import React, { useState } from 'react';
import {
    ArrowLeft,
    Search,
    User,
    Dna,
    Apple,
    CheckCircle,
    XCircle,
    Info,
    Heart,
    Target,
    Zap,
    Leaf,
    Shield,
    TrendingUp,
    Beef,
    Fish,
    Egg,
    Milk,
    Wheat,
    Carrot,
    Utensils,
    AlertTriangle,
    Star,
    Clock,
    Scale,
    Activity,
    // Iconos únicos para cada genotipo
    Crosshair,
    Package,
    Crown,
    Compass,
    Sword,
    Mountain,
    // Iconos para menús
    Sun,
    Moon,
    ChevronRight,
    ChevronDown,
    ChefHat
} from 'lucide-react';
import { GENOTYPE_DATA } from '../genotypeData';
import { FOOD_GUIDE_DATA } from '../foodData';
import { GENOTYPE_COLORS } from '../constants';
import type { FoodGuideData } from '../types';
import GenotypeMenus from './GenotypeMenus';
import GenotypeRecipes from './GenotypeRecipes';


interface PatientViewProps {
    onBackToMain: () => void;
}

const PatientView: React.FC<PatientViewProps> = ({ onBackToMain }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenotype, setSelectedGenotype] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'genotype' | 'foods' | 'menus' | 'recipes'>('genotype');
    const [openSections, setOpenSections] = useState<Set<string>>(new Set(['essence'])); // Por defecto solo la esencia está abierta

    const handleGenotypeSelect = (genotypeId: number) => {
        setSelectedGenotype(genotypeId);
        setActiveTab('genotype');
        // Resetear secciones abiertas al cambiar de genotipo
        setOpenSections(new Set(['essence']));
    };

    const toggleSection = (sectionName: string) => {
        setOpenSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionName)) {
                newSet.delete(sectionName);
            } else {
                newSet.add(sectionName);
            }
            return newSet;
        });
    };

    const getFoodData = (): FoodGuideData | null => {
        if (!selectedGenotype) return null;
        return FOOD_GUIDE_DATA[selectedGenotype] || null;
    };

    const foodData = getFoodData();

    // Función para obtener el color del genotipo
    const getGenotypeColor = (genotypeId: number): string => {
        return GENOTYPE_COLORS[genotypeId] || 'bg-gray-500';
    };

    // Función para obtener el gradiente del genotipo
    const getGenotypeGradient = (genotypeId: number): string => {
        const baseColor = GENOTYPE_COLORS[genotypeId];
        if (!baseColor) return 'from-gray-500 to-gray-600';

        // Convertir el color base a un gradiente
        switch(genotypeId) {
            case 1: return 'from-pink-500 to-rose-600'; // Hunter
            case 2: return 'from-lime-500 to-green-600'; // Gatherer
            case 3: return 'from-purple-600 to-violet-700'; // Master
            case 4: return 'from-blue-500 to-indigo-600'; // Explorer
            case 5: return 'from-red-500 to-pink-600'; // Warrior
            case 6: return 'from-orange-500 to-amber-600'; // Nomad
            default: return 'from-gray-500 to-gray-600';
        }
    };

    // Función para obtener el icono de la categoría de alimentos
    const getCategoryIcon = (categoryName: string) => {
        const category = categoryName.toLowerCase();
        if (category.includes('carnes') || category.includes('res') || category.includes('pollo')) return <Beef className="w-5 h-5" />;
        if (category.includes('pescados') || category.includes('mariscos')) return <Fish className="w-5 h-5" />;
        if (category.includes('huevos')) return <Egg className="w-5 h-5" />;
        if (category.includes('lácteos') || category.includes('leche') || category.includes('queso')) return <Milk className="w-5 h-5" />;
        if (category.includes('cereales') || category.includes('granos') || category.includes('arroz')) return <Wheat className="w-5 h-5" />;
        if (category.includes('verduras') || category.includes('vegetales')) return <Carrot className="w-5 h-5" />;
        if (category.includes('frutas')) return <Apple className="w-5 h-5" />;
        if (category.includes('legumbres') || category.includes('frijoles')) return <Leaf className="w-5 h-5" />;
        if (category.includes('aceites') || category.includes('grasas')) return <Zap className="w-5 h-5" />;
        if (category.includes('especias') || category.includes('condimentos')) return <Utensils className="w-5 h-5" />;
        return <Utensils className="w-5 h-5" />;
    };

    // Función para obtener el icono del marcador especial
    const getSpecialMarkerIcon = (marcador: string) => {
        if (marcador.includes('Activador Metabólico') || marcador.includes('◊') || marcador.includes('diamante_')) {
            return <div className="w-4 h-4 bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">◊</span>
            </div>;
        }
        if (marcador.includes('Evitar 60 Días') || marcador.includes('•') || marcador.includes('punto_negro')) {
            return <div className="w-3 h-3 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">•</span>
            </div>;
        }
        return null;
    };

    // Función para obtener el símbolo visual correcto
    const getSymbolDisplay = (symbol: string) => {
        if (symbol.includes('diamante_')) {
            return <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-700 font-bold text-lg">◊</span>
            </div>;
        }
        if (symbol.includes('punto_negro')) {
            return <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-700 font-bold text-lg">•</span>
            </div>;
        }
        return <div className="w-6 h-6 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-700 font-bold text-sm">{symbol}</span>
        </div>;
    };

    // Función para obtener el icono único de cada genotipo
    const getGenotypeIcon = (genotypeId: number) => {
        switch(genotypeId) {
            case 1: return <Crosshair className="w-6 h-6 md:w-8 md:h-8 text-white" />; // Hunter
            case 2: return <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />; // Gatherer
            case 3: return <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" />; // Master
            case 4: return <Compass className="w-6 h-6 md:w-8 md:h-8 text-white" />; // Explorer
            case 5: return <Sword className="w-6 h-6 md:w-8 md:h-8 text-white" />; // Warrior
            case 6: return <Mountain className="w-6 h-6 md:w-8 md:h-8 text-white" />; // Nomad
            default: return <Dna className="w-6 h-6 md:w-8 md:h-8 text-white" />;
        }
    };

    const renderGenotypeInfo = () => {
        if (!selectedGenotype) return null;

        const genotype = GENOTYPE_DATA[selectedGenotype];
        if (!genotype) return null;

        return (
            <div className="space-y-6 md:space-y-8">
                {/* Acordeón de Características Mejorado */}
                {/* Esencia del Genotipo */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative z-0">
                        <button
                            onClick={() => toggleSection('essence')}
                            className="w-full p-5 md:p-7 text-left flex items-center justify-between hover:bg-blue-50/50 transition-all duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{genotype.essence.title}</h3>
                            </div>
                            <ChevronDown 
                                className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    openSections.has('essence') ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        {openSections.has('essence') && (
                            <div className="px-5 md:px-7 pb-5 md:pb-7 border-t-2 border-gray-100 bg-blue-50/30">
                                <blockquote className="text-xl md:text-2xl italic text-gray-800 mb-5 border-l-4 border-blue-500 pl-5 py-2 font-medium">
                                    "{genotype.essence.quote}"
                                </blockquote>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">{genotype.essence.description}</p>
                            </div>
                        )}
                    </div>

                {/* Características Principales Mejoradas */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative z-0">
                        <button
                            onClick={() => toggleSection('characteristics1')}
                            className="w-full p-5 md:p-7 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">Características Principales</h4>
                            </div>
                            <ChevronDown 
                                className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    openSections.has('characteristics1') ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        {openSections.has('characteristics1') && (
                            <div className="px-5 md:px-7 pb-5 md:pb-7 border-t-2 border-gray-100 bg-indigo-50/30">
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {genotype.characteristics1.map((char, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <char.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="font-bold text-gray-900 text-lg md:text-xl mb-2">{char.title}</h5>
                                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{char.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                {/* Características Secundarias Mejoradas */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative z-0">
                        <button
                            onClick={() => toggleSection('characteristics2')}
                            className="w-full p-5 md:p-7 text-left flex items-center justify-between hover:bg-slate-50/50 transition-all duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Leaf className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">Características Secundarias</h4>
                            </div>
                            <ChevronDown 
                                className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    openSections.has('characteristics2') ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        {openSections.has('characteristics2') && (
                            <div className="px-5 md:px-7 pb-5 md:pb-7 border-t-2 border-gray-100 bg-slate-50/30">
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {genotype.characteristics2.map((char, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-slate-200 hover:shadow-md transition-all duration-200">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <char.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="font-bold text-gray-900 text-lg md:text-xl mb-2">{char.title}</h5>
                                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{char.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                {/* Características Físicas y Metabólicas Mejoradas */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative z-0">
                        <button
                            onClick={() => toggleSection('physical')}
                            className="w-full p-5 md:p-7 text-left flex items-center justify-between hover:bg-cyan-50/50 transition-all duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">Características Físicas y Metabólicas</h4>
                            </div>
                            <ChevronDown 
                                className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    openSections.has('physical') ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        {openSections.has('physical') && (
                            <div className="px-5 md:px-7 pb-5 md:pb-7 border-t-2 border-gray-100 bg-cyan-50/30">
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {genotype.physicalAndMetabolic.map((section, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 border-2 border-cyan-100 shadow-md">
                                            <h5 className="font-bold text-gray-900 mb-4 text-lg md:text-xl flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                                <span>{section.title}</span>
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start space-x-3 bg-cyan-50/50 rounded-lg p-3 border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                {/* Plan Alimentario Mejorado */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative z-0">
                        <button
                            onClick={() => toggleSection('foodPlan')}
                            className="w-full p-5 md:p-7 text-left flex items-center justify-between hover:bg-teal-50/50 transition-all duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Apple className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">{genotype.foodPlan.title}</h4>
                            </div>
                            <ChevronDown 
                                className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    openSections.has('foodPlan') ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        {openSections.has('foodPlan') && (
                            <div className="px-5 md:px-7 pb-5 md:pb-7 border-t-2 border-gray-100 bg-teal-50/30">
                                <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed bg-teal-50/50 p-5 rounded-xl border-l-4 border-teal-500 font-medium">{genotype.foodPlan.description}</p>
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {genotype.foodPlan.sections.map((section, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 border-2 border-teal-100 shadow-md">
                                            <h5 className="font-bold text-gray-800 mb-4 text-lg md:text-xl flex items-center space-x-3">
                                                <CheckCircle className="w-5 h-5 text-teal-600" />
                                                <span>{section.title}</span>
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start space-x-3 bg-teal-50/50 rounded-lg p-3 border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                {/* Alimentos a Evitar Mejorados */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative z-0">
                        <button
                            onClick={() => toggleSection('foodsToAvoid')}
                            className="w-full p-5 md:p-7 text-left flex items-center justify-between hover:bg-rose-50/50 transition-all duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <XCircle className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">{genotype.foodsToAvoid.title}</h4>
                            </div>
                            <ChevronDown 
                                className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                                    openSections.has('foodsToAvoid') ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        {openSections.has('foodsToAvoid') && (
                            <div className="px-5 md:px-7 pb-5 md:pb-7 border-t-2 border-gray-100 bg-rose-50/30">
                                <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed bg-rose-50/50 p-5 rounded-xl border-l-4 border-rose-500 font-medium">{genotype.foodsToAvoid.description}</p>
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {genotype.foodsToAvoid.sections.map((section, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 border-2 border-rose-100 shadow-md">
                                            <h5 className="font-bold text-gray-800 mb-4 text-lg md:text-xl flex items-center space-x-3">
                                                <XCircle className="w-5 h-5 text-rose-600" />
                                                <span>{section.title}</span>
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start space-x-3 bg-rose-50/50 rounded-lg p-3 border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                                                        <XCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
            </div>
        );
    };

    const renderFoodGuide = () => {
        if (!foodData) return null;

        const genotypeColor = getGenotypeColor(selectedGenotype!);
        const genotypeGradient = getGenotypeGradient(selectedGenotype!);

        return (
            <div className="space-y-4 md:space-y-6">
                {/* Header de la Guía Alimentaria Simplificado */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 md:p-8 mb-8">
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${genotypeGradient} text-white rounded-full text-sm font-semibold mb-4`}>
                        {foodData.genotipo_info.nombre}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Guía Alimentaria Personalizada</h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">{foodData.genotipo_info.descripcion}</p>
                </div>

                {/* Información del Genotipo */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Información del Genotipo</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Descripción</h4>
                            <p className="text-gray-600 text-xs md:text-sm">{foodData.genotipo_info.descripcion}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Regla de Alimentos Neutros</h4>
                                                                    <p className="text-gray-600 text-xs md:text-sm">
                                            {foodData.genotipo_info.regla_neutros.replace('JSON', 'base de datos')}
                                        </p>
                        </div>
                    </div>
                </div>

                {/* Símbolos Especiales */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Símbolos Especiales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {Object.entries(foodData.genotipo_info.simbolos).map(([symbol, info]) => (
                            <div key={symbol} className="flex items-start space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    {getSymbolDisplay(symbol)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">{info.etiqueta}</h4>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">{info.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categorías de Alimentos */}
                <div className="space-y-4 md:space-y-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Lista de Alimentos por Categoría</h3>

                    {Object.entries(foodData.categorias_alimentos).map(([categoryName, foods]) => (
                        <div key={categoryName} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
                            {/* Header de la Categoría */}
                            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                                    {getCategoryIcon(categoryName)}
                                </div>
                                <div>
                                    <h4 className="text-lg md:text-xl font-bold text-gray-900">{categoryName}</h4>
                                    <p className="text-xs md:text-sm text-gray-600">
                                        {foods.length} alimento{foods.length !== 1 ? 's' : ''} en esta categoría
                                    </p>
                                </div>
                            </div>

                            {/* Superalimentos */}
                            {foods.filter(food => food.estado === "Superalimento").length > 0 && (
                                <div className="mb-4 md:mb-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <CheckCircle className="w-5 h-5 text-teal-600" />
                                        <h5 className="font-semibold text-teal-700 text-base md:text-lg">Superalimentos</h5>
                                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                                            {foods.filter(food => food.estado === "Superalimento").length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                        {foods.filter(food => food.estado === "Superalimento").map((food, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 md:p-3 bg-teal-50/50 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors duration-200">
                                                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-teal-800 text-sm md:text-base block truncate">{food.nombre}</span>
                                                    {food.marcador_especial && food.marcador_especial.includes('Activador Metabólico') && (
                                                        <div className="flex items-center space-x-2 mt-2 p-2 bg-teal-100 rounded-lg border border-teal-200">
                                                            {getSpecialMarkerIcon(food.marcador_especial)}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold text-teal-700">
                                                                    Activador Metabólico
                                                                </div>
                                                                <div className="text-xs text-teal-600 mt-1">
                                                                    Potencia pérdida de peso y ganancia muscular
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {food.notas && (
                                                        <div className="text-xs text-teal-700 mt-1 bg-teal-100 px-2 py-1 rounded">
                                                            {food.notas}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Toxinas */}
                            {foods.filter(food => food.estado === "Toxina").length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <XCircle className="w-5 h-5 text-rose-600" />
                                        <h5 className="font-semibold text-rose-700 text-base md:text-lg">Alimentos a Evitar</h5>
                                        <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                                            {foods.filter(food => food.estado === "Toxina").length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                        {foods.filter(food => food.estado === "Toxina").map((food, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 md:p-3 bg-rose-50/50 rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors duration-200">
                                                <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-rose-800 text-sm md:text-base block truncate">{food.nombre}</span>
                                                    {food.marcador_especial && (
                                                        <div className="flex items-center space-x-2 mt-2 p-2 bg-rose-100 rounded-lg border border-rose-200">
                                                            {getSpecialMarkerIcon(food.marcador_especial)}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold text-rose-700">
                                                                    {food.marcador_especial.includes('Activador Metabólico') ? 'Activador Metabólico' : 'Marcador Especial'}
                                                                </div>
                                                                <div className="text-xs text-rose-600 mt-1">
                                                                    {food.marcador_especial.includes('Activador Metabólico') 
                                                                        ? 'Potencia pérdida de peso y ganancia muscular'
                                                                        : food.marcador_especial.includes('Evitar 60 Días') 
                                                                            ? 'Evitar estrictamente por 60 días'
                                                                            : food.marcador_especial
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {food.notas && (
                                                        <div className="text-xs text-rose-700 mt-1 bg-rose-100 px-2 py-1 rounded">
                                                            {food.notas}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Alimentos Neutros (si existen) */}
                            {foods.filter(food => food.estado !== "Superalimento" && food.estado !== "Toxina").length > 0 && (
                                <div className="mt-4 md:mt-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Info className="w-5 h-5 text-slate-600" />
                                        <h5 className="font-semibold text-slate-700 text-base md:text-lg">Alimentos Neutros</h5>
                                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                                            {foods.filter(food => food.estado !== "Superalimento" && food.estado !== "Toxina").length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                        {foods.filter(food => food.estado !== "Superalimento" && food.estado !== "Toxina").map((food, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 md:p-3 bg-slate-50/50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors duration-200">
                                                <Info className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-slate-800 text-sm md:text-base block truncate">{food.nombre}</span>
                                                    {food.marcador_especial && food.marcador_especial.includes('Activador Metabólico') && (
                                                        <div className="flex items-center space-x-2 mt-2 p-2 bg-slate-100 rounded-lg border border-slate-200">
                                                            {getSpecialMarkerIcon(food.marcador_especial)}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold text-slate-700">
                                                                    Activador Metabólico
                                                                </div>
                                                                <div className="text-xs text-slate-600 mt-1">
                                                                    Potencia pérdida de peso y ganancia muscular
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {food.notas && (
                                                        <div className="text-xs text-slate-700 mt-1 bg-slate-100 px-2 py-1 rounded">
                                                            {food.notas}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMenus = () => {
        if (!selectedGenotype) return null;

        const genotypeColor = getGenotypeColor(selectedGenotype);
        const genotypeGradient = getGenotypeGradient(selectedGenotype);

        return (
            <GenotypeMenus 
                genotypeId={selectedGenotype} 
                genotypeColor={genotypeColor} 
                genotypeGradient={genotypeGradient} 
            />
        );
    };

    const renderRecipes = () => {
        if (!selectedGenotype) return null;

        const genotypeColor = getGenotypeColor(selectedGenotype);
        const genotypeGradient = getGenotypeGradient(selectedGenotype);

        return (
            <GenotypeRecipes 
                genotypeId={selectedGenotype} 
                genotypeColor={genotypeColor} 
                genotypeGradient={genotypeGradient} 
                foodData={foodData}
            />
        );
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 space-y-2 sm:space-y-0">
                        <button
                            onClick={onBackToMain}
                            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-base md:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden sm:inline">Volver al Inicio</span>
                            <span className="sm:hidden">Inicio</span>
                        </button>
                        <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl flex items-center justify-center">
                                <User className="w-4 h-4 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Mi Genotipo</h1>
                                <p className="text-sm md:text-sm text-gray-600 hidden sm:block">Consulta tu genotipo y guía alimentaria</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selector de Genotipo */}
            {!selectedGenotype && (
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 md:py-8">
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Selecciona tu Genotipo</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-base px-4">
                            Para ver tu información personalizada, selecciona tu genotipo nutricional.
                            Si no conoces tu genotipo, consulta con tu médico o nutricionista.
                        </p>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="max-w-md mx-auto mb-6 md:mb-8 px-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                            <input
                                type="text"
                                placeholder="Buscar genotipo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-base md:text-base"
                            />
                        </div>
                    </div>

                    {/* Grid de Genotipos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-4">
                        {[1, 2, 3, 4, 5, 6].filter(id => {
                            const genotypeData = GENOTYPE_DATA[id];
                            return genotypeData && 
                                   genotypeData.name.toLowerCase().includes(searchTerm.toLowerCase());
                        }).map((id) => {
                            const genotypeData = GENOTYPE_DATA[id];
                            const color = getGenotypeColor(id);
                            const gradient = getGenotypeGradient(id);
                            
                            return (
                                <div 
                                    key={id} 
                                    onClick={() => handleGenotypeSelect(id)}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                                >
                                    <div className={`bg-gradient-to-r ${gradient} rounded-xl p-4 mb-4 text-white`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                {getGenotypeIcon(id)}
                                                <div>
                                                    <h3 className="text-xl md:text-xl font-bold">{genotypeData.name}</h3>
                                                    <p className="text-sm md:text-sm opacity-90">Genotipo {id}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 opacity-70" />
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-sm leading-relaxed">
                                        {genotypeData.essence.description.substring(0, 120)}...
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Información del Genotipo Seleccionado */}
            {selectedGenotype && (
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 md:py-8">
                    {/* Header del Genotipo Seleccionado Mejorado */}
                    <div className={`bg-gradient-to-r ${getGenotypeGradient(selectedGenotype)} rounded-3xl shadow-xl p-6 md:p-8 mb-8 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white blur-2xl"></div>
                            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white blur-xl"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white blur-3xl"></div>
                        </div>
                        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                    {getGenotypeIcon(selectedGenotype)}
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                        {GENOTYPE_DATA[selectedGenotype]?.name || `Genotipo ${selectedGenotype}`}
                                    </h2>
                                    <p className="text-lg md:text-xl opacity-90">Tu información personalizada</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedGenotype(null)}
                                className="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Cambiar Genotipo
                            </button>
                        </div>
                    </div>

                    {/* Pestañas de Navegación Mejoradas */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => setActiveTab('genotype')}
                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base ${
                                    activeTab === 'genotype'
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:shadow-md'
                                }`}
                            >
                                <Target className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Características</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('foods')}
                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base ${
                                    activeTab === 'foods'
                                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:shadow-md'
                                }`}
                            >
                                <Apple className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Alimentos</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('menus')}
                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base ${
                                    activeTab === 'menus'
                                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:shadow-md'
                                }`}
                            >
                                <Utensils className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Menús</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('recipes')}
                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base ${
                                    activeTab === 'recipes'
                                        ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-slate-50 hover:shadow-md'
                                }`}
                            >
                                <ChefHat className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Recetas</span>
                            </button>
                        </div>
                    </div>

                    {/* Contenido de las Pestañas */}
                    {activeTab === 'genotype' && renderGenotypeInfo()}
                    {activeTab === 'foods' && renderFoodGuide()}
                    {activeTab === 'menus' && renderMenus()}
                    {activeTab === 'recipes' && renderRecipes()}

                </div>
            )}
            
            {/* Espacio adicional en la parte inferior para mejor navegación móvil */}
            <div className="h-16 md:h-24"></div>
        </div>
    );
};

export default PatientView;
