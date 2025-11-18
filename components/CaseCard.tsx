import React from 'react';
import { Calendar, User, Dna, FileText, Trash2, Eye } from 'lucide-react';
import type { ResearchPatientCase } from '../types';

interface CaseCardProps {
    patientCase: ResearchPatientCase;
    onView: (caseItem: ResearchPatientCase) => void;
    onDelete: (caseId: string) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ patientCase, onView, onDelete }) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getGenotypeColor = (genotypeId?: number): string => {
        const colorMap: { [key: number]: string } = {
            1: '#B53471', // Hunter - Magenta
            2: '#9ACD32', // Gatherer - Verde Lima
            3: '#5D3FD3', // Master - Púrpura
            4: '#5DA3FA', // Explorer - Azul
            5: '#EA5455', // Warrior - Rojo
            6: '#F2994A', // Nomad - Naranja
        };
        return genotypeId ? (colorMap[genotypeId] || '#6B7280') : '#6B7280'; // Gray-500 como fallback
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que deseas eliminar este caso? Esta acción no se puede deshacer.')) {
            onDelete(patientCase.id);
        }
    };

    return (
        <div
            onClick={() => onView(patientCase)}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-200 cursor-pointer group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {patientCase.patientName || 'Paciente sin nombre'}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(patientCase.timestamp)}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Eliminar caso"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                {patientCase.age && (
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">Edad:</span>
                        <span className="font-medium text-gray-900">{patientCase.age}</span>
                    </div>
                )}
                {patientCase.sex && (
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">Sexo:</span>
                        <span className="font-medium text-gray-900 capitalize">{patientCase.sex}</span>
                    </div>
                )}
                {patientCase.bmi && (
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">IMC:</span>
                        <span className="font-medium text-gray-900">{patientCase.bmi}</span>
                    </div>
                )}
                {patientCase.genotypeName && (
                    <div className="flex items-center space-x-2 text-sm">
                        <Dna className="w-4 h-4" style={{ color: getGenotypeColor(patientCase.genotypeId) }} />
                        <span className="font-medium" style={{ color: getGenotypeColor(patientCase.genotypeId) }}>{patientCase.genotypeName}</span>
                    </div>
                )}
            </div>

            {/* Research Focus */}
            {patientCase.researchFocus && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 font-medium flex items-start">
                        <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{patientCase.researchFocus}</span>
                    </p>
                </div>
            )}

            {/* Action Button */}
            <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onView(patientCase);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
                >
                    <Eye className="w-4 h-4" />
                    <span>Ver Detalles</span>
                </button>
            </div>
        </div>
    );
};

export default CaseCard;

