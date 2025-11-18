import { GoogleGenerativeAI } from '@google/generative-ai';
import type { FoodGuideData, FoodItem } from '../types';
import type { Recipe } from '../recipeData';
import { getGeminiApiKey } from './env';

const apiKey = getGeminiApiKey();
const genAI = new GoogleGenerativeAI(apiKey || '');

interface RecipeRequest {
  genotypeId: number;
  mealType: 'desayuno' | 'almuerzo' | 'comida' | 'cena';
  dietaryPreferences?: string;
  cookingTime?: 'rapido' | 'medio' | 'elaborado';
  servings?: number;
  specificIngredients?: string[];
}

interface GeneratedRecipe {
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Array<{
    name: string;
    amount: string;
    isSuperfood: boolean;
    notes?: string;
  }>;
  instructions: string[];
  nutritionHighlights: string[];
  genotypeSpecific: string;
  tags: string[];
}

export const generateCustomRecipe = async (
  request: RecipeRequest,
  foodData: FoodGuideData
): Promise<GeneratedRecipe> => {
  // Extraer superalimentos y toxinas del genotipo
  const superfoods: string[] = [];
  const toxins: string[] = [];
  const neutralFoods: string[] = [];

  Object.entries(foodData.categorias_alimentos).forEach(([category, foods]) => {
    foods.forEach((food: FoodItem) => {
      if (food.estado === 'Superalimento') {
        superfoods.push(food.nombre);
      } else if (food.estado === 'Toxina') {
        toxins.push(food.nombre);
      } else {
        neutralFoods.push(food.nombre);
      }
    });
  });

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const mealTypeSpanish = {
    'desayuno': 'desayuno',
    'almuerzo': 'almuerzo (media mañana)',
    'comida': 'comida (almuerzo principal)',
    'cena': 'cena'
  };

  const cookingTimeMap = {
    'rapido': '15-20 minutos máximo',
    'medio': '30-45 minutos',
    'elaborado': '1 hora o más'
  };

  const prompt = `
Eres un chef nutricionista especializado en nutrigenómica. Crea una receta personalizada para un ${mealTypeSpanish[request.mealType]} mexicano.

GENOTIPO: ${foodData.genotipo_info.nombre}
DESCRIPCIÓN DEL GENOTIPO: ${foodData.genotipo_info.descripcion}

REGLAS NUTRICIONALES ESTRICTAS:
1. USAR PRINCIPALMENTE: ${superfoods.slice(0, 20).join(', ')}
2. EVITAR COMPLETAMENTE: ${toxins.slice(0, 15).join(', ')}
3. Alimentos neutros permitidos: ${neutralFoods.slice(0, 10).join(', ')}

PARÁMETROS DE LA RECETA:
- Tipo de comida: ${mealTypeSpanish[request.mealType]}
- Tiempo de cocción: ${request.cookingTime ? cookingTimeMap[request.cookingTime] : 'flexible'}
- Porciones: ${request.servings || 2}
- Preferencias dietéticas: ${request.dietaryPreferences || 'Ninguna especial'}
- Ingredientes específicos solicitados: ${request.specificIngredients?.join(', ') || 'Ninguno'}

FORMATO DE RESPUESTA REQUERIDO (JSON válido):
{
  "title": "Nombre de la receta",
  "description": "Descripción breve y atractiva",
  "difficulty": "Fácil|Intermedio|Avanzado",
  "prepTime": número_en_minutos,
  "cookTime": número_en_minutos,
  "servings": ${request.servings || 2},
  "ingredients": [
    {
      "name": "nombre del ingrediente",
      "amount": "cantidad exacta",
      "isSuperfood": true/false,
      "notes": "nota opcional si es superalimento"
    }
  ],
  "instructions": [
    "Paso 1 detallado",
    "Paso 2 detallado",
    "etc."
  ],
  "nutritionHighlights": [
    "Beneficio nutricional 1",
    "Beneficio nutricional 2",
    "etc."
  ],
  "genotypeSpecific": "Explicación de por qué esta receta es ideal para este genotipo específico",
  "tags": ["tag1", "tag2", "tag3"]
}

INSTRUCCIONES IMPORTANTES:
- Usa principalmente ingredientes de la lista de superalimentos
- NO uses ningún ingrediente de la lista de toxinas
- Incluye técnicas de cocción mexicanas tradicionales cuando sea apropiado
- La receta debe ser práctica y realizable en una cocina mexicana estándar
- Explica los beneficios específicos para este genotipo
- Responde SOLO con el JSON válido, sin texto adicional
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Limpiar la respuesta para obtener solo el JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON válido de la respuesta');
    }

    const jsonResponse = JSON.parse(jsonMatch[0]);
    
    // Validar que la respuesta tenga la estructura correcta
    if (!jsonResponse.title || !jsonResponse.ingredients || !jsonResponse.instructions) {
      throw new Error('Respuesta de IA incompleta');
    }

    return jsonResponse as GeneratedRecipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Error al generar la receta personalizada. Intenta nuevamente.');
  }
};

export const validateRecipeIngredients = (
  recipe: GeneratedRecipe,
  foodData: FoodGuideData
): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  const toxins: string[] = [];

  // Extraer toxinas del genotipo
  Object.entries(foodData.categorias_alimentos).forEach(([category, foods]) => {
    foods.forEach((food: FoodItem) => {
      if (food.estado === 'Toxina') {
        toxins.push(food.nombre.toLowerCase());
      }
    });
  });

  // Verificar ingredientes contra toxinas
  recipe.ingredients.forEach(ingredient => {
    const ingredientLower = ingredient.name.toLowerCase();
    const hasToxin = toxins.some(toxin => 
      ingredientLower.includes(toxin) || toxin.includes(ingredientLower)
    );
    
    if (hasToxin) {
      warnings.push(`⚠️ ${ingredient.name} puede no ser ideal para tu genotipo`);
    }
  });

  return {
    isValid: warnings.length === 0,
    warnings
  };
};