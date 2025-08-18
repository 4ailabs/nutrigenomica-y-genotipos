import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AIAssistantProps, AIPersonalData } from '../types';
import { generateAiResponse } from '../utils/gemini';
import { WandSparkles, LoaderCircle, Brain, Sparkles, Target, Heart, Zap, Apple, Coffee, Salad, Utensils, Clock, BookOpen, Leaf, Droplets, User } from 'lucide-react';
import Disclaimer from './Disclaimer';
import '../styles/aiResponse.css';

const AIAssistant: React.FC<AIAssistantProps> = ({ foodData }) => {
    const [personalData, setPersonalData] = useState<AIPersonalData>({
        // Datos básicos
        age: '',
        sex: 'femenino',
        
        // Datos físicos
        height: '',
        weight: '',
        activityLevel: 'moderado',
        
        // Datos clínicos
        healthConditions: '',
        allergies: '',
        medications: '',
        bloodType: '',
        rhFactor: '',
        
        // Historial médico
        familyHistory: '',
        previousSurgeries: '',
        chronicConditions: '',
        
        // Objetivos y preferencias
        goals: '',
        dietaryRestrictions: '',
        foodPreferences: '',
        
        // Estilo de vida
        sleepHours: '',
        stressLevel: 'moderado',
        exerciseFrequency: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = useCallback(async (requestType: 'menu' | 'recipes' | 'supplements' | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'salads' | 'smoothies' | 'mealPrep') => {
        if (!personalData.age || !personalData.goals) {
            setError('Por favor, ingresa al menos tu edad y tus objetivos.');
            return;
        }
        setError('');
        setIsLoading(true);
        setAiResponse('');

        try {
            const response = await generateAiResponse(requestType, foodData, personalData);
            setAiResponse(response);
        } catch (err) {
            setError('Hubo un error al contactar al asistente de IA. Inténtalo de nuevo.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [personalData, foodData]);

    const isFormValid = personalData.age && personalData.goals;

    return (
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
            {/* Formulario Principal */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header del Formulario Reducido */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 md:px-6 py-3 md:py-4 relative overflow-hidden">
                    {/* Elementos decorativos de fondo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-white"></div>
                        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white"></div>
                    </div>
                    
                    <div className="relative flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-white mb-1">
                                Asistente IA Nutrigenómico
                            </h2>
                            <p className="text-blue-200 text-sm leading-relaxed">
                                Tu Perfil Nutricional Personalizado
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenido del Formulario */}
                <div className="p-4 md:p-6 lg:p-8">
                    {/* Grid de Campos - Datos Básicos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                        <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 mb-3">Datos Básicos</h3>
                        
                        <div className="space-y-2">
                            <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                                Edad *
                            </label>
                            <input 
                                type="number" 
                                name="age" 
                                id="age" 
                                value={personalData.age} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. 35" 
                                required
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="sex" className="block text-sm font-semibold text-gray-700">
                                Sexo *
                            </label>
                            <select 
                                name="sex" 
                                id="sex" 
                                value={personalData.sex} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                                required
                            >
                                <option value="femenino">Femenino</option>
                                <option value="masculino">Masculino</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="height" className="block text-sm font-semibold text-gray-700">
                                Altura (cm)
                            </label>
                            <input 
                                type="number" 
                                name="height" 
                                id="height" 
                                value={personalData.height} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. 165" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="weight" className="block text-sm font-semibold text-gray-700">
                                Peso (kg)
                            </label>
                            <input 
                                type="number" 
                                name="weight" 
                                id="weight" 
                                value={personalData.weight} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. 70" 
                            />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="activityLevel" className="block text-sm font-semibold text-gray-700">
                                Nivel de Actividad Física
                            </label>
                            <select 
                                name="activityLevel" 
                                id="activityLevel" 
                                value={personalData.activityLevel} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                            >
                                <option value="sedentario">Sedentario (poco o ningún ejercicio)</option>
                                <option value="ligero">Ligero (1-3 días/semana)</option>
                                <option value="moderado">Moderado (3-5 días/semana)</option>
                                <option value="activo">Activo (6-7 días/semana)</option>
                                <option value="muy_activo">Muy Activo (ejercicio intenso diario)</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid de Campos - Datos Clínicos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                        <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 mb-3">Datos Clínicos</h3>
                        


                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="healthConditions" className="block text-sm font-semibold text-gray-700">
                                Condiciones de Salud <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="healthConditions" 
                                id="healthConditions" 
                                value={personalData.healthConditions} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. Diabetes tipo 2, hipertensión" 
                            />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="allergies" className="block text-sm font-semibold text-gray-700">
                                Alergias Alimentarias <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="allergies" 
                                id="allergies" 
                                value={personalData.allergies} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. Gluten, lactosa, frutos secos" 
                            />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="medications" className="block text-sm font-semibold text-gray-700">
                                Medicamentos Actuales <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="medications" 
                                id="medications" 
                                value={personalData.medications} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. Metformina, enalapril" 
                            />
                        </div>
                    </div>

                    {/* Grid de Campos - Historial Médico */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                        <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 mb-3">Historial Médico</h3>
                        
                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="familyHistory" className="block text-sm font-semibold text-gray-700">
                                Historial Familiar <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <textarea 
                                name="familyHistory" 
                                id="familyHistory" 
                                value={personalData.familyHistory} 
                                onChange={handleInputChange} 
                                rows={3} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none" 
                                placeholder="Ej. Padre con diabetes, madre con hipertensión"
                            ></textarea>
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="chronicConditions" className="block text-sm font-semibold text-gray-700">
                                Condiciones Crónicas <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="chronicConditions" 
                                id="chronicConditions" 
                                value={personalData.chronicConditions} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. Artritis, asma, enfermedad tiroidea" 
                            />
                        </div>
                    </div>

                    {/* Grid de Campos - Objetivos y Preferencias */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                        <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 mb-3">Objetivos y Preferencias</h3>
                        
                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="goals" className="block text-sm font-semibold text-gray-700">
                                Objetivos Principales *
                            </label>
                            <textarea 
                                name="goals" 
                                id="goals" 
                                value={personalData.goals} 
                                onChange={handleInputChange} 
                                rows={3} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none" 
                                placeholder="Ej. Perder peso, aumentar energía, mejorar digestión"
                                required
                            ></textarea>
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-gray-700">
                                Restricciones Dietéticas <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="dietaryRestrictions" 
                                id="dietaryRestrictions" 
                                value={personalData.dietaryRestrictions} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. Vegetariano, sin gluten, bajo en sodio" 
                            />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="foodPreferences" className="block text-sm font-semibold text-gray-700">
                                Preferencias Alimentarias <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="foodPreferences" 
                                id="foodPreferences" 
                                value={personalData.foodPreferences} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. Prefiero pescado, no me gustan las legumbres" 
                            />
                        </div>
                    </div>

                    {/* Grid de Campos - Estilo de Vida */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                        <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 mb-3">Estilo de Vida</h3>
                        
                        <div className="space-y-2">
                            <label htmlFor="sleepHours" className="block text-sm font-semibold text-gray-700">
                                Horas de Sueño
                            </label>
                            <input 
                                type="number" 
                                name="sleepHours" 
                                id="sleepHours" 
                                value={personalData.sleepHours} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. 7" 
                                min="4"
                                max="12"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="stressLevel" className="block text-sm font-semibold text-gray-700">
                                Nivel de Estrés
                            </label>
                            <select 
                                name="stressLevel" 
                                id="stressLevel" 
                                value={personalData.stressLevel} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                            >
                                <option value="bajo">Bajo</option>
                                <option value="moderado">Moderado</option>
                                <option value="alto">Alto</option>
                                <option value="muy_alto">Muy Alto</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                            <label htmlFor="exerciseFrequency" className="block text-sm font-semibold text-gray-700">
                                Frecuencia de Ejercicio <span className="text-gray-500 font-normal">(opcional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="exerciseFrequency" 
                                id="exerciseFrequency" 
                                value={personalData.exerciseFrequency} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. 3 veces por semana, 30 minutos" 
                            />
                        </div>
                    </div>

                    {/* Mensaje de Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-700 text-sm text-center font-medium">{error}</p>
                        </div>
                    )}

                    {/* Opciones Nutricionales Organizadas */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Selecciona tu Solicitud Nutricional</h3>
                        
                        {/* Categoría: Planes Principales */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-600 mb-3">Planes Principales</h4>
                            <div className="grid sm:grid-cols-3 gap-3">
                                <button 
                                    onClick={() => handleSubmit('menu')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Menú Semanal</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('mealPrep')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Preparación Semanal</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('recipes')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Recetas Creativas</span>
                                </button>
                            </div>
                        </div>

                        {/* Categoría: Comidas por Tiempo */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-600 mb-3">Comidas por Tiempo</h4>
                            <div className="grid sm:grid-cols-3 gap-3">
                                <button 
                                    onClick={() => handleSubmit('breakfast')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Desayunos</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('lunch')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Almuerzos</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('dinner')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Cenas</span>
                                </button>
                            </div>
                        </div>

                        {/* Categoría: Opciones Especiales */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-600 mb-3">Opciones Especiales</h4>
                            <div className="grid sm:grid-cols-4 gap-3">
                                <button 
                                    onClick={() => handleSubmit('snacks')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Snacks</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('salads')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Ensaladas</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('smoothies')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Smoothies</span>
                                </button>
                                
                                <button 
                                    onClick={() => handleSubmit('supplements')} 
                                    disabled={!isFormValid || isLoading} 
                                    className="group relative bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-sm">Suplementos</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Área de Respuesta de IA */}
                    {(isLoading || aiResponse) && (
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center text-gray-600 py-12">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                                        <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Generando recomendación...</h3>
                                    <p className="text-gray-500 text-center">
                                        Nuestra IA está analizando tu perfil para crear recomendaciones personalizadas.
                                    </p>
                                </div>
                            )}
                            
                            {aiResponse && (
                                <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 border border-blue-100 shadow-xl">
                                    {/* Header de la respuesta */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <Brain className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Recomendación Personalizada</h3>
                                            <p className="text-gray-600 text-sm">Generada por IA basada en tu perfil</p>
                                        </div>
                                    </div>
                                    
                                    {/* Contenido de la respuesta con mejor tipografía */}
                                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                        <div className="prose prose-lg max-w-none">
                                            <div className="ai-response">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiResponse}</ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Footer con información adicional */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Generado con IA avanzada</span>
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => {
                                                        // Crear un elemento temporal para copiar el texto formateado
                                                        const tempDiv = document.createElement('div');
                                                        tempDiv.innerHTML = document.querySelector('.ai-response')?.innerHTML || '';
                                                        const formattedText = tempDiv.textContent || tempDiv.innerText || '';
                                                        
                                                        // Intentar copiar el texto formateado
                                                        navigator.clipboard.writeText(formattedText).then(() => {
                                                            // Mostrar notificación de éxito
                                                            const button = event.target as HTMLButtonElement;
                                                            const originalText = button.innerHTML;
                                                            button.innerHTML = `
                                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                                ¡Copiado!
                                                            `;
                                                            button.className = 'flex items-center gap-2 px-3 py-2 text-sm text-green-600 bg-green-100 rounded-lg transition-colors duration-200';
                                                            
                                                            setTimeout(() => {
                                                                button.innerHTML = originalText;
                                                                button.className = 'flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200';
                                                            }, 2000);
                                                        }).catch(() => {
                                                            // Fallback: copiar Markdown crudo
                                                            navigator.clipboard.writeText(aiResponse);
                                                        });
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                                    title="Copiar texto formateado (sin Markdown)"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                                    </svg>
                                                    Copiar Texto
                                                </button>
                                                
                                                <button 
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(aiResponse).then(() => {
                                                            const button = event.target as HTMLButtonElement;
                                                            const originalText = button.innerHTML;
                                                            button.innerHTML = `
                                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                                ¡Copiado!
                                                            `;
                                                            button.className = 'flex items-center gap-2 px-3 py-2 text-sm text-green-600 bg-green-100 rounded-lg transition-colors duration-200';
                                                            
                                                            setTimeout(() => {
                                                                button.innerHTML = originalText;
                                                                button.className = 'flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200';
                                                            }, 2000);
                                                        });
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                                    title="Copiar Markdown crudo (con formato)"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                    </svg>
                                                    Copiar Markdown
                                                </button>
                                                
                                                <button 
                                                    onClick={() => window.print()}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                                                    </svg>
                                                    Imprimir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
