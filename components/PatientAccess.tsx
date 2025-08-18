import React, { useState } from 'react';
import { 
    Apple, 
    Shield, 
    Zap, 
    BarChart3, 
    ArrowLeft, 
    Home, 
    Search,
    Users,
    Target,
    Heart,
    Clock,
    CheckCircle,
    X,
    Info
} from 'lucide-react';
import { GENOTYPE_DATA } from '../genotypeData';
import { FOOD_GUIDE_DATA } from '../foodData';

interface PatientAccessProps {
    onNavigateToPortal: () => void;
    onNavigateToMain: () => void;
}

const PatientAccess: React.FC<PatientAccessProps> = ({ 
    onNavigateToPortal, 
    onNavigateToMain 
}) => {
    const [selectedGenotype, setSelectedGenotype] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const genotypes = [
        { id: 1, name: "Hunter", title: "Genotipo Hunter", color: "from-blue-500 to-blue-600" },
        { id: 2, name: "Gatherer", title: "Genotipo Gatherer", color: "from-emerald-500 to-emerald-600" },
        { id: 3, name: "Master", title: "Genotipo Master", color: "from-purple-500 to-purple-600" },
        { id: 4, name: "Explorer", title: "Genotipo Explorer", color: "from-orange-500 to-orange-600" },
        { id: 5, name: "Nomad", title: "Genotipo Nomad", color: "from-pink-500 to-pink-600" },
        { id: 6, name: "Warrior", title: "Genotipo Warrior", color: "from-indigo-500 to-indigo-600" }
    ];

    const filteredGenotypes = genotypes.filter(genotype =>
        genotype.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        genotype.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleGenotypeSelect = (genotypeId: number) => {
        setSelectedGenotype(genotypeId);
    };

    const handleBackToSelection = () => {
        setSelectedGenotype(null);
    };

    const getGenotypeInfo = (genotypeId: number) => {
        return GENOTYPE_DATA[genotypeId];
    };

    const getFoodGuide = (genotypeId: number) => {
        return FOOD_GUIDE_DATA[genotypeId];
    };

    if (selectedGenotype) {
        const genotypeInfo = getGenotypeInfo(selectedGenotype);
        const foodGuide = getFoodGuide(selectedGenotype);
        const selectedGenotypeData = genotypes.find(g => g.id === selectedGenotype);

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleBackToSelection}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Cambiar Genotipo</span>
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={onNavigateToPortal}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <Home className="w-4 h-4" />
                                    Portal Principal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido del Genotipo */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header del Genotipo */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className={`w-20 h-20 bg-gradient-to-br ${selectedGenotypeData?.color} rounded-full flex items-center justify-center`}>
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                                
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {genotypeInfo?.title}
                                    </h1>
                                    <p className="text-lg text-gray-600 mb-4">
                                        {genotypeInfo?.tagline}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>Última actualización: {new Date().toLocaleDateString('es-ES')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Información */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Características del Genotipo */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Tu Perfil Genético</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">Esencia</h3>
                                    <p className="text-blue-800 text-sm leading-relaxed">
                                        {genotypeInfo?.essence.description}
                                    </p>
                                </div>
                                
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-green-900 mb-2">Fortalezas Naturales</h3>
                                    <ul className="space-y-2">
                                        {genotypeInfo?.characteristics1.slice(0, 3).map((char, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span>{char.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-purple-900 mb-2">Perfil Personal</h3>
                                    <ul className="space-y-2">
                                        {genotypeInfo?.characteristics2.slice(0, 2).map((char, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-purple-800">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span>{char.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Lista de Alimentos */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Apple className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Tu Lista de Alimentos</h2>
                            </div>
                            
                            {foodGuide && (
                                <div className="space-y-4">
                                    {/* Superalimentos */}
                                    <div className="bg-emerald-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Superalimentos Recomendados
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {Object.values(foodGuide.categorias_alimentos)
                                                .flat()
                                                .filter(food => 
                                                    food.estado === "Superalimento" && 
                                                    food.marcador_especial?.includes('◊')
                                                )
                                                .slice(0, 8)
                                                .map((food, index) => (
                                                    <div key={index} className="text-sm text-emerald-800 bg-white rounded px-2 py-1 border border-emerald-200">
                                                        {food.nombre}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    
                                    {/* Alimentos a Evitar */}
                                    <div className="bg-red-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            Alimentos a Evitar
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {Object.values(foodGuide.categorias_alimentos)
                                                .flat()
                                                .filter(food => 
                                                    food.estado === "Toxina" && 
                                                    food.marcador_especial?.includes('•')
                                                )
                                                .slice(0, 8)
                                                .map((food, index) => (
                                                    <div key={index} className="text-sm text-red-800 bg-white rounded px-2 py-1 border border-red-200">
                                                        {food.nombre}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    
                                    {/* Alimentos Neutros */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4" />
                                            Alimentos Neutros
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            {foodGuide.genotipo_info.regla_neutros}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Información Adicional */}
                    <div className="mt-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Recomendaciones Generales</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-purple-900 mb-3">Plan Alimentario</h3>
                                    <p className="text-sm text-purple-800 leading-relaxed">
                                        {genotypeInfo?.foodPlan.description}
                                    </p>
                                </div>
                                
                                <div className="bg-red-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-red-900 mb-3">Alimentos a Evitar</h3>
                                    <p className="text-sm text-red-800 leading-relaxed">
                                        {genotypeInfo?.foodsToAvoid.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-8">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-yellow-900 mb-2">Información Importante</h3>
                                    <p className="text-sm text-yellow-800">
                                        Esta información nutricional está basada en tu perfil genotípico específico. 
                                        Siempre consulta con tu médico o nutricionista antes de realizar cambios significativos en tu dieta. 
                                        Los alimentos recomendados son sugerencias basadas en evidencia nutrigenómica.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onNavigateToPortal}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Volver al Portal</span>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onNavigateToMain}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header de la Sección */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Acceso para Pacientes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Selecciona tu genotipo para acceder a tu lista personalizada de alimentos recomendados y características nutricionales específicas.
                    </p>
                </div>

                {/* Barra de Búsqueda */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar genotipo por nombre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Lista de Genotipos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGenotypes.map((genotype) => (
                        <div
                            key={genotype.id}
                            onClick={() => handleGenotypeSelect(genotype.id)}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-16 h-16 bg-gradient-to-br ${genotype.color} rounded-full flex items-center justify-center`}>
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {genotype.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {genotype.title}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Lista de alimentos personalizada</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Características nutricionales</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Recomendaciones específicas</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-blue-600 font-medium">
                                    Hacer clic para acceder
                                </span>
                                <div className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors">
                                    →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje si no hay genotipos */}
                {filteredGenotypes.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No se encontraron genotipos
                        </h3>
                        <p className="text-gray-600">
                            Intenta con otro nombre o consulta con tu médico.
                        </p>
                    </div>
                )}

                {/* Información Adicional */}
                <div className="mt-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                ¿No estás seguro de tu genotipo?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Consulta con tu médico o nutricionista para determinar tu perfil genotípico específico.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={onNavigateToPortal}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                >
                                    Ir al Portal Principal
                                </button>
                                <button
                                    onClick={onNavigateToMain}
                                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                                >
                                    Volver al Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientAccess;
