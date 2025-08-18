import React, { useState } from 'react';
import { Sparkles, Clock, Users, ChefHat, Loader2, AlertTriangle, Download } from 'lucide-react';
import type { FoodGuideData } from '../types';
import { generateCustomRecipe, validateRecipeIngredients } from '../utils/recipeAI';
import type { Recipe } from '../recipeData';
import RecipeCard from './RecipeCard';

interface RecipeAIGeneratorProps {
  genotypeId: number;
  foodData: FoodGuideData;
}

const RecipeAIGenerator: React.FC<RecipeAIGeneratorProps> = ({ genotypeId, foodData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);

  // Formulario de parámetros
  const [mealType, setMealType] = useState<'desayuno' | 'almuerzo' | 'comida' | 'cena'>('comida');
  const [cookingTime, setCookingTime] = useState<'rapido' | 'medio' | 'elaborado'>('medio');
  const [servings, setServings] = useState(2);
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [specificIngredients, setSpecificIngredients] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setWarnings([]);
    setGeneratedRecipe(null);

    try {
      const request = {
        genotypeId,
        mealType,
        cookingTime,
        servings,
        dietaryPreferences: dietaryPreferences.trim() || undefined,
        specificIngredients: specificIngredients.trim() ? 
          specificIngredients.split(',').map(s => s.trim()) : undefined
      };

      const aiRecipe = await generateCustomRecipe(request, foodData);
      
      // Convertir a formato Recipe
      const recipe: Recipe = {
        id: `ai_generated_${Date.now()}`,
        title: aiRecipe.title,
        description: aiRecipe.description,
        difficulty: aiRecipe.difficulty,
        prepTime: aiRecipe.prepTime,
        cookTime: aiRecipe.cookTime,
        servings: aiRecipe.servings,
        mealType: mealType,
        ingredients: aiRecipe.ingredients,
        instructions: aiRecipe.instructions,
        nutritionHighlights: aiRecipe.nutritionHighlights,
        genotypeSpecific: aiRecipe.genotypeSpecific,
        tags: aiRecipe.tags
      };

      // Validar ingredientes
      const validation = validateRecipeIngredients(aiRecipe, foodData);
      if (!validation.isValid) {
        setWarnings(validation.warnings);
      }

      setGeneratedRecipe(recipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar la receta');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportRecipe = () => {
    if (!generatedRecipe) return;

    const recipeText = `
${generatedRecipe.title}
${'='.repeat(generatedRecipe.title.length)}

Descripción: ${generatedRecipe.description}
Dificultad: ${generatedRecipe.difficulty}
Tiempo de preparación: ${generatedRecipe.prepTime} minutos
Tiempo de cocción: ${generatedRecipe.cookTime} minutos
Porciones: ${generatedRecipe.servings}

INGREDIENTES:
${generatedRecipe.ingredients.map(ing => 
  `- ${ing.amount} de ${ing.name}${ing.isSuperfood ? ' ⭐' : ''}${ing.notes ? ` (${ing.notes})` : ''}`
).join('\n')}

INSTRUCCIONES:
${generatedRecipe.instructions.map((step, index) => 
  `${index + 1}. ${step}`
).join('\n')}

BENEFICIOS NUTRICIONALES:
${generatedRecipe.nutritionHighlights.map(benefit => `• ${benefit}`).join('\n')}

ESPECÍFICO PARA TU GENOTIPO:
${generatedRecipe.genotypeSpecific}

Generado por IA Premium - ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([recipeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedRecipe.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header del Generador */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h3 className="text-2xl font-bold">Generador de Recetas IA</h3>
        </div>
        <p className="text-purple-100">
          Crea recetas personalizadas usando exclusivamente tus superalimentos del genotipo {genotypeId}
        </p>
      </div>

      {/* Formulario de Parámetros */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Personaliza tu receta</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Tipo de comida */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de comida
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="desayuno">Desayuno</option>
              <option value="almuerzo">Almuerzo</option>
              <option value="comida">Comida</option>
              <option value="cena">Cena</option>
            </select>
          </div>

          {/* Tiempo de cocción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo disponible
            </label>
            <select
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="rapido">Rápido (15-20 min)</option>
              <option value="medio">Medio (30-45 min)</option>
              <option value="elaborado">Elaborado (1 hora+)</option>
            </select>
          </div>

          {/* Porciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de porciones
            </label>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="8"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value) || 2)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Preferencias dietéticas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferencias dietéticas (opcional)
          </label>
          <input
            type="text"
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
            placeholder="Ej: sin gluten, bajo en sodio, vegetariano..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Ingredientes específicos */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredientes que te gustaría incluir (opcional)
          </label>
          <input
            type="text"
            value={specificIngredients}
            onChange={(e) => setSpecificIngredients(e.target.value)}
            placeholder="Ej: salmón, aguacate, espinacas (separar con comas)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Solo se incluirán si son compatibles con tu genotipo
          </p>
        </div>

        {/* Botón de generar */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando receta personalizada...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Receta IA
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800">Error al generar receta</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Advertencias */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">Advertencias nutricionales</h4>
              <ul className="text-amber-700 text-sm mt-2 space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Receta Generada */}
      {generatedRecipe && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800">
              Tu receta personalizada
            </h4>
            <button
              onClick={exportRecipe}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
          
          <RecipeCard 
            recipe={generatedRecipe}
            isExpanded={true}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeAIGenerator;