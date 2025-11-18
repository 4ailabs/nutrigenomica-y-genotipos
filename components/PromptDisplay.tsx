import React, { useState } from 'react';
import { Copy, Download, Check, FileText, Sparkles, ClipboardList, Lock } from 'lucide-react';

interface PromptDisplayProps {
    promptText: string;
    platform: 'gemini-deep-research' | 'claude';
    patientSummary: string;
    onClose?: () => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({
    promptText,
    platform,
    patientSummary,
    onClose
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promptText);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Error al copiar:', err);
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = promptText;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            } catch (e) {
                console.error('Fallback copy failed:', e);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([promptText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prompt_${platform}_${new Date().toISOString().split('T')[0]}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getPlatformColor = () => {
        return platform === 'gemini-deep-research'
            ? 'from-slate-600 to-slate-700'
            : 'from-slate-600 to-slate-700';
    };

    const getPlatformName = () => {
        return platform === 'gemini-deep-research'
            ? 'Gemini Deep Research'
            : 'Claude';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                            platform === 'gemini-deep-research' 
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                                : 'bg-gradient-to-br from-amber-500 to-amber-600'
                        }`}>
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">Prompt Generado</h3>
                            <p className="text-sm opacity-90 mt-1">Optimizado para {getPlatformName()}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <p className="text-sm font-medium">
                        <FileText className="w-4 h-4 inline mr-2" />
                        {patientSummary}
                    </p>
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={handleCopy}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
                        copied
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-700 hover:bg-slate-800 text-white'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5" />
                            <span>¡Copiado!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5" />
                            <span>Copiar Prompt</span>
                        </>
                    )}
                </button>

                <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <Download className="w-5 h-5" />
                    <span>Descargar .md</span>
                </button>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                        <span>Cerrar</span>
                    </button>
                )}
            </div>

            {/* Vista Previa del Prompt */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h4 className="text-lg font-bold text-gray-900">Vista Previa del Prompt</h4>
                    <p className="text-sm text-gray-600 mt-1">
                        Revisa el contenido antes de copiarlo a {getPlatformName()}
                    </p>
                </div>

                <div className="p-6 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                        {promptText}
                    </pre>
                </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Instrucciones de Uso
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                    {platform === 'gemini-deep-research' ? (
                        <>
                            <li>Haz clic en "Copiar Prompt" para copiar el texto al portapapeles</li>
                            <li>Ve a <a href="https://deepresearch.google.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Gemini Deep Research</a></li>
                            <li>Pega el prompt completo en el campo de entrada</li>
                            <li>Espera a que Gemini realice la investigación profunda (puede tomar varios minutos)</li>
                            <li>Revisa los resultados y extrae las recomendaciones clave</li>
                        </>
                    ) : (
                        <>
                            <li>Haz clic en "Copiar Prompt" para copiar el texto al portapapeles</li>
                            <li>Ve a <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Claude.ai</a></li>
                            <li>Pega el prompt completo en el campo de conversación</li>
                            <li>Claude analizará el caso y proporcionará un análisis detallado</li>
                            <li>Puedes hacer preguntas de seguimiento para profundizar en áreas específicas</li>
                        </>
                    )}
                </ol>
            </div>

            {/* Nota de Privacidad */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Nota sobre Privacidad
                </h4>
                <p className="text-sm text-amber-800">
                    <strong>Importante:</strong> Al usar servicios externos de IA, asegúrate de cumplir con las regulaciones de privacidad médica aplicables (HIPAA, GDPR, etc.). 
                    Considera anonimizar los datos del paciente antes de compartirlos con plataformas externas. 
                    Este prompt ha sido diseñado para ser informativo sin incluir identificadores directos del paciente.
                </p>
            </div>
        </div>
    );
};

export default PromptDisplay;

