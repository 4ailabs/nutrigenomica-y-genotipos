import React from 'react';
import { Atom, ArrowLeft, Home } from 'lucide-react';

interface TestNutrigenomicsProps {
  onBackToPortal: () => void;
  onNavigateToMain: () => void;
}

const TestNutrigenomics: React.FC<TestNutrigenomicsProps> = ({ onBackToPortal, onNavigateToMain }) => {
  console.log("TestNutrigenomics component rendered");
  
  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navegación */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToPortal}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Portal
          </button>
          <button
            onClick={onNavigateToMain}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            Inicio
          </button>
        </div>

        {/* Contenido de prueba */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Atom className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nutrigenómica
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Esta es una página de prueba para verificar que la navegación funciona correctamente.
          </p>
          
          <div className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-purple-800 mb-3">
              ✅ Funciona Correctamente
            </h2>
            <p className="text-purple-700">
              Si puedes ver esta página, significa que la navegación a Nutrigenómica está funcionando.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestNutrigenomics;