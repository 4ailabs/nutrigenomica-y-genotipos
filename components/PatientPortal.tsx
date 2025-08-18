import React, { useState } from 'react';
import { 
    MedicalButton, 
    MedicalCard, 
    MedicalBadge, 
    MedicalHeading, 
    MedicalText, 
    MedicalSection,
    MedicalAlertCard
} from './MedicalComponents';
import { 
    User, 
    Dna, 
    Apple, 
    Target, 
    Heart, 
    Clock, 
    ArrowRight, 
    ArrowLeft, 
    Home, 
    Search,
    BookOpen,
    BarChart3,
    Shield,
    Zap,
    Calendar,
    Users,
    CheckCircle
} from 'lucide-react';
import { GENOTYPE_DATA } from '../genotypeData';
import { FOOD_GUIDE_DATA } from '../foodData';

interface PatientPortalProps {
    onNavigateToPortal: () => void;
    onNavigateToMain: () => void;
    onViewGenotype: (id: number) => void;
}

interface PatientData {
    name: string;
    genotypeId: number;
    age: number;
    lastVisit: string;
    nextVisit: string;
    healthGoals: string[];
}

const PatientPortal: React.FC<PatientPortalProps> = ({ 
    onNavigateToPortal, 
    onNavigateToMain, 
    onViewGenotype 
}) => {
    const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Datos de ejemplo de pacientes (en una aplicación real vendrían de una base de datos)
    const patients: PatientData[] = [
        {
            name: "María González",
            genotypeId: 1,
            age: 35,
            lastVisit: "2024-01-15",
            nextVisit: "2024-04-15",
            healthGoals: ["Mejorar digestión", "Control de peso", "Aumentar energía"]
        },
        {
            name: "Carlos Rodríguez",
            genotypeId: 2,
            age: 42,
            lastVisit: "2024-01-20",
            nextVisit: "2024-04-20",
            healthGoals: ["Control de azúcar", "Salud cardiovascular", "Mejorar sueño"]
        },
        {
            name: "Ana Martínez",
            genotypeId: 3,
            age: 28,
            lastVisit: "2024-01-10",
            nextVisit: "2024-04-10",
            healthGoals: ["Aumentar masa muscular", "Mejorar rendimiento", "Salud intestinal"]
        }
    ];

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePatientSelect = (patient: PatientData) => {
        setSelectedPatient(patient);
    };

    const handleBackToPatientList = () => {
        setSelectedPatient(null);
    };

    const getGenotypeInfo = (genotypeId: number) => {
        return GENOTYPE_DATA[genotypeId];
    };

    const getFoodGuide = (genotypeId: number) => {
        return FOOD_GUIDE_DATA[genotypeId];
    };

    if (selectedPatient) {
        const genotypeInfo = getGenotypeInfo(selectedPatient.genotypeId);
        const foodGuide = getFoodGuide(selectedPatient.genotypeId);

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleBackToPatientList}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Volver a Pacientes</span>
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

                {/* Contenido del Paciente */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Información del Paciente */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {selectedPatient.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>Edad: {selectedPatient.age} años</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Dna className="w-4 h-4" />
                                            <span>Genotipo: {genotypeInfo?.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Próxima visita: {new Date(selectedPatient.nextVisit).toLocaleDateString('es-ES')}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => onViewGenotype(selectedPatient.genotypeId)}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Ver Genotipo Completo
                                </button>
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
                                <h2 className="text-xl font-bold text-gray-900">Características Clave</h2>
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
                                <h2 className="text-xl font-bold text-gray-900">Lista de Alimentos</h2>
                            </div>
                            
                            {foodGuide && (
                                <div className="space-y-4">
                                    {/* Superalimentos */}
                                    <div className="bg-emerald-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            Superalimentos Recomendados
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.values(foodGuide.categorias_alimentos)
                                                .flat()
                                                .filter(food => 
                                                    food.estado === "Superalimento" && 
                                                    food.marcador_especial?.includes('◊')
                                                )
                                                .slice(0, 6)
                                                .map((food, index) => (
                                                    <div key={index} className="text-sm text-emerald-800 bg-white rounded px-2 py-1">
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
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.values(foodGuide.categorias_alimentos)
                                                .flat()
                                                .filter(food => 
                                                    food.estado === "Toxina" && 
                                                    food.marcador_especial?.includes('•')
                                                )
                                                .slice(0, 6)
                                                .map((food, index) => (
                                                    <div key={index} className="text-sm text-red-800 bg-white rounded px-2 py-1">
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

                    {/* Objetivos de Salud */}
                    <div className="mt-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Objetivos de Salud</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedPatient.healthGoals.map((goal, index) => (
                                    <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <span className="font-medium text-purple-900">{goal}</span>
                                        </div>
                                    </div>
                                ))}
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
                        Portal de Pacientes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Accede a la información personalizada de tu genotipo, lista de alimentos recomendados y características clave para optimizar tu salud.
                    </p>
                </div>

                {/* Barra de Búsqueda */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar paciente por nombre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Lista de Pacientes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPatients.map((patient, index) => {
                        const genotypeInfo = getGenotypeInfo(patient.genotypeId);
                        
                        return (
                            <div
                                key={index}
                                onClick={() => handlePatientSelect(patient)}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {patient.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {genotypeInfo?.title}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>Edad: {patient.age} años</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Próxima visita: {new Date(patient.nextVisit).toLocaleDateString('es-ES')}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {patient.healthGoals.slice(0, 2).map((goal, goalIndex) => (
                                            <span
                                                key={goalIndex}
                                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                            >
                                                {goal}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mensaje si no hay pacientes */}
                {filteredPatients.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No se encontraron pacientes
                        </h3>
                        <p className="text-gray-600">
                            Intenta con otro nombre o consulta con el administrador.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientPortal;
