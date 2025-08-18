import React, { useState, useMemo } from 'react';
import { Sun, Utensils, Moon, Coffee, Clock, ChefHat } from 'lucide-react';
import { FOOD_GUIDE_DATA } from '../foodData';
import type { FoodGuideData, FoodItem } from '../types';

interface GenotypeMenusProps {
    genotypeId: number;
    genotypeColor: string;
    genotypeGradient: string;
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

const GenotypeMenus: React.FC<GenotypeMenusProps> = ({ genotypeId, genotypeColor, genotypeGradient }) => {
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
        desayunos: { icon: Sun, color: 'yellow' },
        almuerzos: { icon: Coffee, color: 'green' },
        comidas: { icon: Utensils, color: 'orange' },
        cenas: { icon: Moon, color: 'purple' }
    };

    const mealLabels = {
        desayunos: 'Desayunos',
        almuerzos: 'Almuerzos',
        comidas: 'Comidas',
        cenas: 'Cenas'
    };

    return (
        <div className="space-y-6">
            {/* Header de Menús */}
            <div className={`bg-gradient-to-r ${genotypeGradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white"></div>
                    <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white"></div>
                </div>
                <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                        <ChefHat className="w-8 h-8" />
                        <h2 className="text-2xl md:text-3xl font-bold">Menús Personalizados</h2>
                    </div>
                    <p className="text-lg md:text-xl opacity-90 mb-2">
                        Planes de comidas basados en tus alimentos específicos
                    </p>
                    <p className="text-base opacity-80">
                        Cada menú utiliza los superalimentos y alimentos compatibles de tu genotipo
                    </p>
                </div>
            </div>

            {/* Selector de Comidas */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center bg-white p-4 rounded-xl shadow-sm">
                {(Object.keys(mealLabels) as Array<keyof typeof mealLabels>).map((meal) => {
                    const { icon: Icon, color } = mealIcons[meal];
                    const isSelected = selectedMeal === meal;
                    
                    return (
                        <button
                            key={meal}
                            onClick={() => setSelectedMeal(meal)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                isSelected
                                    ? `bg-${color}-100 text-${color}-700 shadow-md`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{mealLabels[meal]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Opciones de Menú */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {menuPlans[selectedMeal].map((option, index) => {
                    const { color } = mealIcons[selectedMeal];
                    const isSuperFood = option.category === 'superalimento';
                    
                    return (
                        <div 
                            key={index}
                            className={`bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                                isSuperFood ? `border-${color}-200` : 'border-gray-200'
                            }`}
                        >
                            <div className={`bg-${color}-50 p-4 rounded-t-2xl border-b border-${color}-100`}>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className={`text-lg font-bold text-${color}-800`}>
                                        {option.title}
                                    </h3>
                                    {isSuperFood && (
                                        <span className={`bg-${color}-200 text-${color}-800 text-xs font-bold px-2 py-1 rounded-full`}>
                                            ÓPTIMO
                                        </span>
                                    )}
                                </div>
                                <p className={`text-sm text-${color}-600`}>
                                    {option.description}
                                </p>
                            </div>
                            
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className={`w-4 h-4 text-${color}-500`} />
                                    <span className={`text-sm font-medium text-${color}-700`}>
                                        Ingredientes principales:
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {option.foods.map((food, foodIndex) => (
                                        <li 
                                            key={foodIndex}
                                            className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                                                isSuperFood ? `bg-${color}-50` : 'bg-gray-50'
                                            }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full bg-${color}-400`}></div>
                                            <span className="text-gray-700">{food}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Nota informativa */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">i</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-blue-800 font-semibold mb-1">Sobre estos menús</h4>
                        <p className="text-blue-700 text-sm">
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