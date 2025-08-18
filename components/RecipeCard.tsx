import React, { useState } from 'react';
import { Clock, Users, ChefHat, Star, Leaf, Zap, ChevronDown, ChevronUp, Utensils, Moon, Coffee } from 'lucide-react';
import type { Recipe } from '../recipeData';

interface RecipeCardProps {
    recipe: Recipe;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isExpanded = false, onToggleExpand }) => {
    const [localExpanded, setLocalExpanded] = useState(false);
    
    const expanded = onToggleExpand ? isExpanded : localExpanded;
    const toggleExpanded = onToggleExpand || (() => setLocalExpanded(!localExpanded));

    const getDifficultyColor = (difficulty: Recipe['difficulty']) => {
        switch (difficulty) {
            case 'Fácil': return 'bg-green-100 text-green-700 border-green-200';
            case 'Intermedio': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Avanzado': return 'bg-red-100 text-red-700 border-red-200';
        }
    };

    const getMealTypeIcon = (mealType: Recipe['mealType']) => {
        switch (mealType) {
            case 'desayuno': return <Clock className="w-4 h-4" />;
            case 'almuerzo': return <Coffee className="w-4 h-4" />;
            case 'comida': return <Utensils className="w-4 h-4" />;
            case 'cena': return <Moon className="w-4 h-4" />;
        }
    };

    const getMealTypeColor = (mealType: Recipe['mealType']) => {
        switch (mealType) {
            case 'desayuno': return 'bg-yellow-100 text-yellow-700';
            case 'almuerzo': return 'bg-green-100 text-green-700';
            case 'comida': return 'bg-orange-100 text-orange-700';
            case 'cena': return 'bg-purple-100 text-purple-700';
        }
    };

    const superfoodCount = recipe.ingredients.filter(ing => ing.isSuperfood).length;
    const totalIngredients = recipe.ingredients.length;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Header de la receta */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-lg ${getMealTypeColor(recipe.mealType)}`}>
                                {getMealTypeIcon(recipe.mealType)}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(recipe.mealType)}`}>
                                {recipe.mealType.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(recipe.difficulty)}`}>
                                {recipe.difficulty}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{recipe.description}</p>
                    </div>
                </div>

                {/* Métricas de la receta */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{recipe.servings} personas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Leaf className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">{superfoodCount}/{totalIngredients} superalimentos</span>
                    </div>
                </div>

                {/* Tags de la receta */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span 
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                        >
                            {tag.replace('_', ' ')}
                        </span>
                    ))}
                    {recipe.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{recipe.tags.length - 3} más
                        </span>
                    )}
                </div>

                {/* Botón para expandir */}
                <button
                    onClick={toggleExpanded}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                    <ChefHat className="w-4 h-4" />
                    <span className="font-medium">
                        {expanded ? 'Ocultar Receta' : 'Ver Receta Completa'}
                    </span>
                    {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            {/* Contenido expandido */}
            {expanded && (
                <div className="border-t border-gray-100 bg-gray-50">
                    {/* Por qué es buena para el genotipo */}
                    <div className="p-6 bg-blue-50 border-b border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-800 mb-2">Beneficios para tu genotipo</h4>
                                <p className="text-blue-700 text-sm leading-relaxed">{recipe.genotypeSpecific}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ingredientes */}
                    <div className="p-6 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-green-500" />
                            Ingredientes
                        </h4>
                        <div className="space-y-3">
                            {recipe.ingredients.map((ingredient, index) => (
                                <div 
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg ${
                                        ingredient.isSuperfood ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {ingredient.isSuperfood && (
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        )}
                                        <span className={`font-medium ${ingredient.isSuperfood ? 'text-green-800' : 'text-gray-700'}`}>
                                            {ingredient.name}
                                        </span>
                                        {ingredient.notes && (
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                {ingredient.notes}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-gray-600 font-medium">{ingredient.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instrucciones */}
                    <div className="p-6 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <ChefHat className="w-5 h-5 text-orange-500" />
                            Preparación
                        </h4>
                        <div className="space-y-3">
                            {recipe.instructions.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Beneficios nutricionales */}
                    <div className="p-6">
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-purple-500" />
                            Beneficios Nutricionales
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recipe.nutritionHighlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-purple-700 text-sm">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeCard;