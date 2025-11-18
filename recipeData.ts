/**
 * Datos de recetas por genotipo
 * 
 * NOTA: Este archivo contiene todas las recetas pero ahora se puede
 * cargar dinámicamente usando el sistema de lazy loading en src/data/recipes/
 * 
 * Para código nuevo, usa: import { getRecipesByGenotype } from './data/recipes';
 */

// Re-exportar tipos desde el módulo centralizado
export type {
  RecipeIngredient,
  Recipe,
  GenotypeRecipes
} from './data/recipes/recipeTypes';

import type { GenotypeRecipes } from './data/recipes/recipeTypes';

export const RECIPE_DATA: GenotypeRecipes = {
  1: [ // Hunter Recipes
    {
      id: "hunter_salmón_aguacate",
      title: "Salmón Rey con Aguacate y Espinacas",
      description: "Desayuno rico en proteínas y omega-3, perfecto para activar tu metabolismo Hunter desde la mañana.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      mealType: "desayuno",
      ingredients: [
        { name: "Salmón rey", amount: "200g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aguacate", amount: "1 mediano", isSuperfood: true },
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Huevos enteros", amount: "2 unidades", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aceite de oliva", amount: "1 cucharada", isSuperfood: true },
        { name: "Limón", amount: "1/2 unidad", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Calentar una sartén con aceite de oliva a fuego medio",
        "Salpimentar el salmón y sellarlo 3-4 minutos por cada lado",
        "En la misma sartén, saltear las espinacas hasta que se marchiten",
        "Batir los huevos y preparar un revuelto cremoso",
        "Cortar el aguacate en láminas y rociar con limón",
        "Servir todo junto, el salmón sobre las espinacas con aguacate y huevos al lado"
      ],
      nutritionHighlights: [
        "Alto contenido de omega-3 para función cerebral óptima",
        "Proteínas de alta calidad para masa muscular",
        "Grasas saludables para saciedad prolongada",
        "Rico en vitaminas liposolubles"
      ],
      genotypeSpecific: "Los Hunter necesitan proteínas de alta calidad y grasas saludables para mantener su metabolismo eficiente y niveles de energía estables. Este desayuno combina activadores metabólicos clave.",
      tags: ["alto_en_proteinas", "omega_3", "activador_metabolico", "antiinflamatorio"]
    },
    {
      id: "hunter_res_verduras",
      title: "Res Sellada con Verduras de Hoja Verde",
      description: "Almuerzo poderoso que combina la fuerza de la res con verduras alcalinizantes para el Hunter.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Filete de res", amount: "300g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Brócoli", amount: "2 tazas", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Acelgas", amount: "2 tazas", isSuperfood: true },
        { name: "Ajo", amount: "3 dientes", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Romero fresco", amount: "2 ramas", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Sacar la res del refrigerador 30 minutos antes para que tome temperatura ambiente",
        "Salpimentar generosamente y marcar con romero",
        "Calentar sartén de hierro a fuego alto con aceite de oliva",
        "Sellar la res 2-3 minutos por lado para término medio",
        "Retirar y dejar reposar 5 minutos cubierta con papel aluminio",
        "En la misma sartén, saltear ajo, luego brócoli por 3 minutos",
        "Agregar espinacas y acelgas, saltear hasta marchitar",
        "Rebanar la res y servir sobre las verduras"
      ],
      nutritionHighlights: [
        "Proteína completa de alta biodisponibilidad",
        "Hierro hemo para prevenir anemia",
        "Vitaminas del complejo B para energía",
        "Antioxidantes de verduras de hoja verde"
      ],
      genotypeSpecific: "La res es el activador metabólico más potente para Hunter, proporcionando la energía y fuerza que tu genotipo requiere. Las verduras ayudan a alcalinizar y balancear.",
      tags: ["activador_metabolico", "alto_hierro", "energetico", "fortalecedor"]
    },
    {
      id: "hunter_trucha_esparragos",
      title: "Trucha Arcoíris con Espárragos y Nueces",
      description: "Cena ligera pero nutritiva que combina pescado rico en omega-3 con vegetales detoxificantes.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 18,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Trucha arcoíris", amount: "2 filetes (250g)", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Espárragos", amount: "1 manojo", isSuperfood: true },
        { name: "Nueces", amount: "1/4 taza", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: false },
        { name: "Tomillo fresco", amount: "1 cucharada", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 180°C",
        "Lavar y cortar la base dura de los espárragos",
        "Colocar trucha y espárragos en bandeja para horno",
        "Rociar con aceite de oliva, jugo de limón y tomillo",
        "Salpimentar al gusto",
        "Hornear 15 minutos hasta que la trucha se deshaga fácilmente",
        "Tostar ligeramente las nueces en sartén seca",
        "Servir la trucha con espárragos y espolvorear nueces encima"
      ],
      nutritionHighlights: [
        "Omega-3 EPA y DHA para función cerebral",
        "Proteína magra de fácil digestión",
        "Fibra y antioxidantes de espárragos",
        "Grasas saludables de nueces"
      ],
      genotypeSpecific: "Perfect para Hunter en la noche: proteína de calidad sin ser demasiado pesada, con grasas saludables que mantienen la saciedad nocturna sin interferir con el sueño.",
      tags: ["omega_3", "ligero", "detoxificante", "reparador"]
    },
    {
      id: "hunter_sardinas_ensalada",
      title: "Ensalada de Sardinas con Verduras Mixtas",
      description: "Almuerzo ligero rico en omega-3 y antioxidantes para mantener la energía Hunter entre comidas.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      mealType: "almuerzo",
      ingredients: [
        { name: "Sardinas en aceite de oliva", amount: "1 lata (120g)", isSuperfood: true, notes: "Activador metabólico + Ω3" },
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Rúcula", amount: "1 taza", isSuperfood: true },
        { name: "Aguacate", amount: "1/2 unidad", isSuperfood: true },
        { name: "Aceite de oliva extra virgen", amount: "1 cucharada", isSuperfood: true },
        { name: "Vinagre de manzana", amount: "1 cucharadita", isSuperfood: false },
        { name: "Limón", amount: "1/2 unidad", isSuperfood: false }
      ],
      instructions: [
        "Lavar y secar bien las hojas verdes",
        "Cortar el aguacate en cubos y rociar con limón",
        "Escurrir las sardinas y desmenuzar ligeramente",
        "Combinar espinacas y rúcula en un bowl",
        "Preparar vinagreta mezclando aceite de oliva, vinagre y jugo de limón",
        "Agregar aguacate y sardinas sobre las hojas",
        "Aderezar con la vinagreta y mezclar suavemente"
      ],
      nutritionHighlights: [
        "Máxima concentración de omega-3 marinos",
        "Proteína completa de alta calidad",
        "Vitaminas liposolubles A, D, E, K",
        "Antioxidantes de hojas verdes"
      ],
      genotypeSpecific: "Las sardinas son uno de los superalimentos más potentes para Hunter: pequeñas pero cargadas de nutrientes concentrados que activan el metabolismo y proporcionan energía sostenida.",
      tags: ["activador_metabolico", "omega_3", "energetico", "practico"]
    },
    {
      id: "hunter_higado_cebolla",
      title: "Hígado de Res con Cebolla y Vegetales",
      description: "Plato tradicional rico en nutrientes esenciales, especialmente diseñado para la fortaleza Hunter.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 12,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Hígado de res", amount: "300g", isSuperfood: true, notes: "Denso en nutrientes" },
        { name: "Cebolla", amount: "2 medianas", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Ajo", amount: "3 dientes", isSuperfood: true },
        { name: "Tomillo", amount: "1 cucharada", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Remojar el hígado en leche 30 minutos para suavizar (opcional)",
        "Cortar en tiras de 1cm de grosor",
        "Salpimentar y espolvorear con tomillo",
        "Calentar aceite en sartén grande a fuego medio-alto",
        "Saltear cebolla en rodajas hasta dorar (8 minutos)",
        "Agregar ajo por 1 minuto",
        "Subir fuego y sellar hígado 2 minutos por lado (no sobrecocinar)",
        "Agregar espinacas al final hasta marchitar",
        "Servir inmediatamente"
      ],
      nutritionHighlights: [
        "Mayor concentración de vitamina A de cualquier alimento",
        "Hierro hemo de máxima absorción",
        "Vitaminas del complejo B para energía",
        "CoQ10 para función celular óptima"
      ],
      genotypeSpecific: "El hígado es el 'multivitamínico de la naturaleza' para Hunter. Proporciona los nutrientes más concentrados que tu genotipo necesita para mantener energía y fuerza óptimas.",
      tags: ["denso_nutrientes", "alto_hierro", "vitaminas_B", "tradicional"]
    },
    {
      id: "hunter_cordero_romero",
      title: "Cordero al Romero con Espárragos",
      description: "Plato aromático de cordero con hierbas y vegetales, ideal para la cena Hunter.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Chuletas de cordero", amount: "300g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Espárragos", amount: "1 manojo", isSuperfood: true },
        { name: "Ajo", amount: "4 dientes", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Romero fresco", amount: "3 ramas", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Marinar cordero con ajo picado, romero y aceite de oliva (30 minutos)",
        "Precalentar sartén de hierro a fuego alto",
        "Sellar chuletas 3-4 minutos por lado",
        "Bajar fuego y cocinar 5 minutos más",
        "Retirar y dejar reposar cubierto",
        "Asar espárragos en la misma sartén con ajo",
        "Rociar con jugo de limón y servir"
      ],
      nutritionHighlights: [
        "Proteína de alta calidad con aminoácidos esenciales",
        "Grasas saludables para energía sostenida",
        "Vitaminas del complejo B para metabolismo",
        "Zinc para función inmune"
      ],
      genotypeSpecific: "El cordero es un activador metabólico clave para Hunter, proporcionando nutrientes densos que optimizan la producción de energía y fortalecen el sistema muscular.",
      tags: ["activador_metabolico", "proteina_premium", "aromático", "energetico"]
    },
    {
      id: "hunter_huevos_aguacate",
      title: "Huevos Revueltos con Aguacate y Tocino",
      description: "Desayuno completo y energético con grasas saludables y proteínas para iniciar el día.",
      difficulty: "Fácil",
      prepTime: 5,
      cookTime: 10,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Huevos enteros", amount: "3 unidades", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aguacate", amount: "1/2 mediano", isSuperfood: true },
        { name: "Ghee", amount: "1 cucharada", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Espinacas baby", amount: "1 taza", isSuperfood: true },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false },
        { name: "Pimienta negra", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Batir los huevos con sal y pimienta",
        "Calentar ghee en sartén a fuego medio",
        "Agregar espinacas y marchitar (1 minuto)",
        "Añadir huevos y revolver suavemente",
        "Cocinar hasta cremosos (no secos)",
        "Servir con aguacate en rebanadas al lado"
      ],
      nutritionHighlights: [
        "Colina para función cerebral óptima",
        "Grasas saludables para saciedad",
        "Proteína completa con todos los aminoácidos",
        "Vitaminas liposolubles A, D, E, K"
      ],
      genotypeSpecific: "Combinación perfecta de activadores metabólicos Hunter: huevos y ghee proporcionan la energía y nutrientes que tu genotipo necesita para un metabolismo óptimo desde la mañana.",
      tags: ["desayuno_completo", "activador_metabolico", "rapido", "energetico"]
    },
    {
      id: "hunter_bacalao_alcaparras",
      title: "Bacalao con Alcaparras y Aceitunas",
      description: "Pescado blanco mediterráneo con sabores intensos, perfecto para almuerzos ligeros.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Bacalao fresco", amount: "300g", isSuperfood: true, notes: "Ω3" },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Ajo", amount: "3 dientes", isSuperfood: true },
        { name: "Alcaparras", amount: "2 cucharadas", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false },
        { name: "Perejil fresco", amount: "1/4 taza", isSuperfood: false }
      ],
      instructions: [
        "Salpimentar el bacalao",
        "Calentar aceite de oliva a fuego medio",
        "Saltear ajo hasta fragante",
        "Agregar bacalao y cocinar 4-5 minutos por lado",
        "Añadir alcaparras y jugo de limón",
        "Marchitar espinacas en la misma sartén",
        "Servir espolvoreado con perejil"
      ],
      nutritionHighlights: [
        "Omega-3 para salud cardiovascular",
        "Proteína magra de alta calidad",
        "Bajo en mercurio, seguro para consumo frecuente",
        "Vitaminas del complejo B"
      ],
      genotypeSpecific: "El bacalao es un superalimento Hunter rico en omega-3, proporcionando proteína de calidad sin ser demasiado pesado, ideal para mantener energía estable durante el día.",
      tags: ["omega_3", "ligero", "mediterraneo", "practico"]
    },
    {
      id: "hunter_arenque_mostaza",
      title: "Arenque Ahumado con Mostaza y Verduras",
      description: "Desayuno escandinavo rico en omega-3 y proteínas para energía matutina.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      mealType: "desayuno",
      ingredients: [
        { name: "Arenque ahumado", amount: "200g", isSuperfood: true, notes: "Ω3" },
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Nueces", amount: "1/4 taza", isSuperfood: true },
        { name: "Aceite de oliva", amount: "1 cucharada", isSuperfood: true },
        { name: "Mostaza de Dijon", amount: "1 cucharadita", isSuperfood: false },
        { name: "Limón", amount: "1/2 unidad", isSuperfood: false },
        { name: "Eneldo fresco", amount: "2 cucharadas", isSuperfood: false }
      ],
      instructions: [
        "Lavar y secar espinacas",
        "Cortar arenque en trozos medianos",
        "Tostar nueces ligeramente",
        "Preparar vinagreta con aceite, mostaza y limón",
        "Mezclar espinacas con vinagreta",
        "Agregar arenque y nueces",
        "Decorar con eneldo fresco"
      ],
      nutritionHighlights: [
        "Máximo contenido de omega-3 EPA y DHA",
        "Proteína completa de alta biodisponibilidad",
        "Vitamina D natural para salud ósea",
        "Antioxidantes de nueces y verduras"
      ],
      genotypeSpecific: "El arenque es uno de los pescados más nutritivos para Hunter, con omega-3 concentrados que activan el metabolismo y proporcionan energía sostenida desde temprano.",
      tags: ["omega_3", "desayuno_salado", "escandinavo", "denso_nutrientes"]
    },
    {
      id: "hunter_venado_ciruela",
      title: "Venado con Reducción de Ciruela",
      description: "Carne de caza gourmet con salsa de frutas, ideal para cenas especiales.",
      difficulty: "Avanzado",
      prepTime: 20,
      cookTime: 30,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Filete de venado", amount: "300g", isSuperfood: true },
        { name: "Espárragos", amount: "1 manojo", isSuperfood: true },
        { name: "Ajo", amount: "3 dientes", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Ciruelas secas", amount: "8 unidades", isSuperfood: false },
        { name: "Vino tinto", amount: "1/2 taza", isSuperfood: false },
        { name: "Tomillo", amount: "2 ramas", isSuperfood: false }
      ],
      instructions: [
        "Marinar venado con ajo y tomillo (1 hora)",
        "Remojar ciruelas en vino hasta suavizar",
        "Sellar venado en sartén caliente 3-4 minutos por lado",
        "Retirar y dejar reposar",
        "En la misma sartén, reducir vino con ciruelas",
        "Asar espárragos con aceite de oliva",
        "Rebanar venado y servir con salsa y espárragos"
      ],
      nutritionHighlights: [
        "Proteína magra más alta que cualquier carne doméstica",
        "Hierro hemo de máxima absorción",
        "Bajo en grasas saturadas",
        "Rico en vitaminas del complejo B"
      ],
      genotypeSpecific: "El venado es un superalimento Hunter excepcional: proteína pura y magra que proporciona nutrientes concentrados sin exceso de grasas, ideal para la fuerza y resistencia del genotipo.",
      tags: ["carne_salvaje", "gourmet", "magro", "ocasion_especial"]
    },
    {
      id: "hunter_lubina_hierbas",
      title: "Lubina al Horno con Hierbas Mediterráneas",
      description: "Pescado entero horneado con hierbas aromáticas, sencillo y nutritivo.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Lubina entera", amount: "500g", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "3 cucharadas", isSuperfood: true },
        { name: "Ajo", amount: "4 dientes", isSuperfood: true },
        { name: "Limón", amount: "2 unidades", isSuperfood: false },
        { name: "Romero", amount: "3 ramas", isSuperfood: false },
        { name: "Tomillo", amount: "3 ramas", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 180°C",
        "Hacer 3 cortes diagonales en cada lado de la lubina",
        "Rellenar cavidad con rodajas de limón y hierbas",
        "Insertar ajo en los cortes",
        "Rociar generosamente con aceite de oliva",
        "Hornear 20-25 minutos hasta que se deshaga fácilmente",
        "Servir sobre cama de espinacas salteadas"
      ],
      nutritionHighlights: [
        "Proteína de alta calidad fácil de digerir",
        "Grasas saludables omega-3",
        "Minerales esenciales (selenio, fósforo)",
        "Bajo en calorías, alto en nutrientes"
      ],
      genotypeSpecific: "La lubina es perfecta para Hunter: pescado blanco de carne firme que proporciona proteína de calidad y nutrientes esenciales sin ser pesado para la digestión.",
      tags: ["pescado_entero", "mediterraneo", "horno", "familiar"]
    }
  ],
  2: [ // Gatherer Recipes
    {
      id: "gatherer_vegetales_hongos",
      title: "Salteado de Vegetales con Hongos Maitake",
      description: "Desayuno energético rico en vegetales activadores metabólicos y hongos medicinales para el Gatherer.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      mealType: "desayuno",
      ingredients: [
        { name: "Hongos Maitake", amount: "150g", isSuperfood: true },
        { name: "Champiñones", amount: "200g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Jitomate", amount: "2 medianos", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Pimiento morrón", amount: "1 rojo", isSuperfood: true },
        { name: "Cebolla", amount: "1 mediana", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false },
        { name: "Ajo", amount: "3 dientes", isSuperfood: false }
      ],
      instructions: [
        "Limpiar y cortar todos los hongos en láminas",
        "Cortar jitomates, pimientos y cebolla en tiras",
        "Calentar aceite de oliva en sartén grande a fuego medio-alto",
        "Saltear cebolla y ajo hasta dorar (3 minutos)",
        "Agregar hongos y cocinar hasta dorar (5 minutos)",
        "Añadir pimientos y jitomates, cocinar 4 minutos",
        "Incorporar espinacas al final hasta marchitar",
        "Salpimentar y servir caliente"
      ],
      nutritionHighlights: [
        "Beta-glucanos de hongos para inmunidad",
        "Antioxidantes vegetales para detoxificación",
        "Fibra soluble para salud digestiva",
        "Minerales esenciales biodisponibles"
      ],
      genotypeSpecific: "Los Gatherer prosperan con vegetales ricos en nutrientes y hongos medicinales. Este salteado combina activadores metabólicos específicos que optimizan la absorción de nutrientes y apoyan el metabolismo ahorrativo característico.",
      tags: ["vegetariano", "hongos_medicinales", "activador_metabolico", "detoxificante"]
    },
    {
      id: "gatherer_pollo_vegetales",
      title: "Pollo Orgánico con Vegetales de Raíz",
      description: "Comida equilibrada que combina proteína de calidad con vegetales energéticos para el metabolismo Gatherer.",
      difficulty: "Intermedio",
      prepTime: 20,
      cookTime: 35,
      servings: 3,
      mealType: "comida",
      ingredients: [
        { name: "Pechuga de pollo orgánico", amount: "400g", isSuperfood: true },
        { name: "Ñame", amount: "300g", isSuperfood: true },
        { name: "Calabacín", amount: "2 medianos", isSuperfood: true },
        { name: "Espárragos", amount: "1 manojo", isSuperfood: true },
        { name: "Cebolla", amount: "1 grande", isSuperfood: true },
        { name: "Aceite de coco", amount: "2 cucharadas", isSuperfood: false },
        { name: "Tomillo fresco", amount: "2 ramas", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Cortar ñame en cubos y hornear a 180°C por 20 minutos",
        "Salpimentar el pollo y sellarlo en sartén con aceite de coco",
        "Retirar pollo y en la misma sartén saltear cebolla",
        "Agregar calabacín cortado en medias lunas",
        "Incorporar espárragos cortados en trozos de 3cm",
        "Volver a poner el pollo en la sartén",
        "Añadir ñame horneado y tomillo",
        "Cocinar tapado 10 minutos hasta que pollo esté cocido"
      ],
      nutritionHighlights: [
        "Proteína completa de alta calidad",
        "Carbohidratos complejos de digestión lenta",
        "Fibra prebiótica para microbiota",
        "Vitaminas del complejo B para energía"
      ],
      genotypeSpecific: "Perfect para Gatherer: combina proteína de calidad con carbohidratos complejos que mantienen energía estable. Los vegetales de raíz proporcionan la energía sostenida que este genotipo necesita.",
      tags: ["proteina_completa", "carbohidratos_complejos", "energetico", "equilibrado"]
    },
    {
      id: "gatherer_shiitake_jengibre",
      title: "Sopa de Hongos Shiitake con Jengibre",
      description: "Caldo reconfortante con hongos medicinales y especias, perfecto para cenas ligeras.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 25,
      servings: 3,
      mealType: "cena",
      ingredients: [
        { name: "Hongos Shiitake", amount: "200g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Champiñones", amount: "150g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla", amount: "1 grande", isSuperfood: true },
        { name: "Jengibre fresco", amount: "3cm", isSuperfood: true },
        { name: "Ajo", amount: "4 dientes", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Caldo de vegetales", amount: "4 tazas", isSuperfood: false },
        { name: "Aceite de sésamo", amount: "1 cucharada", isSuperfood: false }
      ],
      instructions: [
        "Laminar hongos shiitake y champiñones",
        "Rallar jengibre y picar ajo finamente",
        "Saltear cebolla, ajo y jengibre en aceite de sésamo (3 minutos)",
        "Agregar hongos y cocinar hasta dorar (6 minutos)",
        "Añadir caldo y hervir suavemente 15 minutos",
        "Incorporar espinacas al final hasta marchitar",
        "Servir caliente con cilantro fresco"
      ],
      nutritionHighlights: [
        "Beta-glucanos para fortalecer sistema inmune",
        "Compuestos antivirales de hongos shiitake",
        "Gingeroles antiinflamatorios de jengibre",
        "Hidratación y minerales del caldo"
      ],
      genotypeSpecific: "Los hongos son activadores metabólicos ideales para Gatherer. Esta sopa combina hongos medicinales que optimizan la absorción de nutrientes y apoyan el metabolismo característico del genotipo.",
      tags: ["hongos_medicinales", "activador_metabolico", "reconfortante", "inmunologico"]
    },
    {
      id: "gatherer_jitomate_albahaca",
      title: "Ensalada Caprese con Jitomates Orgánicos",
      description: "Almuerzo fresco mediterráneo con jitomates activadores y hierbas aromáticas.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Jitomates maduros", amount: "4 medianos", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Albahaca fresca", amount: "1 taza", isSuperfood: true },
        { name: "Aceite de oliva extra virgen", amount: "3 cucharadas", isSuperfood: true },
        { name: "Cebolla morada", amount: "1/2 pequeña", isSuperfood: true },
        { name: "Vinagre balsámico", amount: "1 cucharada", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false },
        { name: "Pimienta negra", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Cortar jitomates en rodajas gruesas",
        "Cortar cebolla en juliana muy fina",
        "Arrancar hojas de albahaca (no cortar)",
        "Alternar capas de jitomate, cebolla y albahaca",
        "Rociar generosamente con aceite de oliva",
        "Añadir vinagre balsámico en gotas",
        "Salpimentar y dejar reposar 10 minutos antes de servir"
      ],
      nutritionHighlights: [
        "Licopeno de jitomates para salud cardiovascular",
        "Antioxidantes polifenólicos de albahaca",
        "Grasas monoinsaturadas del aceite de oliva",
        "Vitamina C para síntesis de colágeno"
      ],
      genotypeSpecific: "Los jitomates son activadores metabólicos específicos de Gatherer. Esta ensalada simple maximiza los nutrientes biodisponibles con mínima preparación, ideal para el metabolismo ahorrativo del genotipo.",
      tags: ["crudo", "activador_metabolico", "mediterraneo", "antioxidante"]
    },
    {
      id: "gatherer_pavo_camote",
      title: "Pavo Orgánico con Camote Asado",
      description: "Comida nutritiva con proteína magra y tubérculos energéticos para Gatherer.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 35,
      servings: 3,
      mealType: "comida",
      ingredients: [
        { name: "Pechuga de pavo", amount: "400g", isSuperfood: true },
        { name: "Camote", amount: "500g", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Cebolla", amount: "1 grande", isSuperfood: true },
        { name: "Ajo", amount: "4 dientes", isSuperfood: true },
        { name: "Aceite de coco", amount: "2 cucharadas", isSuperfood: false },
        { name: "Romero", amount: "2 ramas", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 200°C",
        "Cortar camote en cubos y mezclar con aceite de coco",
        "Asar camote en horno 25-30 minutos",
        "Salpimentar pavo y marcar con romero",
        "Sellar pavo en sartén 5 minutos por lado",
        "Cocinar hasta término completo",
        "Servir con camote asado y espinacas salteadas"
      ],
      nutritionHighlights: [
        "Proteína magra de alta calidad",
        "Betacarotenos del camote para visión",
        "Carbohidratos complejos de digestión lenta",
        "Hierro de espinacas y pavo"
      ],
      genotypeSpecific: "El pavo y camote son ideales para Gatherer: proteína magra con carbohidratos complejos que proporcionan energía sostenida sin sobrecargar el sistema digestivo.",
      tags: ["proteina_magra", "tubérculos", "energetico", "familiar"]
    },
    {
      id: "gatherer_calabaza_quinoa",
      title: "Bowl de Calabaza Asada con Quinoa",
      description: "Desayuno o comida vegetariana completa con proteína vegetal y vegetales dulces.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 30,
      servings: 2,
      mealType: "desayuno",
      ingredients: [
        { name: "Calabaza de Castilla", amount: "300g", isSuperfood: true },
        { name: "Quinoa", amount: "1 taza", isSuperfood: true },
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Champiñones", amount: "150g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "1/2 mediana", isSuperfood: true },
        { name: "Semillas de girasol", amount: "2 cucharadas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true }
      ],
      instructions: [
        "Precalentar horno a 180°C",
        "Cortar calabaza en cubos y asar 25-30 minutos",
        "Cocinar quinoa según instrucciones del paquete",
        "Saltear champiñones y cebolla hasta dorar",
        "Marchitar espinacas en la misma sartén",
        "Mezclar todos los ingredientes en bowl",
        "Espolvorear semillas de girasol tostadas"
      ],
      nutritionHighlights: [
        "Proteína completa de quinoa con todos los aminoácidos",
        "Betacarotenos y fibra de calabaza",
        "Beta-glucanos de champiñones",
        "Grasas saludables de semillas"
      ],
      genotypeSpecific: "Perfect bowl Gatherer: combina proteína vegetal completa con vegetales densos en nutrientes y hongos activadores metabólicos para óptima absorción.",
      tags: ["vegetariano", "bowl_completo", "activador_metabolico", "energetico"]
    },
    {
      id: "gatherer_berenjena_tahini",
      title: "Berenjena Asada con Tahini y Garbanzos",
      description: "Plato del medio oriente vegetariano con sabores intensos y texturas cremosas.",
      difficulty: "Intermedio",
      prepTime: 20,
      cookTime: 35,
      servings: 3,
      mealType: "comida",
      ingredients: [
        { name: "Berenjena", amount: "2 grandes", isSuperfood: true },
        { name: "Garbanzos cocidos", amount: "2 tazas", isSuperfood: true },
        { name: "Jitomate", amount: "2 medianos", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla", amount: "1 grande", isSuperfood: true },
        { name: "Ajo", amount: "4 dientes", isSuperfood: true },
        { name: "Tahini", amount: "3 cucharadas", isSuperfood: false },
        { name: "Comino molido", amount: "1 cucharadita", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Cortar berenjenas por la mitad y hacer cortes en cruz",
        "Hornear a 200°C por 30 minutos hasta suaves",
        "Saltear cebolla y ajo hasta dorar",
        "Agregar jitomate picado y comino, cocinar 10 minutos",
        "Añadir garbanzos y calentar",
        "Mezclar tahini con limón y agua para salsa cremosa",
        "Servir berenjena con mezcla de garbanzos y salsa de tahini"
      ],
      nutritionHighlights: [
        "Fibra soluble e insoluble de berenjena",
        "Proteína vegetal de garbanzos",
        "Calcio y magnesio del tahini",
        "Antioxidantes de jitomate"
      ],
      genotypeSpecific: "Los garbanzos y jitomate son excelentes para Gatherer, proporcionando proteína vegetal y activadores metabólicos que optimizan la digestión y absorción de nutrientes.",
      tags: ["vegetariano", "medio_oriente", "alto_en_fibra", "cremoso"]
    },
    {
      id: "gatherer_pimiento_huevo",
      title: "Pimientos Rellenos de Huevo y Vegetales",
      description: "Desayuno colorido y nutritivo con vegetales al horno y proteína de calidad.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "desayuno",
      ingredients: [
        { name: "Pimientos morrones", amount: "4 grandes", isSuperfood: true },
        { name: "Huevos", amount: "4 unidades", isSuperfood: true },
        { name: "Espinacas picadas", amount: "1 taza", isSuperfood: true },
        { name: "Champiñones picados", amount: "1/2 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "1/2 pequeña", isSuperfood: true },
        { name: "Jitomate picado", amount: "1/2 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aceite de oliva", amount: "1 cucharada", isSuperfood: true }
      ],
      instructions: [
        "Precalentar horno a 180°C",
        "Cortar pimientos por la mitad y quitar semillas",
        "Saltear cebolla, champiñones y espinacas (5 minutos)",
        "Agregar jitomate y cocinar 2 minutos más",
        "Rellenar cada mitad de pimiento con mezcla de vegetales",
        "Romper un huevo sobre cada pimiento relleno",
        "Hornear 15-20 minutos hasta que huevo cuaje",
        "Servir caliente con hierbas frescas"
      ],
      nutritionHighlights: [
        "Vitamina C y antioxidantes de pimientos",
        "Proteína completa de huevos",
        "Licopeno de jitomates",
        "Beta-glucanos de champiñones"
      ],
      genotypeSpecific: "Combinación perfecta de activadores metabólicos Gatherer: champiñones y jitomates con proteína de calidad, todo al horno para preservar nutrientes.",
      tags: ["desayuno_horno", "activador_metabolico", "colorido", "nutritivo"]
    }
  ],
  3: [ // Master Recipes
    {
      id: "master_bowl_frutas",
      title: "Bowl de Frutas Master con Arándanos y Piña",
      description: "Desayuno refrescante y energético con frutas activadoras metabólicas específicas para Master.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Piña fresca", amount: "1 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Arándanos", amount: "1/2 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Papaya", amount: "1/2 taza", isSuperfood: true },
        { name: "Melón", amount: "1/2 taza", isSuperfood: true },
        { name: "Lima", amount: "1/2 unidad", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Frambuesas", amount: "1/4 taza", isSuperfood: true },
        { name: "Almendras laminadas", amount: "2 cucharadas", isSuperfood: false },
        { name: "Menta fresca", amount: "4 hojas", isSuperfood: false }
      ],
      instructions: [
        "Cortar la piña en cubos pequeños",
        "Cortar la papaya y melón en cubos",
        "Lavar arándanos y frambuesas",
        "Exprimir lima sobre todas las frutas",
        "Mezclar suavemente en un bowl",
        "Espolvorear almendras laminadas",
        "Decorar con hojas de menta fresca"
      ],
      nutritionHighlights: [
        "Enzimas digestivas naturales de piña",
        "Antioxidantes potentes de arándanos",
        "Vitamina C para síntesis de colágeno",
        "Fibra soluble para saciedad"
      ],
      genotypeSpecific: "Master se beneficia enormemente de frutas frescas con enzimas activas. Esta combinación de activadores metabólicos frutales optimiza la digestión y proporciona energía natural sostenida.",
      tags: ["frutas_frescas", "activador_metabolico", "antioxidantes", "digestivo"]
    },
    {
      id: "master_aguacate_champinones",
      title: "Aguacate Relleno con Champiñones Salteados",
      description: "Comida nutritiva que combina grasas saludables con vegetales activadores para el equilibrio Master.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 12,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Aguacates maduros", amount: "2 grandes", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Champiñones variados", amount: "300g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "1/2 mediana", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Arúgula", amount: "2 tazas", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false },
        { name: "Ajo", amount: "2 dientes", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Cortar aguacates por la mitad y retirar pulpa cuidadosamente",
        "Reservar cáscaras y cortar pulpa en cubos",
        "Laminar champiñones y cortar cebolla en juliana",
        "Saltear ajo y cebolla en aceite de oliva (3 minutos)",
        "Agregar champiñones y cocinar hasta dorar (8 minutos)",
        "Mezclar pulpa de aguacate con arúgula y jugo de limón",
        "Rellenar cáscaras con mezcla de aguacate",
        "Coronar con champiñones salteados calientes"
      ],
      nutritionHighlights: [
        "Grasas monoinsaturadas para salud cardiovascular",
        "Beta-glucanos de champiñones para inmunidad",
        "Folato para función neurológica",
        "Potasio para equilibrio electrolítico"
      ],
      genotypeSpecific: "Perfect para Master: el aguacate proporciona grasas saludables que este genotipo procesa eficientemente, mientras los champiñones aportan los activadores metabólicos específicos para optimizar la absorción de nutrientes.",
      tags: ["grasas_saludables", "activador_metabolico", "vegetariano", "equilibrante"]
    },
    {
      id: "master_ensalada_crudites",
      title: "Ensalada de Crudités con Brotes y Zanahoria",
      description: "Cena ligera y detoxificante con vegetales crudos ricos en enzimas para la digestión Master.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 0,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Zanahoria", amount: "2 grandes", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Col de Bruselas", amount: "200g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Brotes de alfalfa", amount: "1 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Escarola", amount: "3 tazas", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Puerro tierno", amount: "1 mediano", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Limón", amount: "1 unidad", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aceite de oliva extra virgen", amount: "3 cucharadas", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Rallar zanahorias con rallador grueso",
        "Cortar coles de Bruselas en juliana muy fina",
        "Cortar puerro en rodajas finas (solo parte blanca)",
        "Lavar y trocear escarola",
        "Enjuagar brotes de alfalfa",
        "Mezclar todos los vegetales en bowl grande",
        "Preparar vinagreta con limón, aceite y sal",
        "Aderezar y mezclar bien, dejar reposar 10 minutos"
      ],
      nutritionHighlights: [
        "Enzimas vivas de vegetales crudos",
        "Fibra insoluble para limpieza intestinal",
        "Betacarotenos para salud ocular",
        "Compuestos azufrados detoxificantes"
      ],
      genotypeSpecific: "Los Master procesan eficientemente vegetales crudos ricos en enzimas. Esta ensalada maximiza la absorción de micronutrientes y apoya los procesos naturales de detoxificación del genotipo.",
      tags: ["crudo", "detoxificante", "enzimas_vivas", "alto_en_fibra"]
    },
    {
      id: "master_smoothie_verde_tropical",
      title: "Smoothie Verde Tropical con Lima",
      description: "Batido energético con frutas tropicales activadoras y vegetales verdes para Master.",
      difficulty: "Fácil",
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Piña fresca", amount: "1 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Papaya", amount: "1/2 taza", isSuperfood: true },
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Lima", amount: "1 unidad", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Pepino", amount: "1/2 mediano", isSuperfood: true },
        { name: "Jengibre", amount: "1 cm", isSuperfood: true },
        { name: "Agua de coco", amount: "1 taza", isSuperfood: false }
      ],
      instructions: [
        "Pelar y cortar piña y papaya en cubos",
        "Lavar espinacas y pepino",
        "Exprimir lima y rallar jengibre",
        "Licuar todos los ingredientes con agua de coco",
        "Ajustar consistencia con más agua si es necesario",
        "Servir inmediatamente con hielo"
      ],
      nutritionHighlights: [
        "Bromelina de piña para digestión",
        "Papaína de papaya para enzimas proteolíticas",
        "Clorofila de espinacas para oxigenación",
        "Vitamina C de lima y frutas tropicales"
      ],
      genotypeSpecific: "Perfect para Master: combina múltiples activadores metabólicos frutales con enzimas digestivas naturales que optimizan la absorción de nutrientes.",
      tags: ["smoothie", "activador_metabolico", "tropical", "enzimas_digestivas"]
    },
    {
      id: "master_ensalada_arandanos",
      title: "Ensalada de Arándanos con Nueces y Cebolla",
      description: "Ensalada fresca con superalimentos Master y contrastes de sabores.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 0,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Arándanos frescos", amount: "1 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Escarola", amount: "3 tazas", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "1/2 mediana", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Nueces", amount: "1/2 taza", isSuperfood: true },
        { name: "Aguacate", amount: "1 mediano", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Lima", amount: "1 unidad", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Aceite de oliva", amount: "3 cucharadas", isSuperfood: false }
      ],
      instructions: [
        "Lavar y trocear escarola",
        "Cortar cebolla en juliana fina",
        "Tostar nueces ligeramente",
        "Cortar aguacate en cubos",
        "Preparar vinagreta con lima y aceite",
        "Mezclar todos los ingredientes",
        "Agregar arándanos al final para no aplastarlos"
      ],
      nutritionHighlights: [
        "Antocianinas de arándanos para antioxidación",
        "Compuestos azufrados de cebolla",
        "Omega-3 ALA de nueces",
        "Fibra prebiótica de escarola"
      ],
      genotypeSpecific: "Esta ensalada concentra 5 activadores metabólicos Master en un solo plato, optimizando la sinergia de nutrientes para el metabolismo equilibrado del genotipo.",
      tags: ["ensalada_completa", "activador_metabolico", "antioxidantes", "crudo"]
    },
    {
      id: "master_pavo_champinones_lima",
      title: "Pavo con Champiñones y Reducción de Lima",
      description: "Proteína magra con hongos activadores y cítricos para comidas Master.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Pechuga de pavo", amount: "300g", isSuperfood: true },
        { name: "Champiñones", amount: "300g", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "1 mediana", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Lima", amount: "2 unidades", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false },
        { name: "Cilantro fresco", amount: "1/4 taza", isSuperfood: false }
      ],
      instructions: [
        "Marinar pavo con jugo de 1 lima (20 minutos)",
        "Laminar champiñones y cortar cebolla",
        "Sellar pavo en sartén caliente 5 minutos por lado",
        "Retirar y cubrir para mantener caliente",
        "Saltear cebolla y champiñones hasta dorar",
        "Agregar jugo de la segunda lima y reducir",
        "Marchitar espinacas en la misma sartén",
        "Rebanar pavo y servir con vegetales y salsa"
      ],
      nutritionHighlights: [
        "Proteína magra de alta calidad",
        "Beta-glucanos de champiñones para inmunidad",
        "Vitamina C de lima para absorción de hierro",
        "Quercetina de cebolla morada"
      ],
      genotypeSpecific: "Perfect para Master: proteína limpia con triple activador metabólico (champiñones, cebolla, lima) que potencia la eficiencia metabólica característica del genotipo.",
      tags: ["proteina_magra", "activador_metabolico", "citrico", "equilibrado"]
    },
    {
      id: "master_gazpacho_pepino",
      title: "Gazpacho Verde con Pepino y Lima",
      description: "Sopa fría refrescante con vegetales crudos y cítricos para cenas ligeras.",
      difficulty: "Fácil",
      prepTime: 20,
      cookTime: 0,
      servings: 3,
      mealType: "cena",
      ingredients: [
        { name: "Pepino", amount: "2 grandes", isSuperfood: true },
        { name: "Pimiento verde", amount: "1 grande", isSuperfood: true },
        { name: "Aguacate", amount: "1 mediano", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Lima", amount: "2 unidades", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "1/2 pequeña", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cilantro", amount: "1/2 taza", isSuperfood: false },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false }
      ],
      instructions: [
        "Pelar y cortar pepinos en trozos",
        "Cortar pimiento, aguacate y cebolla",
        "Licuar todos los vegetales con jugo de lima",
        "Agregar cilantro y aceite de oliva",
        "Ajustar consistencia con agua fría",
        "Refrigerar al menos 2 horas",
        "Servir bien frío con vegetales picados encima"
      ],
      nutritionHighlights: [
        "Hidratación máxima de pepino",
        "Grasas saludables de aguacate",
        "Enzimas vivas de vegetales crudos",
        "Electrolitos naturales"
      ],
      genotypeSpecific: "Gazpacho Master con múltiples activadores metabólicos en crudo, preservando todas las enzimas digestivas que este genotipo procesa eficientemente.",
      tags: ["crudo", "refrescante", "activador_metabolico", "hidratante"]
    },
    {
      id: "master_tostadas_aguacate_arandanos",
      title: "Tostadas de Aguacate con Arándanos",
      description: "Desayuno rápido y nutritivo con activadores metabólicos Master.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 5,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Aguacate maduro", amount: "1 mediano", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Arándanos frescos", amount: "1/2 taza", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Cebolla morada", amount: "2 cucharadas picadas", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Lima", amount: "1/2 unidad", isSuperfood: true, notes: "Activador metabólico" },
        { name: "Pan integral", amount: "2 rebanadas", isSuperfood: false },
        { name: "Semillas de chía", amount: "1 cucharada", isSuperfood: false }
      ],
      instructions: [
        "Tostar el pan hasta dorar",
        "Machacar aguacate con jugo de lima",
        "Untar aguacate generosamente en el pan",
        "Esparcir arándanos frescos encima",
        "Agregar cebolla morada picada",
        "Espolvorear semillas de chía",
        "Servir inmediatamente"
      ],
      nutritionHighlights: [
        "Grasas monoinsaturadas para saciedad",
        "Antioxidantes de arándanos",
        "Omega-3 de semillas de chía",
        "Compuestos azufrados de cebolla"
      ],
      genotypeSpecific: "Desayuno Master con 4 activadores metabólicos que inician el día optimizando la función digestiva y metabólica característica del genotipo.",
      tags: ["desayuno_rapido", "activador_metabolico", "practico", "nutritivo"]
    }
  ],
  4: [ // Explorer Recipes
    {
      id: "explorer_detox_verde",
      title: "Batido Verde Detoxificante",
      description: "Smoothie matutino con vegetales de hoja verde y frutas detoxificantes para el Explorer.",
      difficulty: "Fácil",
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Apio", amount: "2 tallos", isSuperfood: true },
        { name: "Pepino", amount: "1/2 mediano", isSuperfood: true },
        { name: "Manzana verde", amount: "1 unidad", isSuperfood: true },
        { name: "Limón", amount: "1/2 unidad", isSuperfood: true },
        { name: "Jengibre", amount: "1 cm", isSuperfood: true },
        { name: "Agua filtrada", amount: "1 taza", isSuperfood: false }
      ],
      instructions: [
        "Lavar todos los vegetales y frutas",
        "Cortar apio, pepino y manzana en trozos",
        "Pelar jengibre y cortar en rodajas",
        "Licuar todos los ingredientes con agua",
        "Agregar jugo de limón al final",
        "Servir inmediatamente con hielo si se desea"
      ],
      nutritionHighlights: [
        "Clorofila para oxigenación celular",
        "Enzimas digestivas naturales",
        "Electrolitos para hidratación",
        "Compuestos detoxificantes"
      ],
      genotypeSpecific: "Explorer requiere alimentos que apoyen la detoxificación natural. Este batido verde combina vegetales alcalinizantes que optimizan la eliminación de toxinas.",
      tags: ["detoxificante", "alcalinizante", "hidratante", "crudo"]
    },
    {
      id: "explorer_pescado_vapor",
      title: "Pescado al Vapor con Vegetales",
      description: "Almuerzo ligero y purificante con pescado blanco y vegetales detoxificantes.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Lenguado", amount: "300g", isSuperfood: true },
        { name: "Brócoli", amount: "2 tazas", isSuperfood: true },
        { name: "Coliflor", amount: "2 tazas", isSuperfood: true },
        { name: "Calabacín", amount: "1 mediano", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: true },
        { name: "Perejil fresco", amount: "1/4 taza", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false }
      ],
      instructions: [
        "Cortar vegetales en floretes y rodajas",
        "Colocar en vaporera con agua hirviendo",
        "Cocinar vegetales al vapor 12 minutos",
        "Agregar pescado sobre vegetales",
        "Cocinar 8 minutos más hasta que pescado esté opaco",
        "Servir con limón y perejil picado",
        "Rociar con aceite de oliva"
      ],
      nutritionHighlights: [
        "Proteína magra de fácil digestión",
        "Glucosinolatos para detoxificación",
        "Vitamina C para síntesis de colágeno",
        "Mínima pérdida de nutrientes por cocción al vapor"
      ],
      genotypeSpecific: "La cocción al vapor preserva los nutrientes detoxificantes que Explorer necesita. El pescado blanco es fácil de digerir y no sobrecarga el sistema.",
      tags: ["bajo_en_grasa", "detoxificante", "vapor", "facil_digestion"]
    },
    {
      id: "explorer_ensalada_detox",
      title: "Ensalada Detox de Vegetales Crudos",
      description: "Ensalada purificante con vegetales alcalinizantes para el Explorer.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 0,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Pepino", amount: "2 medianos", isSuperfood: true },
        { name: "Apio", amount: "4 tallos", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Rúcula", amount: "2 tazas", isSuperfood: true },
        { name: "Brócoli crudo", amount: "1 taza", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false }
      ],
      instructions: [
        "Cortar pepino en rodajas finas",
        "Cortar apio en trozos pequeños",
        "Separar brócoli en floretes muy pequeños",
        "Lavar espinacas y rúcula",
        "Mezclar todos los vegetales",
        "Preparar vinagreta con limón y aceite",
        "Aderezar y dejar reposar 5 minutos"
      ],
      nutritionHighlights: [
        "Clorofila para detoxificación hepática",
        "Enzimas vivas de vegetales crudos",
        "Glucosinolatos de brócoli",
        "Electrolitos del apio"
      ],
      genotypeSpecific: "Perfect para Explorer: vegetales crudos alcalinizantes que apoyan la eliminación natural de toxinas y mantienen el pH óptimo que este genotipo requiere.",
      tags: ["crudo", "detoxificante", "alcalinizante", "ensalada"]
    },
    {
      id: "explorer_pollo_vapor_limon",
      title: "Pollo al Vapor con Limón y Hierbas",
      description: "Proteína magra cocida al vapor con cítricos para comidas ligeras Explorer.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Pechuga de pollo", amount: "300g", isSuperfood: true },
        { name: "Calabacín", amount: "2 medianos", isSuperfood: true },
        { name: "Espárragos", amount: "1 manojo", isSuperfood: true },
        { name: "Limón", amount: "2 unidades", isSuperfood: true },
        { name: "Jengibre", amount: "2 cm", isSuperfood: true },
        { name: "Cilantro", amount: "1/2 taza", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Marinar pollo con jugo de limón y jengibre rallado (30 minutos)",
        "Cortar calabacín en rodajas",
        "Colocar vegetales en vaporera",
        "Cocinar al vapor 10 minutos",
        "Agregar pollo marinado sobre los vegetales",
        "Cocinar 15 minutos más hasta que pollo esté cocido",
        "Servir con cilantro fresco y limón"
      ],
      nutritionHighlights: [
        "Proteína magra sin grasas añadidas",
        "Gingeroles antiinflamatorios",
        "Vitamina C para antioxidación",
        "Minerales preservados por vapor"
      ],
      genotypeSpecific: "Cocción al vapor ideal para Explorer: preserva nutrientes sin agregar grasas, facilita digestión y apoya procesos de detoxificación naturales.",
      tags: ["vapor", "proteina_magra", "detoxificante", "ligero"]
    },
    {
      id: "explorer_sopa_verduras",
      title: "Sopa de Verduras Purificante",
      description: "Caldo nutritivo con vegetales detoxificantes para cenas Explorer.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      mealType: "cena",
      ingredients: [
        { name: "Brócoli", amount: "2 tazas", isSuperfood: true },
        { name: "Coliflor", amount: "2 tazas", isSuperfood: true },
        { name: "Calabacín", amount: "2 medianos", isSuperfood: true },
        { name: "Apio", amount: "4 tallos", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: true },
        { name: "Caldo de vegetales", amount: "6 tazas", isSuperfood: false }
      ],
      instructions: [
        "Cortar todas las verduras en trozos medianos",
        "Hervir caldo de vegetales",
        "Agregar brócoli, coliflor y apio",
        "Cocinar 15 minutos",
        "Añadir calabacín y espinacas",
        "Cocinar 10 minutos más",
        "Servir con jugo de limón fresco"
      ],
      nutritionHighlights: [
        "Glucosinolatos para detoxificación fase II",
        "Hidratación profunda",
        "Minerales biodisponibles",
        "Bajo en calorías, alto en nutrientes"
      ],
      genotypeSpecific: "Sopa Explorer con vegetales crucíferos que activan enzimas detoxificantes naturales, perfecta para cenas ligeras que apoyan la regeneración nocturna.",
      tags: ["sopa", "detoxificante", "crucíferas", "hidratante"]
    },
    {
      id: "explorer_smoothie_verde_manzana",
      title: "Smoothie Verde con Manzana Verde",
      description: "Batido alcalinizante con manzana verde y vegetales para desayunos Explorer.",
      difficulty: "Fácil",
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Pepino", amount: "1 mediano", isSuperfood: true },
        { name: "Apio", amount: "2 tallos", isSuperfood: true },
        { name: "Manzana verde", amount: "1 unidad", isSuperfood: true },
        { name: "Limón", amount: "1/2 unidad", isSuperfood: true },
        { name: "Jengibre", amount: "1 cm", isSuperfood: true },
        { name: "Agua filtrada", amount: "1 taza", isSuperfood: false }
      ],
      instructions: [
        "Lavar todos los ingredientes",
        "Cortar manzana, pepino y apio",
        "Licuar espinacas con agua primero",
        "Agregar resto de ingredientes",
        "Licuar hasta suave",
        "Servir inmediatamente con hielo"
      ],
      nutritionHighlights: [
        "Pectina de manzana para detox intestinal",
        "Clorofila para oxigenación",
        "Electrolitos naturales",
        "Enzimas digestivas de jengibre"
      ],
      genotypeSpecific: "Smoothie Explorer alcalinizante que inicia el día con vegetales detoxificantes y fibra soluble que apoya la eliminación de toxinas.",
      tags: ["smoothie", "detoxificante", "alcalinizante", "matutino"]
    },
    {
      id: "explorer_trucha_vapor_hierbas",
      title: "Trucha al Vapor con Hierbas Frescas",
      description: "Pescado blanco al vapor con aromáticas para almuerzos ligeros.",
      difficulty: "Intermedio",
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Trucha", amount: "2 filetes (300g)", isSuperfood: true },
        { name: "Brócoli", amount: "2 tazas", isSuperfood: true },
        { name: "Espárragos", amount: "1 manojo", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: true },
        { name: "Perejil", amount: "1/4 taza", isSuperfood: true },
        { name: "Eneldo", amount: "2 cucharadas", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Salpimentar la trucha",
        "Colocar hierbas sobre cada filete",
        "Preparar vegetales en vaporera",
        "Cocinar brócoli y espárragos 8 minutos",
        "Agregar trucha sobre vegetales",
        "Cocinar 10-12 minutos más",
        "Servir con limón fresco"
      ],
      nutritionHighlights: [
        "Proteína magra de fácil digestión",
        "Glucosinolatos de brócoli",
        "Antioxidantes de hierbas frescas",
        "Mínima pérdida nutricional"
      ],
      genotypeSpecific: "Trucha al vapor Explorer: proteína limpia con vegetales crucíferos, todo cocinado sin grasas para máxima digestibilidad y detoxificación.",
      tags: ["vapor", "pescado_blanco", "detoxificante", "hierbas"]
    },
    {
      id: "explorer_ensalada_pepino_menta",
      title: "Ensalada Refrescante de Pepino con Menta",
      description: "Ensalada hidratante y alcalinizante para cenas ligeras Explorer.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Pepino", amount: "3 grandes", isSuperfood: true },
        { name: "Menta fresca", amount: "1/2 taza", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: true },
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Rúcula", amount: "1 taza", isSuperfood: true },
        { name: "Aceite de oliva", amount: "1 cucharada", isSuperfood: false },
        { name: "Sal marina", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Cortar pepinos en rodajas muy finas",
        "Picar menta finamente",
        "Mezclar pepino con menta",
        "Preparar vinagreta con limón y aceite",
        "Agregar espinacas y rúcula",
        "Aderezar y mezclar suavemente",
        "Dejar reposar 10 minutos en refrigerador"
      ],
      nutritionHighlights: [
        "Máxima hidratación de pepino",
        "Mentol para digestión",
        "Vitamina K de hojas verdes",
        "pH alcalino óptimo"
      ],
      genotypeSpecific: "Ensalada Explorer ultra-hidratante con menta que apoya la digestión y pepino que mantiene el pH alcalino ideal para el genotipo.",
      tags: ["crudo", "refrescante", "hidratante", "alcalinizante"]
    }
  ],
  5: [ // Warrior Recipes
    {
      id: "warrior_mediterraneo_salmon",
      title: "Salmón Mediterráneo con Aceitunas",
      description: "Plato mediterráneo rico en omega-3 y antioxidantes para la resistencia Warrior.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Salmón", amount: "300g", isSuperfood: true },
        { name: "Aceitunas verdes", amount: "1/2 taza", isSuperfood: true },
        { name: "Jitomates cherry", amount: "1 taza", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Ajo", amount: "3 dientes", isSuperfood: true },
        { name: "Aceite de oliva extra virgen", amount: "3 cucharadas", isSuperfood: true },
        { name: "Orégano seco", amount: "1 cucharadita", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 180°C",
        "Marinar salmón con aceite, ajo y orégano",
        "Colocar en bandeja con jitomates y aceitunas",
        "Hornear 15 minutos hasta que esté cocido",
        "Saltear espinacas en sartén con ajo",
        "Servir salmón sobre cama de espinacas",
        "Rociar con jugo de limón fresco"
      ],
      nutritionHighlights: [
        "Omega-3 EPA y DHA para antiinflamación",
        "Antioxidantes de aceitunas y jitomates",
        "Grasas monoinsaturadas para energía",
        "Hierro de espinacas para resistencia"
      ],
      genotypeSpecific: "Warrior se beneficia de la dieta mediterránea rica en grasas saludables y antioxidantes. Este plato proporciona la energía sostenida que necesita para mantener su resistencia.",
      tags: ["mediterraneo", "omega_3", "antioxidantes", "antiinflamatorio"]
    },
    {
      id: "warrior_atun_aceitunas",
      title: "Atún Sellado con Aceitunas Negras",
      description: "Proteína marina con grasas mediterráneas para comidas Warrior.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 10,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Filete de atún fresco", amount: "300g", isSuperfood: true },
        { name: "Aceitunas negras", amount: "1 taza", isSuperfood: true },
        { name: "Jitomates cherry", amount: "1.5 tazas", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Ajo", amount: "4 dientes", isSuperfood: true },
        { name: "Aceite de oliva extra virgen", amount: "3 cucharadas", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Salpimentar el atún generosamente",
        "Calentar sartén a fuego alto con aceite de oliva",
        "Sellar atún 2 minutos por lado (término medio crudo)",
        "Retirar y dejar reposar",
        "En la misma sartén, saltear ajo y jitomates",
        "Agregar aceitunas y espinacas",
        "Rebanar atún y servir sobre vegetales con limón"
      ],
      nutritionHighlights: [
        "Omega-3 DHA concentrado",
        "Proteína de altísima calidad",
        "Polifenoles de aceitunas",
        "Antioxidantes de jitomate"
      ],
      genotypeSpecific: "Atún fresco rico en omega-3 con aceitunas mediterráneas: combinación Warrior perfecta para resistencia física y cardiovascular óptima.",
      tags: ["omega_3", "mediterraneo", "proteina_premium", "resistencia"]
    },
    {
      id: "warrior_ensalada_quinoa_atun",
      title: "Ensalada de Quinoa con Atún y Aceitunas",
      description: "Bowl completo mediterráneo para almuerzos energéticos Warrior.",
      difficulty: "Fácil",
      prepTime: 20,
      cookTime: 20,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Quinoa", amount: "1 taza", isSuperfood: true },
        { name: "Atún en aceite de oliva", amount: "2 latas (240g)", isSuperfood: true },
        { name: "Aceitunas verdes", amount: "1/2 taza", isSuperfood: true },
        { name: "Jitomate", amount: "2 medianos", isSuperfood: true },
        { name: "Pepino", amount: "1 grande", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Cocinar quinoa según instrucciones",
        "Dejar enfriar quinoa",
        "Cortar jitomate y pepino en cubos",
        "Escurrir atún conservando aceite",
        "Mezclar quinoa con vegetales",
        "Agregar atún y aceitunas",
        "Aderezar con limón y aceite de oliva"
      ],
      nutritionHighlights: [
        "Proteína completa de quinoa y atún",
        "Omega-3 EPA y DHA",
        "Carbohidratos complejos",
        "Antioxidantes mediterráneos"
      ],
      genotypeSpecific: "Bowl Warrior energético: combina proteína vegetal y marina con grasas mediterráneas para resistencia sostenida durante todo el día.",
      tags: ["bowl_completo", "omega_3", "energetico", "practico"]
    },
    {
      id: "warrior_sardinas_jitomate",
      title: "Sardinas al Horno con Jitomate",
      description: "Pescado azul con vegetales mediterráneos para cenas Warrior.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Sardinas frescas", amount: "400g", isSuperfood: true },
        { name: "Jitomates", amount: "4 medianos", isSuperfood: true },
        { name: "Aceitunas negras", amount: "1/2 taza", isSuperfood: true },
        { name: "Ajo", amount: "5 dientes", isSuperfood: true },
        { name: "Aceite de oliva extra virgen", amount: "4 cucharadas", isSuperfood: true },
        { name: "Orégano", amount: "2 cucharaditas", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 180°C",
        "Limpiar sardinas y salpimentar",
        "Cortar jitomates en rodajas gruesas",
        "Colocar jitomates en base de bandeja",
        "Agregar ajo laminado y aceitunas",
        "Colocar sardinas sobre vegetales",
        "Rociar con aceite de oliva y orégano",
        "Hornear 20 minutos y servir con limón"
      ],
      nutritionHighlights: [
        "Máximo contenido de omega-3",
        "Calcio de espinas comestibles",
        "Licopeno de jitomates horneados",
        "Vitamina D natural"
      ],
      genotypeSpecific: "Sardinas frescas con aceite de oliva: uno de los platos más nutritivos para Warrior, con omega-3 concentrados y minerales esenciales para resistencia.",
      tags: ["omega_3", "horno", "economico", "nutritivo"]
    },
    {
      id: "warrior_pavo_aceitunas_romero",
      title: "Pavo con Aceitunas y Romero",
      description: "Proteína magra con aromas mediterráneos para comidas Warrior.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 30,
      servings: 3,
      mealType: "comida",
      ingredients: [
        { name: "Pechuga de pavo", amount: "500g", isSuperfood: true },
        { name: "Aceitunas verdes", amount: "1 taza", isSuperfood: true },
        { name: "Jitomates cherry", amount: "2 tazas", isSuperfood: true },
        { name: "Ajo", amount: "6 dientes", isSuperfood: true },
        { name: "Espinacas", amount: "3 tazas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "3 cucharadas", isSuperfood: true },
        { name: "Romero fresco", amount: "4 ramas", isSuperfood: false }
      ],
      instructions: [
        "Marinar pavo con ajo, romero y aceite (1 hora)",
        "Precalentar horno a 180°C",
        "Sellar pavo en sartén 3 minutos por lado",
        "Transferir a bandeja con jitomates y aceitunas",
        "Hornear 20-25 minutos",
        "Saltear espinacas en la misma sartén",
        "Rebanar pavo y servir con vegetales"
      ],
      nutritionHighlights: [
        "Proteína magra de alta calidad",
        "Polifenoles de aceitunas",
        "Antioxidantes de romero",
        "Bajo en grasas saturadas"
      ],
      genotypeSpecific: "Pavo mediterráneo Warrior: proteína limpia con grasas saludables de aceitunas que proporcionan energía sostenida sin inflamación.",
      tags: ["proteina_magra", "mediterraneo", "horno", "aromático"]
    },
    {
      id: "warrior_frittata_aceitunas",
      title: "Frittata Mediterránea con Aceitunas",
      description: "Desayuno proteico con aceitunas y vegetales para iniciar el día Warrior.",
      difficulty: "Intermedio",
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      mealType: "desayuno",
      ingredients: [
        { name: "Huevos", amount: "6 unidades", isSuperfood: true },
        { name: "Aceitunas negras", amount: "1/2 taza", isSuperfood: true },
        { name: "Jitomates cherry", amount: "1 taza", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Ajo", amount: "3 dientes", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: true },
        { name: "Albahaca fresca", amount: "1/4 taza", isSuperfood: false }
      ],
      instructions: [
        "Batir huevos con sal y pimienta",
        "Saltear ajo y jitomates en aceite de oliva",
        "Agregar espinacas hasta marchitar",
        "Incorporar aceitunas",
        "Verter huevos batidos sobre vegetales",
        "Cocinar a fuego bajo 10 minutos",
        "Meter al horno 5 minutos para dorar arriba",
        "Servir con albahaca fresca"
      ],
      nutritionHighlights: [
        "Proteína completa de huevos",
        "Grasas saludables de aceitunas",
        "Antioxidantes de vegetales",
        "Colina para función cerebral"
      ],
      genotypeSpecific: "Frittata Warrior mediterránea: desayuno completo con proteína de calidad y grasas antiinflamatorias que preparan para un día de alta resistencia.",
      tags: ["desayuno_proteico", "mediterraneo", "horno", "completo"]
    },
    {
      id: "warrior_caballa_jitomate",
      title: "Caballa Asada con Jitomates Rostizados",
      description: "Pescado azul con vegetales dulces para almuerzos Warrior.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 25,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Caballa fresca", amount: "2 filetes (300g)", isSuperfood: true },
        { name: "Jitomates", amount: "6 medianos", isSuperfood: true },
        { name: "Ajo", amount: "8 dientes", isSuperfood: true },
        { name: "Aceitunas verdes", amount: "1/2 taza", isSuperfood: true },
        { name: "Aceite de oliva", amount: "4 cucharadas", isSuperfood: true },
        { name: "Tomillo", amount: "2 cucharadas", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 200°C",
        "Cortar jitomates por la mitad",
        "Colocar jitomates en bandeja con ajo entero",
        "Rostizar 15 minutos",
        "Agregar caballa y aceitunas",
        "Rociar con aceite y tomillo",
        "Hornear 10 minutos más",
        "Servir con limón fresco"
      ],
      nutritionHighlights: [
        "Omega-3 de pescado azul",
        "Licopeno concentrado de jitomates rostizados",
        "CoQ10 de caballa",
        "Polifenoles de aceite de oliva"
      ],
      genotypeSpecific: "Caballa Warrior: pescado azul económico pero extremadamente nutritivo con omega-3 concentrados, ideal para resistencia cardiovascular.",
      tags: ["omega_3", "rostizado", "economico", "mediterraneo"]
    },
    {
      id: "warrior_ensalada_salmon_aguacate",
      title: "Ensalada de Salmón Ahumado con Aguacate",
      description: "Ensalada premium con grasas saludables para cenas ligeras Warrior.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 0,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Salmón ahumado", amount: "200g", isSuperfood: true },
        { name: "Aguacate", amount: "2 medianos", isSuperfood: true },
        { name: "Espinacas baby", amount: "3 tazas", isSuperfood: true },
        { name: "Jitomates cherry", amount: "1 taza", isSuperfood: true },
        { name: "Aceitunas negras", amount: "1/2 taza", isSuperfood: true },
        { name: "Aceite de oliva extra virgen", amount: "3 cucharadas", isSuperfood: true },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Lavar y secar espinacas",
        "Cortar aguacate en cubos",
        "Partir jitomates por la mitad",
        "Cortar salmón en tiras",
        "Mezclar espinacas con vegetales",
        "Agregar salmón y aceitunas",
        "Aderezar con aceite de oliva y limón"
      ],
      nutritionHighlights: [
        "Triple fuente de omega-3",
        "Grasas monoinsaturadas de aguacate",
        "Proteína de alta calidad",
        "Antioxidantes mediterráneos"
      ],
      genotypeSpecific: "Ensalada Warrior premium: combina las mejores grasas saludables (salmón, aguacate, aceitunas, aceite de oliva) para máxima resistencia y recuperación.",
      tags: ["omega_3", "grasas_saludables", "premium", "crudo"]
    }
  ],
  6: [ // Nomad Recipes
    {
      id: "nomad_quinoa_vegetales",
      title: "Quinoa con Vegetales de Temporada",
      description: "Bowl equilibrado con proteína completa vegetal y vegetales variados para la adaptabilidad Nomad.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Quinoa", amount: "1 taza", isSuperfood: true },
        { name: "Brócoli", amount: "1 taza", isSuperfood: true },
        { name: "Pimiento rojo", amount: "1 mediano", isSuperfood: true },
        { name: "Zanahoria", amount: "1 grande", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Semillas de girasol", amount: "2 cucharadas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false },
        { name: "Caldo de vegetales", amount: "2 tazas", isSuperfood: false }
      ],
      instructions: [
        "Enjuagar quinoa hasta que agua salga clara",
        "Cocinar quinoa en caldo de vegetales 15 minutos",
        "Cortar todos los vegetales en cubos pequeños",
        "Saltear zanahoria y pimiento 5 minutos",
        "Agregar brócoli y cocinar 3 minutos más",
        "Incorporar espinacas hasta marchitar",
        "Mezclar con quinoa cocida y semillas",
        "Aderezar con aceite de oliva"
      ],
      nutritionHighlights: [
        "Proteína completa de quinoa",
        "Vitaminas del complejo B para energía",
        "Fibra para salud digestiva",
        "Antioxidantes de vegetales coloridos"
      ],
      genotypeSpecific: "Nomad necesita variedad y adaptabilidad en su alimentación. Este bowl proporciona proteína completa vegetal y múltiples nutrientes que se adaptan a las necesidades cambiantes del genotipo.",
      tags: ["proteina_vegetal", "variado", "equilibrado", "adaptable"]
    },
    {
      id: "nomad_salmon_quinoa_verduras",
      title: "Salmón con Quinoa y Verduras Mixtas",
      description: "Plato balanceado con proteína completa, pescado y vegetales para Nomad.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      mealType: "comida",
      ingredients: [
        { name: "Salmón", amount: "300g", isSuperfood: true },
        { name: "Quinoa", amount: "1 taza", isSuperfood: true },
        { name: "Brócoli", amount: "1 taza", isSuperfood: true },
        { name: "Zanahoria", amount: "2 medianas", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Semillas de girasol", amount: "2 cucharadas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Cocinar quinoa según instrucciones",
        "Hornear salmón a 180°C por 15 minutos",
        "Cocinar brócoli al vapor 5 minutos",
        "Saltear zanahoria en rodajas",
        "Marchitar espinacas",
        "Tostar semillas de girasol",
        "Servir todo junto con limón"
      ],
      nutritionHighlights: [
        "Proteína completa de quinoa y salmón",
        "Omega-3 del salmón",
        "Variedad de antioxidantes",
        "Balance de macro y micronutrientes"
      ],
      genotypeSpecific: "Perfect para Nomad: combina múltiples fuentes de nutrientes (vegetal, marina, semillas) proporcionando la diversidad que este genotipo adaptable necesita.",
      tags: ["balanceado", "omega_3", "variado", "nutritivo"]
    },
    {
      id: "nomad_pollo_vegetales_rostizados",
      title: "Pollo con Vegetales Rostizados Variados",
      description: "Asado colorido con múltiples vegetales para máxima variedad Nomad.",
      difficulty: "Fácil",
      prepTime: 20,
      cookTime: 35,
      servings: 3,
      mealType: "comida",
      ingredients: [
        { name: "Pechuga de pollo", amount: "400g", isSuperfood: true },
        { name: "Pimiento rojo", amount: "2 medianos", isSuperfood: true },
        { name: "Calabacín", amount: "2 medianos", isSuperfood: true },
        { name: "Zanahoria", amount: "3 grandes", isSuperfood: true },
        { name: "Brócoli", amount: "2 tazas", isSuperfood: true },
        { name: "Cebolla", amount: "2 medianas", isSuperfood: true },
        { name: "Aceite de oliva", amount: "3 cucharadas", isSuperfood: false },
        { name: "Hierbas mixtas", amount: "2 cucharadas", isSuperfood: false }
      ],
      instructions: [
        "Precalentar horno a 200°C",
        "Cortar todos los vegetales en trozos grandes",
        "Mezclar vegetales con aceite y hierbas",
        "Extender en bandeja grande",
        "Colocar pollo salpimentado sobre vegetales",
        "Rostizar 30-35 minutos",
        "Servir caliente con jugos de cocción"
      ],
      nutritionHighlights: [
        "Proteína magra de calidad",
        "Arcoíris de antioxidantes",
        "Fibra de múltiples vegetales",
        "Vitaminas variadas"
      ],
      genotypeSpecific: "Rostizado Nomad con 6 tipos de vegetales diferentes, proporcionando la variedad cromática y nutricional que este genotipo versátil prospera.",
      tags: ["rostizado", "colorido", "familiar", "facil"]
    },
    {
      id: "nomad_ensalada_completa",
      title: "Ensalada Completa Nomad con 10 Ingredientes",
      description: "Ensalada diversa con múltiples texturas y sabores para almuerzo Nomad.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 0,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Espinacas baby", amount: "2 tazas", isSuperfood: true },
        { name: "Rúcula", amount: "1 taza", isSuperfood: true },
        { name: "Quinoa cocida", amount: "1 taza", isSuperfood: true },
        { name: "Zanahoria rallada", amount: "1 mediana", isSuperfood: true },
        { name: "Pepino", amount: "1 mediano", isSuperfood: true },
        { name: "Pimiento rojo", amount: "1/2 mediano", isSuperfood: true },
        { name: "Semillas de girasol", amount: "2 cucharadas", isSuperfood: true },
        { name: "Aguacate", amount: "1 mediano", isSuperfood: false },
        { name: "Aceite de oliva", amount: "2 cucharadas", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false }
      ],
      instructions: [
        "Lavar y mezclar espinacas con rúcula",
        "Agregar quinoa fría",
        "Cortar pepino y pimiento en cubos",
        "Rallar zanahoria",
        "Cortar aguacate",
        "Tostar semillas de girasol",
        "Mezclar todo y aderezar con limón y aceite"
      ],
      nutritionHighlights: [
        "10 ingredientes diferentes",
        "Proteína vegetal completa",
        "Grasas saludables",
        "Enzimas y fibra cruda"
      ],
      genotypeSpecific: "Ensalada Nomad ultra-diversa: cada ingrediente aporta nutrientes únicos, creando el perfil nutricional variado que este genotipo adaptable requiere.",
      tags: ["ensalada", "diverso", "crudo", "proteina_vegetal"]
    },
    {
      id: "nomad_bowl_desayuno",
      title: "Bowl de Desayuno Variado con Frutas y Semillas",
      description: "Desayuno energético con múltiples frutas y semillas para Nomad.",
      difficulty: "Fácil",
      prepTime: 10,
      cookTime: 0,
      servings: 1,
      mealType: "desayuno",
      ingredients: [
        { name: "Quinoa cocida fría", amount: "1/2 taza", isSuperfood: true },
        { name: "Plátano", amount: "1 mediano", isSuperfood: true },
        { name: "Manzana", amount: "1/2 unidad", isSuperfood: true },
        { name: "Fresas", amount: "5 unidades", isSuperfood: true },
        { name: "Semillas de girasol", amount: "1 cucharada", isSuperfood: true },
        { name: "Nueces", amount: "4 unidades", isSuperfood: false },
        { name: "Miel", amount: "1 cucharada", isSuperfood: false },
        { name: "Canela", amount: "1 pizca", isSuperfood: false }
      ],
      instructions: [
        "Colocar quinoa fría como base",
        "Cortar plátano en rodajas",
        "Cortar manzana en cubos",
        "Partir fresas por la mitad",
        "Picar nueces",
        "Distribuir frutas sobre quinoa",
        "Espolvorear semillas y nueces",
        "Rociar con miel y canela"
      ],
      nutritionHighlights: [
        "Proteína completa para iniciar el día",
        "Variedad de antioxidantes frutales",
        "Omega-3 y grasas saludables",
        "Energía de liberación sostenida"
      ],
      genotypeSpecific: "Desayuno Nomad que combina proteína vegetal con variedad de frutas y semillas, proporcionando energía adaptable para las necesidades cambiantes del día.",
      tags: ["desayuno", "frutas", "variado", "energetico"]
    },
    {
      id: "nomad_pescado_verduras_vapor",
      title: "Pescado Blanco al Vapor con Verduras Mixtas",
      description: "Cena ligera con pescado y variedad de vegetales al vapor para Nomad.",
      difficulty: "Intermedio",
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Lenguado o tilapia", amount: "300g", isSuperfood: true },
        { name: "Brócoli", amount: "1 taza", isSuperfood: true },
        { name: "Zanahoria", amount: "2 medianas", isSuperfood: true },
        { name: "Calabacín", amount: "1 mediano", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Jengibre", amount: "2 cm", isSuperfood: false },
        { name: "Limón", amount: "1 unidad", isSuperfood: false },
        { name: "Aceite de sésamo", amount: "1 cucharada", isSuperfood: false }
      ],
      instructions: [
        "Preparar vaporera con agua hirviendo",
        "Cortar vegetales en trozos medianos",
        "Cocinar zanahoria y brócoli al vapor 8 minutos",
        "Agregar calabacín 4 minutos",
        "Colocar pescado sobre vegetales con jengibre rallado",
        "Cocinar 8 minutos más",
        "Marchitar espinacas al final",
        "Servir con limón y aceite de sésamo"
      ],
      nutritionHighlights: [
        "Proteína magra de fácil digestión",
        "Variedad de vegetales con nutrientes preservados",
        "Gingeroles antiinflamatorios",
        "Cocción saludable sin grasas añadidas"
      ],
      genotypeSpecific: "Vapor Nomad con 5 vegetales diferentes: método de cocción que preserva la diversidad nutricional que este genotipo adaptable necesita.",
      tags: ["vapor", "ligero", "variado", "saludable"]
    },
    {
      id: "nomad_wrap_vegetales",
      title: "Wrap de Vegetales y Quinoa",
      description: "Almuerzo portátil con múltiples vegetales y proteína vegetal para Nomad.",
      difficulty: "Fácil",
      prepTime: 15,
      cookTime: 0,
      servings: 2,
      mealType: "almuerzo",
      ingredients: [
        { name: "Tortillas integrales", amount: "2 grandes", isSuperfood: false },
        { name: "Quinoa cocida", amount: "1 taza", isSuperfood: true },
        { name: "Espinacas frescas", amount: "2 tazas", isSuperfood: true },
        { name: "Zanahoria rallada", amount: "1 mediana", isSuperfood: true },
        { name: "Pimiento rojo", amount: "1/2 mediano", isSuperfood: true },
        { name: "Pepino", amount: "1/2 mediano", isSuperfood: true },
        { name: "Aguacate", amount: "1 mediano", isSuperfood: false },
        { name: "Semillas de girasol", amount: "2 cucharadas", isSuperfood: true }
      ],
      instructions: [
        "Calentar tortillas ligeramente",
        "Extender quinoa sobre cada tortilla",
        "Colocar espinacas frescas",
        "Agregar zanahoria rallada, pimiento y pepino en tiras",
        "Añadir aguacate en rebanadas",
        "Espolvorear semillas de girasol",
        "Enrollar firmemente y cortar por la mitad"
      ],
      nutritionHighlights: [
        "Proteína vegetal completa portátil",
        "6 vegetales diferentes",
        "Fibra de granos integrales",
        "Grasas saludables de aguacate y semillas"
      ],
      genotypeSpecific: "Wrap Nomad versátil y portátil: combina proteína vegetal con arcoíris de vegetales, perfecto para el estilo de vida adaptable del genotipo.",
      tags: ["portatil", "vegetariano", "variado", "practico"]
    },
    {
      id: "nomad_stir_fry_mixto",
      title: "Salteado Mixto Estilo Asiático",
      description: "Stir-fry con proteína y múltiples vegetales para cena Nomad.",
      difficulty: "Intermedio",
      prepTime: 20,
      cookTime: 15,
      servings: 2,
      mealType: "cena",
      ingredients: [
        { name: "Pechuga de pollo o tofu", amount: "250g", isSuperfood: true },
        { name: "Brócoli", amount: "1 taza", isSuperfood: true },
        { name: "Pimiento rojo", amount: "1 mediano", isSuperfood: true },
        { name: "Zanahoria", amount: "1 grande", isSuperfood: true },
        { name: "Espinacas", amount: "2 tazas", isSuperfood: true },
        { name: "Semillas de sésamo", amount: "1 cucharada", isSuperfood: true },
        { name: "Aceite de sésamo", amount: "2 cucharadas", isSuperfood: false },
        { name: "Jengibre y ajo", amount: "al gusto", isSuperfood: false }
      ],
      instructions: [
        "Cortar proteína y vegetales en trozos uniformes",
        "Calentar wok o sartén grande a fuego alto",
        "Saltear proteína primero hasta dorar",
        "Agregar zanahoria y brócoli, saltear 3 minutos",
        "Añadir pimiento, cocinar 2 minutos",
        "Incorporar espinacas hasta marchitar",
        "Finalizar con jengibre, ajo y aceite de sésamo",
        "Espolvorear semillas de sésamo"
      ],
      nutritionHighlights: [
        "Proteína adaptable (animal o vegetal)",
        "5 vegetales coloridos",
        "Cocción rápida que preserva nutrientes",
        "Grasas saludables de sésamo"
      ],
      genotypeSpecific: "Stir-fry Nomad flexible: permite variar la proteína y vegetales según disponibilidad, reflejando la adaptabilidad característica del genotipo.",
      tags: ["asiatico", "salteado", "versatil", "rapido"]
    }
  ]
};

// Helper function para obtener recetas por genotipo
export const getRecipesByGenotype = (genotypeId: number): Recipe[] => {
  return RECIPE_DATA[genotypeId] || [];
};

// Helper function para obtener recetas por tipo de comida
export const getRecipesByMealType = (genotypeId: number, mealType: Recipe['mealType']): Recipe[] => {
  return getRecipesByGenotype(genotypeId).filter(recipe => recipe.mealType === mealType);
};

// Helper function para obtener ingredientes superalimento de una receta
export const getSuperfoodIngredients = (recipe: Recipe): RecipeIngredient[] => {
  return recipe.ingredients.filter(ingredient => ingredient.isSuperfood);
};