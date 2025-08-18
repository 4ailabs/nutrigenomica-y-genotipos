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

    const handleGenotypeSelect = (genotypeId: number) => {
        setSelectedGenotype(genotypeId);
        setActiveTab('genotype');
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
            return <Star className="w-4 h-4 text-yellow-600" />;
        }
        if (marcador.includes('Evitar 60 Días') || marcador.includes('•') || marcador.includes('punto_negro')) {
            return <Clock className="w-4 h-4 text-orange-600" />;
        }
        return null;
    };

    // Función para obtener el símbolo visual correcto
    const getSymbolDisplay = (symbol: string) => {
        if (symbol.includes('diamante_')) {
            return <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-lg">◊</span>
            </div>;
        }
        if (symbol.includes('punto_negro')) {
            return <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold text-lg">•</span>
            </div>;
        }
        return <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">{symbol}</span>
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

        const genotypeColor = getGenotypeColor(selectedGenotype);
        const genotypeGradient = getGenotypeGradient(selectedGenotype);

        return (
            <div className="space-y-8">
                {/* Header del Genotipo */}
                <div className={`bg-gradient-to-r ${genotypeGradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 w-16 md:w-32 h-16 md:h-32 rounded-full bg-white"></div>
                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 w-12 md:w-24 h-12 md:h-24 rounded-full bg-white"></div>
                    </div>
                    <div className="relative">
                        <h2 className="text-3xl md:text-3xl font-bold mb-2">{genotype.title}</h2>
                        <p className="text-xl md:text-xl opacity-90">{genotype.tagline}</p>
                    </div>
                </div>

                {/* Esencia del Genotipo */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
                    <h3 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4">{genotype.essence.title}</h3>
                    <blockquote className="text-lg md:text-lg italic text-gray-700 mb-4 border-l-4 border-blue-500 pl-4">
                        "{genotype.essence.quote}"
                    </blockquote>
                    <p className="text-gray-600 text-base md:text-base">{genotype.essence.description}</p>
                </div>

                                            {/* Características */}
                            <div className="space-y-6 md:space-y-6">
                                {/* Características Principales */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Target className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <h4 className="text-xl md:text-xl font-bold text-gray-900">Características Principales</h4>
                                    </div>
                                    <div className="space-y-5">
                                        {genotype.characteristics1.map((char, index) => (
                                            <div key={index} className="bg-gray-50 rounded-xl p-4 md:p-4 hover:bg-gray-100 transition-colors duration-200">
                                                <div className="flex items-start space-x-3">
                                                    <div className={`w-10 h-10 ${char.iconBgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                                        <char.icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-gray-900 text-base md:text-lg mb-1">{char.title}</h5>
                                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{char.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Características Secundarias */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                                            <Leaf className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <h4 className="text-xl md:text-xl font-bold text-gray-900">Características Secundarias</h4>
                                    </div>
                                    <div className="space-y-5">
                                        {genotype.characteristics2.map((char, index) => (
                                            <div key={index} className="bg-gray-50 rounded-xl p-4 md:p-4 hover:bg-gray-100 transition-colors duration-200">
                                                <div className="flex items-start space-x-3">
                                                    <div className={`w-10 h-10 ${char.iconBgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                                        <char.icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-gray-900 text-base md:text-lg mb-1">{char.title}</h5>
                                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{char.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                                            {/* Características Físicas y Metabólicas */}
                                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                                <div className="flex items-center space-x-3 mb-5">
                                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-green-600" />
                                    </div>
                                    <h4 className="text-xl md:text-xl font-bold text-gray-900">Características Físicas y Metabólicas</h4>
                                </div>
                                <div className="space-y-5">
                                    {genotype.physicalAndMetabolic.map((section, index) => (
                                        <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                                            <h5 className="font-bold text-gray-900 mb-3 text-base md:text-lg flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>{section.title}</span>
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start space-x-3 bg-white rounded-lg p-3 shadow-sm">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                                            {/* Plan Alimentario */}
                                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                                <div className="flex items-center space-x-3 mb-5">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <Apple className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h4 className="text-xl md:text-xl font-bold text-gray-900">{genotype.foodPlan.title}</h4>
                                </div>
                                <p className="text-gray-600 mb-4 text-base md:text-base leading-relaxed bg-emerald-50 p-3 rounded-lg border border-emerald-200">{genotype.foodPlan.description}</p>
                                <div className="space-y-5">
                                    {genotype.foodPlan.sections.map((section, index) => (
                                        <div key={index} className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200">
                                            <h5 className="font-bold text-emerald-800 mb-3 text-base md:text-lg flex items-center space-x-2">
                                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                <span>{section.title}</span>
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start space-x-3 bg-white rounded-lg p-3 shadow-sm">
                                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                                            {/* Alimentos a Evitar */}
                                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                                <div className="flex items-center space-x-3 mb-5">
                                    <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                                        <XCircle className="w-4 h-4 text-red-600" />
                                    </div>
                                    <h4 className="text-xl md:text-xl font-bold text-gray-900">{genotype.foodsToAvoid.title}</h4>
                                </div>
                                <p className="text-gray-600 mb-4 text-base md:text-base leading-relaxed bg-red-50 p-3 rounded-lg border border-red-200">{genotype.foodsToAvoid.description}</p>
                                <div className="space-y-5">
                                    {genotype.foodsToAvoid.sections.map((section, index) => (
                                        <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-5 border border-red-200">
                                            <h5 className="font-bold text-red-800 mb-3 text-base md:text-lg flex items-center space-x-2">
                                                <XCircle className="w-4 h-4 text-red-600" />
                                                <span>{section.title}</span>
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} className="flex items-start space-x-3 bg-white rounded-lg p-3 shadow-sm">
                                                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
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
                {/* Header de la Guía Alimentaria */}
                <div className={`bg-gradient-to-r ${genotypeGradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 w-16 md:w-32 h-16 md:h-32 rounded-full bg-white"></div>
                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 w-12 md:w-24 h-12 md:h-24 rounded-full bg-white"></div>
                    </div>
                    <div className="relative">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Guía Alimentaria Personalizada</h2>
                        <p className="text-lg md:text-xl opacity-90">{foodData.genotipo_info.nombre}</p>
                        <p className="text-base md:text-lg opacity-80 mt-2">{foodData.genotipo_info.descripcion}</p>
                    </div>
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
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
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
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <h5 className="font-semibold text-green-700 text-base md:text-lg">Superalimentos</h5>
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            {foods.filter(food => food.estado === "Superalimento").length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                        {foods.filter(food => food.estado === "Superalimento").map((food, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 md:p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200">
                                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-green-800 text-sm md:text-base block truncate">{food.nombre}</span>
                                                    {food.marcador_especial && food.marcador_especial.includes('Activador Metabólico') && (
                                                        <div className="flex items-center space-x-2 mt-2 p-2 bg-green-100 rounded-lg border border-green-200">
                                                            {getSpecialMarkerIcon(food.marcador_especial)}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold text-green-700">
                                                                    Activador Metabólico
                                                                </div>
                                                                <div className="text-xs text-green-600 mt-1">
                                                                    Potencia pérdida de peso y ganancia muscular
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {food.notas && (
                                                        <div className="text-xs text-green-700 mt-1 bg-green-100 px-2 py-1 rounded">
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
                                        <XCircle className="w-5 h-5 text-red-600" />
                                        <h5 className="font-semibold text-red-700 text-base md:text-lg">Alimentos a Evitar</h5>
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                            {foods.filter(food => food.estado === "Toxina").length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                        {foods.filter(food => food.estado === "Toxina").map((food, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 md:p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors duration-200">
                                                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-red-800 text-sm md:text-base block truncate">{food.nombre}</span>
                                                    {food.marcador_especial && food.marcador_especial.includes('Activador Metabólico') && (
                                                        <div className="flex items-center space-x-2 mt-2 p-2 bg-red-100 rounded-lg border border-red-200">
                                                            {getSpecialMarkerIcon(food.marcador_especial)}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold text-red-700">
                                                                    Activador Metabólico
                                                                </div>
                                                                <div className="text-xs text-red-600 mt-1">
                                                                    Potencia pérdida de peso y ganancia muscular
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {food.notas && (
                                                        <div className="text-xs text-red-700 mt-1 bg-red-100 px-2 py-1 rounded">
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
                                        <Info className="w-5 h-5 text-blue-600" />
                                        <h5 className="font-semibold text-blue-700 text-base md:text-lg">Alimentos Neutros</h5>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                            {foods.filter(food => food.estado !== "Superalimento" && food.estado !== "Toxina").length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                                        {foods.filter(food => food.estado !== "Superalimento" && food.estado !== "Toxina").map((food, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 md:p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
                                                <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-blue-800 text-sm md:text-base block truncate">{food.nombre}</span>
                                                    {food.marcador_especial && food.marcador_especial.includes('Activador Metabólico') && (
                                                        <div className="flex items-center space-x-2 mt-2 p-2 bg-blue-100 rounded-lg border border-blue-200">
                                                            {getSpecialMarkerIcon(food.marcador_especial)}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-xs font-semibold text-blue-700">
                                                                    Activador Metabólico
                                                                </div>
                                                                <div className="text-xs text-blue-600 mt-1">
                                                                    Potencia pérdida de peso y ganancia muscular
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {food.notas && (
                                                        <div className="text-xs text-blue-700 mt-1 bg-blue-100 px-2 py-1 rounded">
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
                    {/* Header del Genotipo Seleccionado */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${getGenotypeGradient(selectedGenotype)}`}>
                                    {getGenotypeIcon(selectedGenotype)}
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-2xl font-bold text-gray-900">
                                        {GENOTYPE_DATA[selectedGenotype]?.name || `Genotipo ${selectedGenotype}`}
                                    </h2>
                                    <p className="text-base md:text-base text-gray-600">Tu información personalizada</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedGenotype(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-base md:text-base"
                            >
                                Cambiar Genotipo
                            </button>
                        </div>
                    </div>

                    {/* Pestañas de Navegación */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <button
                                onClick={() => setActiveTab('genotype')}
                                className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-base md:text-base ${
                                    activeTab === 'genotype'
                                        ? 'bg-green-100 text-green-700 shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Target className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
                                <span className="hidden sm:inline">Características</span>
                                <span className="sm:hidden">Info</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('foods')}
                                className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-base md:text-base ${
                                    activeTab === 'foods'
                                        ? 'bg-green-100 text-green-700 shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Apple className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
                                <span className="hidden sm:inline">Alimentos</span>
                                <span className="sm:hidden">Alimentos</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('menus')}
                                className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-base md:text-base ${
                                    activeTab === 'menus'
                                        ? 'bg-green-100 text-green-700 shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Utensils className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
                                <span className="hidden sm:inline">Menús</span>
                                <span className="sm:hidden">Menús</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('recipes')}
                                className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-base md:text-base ${
                                    activeTab === 'recipes'
                                        ? 'bg-green-100 text-green-700 shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <ChefHat className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" />
                                <span className="hidden sm:inline">Recetas</span>
                                <span className="sm:hidden">Recetas</span>
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
        </div>
    );
};

export default PatientView;
