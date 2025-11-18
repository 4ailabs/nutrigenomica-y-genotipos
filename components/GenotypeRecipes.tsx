import React, { useState, useMemo, useEffect } from 'react';
import { ChefHat, Filter, Search, Clock, Users, Utensils, Sparkles } from 'lucide-react';
import { getRecipesByGenotype as getRecipesSync, getRecipesByMealType } from '../recipeData';
import { getRecipesByGenotype as getRecipesAsync } from '../src/data/recipes';
import type { Recipe } from '../recipeData';
import type { FoodGuideData } from '../types';
import RecipeCard from './RecipeCard';
import PremiumAuth from './PremiumAuth';
import RecipeAIGenerator from './RecipeAIGenerator';
import { usePremiumAuth } from '../hooks/usePremiumAuth';

interface GenotypeRecipesProps {
    genotypeId: number;
    genotypeColor: string;
    genotypeGradient: string;
    foodData: FoodGuideData;
}

const GenotypeRecipes: React.FC<GenotypeRecipesProps> = ({ genotypeId, genotypeColor, genotypeGradient, foodData }) => {
    const [selectedMealType, setSelectedMealType] = useState<Recipe['mealType'] | 'all'>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<Recipe['difficulty'] | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'recetas' | 'ia'>('recetas');
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    
    const { isPremium, isLoading, authenticatePremium, logout, getRemainingTime } = usePremiumAuth();

    // Cargar recetas con lazy loading
    useEffect(() => {
        let isMounted = true;
        
        const loadRecipes = async () => {
            setIsLoadingRecipes(true);
            try {
                // Intentar lazy loading primero (eficiente)
                const recipes = await getRecipesAsync(genotypeId);
                if (isMounted) {
                    setAllRecipes(recipes);
                }
            } catch (error) {
                // Fallback a carga síncrona si falla
                console.warn('Lazy loading failed, using sync fallback:', error);
                if (isMounted) {
                    setAllRecipes(getRecipesSync(genotypeId));
                }
            } finally {
                if (isMounted) {
                    setIsLoadingRecipes(false);
                }
            }
        };

        loadRecipes();

        return () => {
            isMounted = false;
        };
    }, [genotypeId]);

    const filteredRecipes = useMemo(() => {
        let recipes = allRecipes;

        // Filtrar por tipo de comida
        if (selectedMealType !== 'all') {
            recipes = recipes.filter(recipe => recipe.mealType === selectedMealType);
        }

        // Filtrar por dificultad
        if (selectedDifficulty !== 'all') {
            recipes = recipes.filter(recipe => recipe.difficulty === selectedDifficulty);
        }

        // Filtrar por búsqueda
        if (searchTerm.trim()) {
            recipes = recipes.filter(recipe => 
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        return recipes;
    }, [allRecipes, selectedMealType, selectedDifficulty, searchTerm]);

    const mealTypeOptions = [
        { value: 'all', label: 'Todas las comidas', icon: Utensils },
        { value: 'desayuno', label: 'Desayunos', icon: Clock },
        { value: 'almuerzo', label: 'Almuerzos', icon: ChefHat },
        { value: 'comida', label: 'Comidas', icon: Utensils },
        { value: 'cena', label: 'Cenas', icon: Users }
    ];

    const difficultyOptions = [
        { value: 'all', label: 'Todas las dificultades' },
        { value: 'Fácil', label: 'Fácil' },
        { value: 'Intermedio', label: 'Intermedio' },
        { value: 'Avanzado', label: 'Avanzado' }
    ];

    const handleToggleExpand = (recipeId: string) => {
        setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
    };

    // Mostrar loading mientras se cargan las recetas
    if (isLoadingRecipes) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <ChefHat className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Cargando recetas...</h3>
                <p className="text-gray-600">Preparando tu recetario personalizado</p>
            </div>
        );
    }

    if (allRecipes.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Recetas en desarrollo</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    Estamos preparando deliciosas recetas específicas para tu genotipo. 
                    ¡Muy pronto tendrás acceso a un recetario completo!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header de Recetas con Pestañas */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 md:p-8">
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${genotypeGradient} text-white rounded-full text-sm font-semibold mb-4`}>
                    Genotipo {genotypeId}
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <ChefHat className="w-8 h-8 text-gray-700" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Recetas Especializadas</h2>
                </div>
                <p className="text-lg md:text-xl text-gray-600 mb-4">
                    Recetas curadas usando tus superalimentos específicos
                </p>
                
                {/* Pestañas */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('recetas')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeTab === 'recetas'
                                ? `bg-gradient-to-r ${genotypeGradient} text-white shadow-lg`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <ChefHat className="w-4 h-4 inline mr-2" />
                        Recetas Base
                    </button>
                    <button
                        onClick={() => setActiveTab('ia')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeTab === 'ia'
                                ? `bg-gradient-to-r ${genotypeGradient} text-white shadow-lg`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Sparkles className="w-4 h-4 inline mr-2" />
                        IA Premium
                    </button>
                </div>
            </div>

            {/* Contenido de las pestañas */}
            {activeTab === 'recetas' && (
                <>
                    {/* Controles de filtrado */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-800">Filtrar recetas ({allRecipes.length} disponibles)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Búsqueda */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar recetas o ingredientes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Tipo de comida */}
                            <select
                                value={selectedMealType}
                                onChange={(e) => setSelectedMealType(e.target.value as Recipe['mealType'] | 'all')}
                                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                {mealTypeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {/* Dificultad */}
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value as Recipe['difficulty'] | 'all')}
                                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            >
                                {difficultyOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Resumen de filtros */}
                        {(selectedMealType !== 'all' || selectedDifficulty !== 'all' || searchTerm.trim()) && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                                <span>Mostrando {filteredRecipes.length} de {allRecipes.length} recetas</span>
                                <button
                                    onClick={() => {
                                        setSelectedMealType('all');
                                        setSelectedDifficulty('all');
                                        setSearchTerm('');
                                    }}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Grid de recetas */}
                    {filteredRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    isExpanded={expandedRecipe === recipe.id}
                                    onToggleExpand={() => handleToggleExpand(recipe.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron recetas</h3>
                            <p className="text-gray-600">
                                Intenta ajustar tus filtros para encontrar más opciones
                            </p>
                        </div>
                    )}

                    {/* Consejos para cocinar */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Consejos para maximizar beneficios</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Prioriza ingredientes marcados como <strong>superalimentos</strong> para tu genotipo</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Usa técnicas de cocción que <strong>preserven nutrientes</strong> (vapor, salteado rápido)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Adapta las porciones según tus <strong>objetivos nutricionales</strong> específicos</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Tab de IA Premium */}
            {activeTab === 'ia' && (
                <div className="space-y-6">
                    {isPremium ? (
                        <>
                            <PremiumAuth
                                onAuthenticate={authenticatePremium}
                                isAuthenticated={isPremium}
                                onLogout={logout}
                                remainingTime={getRemainingTime()}
                            />
                            <RecipeAIGenerator
                                genotypeId={genotypeId}
                                foodData={foodData}
                            />
                        </>
                    ) : (
                        <PremiumAuth
                            onAuthenticate={authenticatePremium}
                            isAuthenticated={isPremium}
                            onLogout={logout}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default GenotypeRecipes;