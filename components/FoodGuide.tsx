import React, { useState, useMemo } from 'react';
import type { FoodGuideData, FoodItem } from '../types';
import { Diamond, CircleDot, Info } from 'lucide-react';

interface FoodGuideProps {
    data: FoodGuideData;
}

const FoodGuide: React.FC<FoodGuideProps> = ({ data }) => {
    const categories = Object.keys(data.categorias_alimentos);
    const [activeTab, setActiveTab] = useState(categories[0]);

    const { superfoods, toxins } = useMemo(() => {
        const currentCategory = data.categorias_alimentos[activeTab];
        if (!currentCategory) return { superfoods: [], toxins: [] };
        
        const superfoods = currentCategory.filter(item => item.estado === 'Superalimento');
        const toxins = currentCategory.filter(item => item.estado === 'Toxina');

        return { superfoods, toxins };
    }, [activeTab, data]);

    const renderFoodItem = (item: FoodItem) => (
        <li key={item.nombre} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <span className="font-medium text-gray-800 text-sm">{item.nombre}</span>
                </div>
                <div className="flex items-center space-x-3">
                    {item.notas && (
                        <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {item.notas}
                        </span>
                    )}
                    {item.marcador_especial?.includes('◊') && (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Diamond className="h-3 w-3 text-blue-500" />
                        </div>
                    )}
                    {item.marcador_especial?.includes('•') && (
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                            <CircleDot className="h-3 w-3 text-orange-500" />
                        </div>
                    )}
                </div>
            </div>
        </li>
    );

    return (
        <div className="max-w-6xl mx-auto">
            {/* Legend Section Mejorada */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-8 mb-8 animate-fadeInUp shadow-lg">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Leyenda de Símbolos Nutricionales</h3>
                    <p className="text-gray-600">Entiende el significado de cada indicador en tu guía alimentaria</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(data.genotipo_info.simbolos).map(([key, symbol]) => (
                        <div key={key} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                             <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                                    {key.includes('◊') && <Diamond className="h-4 w-4 text-blue-500" />}
                                    {key.includes('•') && <CircleDot className="h-4 w-4 text-orange-500" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 text-sm">{symbol.etiqueta}</p>
                                    <p className="text-xs text-gray-600 mt-1">{symbol.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                     <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mr-3">
                                <Info className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800 text-sm">Alimentos Neutros</p>
                                <p className="text-xs text-gray-600 mt-1">{data.genotipo_info.regla_neutros}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Food List Section Mejorada */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 animate-fadeInUp" style={{animationDelay: '150ms'}}>
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
                    {/* Barra de Navegación Optimizada */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Categorías de Alimentos</h3>
                        <div className="flex justify-center">
                            <div className="w-full max-w-4xl">
                                <div className="overflow-x-auto pb-2">
                                    <nav className="flex space-x-2 min-w-max">
                                        {categories.map(category => (
                                            <button
                                                key={category}
                                                onClick={() => setActiveTab(category)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                                                    activeTab === category 
                                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                                                    : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md border border-gray-200'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Indicador de Categoría Activa */}
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                            Categoría: {activeTab}
                        </div>
                    </div>
                </div>

                <div key={activeTab} className="p-8 grid md:grid-cols-2 gap-10 animate-fadeIn">
                    {/* Superfoods Column Mejorada */}
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-teal-800">Superalimentos</h4>
                        </div>
                        {superfoods.length > 0 ? (
                            <ul className="space-y-3">
                                {superfoods.map(renderFoodItem)}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                    </svg>
                                </div>
                                <p className="text-teal-600 font-medium">No hay superalimentos en esta categoría</p>
                            </div>
                        )}
                    </div>

                    {/* Toxins Column Mejorada */}
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-amber-800">Alimentos a Evitar</h4>
                        </div>
                        {toxins.length > 0 ? (
                            <ul className="space-y-3">
                                {toxins.map(renderFoodItem)}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <p className="text-amber-600 font-medium">No hay alimentos a evitar en esta categoría</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodGuide;