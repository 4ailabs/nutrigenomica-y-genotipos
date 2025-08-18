import React, { useState, useCallback, useMemo } from 'react';
import type { BodyMeasurements, CalculatedProportions, FingerRelation, BloodType, RhFactor, SecretorStatus, Sex } from '../types';
import { DATOS_GENOTIPOS, GENOTYPE_NAMES } from '../constants';
import GenotypeBox from './GenotypeBox';
import GenotypeDetail from './GenotypeDetail';
import { 
    MedicalHeading, 
    MedicalText, 
    MedicalInput, 
    MedicalButton, 
    MedicalCard,
    MedicalSection,
    MedicalBadge 
} from './MedicalComponents';
import { Info } from 'lucide-react';

interface AdvancedCalculatorProps {
    onBackToPortal: () => void;
    onNavigateToMain?: () => void; // Nueva prop para navegar al inicio
}

type Tab = 'measurements' | 'blood' | 'summary' | 'results';

const InfoIcon: React.FC = () => (
    <Info className="h-6 w-6 flex-shrink-0 text-[#2D31FA]" />
);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; disabled?: boolean; }> = ({ label, isActive, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 py-3 px-2 text-sm font-semibold transition-colors duration-300 rounded-lg ${
            isActive ? 'bg-[#2D31FA] text-white shadow' : 'text-gray-500 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
        {label}
    </button>
);

const AdvancedCalculator: React.FC<AdvancedCalculatorProps> = ({ onBackToPortal, onNavigateToMain }) => {
    const [activeTab, setActiveTab] = useState<Tab>('measurements');
    
    const [measurements, setMeasurements] = useState<Partial<BodyMeasurements>>({});
    const [bloodType, setBloodType] = useState<BloodType | null>(null);
    const [rhFactor, setRhFactor] = useState<RhFactor | null>(null);
    const [secretorStatus, setSecretorStatus] = useState<SecretorStatus | null>(null);
    const [sex, setSex] = useState<Sex | null>(null);

    const [proportions, setProportions] = useState<CalculatedProportions | null>(null);
    const [results, setResults] = useState<{line: string, genotypes: number[] } | null>(null);
    const [selectedGenotype, setSelectedGenotype] = useState<number | null>(null);


    const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMeasurements(prev => ({ ...prev, [name]: value ? parseFloat(value) : undefined }));
    };

    const calculateProportions = useCallback(() => {
        const m = measurements;
        if (!m.heightStanding || !m.heightSitting || !m.chairHeight || !m.upperLegLength || !m.lowerLegLength || !m.indexFingerLeft || !m.ringFingerLeft || !m.indexFingerRight || !m.ringFingerRight) {
            alert("Por favor, completa todas las mediciones.");
            return;
        }

        const torsoLength = m.heightSitting - m.chairHeight;
        const legLength = m.heightStanding - torsoLength;

        let fingerRelation: FingerRelation;
        if (m.indexFingerLeft > m.ringFingerLeft && m.indexFingerRight > m.ringFingerRight) {
            fingerRelation = "indice_mas_largo";
        } else if (m.indexFingerLeft < m.ringFingerLeft && m.indexFingerRight < m.ringFingerRight) {
            fingerRelation = "anular_mas_largo";
        } else {
            fingerRelation = "diferentes";
        }

        setProportions({
            torsoLength,
            legLength,
            torsoLonger: torsoLength >= legLength,
            upperSegmentLonger: m.upperLegLength >= m.lowerLegLength,
            fingerRelation
        });
        setActiveTab('blood');
    }, [measurements]);
    
    const calculateGenotype = useCallback(() => {
        if (!proportions || !bloodType || !rhFactor || !secretorStatus || !sex) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        let line = '';
        if (proportions.torsoLonger) {
            if (proportions.upperSegmentLonger) {
                if (proportions.fingerRelation === "indice_mas_largo") line = "linea1";
                else if (proportions.fingerRelation === "anular_mas_largo") line = "linea2";
                else line = "linea3";
            } else {
                if (proportions.fingerRelation === "indice_mas_largo") line = "linea4";
                else if (proportions.fingerRelation === "anular_mas_largo") line = "linea5";
                else line = "linea6";
            }
        } else {
            if (proportions.upperSegmentLonger) {
                if (proportions.fingerRelation === "indice_mas_largo") line = "linea7";
                else if (proportions.fingerRelation === "anular_mas_largo") line = "linea8";
                else line = "linea9";
            } else {
                if (proportions.fingerRelation === "indice_mas_largo") line = "linea10";
                else if (proportions.fingerRelation === "anular_mas_largo") line = "linea11";
                else line = "linea12";
            }
        }

        const fullBloodType = `${bloodType}${rhFactor}`;
        let resultNode = DATOS_GENOTIPOS[line]?.[fullBloodType]?.[secretorStatus];

        if (resultNode && typeof resultNode === 'object' && !Array.isArray(resultNode)) {
            resultNode = resultNode[sex];
        }

        const finalGenotypes = Array.isArray(resultNode) ? resultNode : (typeof resultNode === 'number' ? [resultNode] : []);
        setResults({ line, genotypes: finalGenotypes });
        setActiveTab('results');
    }, [proportions, bloodType, rhFactor, secretorStatus, sex]);

    const resetForm = () => {
        setMeasurements({});
        setBloodType(null);
        setRhFactor(null);
        setSecretorStatus(null);
        setSex(null);
        setProportions(null);
        setResults(null);
        setSelectedGenotype(null);
        setActiveTab('measurements');
    };

    const isBloodComplete = bloodType && rhFactor && secretorStatus;
    
    const renderMeasurementFields = () => (
        <MedicalSection 
            title="Medidas Corporales (cm)"
            subtitle="Introduce las medidas corporales precisas para el cálculo del genotipo"
            spacing="normal"
            className="animate-fade-in"
        >
            {[
                { name: "heightStanding", label: "Altura de pie (estatura)", placeholder: "Ej. 170.5" },
                { name: "heightSitting", label: "Altura sentado (suelo a cabeza)", placeholder: "Ej. 120.5" },
                { name: "chairHeight", label: "Altura de la silla", placeholder: "Ej. 45.0" },
                { name: "upperLegLength", label: "Longitud pierna superior (muslo)", placeholder: "Ej. 42.0" },
                { name: "lowerLegLength", label: "Longitud pierna inferior (pantorrilla)", placeholder: "Ej. 38.0" },
                { name: "indexFingerLeft", label: "Dedo índice (izquierdo)", placeholder: "Ej. 7.5" },
                { name: "ringFingerLeft", label: "Dedo anular (izquierdo)", placeholder: "Ej. 8.0" },
                { name: "indexFingerRight", label: "Dedo índice (derecho)", placeholder: "Ej. 7.5" },
                { name: "ringFingerRight", label: "Dedo anular (derecho)", placeholder: "Ej. 8.0" }
            ].map(field => (
                <MedicalInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type="number"
                    value={measurements[field.name as keyof BodyMeasurements]?.toString() || ''}
                    onChange={handleMeasurementChange}
                    placeholder={field.placeholder}
                />
            ))}
            
            <MedicalButton
                variant="primary"
                size="lg"
                onClick={calculateProportions}
                className="w-full"
            >
                Calcular Proporciones
            </MedicalButton>
        </MedicalSection>
    );

    const renderBloodFields = () => (
        <MedicalSection 
            title="Información Sanguínea"
            subtitle="Selecciona tu grupo sanguíneo, factor Rh y estado secretor"
            spacing="normal" 
            className="animate-fade-in"
        >
            <div>
                <MedicalHeading level={4} variant="secondary" className="mb-3">Grupo Sanguíneo</MedicalHeading>
                <div className="grid grid-cols-2 gap-2">
                    {(['A', 'B', 'AB', 'O'] as BloodType[]).map(type => (
                        <MedicalButton 
                            key={type} 
                            variant={bloodType === type ? "primary" : "secondary"}
                            onClick={() => setBloodType(type)}
                            className="w-full"
                        >
                            {type}
                        </MedicalButton>
                    ))}
                </div>
            </div>
            
            <div>
                <MedicalHeading level={4} variant="secondary" className="mb-3">Factor Rh</MedicalHeading>
                <div className="grid grid-cols-2 gap-2">
                    {(['+', '-'] as RhFactor[]).map(rh => (
                        <MedicalButton 
                            key={rh} 
                            variant={rhFactor === rh ? "primary" : "secondary"}
                            onClick={() => setRhFactor(rh)}
                            className="w-full"
                        >
                            {rh === '+' ? 'Positivo (+)' : 'Negativo (-)'}
                        </MedicalButton>
                    ))}
                </div>
            </div>
            
            <div>
                <MedicalHeading level={4} variant="secondary" className="mb-3">Estado Secretor</MedicalHeading>
                <div className="grid grid-cols-2 gap-2">
                    {(['secretor', 'no_secretor'] as SecretorStatus[]).map(status => (
                        <MedicalButton 
                            key={status} 
                            variant={secretorStatus === status ? "primary" : "secondary"}
                            onClick={() => setSecretorStatus(status)}
                            className="w-full"
                        >
                            {status === 'secretor' ? 'Secretor' : 'No Secretor'}
                        </MedicalButton>
                    ))}
                </div>
            </div>
            
            <MedicalButton
                variant="primary"
                size="lg"
                onClick={() => setActiveTab('summary')}
                disabled={!isBloodComplete}
                className="w-full"
            >
                Continuar
            </MedicalButton>
        </MedicalSection>
    );
    
    const renderSummary = () => (
        <MedicalSection 
            title="Resumen y Datos Adicionales"
            subtitle="Verifica la información ingresada y completa los datos faltantes"
            spacing="normal"
            className="animate-fade-in"
        >
            <MedicalCard variant="outline" className="p-6">
                <MedicalHeading level={5} variant="muted" className="mb-4">Datos Calculados</MedicalHeading>
                <div className="space-y-2">
                    <MedicalText variant="body" size="sm">
                        <strong>Relación Torso-Piernas:</strong> {proportions?.torsoLonger ? 'Torso más largo' : 'Piernas más largas'}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Relación Segmentos Pierna:</strong> {proportions?.upperSegmentLonger ? 'Segmento superior más largo' : 'Segmento inferior más largo'}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Relación Dedos:</strong> {proportions?.fingerRelation.replace(/_/g, ' ')}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Tipo de Sangre:</strong> {bloodType}{rhFactor}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Estado Secretor:</strong> {secretorStatus === 'secretor' ? 'Secretor' : 'No Secretor'}
                    </MedicalText>
                </div>
            </MedicalCard>
            
            <div>
                <MedicalHeading level={4} variant="secondary" className="mb-3">Sexo</MedicalHeading>
                <div className="grid grid-cols-2 gap-2">
                    {(['hombre', 'mujer'] as Sex[]).map(s => (
                        <MedicalButton 
                            key={s} 
                            variant={sex === s ? "primary" : "secondary"}
                            onClick={() => setSex(s)}
                            className="w-full"
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </MedicalButton>
                    ))}
                </div>
            </div>
            
            <MedicalButton
                variant="success"
                size="lg"
                onClick={calculateGenotype}
                disabled={!sex}
                className="w-full"
            >
                Calcular Genotipo
            </MedicalButton>
        </MedicalSection>
    );

    const renderResults = () => (
        <MedicalSection
            title="Tu Genotipo"
            subtitle="Haz clic en tu resultado para ver información detallada"
            spacing="loose"
            className="text-center animate-fade-in"
        >
            {results && results.genotypes.length > 0 ? (
                <div className="flex justify-center items-center flex-wrap gap-4">
                    {results.genotypes.map((g, i) => (
                        <div key={i} onClick={() => setSelectedGenotype(g)} className="cursor-pointer">
                            <GenotypeBox number={g} imageUrl={`https://picsum.photos/seed/genotipo${g}/160/96`} />
                        </div>
                    ))}
                </div>
            ) : (
                <MedicalText variant="muted" size="lg" className="text-center">
                    No se encontraron genotipos para esta combinación. Por favor, verifica tus datos.
                </MedicalText>
            )}
            
            <MedicalCard variant="outline" className="p-6 text-left">
                <MedicalHeading level={5} variant="muted" align="center" className="mb-4">Resumen de Cálculo</MedicalHeading>
                <div className="space-y-2">
                    <MedicalText variant="body" size="sm">
                        <strong>Línea de cálculo:</strong> <span className="font-mono">{results?.line}</span>
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Relación Torso-Piernas:</strong> {proportions?.torsoLonger ? 'Torso más largo' : 'Piernas más largas'}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Relación Dedos:</strong> {proportions?.fingerRelation.replace(/_/g, ' ')}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Tipo de Sangre:</strong> {bloodType}{rhFactor}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Estado Secretor:</strong> {secretorStatus === 'secretor' ? 'Secretor' : 'No Secretor'}
                    </MedicalText>
                    <MedicalText variant="body" size="sm">
                        <strong>Sexo:</strong> {sex}
                    </MedicalText>
                </div>
            </MedicalCard>
            
            <MedicalText variant="caption" size="xs" className="text-center">
                *Genotipo 4 indica acetilación lenta.
            </MedicalText>
            
            <MedicalButton
                variant="primary"
                size="lg"
                onClick={resetForm}
                className="w-full"
            >
                Calcular de Nuevo
            </MedicalButton>
        </MedicalSection>
    );

    if (selectedGenotype) {
        return <GenotypeDetail genotypeId={selectedGenotype} onBack={() => setSelectedGenotype(null)} />;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-8">
                    <MedicalHeading level={1} variant="primary" align="center" className="mb-2">
                        Calculadora Avanzada
                    </MedicalHeading>
                    <MedicalText variant="caption" size="lg" className="text-center">
                        Determina tus posibles genotipos nutricionales.
                    </MedicalText>
                </header>
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg mb-6">
                        <InfoIcon />
                        <p className="text-sm text-blue-800">Ingresa las medidas en centímetros. El genotipo 4 (marcado con *) siempre indica acetilación lenta.</p>
                    </div>

                    <div className="bg-gray-100 p-1 rounded-xl flex gap-1 mb-6">
                        <TabButton label="1. Medidas" isActive={activeTab === 'measurements'} onClick={() => setActiveTab('measurements')} />
                        <TabButton label="2. Sangre" isActive={activeTab === 'blood'} onClick={() => setActiveTab('blood')} disabled={!proportions} />
                        <TabButton label="3. Resumen" isActive={activeTab === 'summary'} onClick={() => setActiveTab('summary')} disabled={!isBloodComplete} />
                        <TabButton label="4. Resultados" isActive={activeTab === 'results'} onClick={() => setActiveTab('results')} disabled={!results} />
                    </div>

                    <div>
                        {activeTab === 'measurements' && renderMeasurementFields()}
                        {activeTab === 'blood' && renderBloodFields()}
                        {activeTab === 'summary' && renderSummary()}
                        {activeTab === 'results' && renderResults()}
                    </div>
                </div>
                 <div className="text-center mt-6">
                    <div className="flex items-center space-x-4">
                    <button onClick={onBackToPortal} className="text-sm text-gray-500 hover:text-[#2D31FA] transition-colors">
                        ← Volver al portal
                    </button>
                    {onNavigateToMain && (
                        <button onClick={onNavigateToMain} className="text-sm text-gray-500 hover:text-[#2D31FA] transition-colors">
                            🏠 Ir al inicio
                        </button>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedCalculator;