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

    const renderFoodItem = (item: FoodItem, isSuperFood: boolean = false) => (
        <div key={item.nombre} className={`group relative rounded-2xl p-4 transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer ${
            isSuperFood 
                ? 'bg-white border border-teal-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/50' 
                : 'bg-white border border-amber-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/50'
        }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    {/* Indicador visual del tipo */}
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        isSuperFood ? 'bg-teal-500' : 'bg-amber-500'
                    }`}></div>
                    
                    <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 text-sm group-hover:text-gray-700 transition-colors">
                            {item.nombre}
                        </h5>
                        
                        {item.notas && (
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {item.notas}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                    {item.marcador_especial?.includes('◊') && (
                        <div className="w-7 h-7 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors" title="Marcador especial diamante">
                            <Diamond className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                    )}
                    {item.marcador_especial?.includes('•') && (
                        <div className="w-7 h-7 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors" title="Marcador especial punto">
                            <CircleDot className="h-3.5 w-3.5 text-orange-600" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            {/* Legend Section Mejorada */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Leyenda de Símbolos Nutricionales</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(data.genotipo_info.simbolos).map(([key, symbol]) => (
                        <div key={key} className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    {key.includes('◊') && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Diamond className="h-5 w-5 text-blue-600" />
                                        </div>
                                    )}
                                    {key.includes('•') && (
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <CircleDot className="h-5 w-5 text-orange-600" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{symbol.etiqueta}</h4>
                                    <p className="text-gray-600 text-xs leading-relaxed">{symbol.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">Alimentos Neutros</h4>
                                <p className="text-gray-600 text-xs leading-relaxed">{data.genotipo_info.regla_neutros}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Food List Section Simplificada */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-700 mb-3 text-center">Categorías de Alimentos</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                    activeTab === category 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div key={activeTab} className="p-8 space-y-8 animate-fadeIn">
                    {/* Superfoods Section */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-200/60">
                        <div className="p-4 border-b border-emerald-200/60">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-emerald-800">Superalimentos</h4>
                                        <p className="text-xs text-emerald-700">Alimentos recomendados</p>
                                    </div>
                                </div>
                                {superfoods.length > 0 && (
                                    <div className="bg-emerald-100 px-2 py-1 rounded-full">
                                        <span className="text-emerald-800 font-medium text-xs">{superfoods.length}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-6">
                            {superfoods.length > 0 ? (
                                <div className="grid gap-3">
                                    {superfoods.map(item => renderFoodItem(item, true))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                        </svg>
                                    </div>
                                    <h5 className="text-emerald-800 font-semibold mb-2">No hay superalimentos específicos</h5>
                                    <p className="text-emerald-600 text-sm">En esta categoría no se han identificado superalimentos para tu genotipo</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Toxins Section */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border border-red-200/60">
                        <div className="p-4 border-b border-red-200/60">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-red-800">Alimentos a Evitar</h4>
                                        <p className="text-xs text-red-700">Alimentos no recomendados</p>
                                    </div>
                                </div>
                                {toxins.length > 0 && (
                                    <div className="bg-red-100 px-2 py-1 rounded-full">
                                        <span className="text-red-800 font-medium text-xs">{toxins.length}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-6">
                            {toxins.length > 0 ? (
                                <div className="grid gap-3">
                                    {toxins.map(item => renderFoodItem(item, false))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h5 className="text-red-800 font-semibold mb-2">No hay alimentos específicos a evitar</h5>
                                    <p className="text-red-600 text-sm">En esta categoría todos los alimentos son neutros para tu genotipo</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodGuide;