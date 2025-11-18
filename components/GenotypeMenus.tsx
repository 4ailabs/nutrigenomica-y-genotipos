import React, { useState, useMemo } from 'react';
import { Sun, Utensils, Moon, Coffee, Clock, ChefHat } from 'lucide-react';
import { FOOD_GUIDE_DATA } from '../foodData';
import type { FoodGuideData, FoodItem } from '../types';

interface GenotypeMenusProps {
    genotypeId: number;
    genotypeColor: string;
    genotypeGradient: string;
    hideHeader?: boolean;
}

interface MenuOption {
    title: string;
    description: string;
    foods: string[];
    category: 'superalimento' | 'neutro';
}

interface MealPlan {
    desayunos: MenuOption[];
    almuerzos: MenuOption[];
    comidas: MenuOption[];
    cenas: MenuOption[];
}

const GenotypeMenus: React.FC<GenotypeMenusProps> = ({ genotypeId, genotypeColor, genotypeGradient, hideHeader = false }) => {
    const [selectedMeal, setSelectedMeal] = useState<'desayunos' | 'almuerzos' | 'comidas' | 'cenas'>('desayunos');
    const foodData = FOOD_GUIDE_DATA[genotypeId];

    const menuPlans = useMemo(() => {
        if (!foodData) return null;

        const getSuperfoods = (categories: string[]): FoodItem[] => {
            const superfoods: FoodItem[] = [];
            categories.forEach(category => {
                const categoryFoods = foodData.categorias_alimentos[category];
                if (categoryFoods) {
                    superfoods.push(...categoryFoods.filter(food => food.estado === "Superalimento"));
                }
            });
            return superfoods;
        };

        const getNeutralFoods = (categories: string[]): FoodItem[] => {
            const neutralFoods: FoodItem[] = [];
            categories.forEach(category => {
                const categoryFoods = foodData.categorias_alimentos[category];
                if (categoryFoods) {
                    // Para alimentos neutros, tomamos algunos que no sean toxinas
                    neutralFoods.push(...categoryFoods.filter(food => food.estado !== "Toxina").slice(0, 3));
                }
            });
            return neutralFoods;
        };

        // Categorizar alimentos por tipo de comida mexicana
        const desayunoCategories = ['Huevos', 'Lácteos', 'Frutas', 'Cereales y Granos'];
        const almuerzoCategories = ['Frutas', 'Frutos Secos y Semillas', 'Lácteos'];
        const comidaCategories = ['Carnes Rojas', 'Aves', 'Pescados y Mariscos', 'Verduras', 'Legumbres'];
        const cenaCategories = ['Pescados y Mariscos', 'Aves', 'Verduras', 'Sopas y Caldos'];

        const createMenuOptions = (categories: string[], mealType: string): MenuOption[] => {
            const superfoods = getSuperfoods(categories);
            const neutralFoods = getNeutralFoods(categories);
            
            const options: MenuOption[] = [];

            // Crear opciones con superalimentos
            if (superfoods.length >= 3) {
                const option1Foods = superfoods.slice(0, 3).map(f => f.nombre);
                const option2Foods = superfoods.slice(3, 6).map(f => f.nombre);
                const option3Foods = superfoods.slice(1, 4).map(f => f.nombre);

                options.push({
                    title: `${mealType} Óptimo 1`,
                    description: 'Basado en tus superalimentos principales',
                    foods: option1Foods.length > 0 ? option1Foods : ['Consulta tu guía de alimentos'],
                    category: 'superalimento'
                });

                if (option2Foods.length > 0) {
                    options.push({
                        title: `${mealType} Óptimo 2`,
                        description: 'Variación con superalimentos',
                        foods: option2Foods,
                        category: 'superalimento'
                    });
                }

                if (option3Foods.length > 0) {
                    options.push({
                        title: `${mealType} Óptimo 3`,
                        description: 'Combinación alternativa',
                        foods: option3Foods,
                        category: 'superalimento'
                    });
                }
            }

            // Si no hay suficientes opciones, crear con alimentos neutros
            while (options.length < 3 && neutralFoods.length > 0) {
                const remainingFoods = neutralFoods.slice(options.length * 2, (options.length + 1) * 2 + 1);
                if (remainingFoods.length > 0) {
                    options.push({
                        title: `${mealType} Alternativo ${options.length + 1}`,
                        description: 'Opción con alimentos compatibles',
                        foods: remainingFoods.map(f => f.nombre),
                        category: 'neutro'
                    });
                }
            }

            return options.length > 0 ? options : [{
                title: `${mealType} General`,
                description: 'Consulta tu guía de alimentos personalizada',
                foods: ['Ver sección de alimentos de tu genotipo'],
                category: 'neutro'
            }];
        };

        return {
            desayunos: createMenuOptions(desayunoCategories, 'Desayuno'),
            almuerzos: createMenuOptions(almuerzoCategories, 'Almuerzo'),
            comidas: createMenuOptions(comidaCategories, 'Comida'),
            cenas: createMenuOptions(cenaCategories, 'Cena')
        };
    }, [foodData]);

    if (!foodData || !menuPlans) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">Los menús para este genotipo estarán disponibles pronto.</p>
            </div>
        );
    }

    const mealIcons = {
        desayunos: { 
            icon: Sun, 
            color: 'yellow',
            classes: {
                bg100: 'bg-yellow-100',
                bg50: 'bg-yellow-50',
                bg200: 'bg-yellow-200',
                text700: 'text-yellow-700',
                text800: 'text-yellow-800',
                text600: 'text-yellow-600',
                text500: 'text-yellow-500',
                border200: 'border-yellow-200',
                border100: 'border-yellow-100',
                bg400: 'bg-yellow-400',
                hoverBg100: 'hover:bg-yellow-100'
            }
        },
        almuerzos: { 
            icon: Coffee, 
            color: 'green',
            classes: {
                bg100: 'bg-green-100',
                bg50: 'bg-green-50',
                bg200: 'bg-green-200',
                text700: 'text-green-700',
                text800: 'text-green-800',
                text600: 'text-green-600',
                text500: 'text-green-500',
                border200: 'border-green-200',
                border100: 'border-green-100',
                bg400: 'bg-green-400',
                hoverBg100: 'hover:bg-green-100'
            }
        },
        comidas: { 
            icon: Utensils, 
            color: 'orange',
            classes: {
                bg100: 'bg-orange-100',
                bg50: 'bg-orange-50',
                bg200: 'bg-orange-200',
                text700: 'text-orange-700',
                text800: 'text-orange-800',
                text600: 'text-orange-600',
                text500: 'text-orange-500',
                border200: 'border-orange-200',
                border100: 'border-orange-100',
                bg400: 'bg-orange-400',
                hoverBg100: 'hover:bg-orange-100'
            }
        },
        cenas: { 
            icon: Moon, 
            color: 'purple',
            classes: {
                bg100: 'bg-purple-100',
                bg50: 'bg-purple-50',
                bg200: 'bg-purple-200',
                text700: 'text-purple-700',
                text800: 'text-purple-800',
                text600: 'text-purple-600',
                text500: 'text-purple-500',
                border200: 'border-purple-200',
                border100: 'border-purple-100',
                bg400: 'bg-purple-400',
                hoverBg100: 'hover:bg-purple-100'
            }
        }
    };

    const mealLabels = {
        desayunos: 'Desayunos',
        almuerzos: 'Almuerzos',
        comidas: 'Comidas',
        cenas: 'Cenas'
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Header de Menús - Solo se muestra si hideHeader es false */}
            {!hideHeader && (
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 md:p-8 w-full">
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${genotypeGradient} text-white rounded-full text-sm font-semibold mb-4`}>
                        Genotipo {genotypeId}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <ChefHat className="w-7 h-7 md:w-8 md:h-8 text-gray-700" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Menús Personalizados</h2>
                    </div>
                    <p className="text-base md:text-lg text-gray-600 mb-2">
                        Planes de comidas basados en tus alimentos específicos
                    </p>
                    <p className="text-sm md:text-base text-gray-500">
                        Cada menú utiliza los superalimentos y alimentos compatibles de tu genotipo
                    </p>
                </div>
            )}

            {/* Selector de Comidas */}
            <div className="w-full flex flex-wrap gap-3 md:gap-4 justify-center bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100">
                {(Object.keys(mealLabels) as Array<keyof typeof mealLabels>).map((meal) => {
                    const { icon: Icon, classes } = mealIcons[meal];
                    const isSelected = selectedMeal === meal;
                    
                    return (
                        <button
                            key={meal}
                            onClick={() => setSelectedMeal(meal)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-200 ${
                                isSelected
                                    ? `${classes.bg100} ${classes.text700} shadow-md scale-105`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                            }`}
                        >
                            <Icon className="w-4 h-4 md:w-5 md:h-5" />
                            <span>{mealLabels[meal]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Opciones de Menú */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {menuPlans[selectedMeal].map((option, index) => {
                    const { classes } = mealIcons[selectedMeal];
                    const isSuperFood = option.category === 'superalimento';
                    
                    return (
                        <div 
                            key={index}
                            className={`w-full bg-white rounded-2xl shadow-md border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                isSuperFood ? classes.border200 : 'border-gray-200'
                            }`}
                        >
                            <div className={`${classes.bg50} p-5 rounded-t-2xl border-b-2 ${classes.border100}`}>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className={`text-base md:text-lg font-bold ${classes.text800} flex-1`}>
                                        {option.title}
                                    </h3>
                                    {isSuperFood && (
                                        <span className={`${classes.bg200} ${classes.text800} text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
                                            ÓPTIMO
                                        </span>
                                    )}
                                </div>
                                <p className={`text-sm ${classes.text600} leading-relaxed`}>
                                    {option.description}
                                </p>
                            </div>
                            
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className={`w-4 h-4 ${classes.text500} flex-shrink-0`} />
                                    <span className={`text-sm font-semibold ${classes.text700}`}>
                                        Ingredientes principales:
                                    </span>
                                </div>
                                <ul className="space-y-2.5">
                                    {option.foods.map((food, foodIndex) => {
                                        const bgClass = isSuperFood ? classes.bg50 : 'bg-gray-50';
                                        const hoverClass = isSuperFood ? classes.hoverBg100 : 'hover:bg-gray-100';
                                        
                                        return (
                                            <li 
                                                key={foodIndex}
                                                className={`flex items-start gap-3 text-sm p-2.5 rounded-lg transition-colors ${bgClass} ${hoverClass}`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${classes.bg400} mt-1.5 flex-shrink-0`}></div>
                                                <span className="text-gray-700 leading-relaxed">{food}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Nota informativa */}
            <div className="w-full bg-blue-50 border-l-4 border-blue-400 p-5 md:p-6 rounded-r-xl shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-base">i</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-blue-800 font-semibold mb-2 text-base md:text-lg">Sobre estos menús</h4>
                        <p className="text-blue-700 text-sm md:text-base leading-relaxed">
                            Estos menús están generados automáticamente basándose en los alimentos de tu genotipo. 
                            Los marcados como "ÓPTIMO" utilizan principalmente tus superalimentos. 
                            Para recetas detalladas y porciones específicas, consulta con el asistente IA o tu profesional de la salud.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenotypeMenus;