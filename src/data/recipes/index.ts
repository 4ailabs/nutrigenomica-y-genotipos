/**
 * Sistema de recetas con lazy loading
 * 
 * Este módulo implementa un sistema eficiente de carga de recetas:
 * - Lazy loading: Las recetas solo se cargan cuando se necesitan
 * - Caché en memoria: Una vez cargadas, se mantienen en caché
 * - Índice ligero: Solo metadatos iniciales
 */

import type { Recipe, GenotypeRecipeMetadata } from './recipeTypes';

// Cache en memoria para recetas ya cargadas
const recipeCache = new Map<number, Recipe[]>();

/**
 * Metadatos de recetas por genotipo (ligero)
 */
export const GENOTYPE_RECIPE_METADATA: GenotypeRecipeMetadata[] = [
  {
    id: 1,
    name: 'Hunter',
    count: 12,
    loadModule: () => import('../../../recipeData').then(m => ({ recipes: m.RECIPE_DATA[1] || [] }))
  },
  {
    id: 2,
    name: 'Gatherer',
    count: 8,
    loadModule: () => import('../../../recipeData').then(m => ({ recipes: m.RECIPE_DATA[2] || [] }))
  },
  {
    id: 3,
    name: 'Master',
    count: 8,
    loadModule: () => import('../../../recipeData').then(m => ({ recipes: m.RECIPE_DATA[3] || [] }))
  },
  {
    id: 4,
    name: 'Explorer',
    count: 8,
    loadModule: () => import('../../../recipeData').then(m => ({ recipes: m.RECIPE_DATA[4] || [] }))
  },
  {
    id: 5,
    name: 'Warrior',
    count: 8,
    loadModule: () => import('../../../recipeData').then(m => ({ recipes: m.RECIPE_DATA[5] || [] }))
  },
  {
    id: 6,
    name: 'Nomad',
    count: 8,
    loadModule: () => import('../../../recipeData').then(m => ({ recipes: m.RECIPE_DATA[6] || [] }))
  }
];

/**
 * Obtiene recetas de un genotipo con lazy loading
 * @param genotypeId ID del genotipo (1-6)
 * @returns Promise con array de recetas
 */
export async function getRecipesByGenotype(genotypeId: number): Promise<Recipe[]> {
  // Verificar caché
  if (recipeCache.has(genotypeId)) {
    return recipeCache.get(genotypeId)!;
  }

  // Buscar metadata
  const metadata = GENOTYPE_RECIPE_METADATA.find(m => m.id === genotypeId);
  if (!metadata) {
    console.warn(`No se encontraron recetas para genotipo ${genotypeId}`);
    return [];
  }

  try {
    // Cargar recetas dinámicamente
    const { recipes } = await metadata.loadModule();
    
    // Guardar en caché
    recipeCache.set(genotypeId, recipes);
    
    return recipes;
  } catch (error) {
    console.error(`Error cargando recetas para genotipo ${genotypeId}:`, error);
    return [];
  }
}

/**
 * Precarga recetas de un genotipo en segundo plano
 * Útil para mejorar UX cuando el usuario está por seleccionar un genotipo
 */
export function preloadRecipes(genotypeId: number): void {
  if (!recipeCache.has(genotypeId)) {
    getRecipesByGenotype(genotypeId).catch(err => {
      console.warn(`Error en precarga de recetas para genotipo ${genotypeId}:`, err);
    });
  }
}

/**
 * Precarga todas las recetas en segundo plano
 * Llamar solo si el usuario tiene conexión rápida y recursos disponibles
 */
export function preloadAllRecipes(): void {
  GENOTYPE_RECIPE_METADATA.forEach(metadata => {
    preloadRecipes(metadata.id);
  });
}

/**
 * Limpia el caché de recetas
 * Útil para liberar memoria si es necesario
 */
export function clearRecipeCache(genotypeId?: number): void {
  if (genotypeId) {
    recipeCache.delete(genotypeId);
  } else {
    recipeCache.clear();
  }
}

/**
 * Obtiene estadísticas del caché
 */
export function getRecipeCacheStats(): {
  cached: number;
  total: number;
  percentage: number;
} {
  const cached = recipeCache.size;
  const total = GENOTYPE_RECIPE_METADATA.length;
  return {
    cached,
    total,
    percentage: total > 0 ? Math.round((cached / total) * 100) : 0
  };
}

// Re-exportar tipos
export type { Recipe, RecipeIngredient, GenotypeRecipeMetadata } from './recipeTypes';

