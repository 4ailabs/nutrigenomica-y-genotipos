import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AIAssistantProps, AIPersonalData } from '../types';
import { generateAiResponse } from '../utils/gemini';
import { WandSparkles, LoaderCircle, Brain, Sparkles, Target, Heart, Zap } from 'lucide-react';
import Disclaimer from './Disclaimer';
import '../styles/aiResponse.css';

const AIAssistant: React.FC<AIAssistantProps> = ({ foodData }) => {
    const [personalData, setPersonalData] = useState<AIPersonalData>({
        age: '',
        sex: 'femenino',
        healthConditions: '',
        goals: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = useCallback(async (requestType: 'menu' | 'recipes' | 'supplements') => {
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Formulario Principal */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header del Formulario */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                Tu Perfil Nutricional
                            </h3>
                            <p className="text-blue-100 text-sm mt-1">
                                Completa tus datos para recibir recomendaciones de la IA basadas en tu GenoTipo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenido del Formulario */}
                <div className="p-8">
                    {/* Grid de Campos */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                                Edad
                            </label>
                            <input 
                                type="number" 
                                name="age" 
                                id="age" 
                                value={personalData.age} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400" 
                                placeholder="Ej. 35" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="sex" className="block text-sm font-semibold text-gray-700">
                                Sexo
                            </label>
                            <select 
                                name="sex" 
                                id="sex" 
                                value={personalData.sex} 
                                onChange={handleInputChange} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                            >
                                <option value="femenino">Femenino</option>
                                <option value="masculino">Masculino</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        
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
                            <label htmlFor="goals" className="block text-sm font-semibold text-gray-700">
                                Objetivos Principales
                            </label>
                            <textarea 
                                name="goals" 
                                id="goals" 
                                value={personalData.goals} 
                                onChange={handleInputChange} 
                                rows={4} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none" 
                                placeholder="Ej. Perder peso, aumentar energía, mejorar digestión"
                            ></textarea>
                        </div>
                    </div>

                    {/* Mensaje de Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-700 text-sm text-center font-medium">{error}</p>
                        </div>
                    )}

                    {/* Botones de Acción Mejorados */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        <button 
                            onClick={() => handleSubmit('menu')} 
                            disabled={!isFormValid || isLoading} 
                            className="group relative w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center">
                                <Heart className="w-5 h-5 mr-2" />
                                Generar Menú Semanal
                            </span>
                        </button>
                        
                        <button 
                            onClick={() => handleSubmit('recipes')} 
                            disabled={!isFormValid || isLoading} 
                            className="group relative w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center">
                                <Zap className="w-5 h-5 mr-2" />
                                Generar Recetas
                            </span>
                        </button>
                        
                        <button 
                            onClick={() => handleSubmit('supplements')} 
                            disabled={!isFormValid || isLoading} 
                            className="group relative w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-md overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center">
                                <WandSparkles className="w-5 h-5 mr-2" />
                                Sugerir Suplementos
                            </span>
                        </button>
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
                                                    onClick={() => navigator.clipboard.writeText(aiResponse)}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                                    </svg>
                                                    Copiar
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
