import React, { useState } from 'react';
import { ArrowLeft, Plus, FileSearch, History as HistoryIcon, Sparkles, Loader2 } from 'lucide-react';
import type { ResearchPatientCase, GeneratedResearchPrompt } from '../types';
import { useResearchPrompts } from '../hooks/useResearchPrompts';
import ResearchCaseForm from './ResearchCaseForm';
import PromptDisplay from './PromptDisplay';
import ResearchHistoryList from './ResearchHistoryList';
import NavigationHeader from './NavigationHeader';

interface ResearchPromptGeneratorProps {
    onBackToPortal: () => void;
    onNavigateToMain: () => void;
}

type View = 'form' | 'prompt' | 'history' | 'viewCase';

const ResearchPromptGenerator: React.FC<ResearchPromptGeneratorProps> = ({
    onBackToPortal,
    onNavigateToMain
}) => {
    const {
        cases,
        prompts,
        loading,
        error,
        saveCase,
        deleteCase,
        generatePrompt,
        exportHistory,
        importHistory,
        clearHistory,
        clearError
    } = useResearchPrompts();

    const [currentView, setCurrentView] = useState<View>('form');
    const [currentCase, setCurrentCase] = useState<ResearchPatientCase | null>(null);
    const [currentPrompt, setCurrentPrompt] = useState<GeneratedResearchPrompt | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<'gemini-deep-research' | 'claude'>('gemini-deep-research');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [generating, setGenerating] = useState<boolean>(false);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const handleSaveCase = (patientCase: ResearchPatientCase) => {
        const result = saveCase(patientCase);
        if (result.success) {
            setCurrentCase(patientCase);
            showSuccess('Caso guardado correctamente');
        }
    };

    const handleGeneratePrompt = async () => {
        if (!currentCase) return;

        setGenerating(true);
        try {
            const result = await generatePrompt(currentCase, selectedPlatform);
            if (result.success && result.prompt) {
                setCurrentPrompt(result.prompt);
                setCurrentView('prompt');
                showSuccess('Prompt generado correctamente con IA');
            } else {
                showSuccess(result.message || 'Error al generar el prompt');
            }
        } finally {
            setGenerating(false);
        }
    };

    const handleGeneratePromptWithoutSaving = async (patientCase: ResearchPatientCase) => {
        // Generar prompt directamente sin guardar
        setGenerating(true);
        try {
            const result = await generatePrompt(patientCase, selectedPlatform);
            if (result.success && result.prompt) {
                setCurrentPrompt(result.prompt);
                setCurrentView('prompt');
                showSuccess('Prompt generado con IA (caso no guardado)');
            } else {
                showSuccess(result.message || 'Error al generar el prompt');
            }
        } finally {
            setGenerating(false);
        }
    };

    const handleViewCase = (caseItem: ResearchPatientCase) => {
        setCurrentCase(caseItem);
        setCurrentView('viewCase');
    };

    const handleDeleteCase = (caseId: string) => {
        const result = deleteCase(caseId);
        if (result.success) {
            showSuccess('Caso eliminado correctamente');
            if (currentCase?.id === caseId) {
                setCurrentCase(null);
                setCurrentView('history');
            }
        }
    };

    const handleExport = () => {
        exportHistory();
        showSuccess('Historial exportado correctamente');
    };

    const handleImport = (jsonData: string) => {
        const result = importHistory(jsonData);
        if (result.success) {
            showSuccess('Historial importado correctamente');
        }
    };

    const handleClearHistory = () => {
        const result = clearHistory();
        if (result.success) {
            showSuccess('Historial limpiado');
            setCurrentCase(null);
            setCurrentView('form');
        }
    };

    const handleNewCase = () => {
        setCurrentCase(null);
        setCurrentPrompt(null);
        setCurrentView('form');
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando...</p>
                    </div>
                </div>
            );
        }

        switch (currentView) {
            case 'form':
                return (
                    <div className="space-y-6">
                        {/* Platform Selection */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Selecciona la Plataforma de IA
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedPlatform('gemini-deep-research')}
                                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                                        selectedPlatform === 'gemini-deep-research'
                                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                                            : 'border-gray-200 bg-white hover:border-blue-300'
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-lg font-bold text-gray-900">Gemini Deep Research</h4>
                                            <p className="text-sm text-gray-600">Investigación profunda y exhaustiva</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setSelectedPlatform('claude')}
                                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                                        selectedPlatform === 'claude'
                                            ? 'border-amber-500 bg-amber-50 shadow-lg'
                                            : 'border-gray-200 bg-white hover:border-amber-300'
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-lg font-bold text-gray-900">Claude</h4>
                                            <p className="text-sm text-gray-600">Análisis conversacional detallado</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <ResearchCaseForm
                            initialCase={currentCase || undefined}
                            onSubmit={handleSaveCase}
                            onGenerateWithoutSaving={handleGeneratePromptWithoutSaving}
                        />

                        {/* Generate Button - MÁS PROMINENTE */}
                        {currentCase && !generating && (
                            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-2xl border-4 border-green-400 animate-pulse">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                            <Sparkles className="w-8 h-8" />
                                            <h3 className="text-2xl font-bold">Caso Guardado</h3>
                                        </div>
                                        <p className="text-lg opacity-95 mb-1">
                                            Ahora puedes generar el prompt optimizado con IA
                                        </p>
                                        <p className="text-sm opacity-80">
                                            Para {selectedPlatform === 'gemini-deep-research' ? 'Gemini Deep Research' : 'Claude'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleGeneratePrompt}
                                        className="px-12 py-5 bg-white text-green-700 font-black rounded-xl hover:bg-green-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:scale-105 text-xl"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Sparkles className="w-7 h-7" />
                                            <span>GENERAR PROMPT</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Generando Prompt */}
                        {generating && (
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl border-4 border-blue-400">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <Loader2 className="w-16 h-16 animate-spin" />
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">Generando Prompt con IA</h3>
                                        <p className="text-lg opacity-90">
                                            Gemini está creando un prompt personalizado para tu caso...
                                        </p>
                                        <p className="text-sm opacity-75 mt-2">
                                            Esto puede tomar unos segundos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'prompt':
                return currentPrompt ? (
                    <PromptDisplay
                        promptText={currentPrompt.promptText}
                        platform={currentPrompt.targetPlatform}
                        patientSummary={currentPrompt.patientSummary}
                        onClose={() => setCurrentView('form')}
                    />
                ) : null;

            case 'history':
                return (
                    <ResearchHistoryList
                        cases={cases}
                        onViewCase={handleViewCase}
                        onDeleteCase={handleDeleteCase}
                        onExport={handleExport}
                        onImport={handleImport}
                        onClearHistory={handleClearHistory}
                    />
                );

            case 'viewCase':
                return currentCase ? (
                    <div className="space-y-6">
                        {/* Case Details Header */}
                        <div className="bg-slate-700 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">
                                        {currentCase.patientName || 'Caso de Paciente'}
                                    </h2>
                                    <p className="text-sm opacity-90">
                                        Creado el {new Date(currentCase.timestamp).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setCurrentView('history')}
                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all duration-200"
                                >
                                    Volver al Historial
                                </button>
                            </div>
                        </div>

                        {/* Case Form (Editable) */}
                        <ResearchCaseForm
                            initialCase={currentCase}
                            onSubmit={(updatedCase) => {
                                handleSaveCase(updatedCase);
                                showSuccess('Caso actualizado');
                            }}
                            onCancel={() => setCurrentView('history')}
                        />

                        {/* Generate Prompt Button */}
                        {!generating ? (
                            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-2xl border-4 border-green-400">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Generar Nuevo Prompt con IA</h3>
                                        <p className="text-lg opacity-90">
                                            Selecciona una plataforma y genera un prompt actualizado
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <select
                                            value={selectedPlatform}
                                            onChange={(e) => setSelectedPlatform(e.target.value as any)}
                                            className="px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border-2 border-white/20 focus:border-white/40 focus:outline-none font-medium"
                                        >
                                            <option value="gemini-deep-research" className="text-gray-900">Gemini Deep Research</option>
                                            <option value="claude" className="text-gray-900">Claude</option>
                                        </select>
                                        <button
                                            onClick={handleGeneratePrompt}
                                            className="px-10 py-4 bg-white text-green-700 font-black rounded-xl hover:bg-green-50 transition-all duration-200 shadow-2xl hover:scale-105 text-lg"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Sparkles className="w-6 h-6" />
                                                <span>GENERAR</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl border-4 border-blue-400">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <Loader2 className="w-16 h-16 animate-spin" />
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">Generando Prompt con IA</h3>
                                        <p className="text-lg opacity-90">
                                            Gemini está creando un prompt personalizado...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-blue-50/35">
            {/* Header */}
            <NavigationHeader
                title="Generador de Prompts de Investigación"
                subtitle="Crea prompts profesionales optimizados para investigación nutrigenómica profunda"
                onBack={onBackToPortal}
                onNavigateToMain={onNavigateToMain}
                breadcrumbs={['Inicio', 'Portal', 'Generador de Prompts']}
                variant="gradient"
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-fadeIn">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-green-900">{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-red-900">{error}</p>
                            <button
                                onClick={clearError}
                                className="text-xs text-red-700 underline mt-1 hover:text-red-900"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 border border-gray-100">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setCurrentView('form')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                currentView === 'form' || currentView === 'viewCase'
                                    ? 'bg-slate-700 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Plus className="w-5 h-5" />
                            <span>Nuevo Caso</span>
                        </button>

                        <button
                            onClick={() => setCurrentView('history')}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                currentView === 'history'
                                    ? 'bg-slate-700 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <HistoryIcon className="w-5 h-5" />
                            <span>Historial ({cases.length})</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                {renderContent()}
            </div>
        </div>
    );
};

export default ResearchPromptGenerator;

