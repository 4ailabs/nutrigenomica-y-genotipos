import type { ChefHat, Clock, Users } from 'lucide-react';

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