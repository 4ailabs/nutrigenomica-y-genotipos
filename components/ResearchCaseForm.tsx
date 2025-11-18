import React, { useState, useEffect } from 'react';
import { User, Dna, Activity, FileText, Utensils, Target, ChevronDown, ChevronUp, Sparkles, Save, CheckCircle2, Clock } from 'lucide-react';
import type { ResearchPatientCase } from '../types';
import { GENOTYPE_DATA } from '../genotypeData';
import { useAutosave } from '../hooks/useAutosave';
import Tooltip from './Tooltip';

interface ResearchCaseFormProps {
    initialCase?: ResearchPatientCase;
    onSubmit: (patientCase: ResearchPatientCase) => void;
    onCancel?: () => void;
    onGenerateWithoutSaving?: (patientCase: ResearchPatientCase) => void;
}

type FormSection = 'basic' | 'genotype' | 'biometric' | 'medical' | 'diet' | 'focus';

const ResearchCaseForm: React.FC<ResearchCaseFormProps> = ({ initialCase, onSubmit, onCancel, onGenerateWithoutSaving }) => {
    // Estado del formulario
    const [formData, setFormData] = useState<Partial<ResearchPatientCase>>(
        initialCase || {
            id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date()
        }
    );

    // Función para obtener el color del genotipo (hex)
    const getGenotypeColor = (genotypeId: number): string => {
        const colorMap: { [key: number]: string } = {
            1: '#B53471', // Hunter - Magenta
            2: '#9ACD32', // Gatherer - Verde Lima
            3: '#5D3FD3', // Master - Púrpura
            4: '#5DA3FA', // Explorer - Azul
            5: '#EA5455', // Warrior - Rojo
            6: '#F2994A', // Nomad - Naranja
        };
        return colorMap[genotypeId] || '#374151'; // Gray-700 como fallback
    };

    // Secciones expandidas
    const [expandedSections, setExpandedSections] = useState<Set<FormSection>>(
        new Set(['basic', 'genotype', 'focus'])
    );

    // Estado de autoguardado
    const [lastAutosaved, setLastAutosaved] = useState<Date | null>(null);

    // Autoguardado
    const { clearAutosave } = useAutosave({
        data: formData,
        onSave: (savedData) => {
            // Solo cargar si no hay initialCase (nuevo caso)
            if (!initialCase && savedData.id) {
                setFormData(savedData);
                setLastAutosaved(new Date());
            }
        },
        key: 'research_case_draft',
        interval: 5000 // Guardar cada 5 segundos
    });

    // Calcular progreso del formulario
    const calculateProgress = (): { percentage: number; completed: number; total: number } => {
        const fields = [
            formData.patientName,
            formData.age,
            formData.sex,
            formData.genotypeId,
            formData.height,
            formData.weight,
            formData.medicalHistory,
            formData.symptoms,
            formData.currentMedications,
            formData.currentDiet,
            formData.researchFocus
        ];
        
        const completed = fields.filter(field => field !== undefined && field !== null && field !== '').length;
        const total = fields.length;
        const percentage = Math.round((completed / total) * 100);
        
        return { percentage, completed, total };
    };

    const progress = calculateProgress();

    // Calcular BMI automáticamente
    useEffect(() => {
        if (formData.height && formData.weight) {
            const h = parseFloat(formData.height);
            const w = parseFloat(formData.weight);
            if (!isNaN(h) && !isNaN(w) && h > 0) {
                const bmi = parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));
                setFormData(prev => ({ ...prev, bmi }));
            }
        }
    }, [formData.height, formData.weight]);

    const toggleSection = (section: FormSection) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(section)) {
                newSet.delete(section);
            } else {
                newSet.add(section);
            }
            return newSet;
        });
    };

    const handleInputChange = (field: keyof ResearchPatientCase, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenotypeSelect = (genotypeId: number) => {
        const genotypeName = GENOTYPE_DATA[genotypeId]?.name || '';
        setFormData(prev => ({
            ...prev,
            genotypeId,
            genotypeName
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearAutosave(); // Limpiar borrador al guardar
        onSubmit(formData as ResearchPatientCase);
    };

    const renderSectionHeader = (
        section: FormSection,
        title: string,
        icon: React.ReactNode,
        color: string
    ) => {
        const isExpanded = expandedSections.has(section);
        return (
            <button
                type="button"
                onClick={() => toggleSection(section)}
                className={`w-full flex items-center justify-between p-4 ${color} rounded-xl transition-all duration-200 hover:shadow-md border border-gray-200`}
            >
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
            </button>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Indicador de Progreso */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-5 h-5 ${progress.percentage === 100 ? 'text-green-600' : 'text-gray-400'}`} />
                        <h3 className="text-lg font-bold text-gray-900">
                            Progreso del Formulario
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{progress.percentage}%</p>
                        <p className="text-xs text-gray-500">{progress.completed} de {progress.total} campos</p>
                    </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                            progress.percentage === 100 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                            progress.percentage >= 70 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                            progress.percentage >= 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                            'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}
                        style={{ width: `${progress.percentage}%` }}
                    />
                </div>

                {/* Mensaje de autoguardado */}
                {lastAutosaved && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Borrador guardado hace {Math.round((Date.now() - lastAutosaved.getTime()) / 1000)}s</span>
                    </div>
                )}

                {/* Consejos basados en progreso */}
                {progress.percentage < 40 && (
                    <p className="mt-3 text-sm text-gray-600">
                        Completa los campos básicos y el genotipo para generar un prompt más preciso
                    </p>
                )}
                {progress.percentage >= 40 && progress.percentage < 70 && (
                    <p className="mt-3 text-sm text-gray-600">
                        Buen progreso! Agrega información médica para mejorar las recomendaciones
                    </p>
                )}
                {progress.percentage >= 70 && progress.percentage < 100 && (
                    <p className="mt-3 text-sm text-blue-600 font-medium">
                        Casi listo! Completa los campos restantes para un análisis completo
                    </p>
                )}
                {progress.percentage === 100 && (
                    <p className="mt-3 text-sm text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Formulario completo! Listo para generar el prompt
                    </p>
                )}
            </div>

            {/* Sección: Datos Básicos */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {renderSectionHeader('basic', 'Datos Básicos del Paciente', <User className="w-5 h-5 text-gray-700" />, 'bg-gray-50')}
                {expandedSections.has('basic') && (
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del Paciente (Opcional)
                            </label>
                            <input
                                type="text"
                                value={formData.patientName || ''}
                                onChange={(e) => handleInputChange('patientName', e.target.value)}
                                placeholder="Ej: Juan Pérez o Paciente #123"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-1">Puedes usar iniciales o un identificador para mantener la privacidad</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Edad
                                </label>
                                <input
                                    type="text"
                                    value={formData.age || ''}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="Ej: 45 años"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sexo
                                </label>
                                <select
                                    value={formData.sex || ''}
                                    onChange={(e) => handleInputChange('sex', e.target.value as 'masculino' | 'femenino' | 'otro')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sección: Genotipo */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {renderSectionHeader('genotype', 'Genotipo Nutricional', <Dna className="w-5 h-5 text-gray-700" />, 'bg-gray-50')}
                {expandedSections.has('genotype') && (
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <p className="text-sm text-gray-600">
                                Selecciona el genotipo identificado del paciente
                            </p>
                            <Tooltip content="El genotipo nutricional determina las interacciones gen-nutriente específicas y es fundamental para recomendaciones personalizadas. Basado en el grupo sanguíneo y características metabólicas del paciente." />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6].map((id) => {
                                const genotype = GENOTYPE_DATA[id];
                                const isSelected = formData.genotypeId === id;
                                const genotypeColor = getGenotypeColor(id);
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => handleGenotypeSelect(id)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="text-center">
                                            <div 
                                                className="text-2xl font-bold mb-1"
                                                style={{ color: genotypeColor }}
                                            >
                                                {genotype.name}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                Genotipo {id}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {formData.genotypeName && formData.genotypeId && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-800">
                                    <strong>Seleccionado:</strong> <span className="font-bold" style={{ color: getGenotypeColor(formData.genotypeId) }}>{formData.genotypeName}</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Sección: Biometría */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {renderSectionHeader('biometric', 'Datos Biométricos', <Activity className="w-5 h-5 text-gray-700" />, 'bg-gray-50')}
                {expandedSections.has('biometric') && (
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Altura (cm)
                                </label>
                                <input
                                    type="number"
                                    value={formData.height || ''}
                                    onChange={(e) => handleInputChange('height', e.target.value)}
                                    placeholder="170"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Peso (kg)
                                </label>
                                <input
                                    type="number"
                                    value={formData.weight || ''}
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                    placeholder="70"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    IMC (calculado)
                                </label>
                                <input
                                    type="text"
                                    value={formData.bmi || ''}
                                    readOnly
                                    placeholder="Automático"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Composición Corporal (Opcional)
                            </label>
                            <textarea
                                value={formData.bodyComposition || ''}
                                onChange={(e) => handleInputChange('bodyComposition', e.target.value)}
                                placeholder="Ej: % grasa corporal, masa muscular, etc."
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección: Historial Médico */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {renderSectionHeader('medical', 'Historial Médico', <FileText className="w-5 h-5 text-gray-700" />, 'bg-gray-50')}
                {expandedSections.has('medical') && (
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Historial Médico
                            </label>
                            <textarea
                                value={formData.medicalHistory || ''}
                                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                                placeholder="Antecedentes médicos relevantes..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Síntomas Actuales
                            </label>
                            <textarea
                                value={formData.symptoms || ''}
                                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                                placeholder="Síntomas o condiciones actuales..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Medicamentos Actuales
                            </label>
                            <textarea
                                value={formData.currentMedications || ''}
                                onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                                placeholder="Lista de medicamentos y dosis..."
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alergias
                            </label>
                            <input
                                type="text"
                                value={formData.allergies || ''}
                                onChange={(e) => handleInputChange('allergies', e.target.value)}
                                placeholder="Alergias conocidas..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Condiciones Crónicas
                            </label>
                            <textarea
                                value={formData.chronicConditions || ''}
                                onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
                                placeholder="Condiciones crónicas..."
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Historial Familiar
                            </label>
                            <textarea
                                value={formData.familyHistory || ''}
                                onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                                placeholder="Antecedentes familiares relevantes..."
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resultados de Laboratorio (Opcional)
                            </label>
                            <textarea
                                value={formData.labResults || ''}
                                onChange={(e) => handleInputChange('labResults', e.target.value)}
                                placeholder="Resultados de laboratorio relevantes..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección: Dieta Actual */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {renderSectionHeader('diet', 'Dieta Actual', <Utensils className="w-5 h-5 text-gray-700" />, 'bg-gray-50')}
                {expandedSections.has('diet') && (
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Patrón Alimentario Actual
                            </label>
                            <textarea
                                value={formData.currentDiet || ''}
                                onChange={(e) => handleInputChange('currentDiet', e.target.value)}
                                placeholder="Describe la dieta actual del paciente..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Restricciones Dietéticas
                            </label>
                            <textarea
                                value={formData.dietaryRestrictions || ''}
                                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                                placeholder="Restricciones, preferencias, intolerancias..."
                                rows={2}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección: Área de Profundización */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {renderSectionHeader('focus', 'Área de Profundización', <Target className="w-5 h-5 text-gray-700" />, 'bg-gray-50')}
                {expandedSections.has('focus') && (
                    <div className="p-6 space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Objetivo Principal de la Investigación
                                </label>
                                <Tooltip content="Define el enfoque principal del análisis. Ejemplos: manejo de peso, optimización cardiovascular, mejora de energía, control de inflamación, salud digestiva, rendimiento deportivo, etc. Sé específico para obtener recomendaciones más precisas." />
                            </div>
                            <textarea
                                value={formData.researchFocus || ''}
                                onChange={(e) => handleInputChange('researchFocus', e.target.value)}
                                placeholder="Ejemplo: 'Reducir niveles de colesterol y optimizar salud cardiovascular considerando el genotipo' o 'Mejorar energía y rendimiento deportivo con enfoque en recuperación muscular'"
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Sé específico: mientras más detallado, mejores recomendaciones recibirás
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preguntas Específicas (Opcional)
                            </label>
                            <textarea
                                value={formData.specificQuestions || ''}
                                onChange={(e) => handleInputChange('specificQuestions', e.target.value)}
                                placeholder="Preguntas específicas que deseas que la investigación responda..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Botones de Acción - MÁS VISIBLES */}
            <div className="bg-slate-700 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-white text-center">
                        <h3 className="text-lg font-bold mb-1">Opciones de Generación</h3>
                        <p className="text-sm opacity-90">Elige cómo quieres proceder con este caso</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        {/* Generar Prompt Directo (Sin Guardar) */}
                        {onGenerateWithoutSaving && (
                            <button
                                type="button"
                                onClick={() => onGenerateWithoutSaving(formData as ResearchPatientCase)}
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-200 text-lg border-2 border-indigo-400"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span>Generar Prompt Rápido</span>
                                </div>
                                <p className="text-xs opacity-80 mt-1">Sin guardar en historial</p>
                            </button>
                        )}
                        
                        {/* Guardar y luego Generar */}
                        <button
                            type="submit"
                            className="flex-1 px-8 py-4 bg-white text-slate-700 font-bold rounded-xl hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Save className="w-5 h-5" />
                                <span>Guardar Caso</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">Se guardará en el historial</p>
                        </button>
                    </div>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 bg-white/10 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200 text-sm"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ResearchCaseForm;

