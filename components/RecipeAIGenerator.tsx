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
  const [cuisineType, setCuisineType] = useState<string>('');
  const [healthBenefits, setHealthBenefits] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
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
        cuisineType: cuisineType || undefined,
        healthBenefits: healthBenefits.length > 0 ? healthBenefits : undefined,
        allergies: allergies.trim() || undefined,
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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h3 className="text-2xl font-bold">Generador de Recetas IA</h3>
        </div>
        <p className="text-emerald-100">
          Crea recetas personalizadas usando exclusivamente tus superalimentos del genotipo {genotypeId}
        </p>
      </div>

      {/* Formulario de Parámetros */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Personaliza tu receta</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
              <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold text-lg transition-colors duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px]"
                  disabled={servings <= 1}
                  aria-label="Reducir porciones"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={servings}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 1 && value <= 12) {
                      setServings(value);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-center border-0 focus:ring-0 focus:outline-none text-lg font-semibold bg-white min-w-[60px]"
                  aria-label="Número de porciones"
                />
                <button
                  type="button"
                  onClick={() => setServings(Math.min(12, servings + 1))}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-bold text-lg transition-colors duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px]"
                  disabled={servings >= 12}
                  aria-label="Aumentar porciones"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Rango: 1-12 personas
            </p>
          </div>

          {/* Tipo de Cocina */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cocina
            </label>
            <select
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Selecciona una opción</option>
              <option value="internacional">Internacional</option>
              <option value="mexicana">Mexicana</option>
              <option value="italiana">Italiana</option>
              <option value="asiatica">Asiática</option>
              <option value="mediterranea">Mediterránea</option>
              <option value="francesa">Francesa</option>
              <option value="americana">Americana</option>
              <option value="española">Española</option>
              <option value="hindu">Hindú</option>
              <option value="china">China</option>
              <option value="japonesa">Japonesa</option>
              <option value="griega">Griega</option>
            </select>
          </div>

          {/* Beneficios de Salud */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beneficios de Salud
            </label>
            <select
              multiple
              value={healthBenefits}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setHealthBenefits(selectedOptions);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
            >
              <option value="nutrigenomica">Nutrigenómica</option>
              <option value="desinflamatoria">Antiinflamatoria</option>
              <option value="antioxidante">Antioxidante</option>
              <option value="cardiovascular">Cardiovascular</option>
              <option value="sensibilidad_insulina">Sensibilidad a la insulina</option>
              <option value="salud_digestiva">Salud digestiva</option>
              <option value="salud_osea">Salud ósea</option>
              <option value="salud_cognitiva">Salud cognitiva</option>
              <option value="control_peso">Control del peso</option>
              <option value="rendimiento_deportivo">Rendimiento deportivo/energética</option>
              <option value="detoxificante">Detoxificante</option>
              <option value="salud_piel">Salud de la piel</option>
              <option value="salud_hormonal">Salud hormonal</option>
              <option value="sistema_inmunologico">Sistema inmunológico</option>
              <option value="keto">Keto</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Mantén presionado Ctrl (Cmd en Mac) para selección múltiple
            </p>
            {healthBenefits.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {healthBenefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                  >
                    {benefit.replace('_', ' ')}
                    <button
                      type="button"
                      onClick={() => setHealthBenefits(prev => prev.filter(b => b !== benefit))}
                      className="ml-1 text-emerald-600 hover:text-emerald-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Alergias e Intolerancias */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alergias e intolerancias alimentarias
          </label>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Anote separadas por comas, las alergias o intolerancias alimentarias..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ej: gluten, lactosa, frutos secos, mariscos...
          </p>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
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