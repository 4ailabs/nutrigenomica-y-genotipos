import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => {
    return (
        <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-amber-800 font-semibold">
                       Aviso Importante
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                        Esta recomendación fue generada por IA y no reemplaza el consejo de un profesional de la salud. Consulta a tu médico o nutricionista antes de hacer cambios en tu dieta o régimen de suplementos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
