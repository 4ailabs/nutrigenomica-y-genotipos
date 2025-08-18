
import React from 'react';
import { GENOTYPE_NAMES } from '../constants';

interface GenotypeBoxProps {
    number: number;
    imageUrl?: string; // Mantenemos por compatibilidad pero no lo usamos
}

const GenotypeBox: React.FC<GenotypeBoxProps> = ({ number }) => {
    const name = GENOTYPE_NAMES[number] || "Unknown";

    // Colores exactos de la imagen del usuario
    const genotypeColors = [
        "bg-pink-500",        // Genotipo 1: Hunter - Magenta/Deep Pink vibrante
        "bg-lime-500",        // Genotipo 2: Gatherer - Lime Green brillante
        "bg-purple-600",      // Genotipo 3: Master - Deep Purple profundo
        "bg-blue-500",        // Genotipo 4: Explorer - Medium Blue sólido
        "bg-red-500",         // Genotipo 5: Warrior - Bright Red brillante
        "bg-orange-500"       // Genotipo 6: Nomad - Vibrant Orange vibrante
    ];

    const color = genotypeColors[number - 1] || "bg-gray-500";

    return (
        <div
            className={`
                w-full aspect-[4/3] rounded-2xl shadow-lg overflow-hidden flex flex-col
                relative text-white transition-all duration-300 ease-in-out hover:shadow-xl
                ${color} border border-white/20
            `}
        >
            {/* Patrón geométrico médico sutil y elegante */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute top-2 right-2 w-6 h-6 md:w-10 md:h-10 bg-white/25 rounded-xl"></div>
                <div className="absolute top-8 md:top-16 right-3 md:right-4 w-3 h-3 md:w-5 md:h-5 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 md:w-8 md:h-8 bg-white/25 transform rotate-45"></div>
                <div className="absolute bottom-8 md:bottom-14 left-3 md:left-4 w-2 h-2 md:w-3 md:h-3 bg-white/15 rounded-full"></div>
            </div>
            
            {/* Overlay sutil para mejor legibilidad */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/5 to-black/15 z-0"></div>
            
            {/* Header con número */}
            <div className="relative z-10 flex justify-between items-start p-3">
                <div className="text-3xl md:text-4xl font-black drop-shadow-lg text-white">
                    {number}
                </div>
                <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                </div>
            </div>
            
            {/* Contenido principal */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-3">
                <div className="text-sm md:text-base font-bold leading-tight drop-shadow-lg text-white">
                    {name}
                </div>
            </div>
            
            {/* Indicador de hover */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
        </div>
    );
};

export default GenotypeBox;
