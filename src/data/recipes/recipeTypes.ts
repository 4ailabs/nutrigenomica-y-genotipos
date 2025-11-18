/**
 * Tipos compartidos para el sistema de recetas
 */

export interface RecipeIngredient {
  name: string;
  amount: string;
  isSuperfood: boolean;
  notes?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  prepTime: number; // minutos
  cookTime: number;
  servings: number;
  mealType: 'desayuno' | 'almuerzo' | 'comida' | 'cena';
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutritionHighlights: string[];
  genotypeSpecific: string; // Por qué es buena para este genotipo
  tags: string[];
}

export interface GenotypeRecipes {
  [genotypeId: number]: Recipe[];
}

/**
 * Metadatos de recetas por genotipo (ligero para el índice)
 */
export interface GenotypeRecipeMetadata {
  id: number;
  name: string;
  count: number;
  loadModule: () => Promise<{ recipes: Recipe[] }>;
}

