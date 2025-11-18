import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { BodyMeasurements, CalculatedProportions, FingerRelation, BloodType, RhFactor, SecretorStatus, Sex } from '../types';
import { DATOS_GENOTIPOS, GENOTYPE_NAMES } from '../constants';
import GenotypeBox from './GenotypeBox';
import GenotypeDetail from './GenotypeDetail';
import { useCalculatorStorage } from '../hooks/useCalculatorStorage';
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
        aria-label={`${label} tab`}
        aria-selected={isActive}
        role="tab"
    >
        {label}
    </button>
);

const AdvancedCalculator: React.FC<AdvancedCalculatorProps> = ({ onBackToPortal, onNavigateToMain }) => {
    const [activeTab, setActiveTab] = useState<Tab>('measurements');
    const calculatorStorage = useCalculatorStorage();
    
    // Inicializar estado con datos guardados si existen
    const [measurements, setMeasurements] = useState<Partial<BodyMeasurements>>(
        calculatorStorage.data?.measurements || {}
    );
    const [bloodType, setBloodType] = useState<BloodType | null>(
        calculatorStorage.data?.bloodType || null
    );
    const [rhFactor, setRhFactor] = useState<RhFactor | null>(
        calculatorStorage.data?.rhFactor || null
    );
    const [secretorStatus, setSecretorStatus] = useState<SecretorStatus | null>(
        calculatorStorage.data?.secretorStatus || null
    );
    const [sex, setSex] = useState<Sex | null>(
        calculatorStorage.data?.sex || null
    );
    
    // Actualizar estado cuando se carguen datos del storage
    useEffect(() => {
        if (calculatorStorage.data) {
            setMeasurements(calculatorStorage.data.measurements);
            setBloodType(calculatorStorage.data.bloodType);
            setRhFactor(calculatorStorage.data.rhFactor);
            setSecretorStatus(calculatorStorage.data.secretorStatus);
            setSex(calculatorStorage.data.sex);
        }
    }, [calculatorStorage.data]);

    const [proportions, setProportions] = useState<CalculatedProportions | null>(null);
    const [results, setResults] = useState<{line: string, genotypes: number[] } | null>(null);
    const [selectedGenotype, setSelectedGenotype] = useState<number | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    // Validación en tiempo real
    const validateField = (name: string, value: string | number | undefined): string => {
        if (!value && value !== 0) {
            return 'Este campo es requerido';
        }
        
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        
        if (isNaN(numValue) || numValue <= 0) {
            return 'Debe ser un número positivo';
        }
        
        // Validaciones específicas por campo
        switch (name) {
            case 'heightStanding':
                if (numValue < 100 || numValue > 250) {
                    return 'La altura debe estar entre 100 y 250 cm';
                }
                break;
            case 'heightSitting':
                if (numValue < 50 || numValue > 150) {
                    return 'La altura sentado debe estar entre 50 y 150 cm';
                }
                break;
            case 'chairHeight':
                if (numValue < 30 || numValue > 80) {
                    return 'La altura de la silla debe estar entre 30 y 80 cm';
                }
                break;
            case 'upperLegLength':
            case 'lowerLegLength':
                if (numValue < 20 || numValue > 100) {
                    return 'La longitud debe estar entre 20 y 100 cm';
                }
                break;
            case 'indexFingerLeft':
            case 'ringFingerLeft':
            case 'indexFingerRight':
            case 'ringFingerRight':
                if (numValue < 3 || numValue > 15) {
                    return 'La longitud del dedo debe estar entre 3 y 15 cm';
                }
                break;
        }
        
        return '';
    };

    const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = value ? parseFloat(value) : undefined;
        const newMeasurements = { ...measurements, [name]: numValue };
        setMeasurements(newMeasurements);
        
        // Validación en tiempo real
        setTouchedFields(prev => new Set(prev).add(name));
        const error = validateField(name, numValue);
        setFieldErrors(prev => ({ ...prev, [name]: error }));
        
        // Guardar automáticamente en localStorage
        calculatorStorage.updateMeasurements(newMeasurements);
    };

    const handleBloodTypeChange = (type: BloodType) => {
        setBloodType(type);
        calculatorStorage.updateBloodData(type, rhFactor, secretorStatus, sex);
    };

    const handleRhFactorChange = (rh: RhFactor) => {
        setRhFactor(rh);
        calculatorStorage.updateBloodData(bloodType, rh, secretorStatus, sex);
    };

    const handleSecretorStatusChange = (status: SecretorStatus) => {
        setSecretorStatus(status);
        calculatorStorage.updateBloodData(bloodType, rhFactor, status, sex);
    };

    const handleSexChange = (s: Sex) => {
        setSex(s);
        calculatorStorage.updateBloodData(bloodType, rhFactor, secretorStatus, s);
    };

    const calculateProportions = useCallback(() => {
        const m = measurements;
        
        // Validar todos los campos antes de calcular
        const requiredFields = ['heightStanding', 'heightSitting', 'chairHeight', 'upperLegLength', 'lowerLegLength', 'indexFingerLeft', 'ringFingerLeft', 'indexFingerRight', 'ringFingerRight'];
        const missingFields: string[] = [];
        const newErrors: Record<string, string> = {};
        
        requiredFields.forEach(fieldName => {
            const value = m[fieldName as keyof BodyMeasurements];
            const error = validateField(fieldName, value);
            if (error) {
                missingFields.push(fieldName);
                newErrors[fieldName] = error;
            }
        });
        
        if (missingFields.length > 0) {
            setFieldErrors(newErrors);
            setTouchedFields(prev => {
                const newSet = new Set(prev);
                requiredFields.forEach(f => newSet.add(f));
                return newSet;
            });
            return;
        }
        
        if (!m.heightStanding || !m.heightSitting || !m.chairHeight || !m.upperLegLength || !m.lowerLegLength || !m.indexFingerLeft || !m.ringFingerLeft || !m.indexFingerRight || !m.ringFingerRight) {
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
            spacing="tight"
            className="animate-fade-in"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                ].map(field => {
                    const fieldName = field.name as keyof BodyMeasurements;
                    const isTouched = touchedFields.has(field.name);
                    const error = isTouched ? fieldErrors[field.name] : '';
                    const value = measurements[fieldName];
                    const isValid = isTouched && !error && value !== undefined;
                    
                    return (
                        <MedicalInput
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type="number"
                            value={value?.toString() || ''}
                            onChange={handleMeasurementChange}
                            placeholder={field.placeholder}
                            error={error}
                            success={isValid ? '✓ Campo válido' : undefined}
                            required
                            aria-label={`${field.label}, campo requerido`}
                            aria-invalid={error ? true : false}
                            aria-describedby={error ? `${field.name}-error` : undefined}
                        />
                    );
                })}
            </div>
            
            <MedicalButton
                variant="primary"
                size="sm"
                onClick={calculateProportions}
                className="w-full mt-4"
                aria-label="Calcular proporciones corporales basadas en las mediciones ingresadas"
                disabled={Object.keys(fieldErrors).some(key => fieldErrors[key] !== '') || Object.keys(measurements).length < 9}
            >
                Calcular Proporciones
            </MedicalButton>
        </MedicalSection>
    );

    const renderBloodFields = () => (
        <div className="space-y-4">
            <div>
                <MedicalHeading level={5} variant="secondary" className="mb-3">Información Sanguínea</MedicalHeading>
                <MedicalText variant="caption" size="sm" className="mb-4">Selecciona tu grupo sanguíneo, factor Rh y estado secretor</MedicalText>
            </div>
            
            <div className="space-y-4">
                <div>
                    <MedicalHeading level={6} variant="secondary" className="mb-2">Grupo Sanguíneo</MedicalHeading>
                    <div className="grid grid-cols-2 gap-2">
                        {(['A', 'B', 'AB', 'O'] as BloodType[]).map(type => (
                            <MedicalButton 
                                key={type} 
                                variant={bloodType === type ? "primary" : "secondary"}
                                onClick={() => handleBloodTypeChange(type)}
                                size="sm"
                                className="w-full"
                                aria-label={`Seleccionar grupo sanguíneo ${type}`}
                                aria-pressed={bloodType === type}
                            >
                                {type}
                            </MedicalButton>
                        ))}
                    </div>
                </div>
                
                <div>
                    <MedicalHeading level={6} variant="secondary" className="mb-2">Factor Rh</MedicalHeading>
                    <div className="grid grid-cols-2 gap-2">
                        {(['+', '-'] as RhFactor[]).map(rh => (
                            <MedicalButton 
                                key={rh} 
                                variant={rhFactor === rh ? "primary" : "secondary"}
                                onClick={() => handleRhFactorChange(rh)}
                                size="sm"
                                className="w-full"
                                aria-label={`Seleccionar factor Rh ${rh === '+' ? 'positivo' : 'negativo'}`}
                                aria-pressed={rhFactor === rh}
                            >
                                {rh === '+' ? 'Positivo (+)' : 'Negativo (-)'}
                            </MedicalButton>
                        ))}
                    </div>
                </div>
                
                <div>
                    <MedicalHeading level={6} variant="secondary" className="mb-2">Estado Secretor</MedicalHeading>
                    <div className="grid grid-cols-2 gap-2">
                        {(['secretor', 'no_secretor'] as SecretorStatus[]).map(status => (
                            <MedicalButton 
                                key={status} 
                                variant={secretorStatus === status ? "primary" : "secondary"}
                                onClick={() => handleSecretorStatusChange(status)}
                                size="sm"
                                className="w-full"
                                aria-label={`Seleccionar estado secretor ${status === 'secretor' ? 'secretor' : 'no secretor'}`}
                                aria-pressed={secretorStatus === status}
                            >
                                {status === 'secretor' ? 'Secretor' : 'No Secretor'}
                            </MedicalButton>
                        ))}
                    </div>
                </div>
            </div>
            
            <MedicalButton
                variant="primary"
                size="sm"
                onClick={() => setActiveTab('summary')}
                disabled={!isBloodComplete}
                className="w-full mt-4"
                aria-label={isBloodComplete ? "Continuar al resumen" : "Completa todos los campos de información sanguínea para continuar"}
            >
                Continuar
            </MedicalButton>
        </div>
    );
    
    const renderSummary = () => (
        <div className="space-y-4">
            <div>
                <MedicalHeading level={5} variant="secondary" className="mb-3">Resumen y Datos Adicionales</MedicalHeading>
                <MedicalText variant="caption" size="sm" className="mb-4">Verifica la información ingresada y completa los datos faltantes</MedicalText>
            </div>
            
            <MedicalCard variant="outline" className="p-4 mb-4">
                <MedicalHeading level={6} variant="muted" className="mb-3">Datos Calculados</MedicalHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
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
                <MedicalHeading level={6} variant="secondary" className="mb-2">Sexo</MedicalHeading>
                <div className="grid grid-cols-2 gap-2">
                    {(['hombre', 'mujer'] as Sex[]).map(s => (
                        <MedicalButton 
                            key={s} 
                            variant={sex === s ? "primary" : "secondary"}
                            onClick={() => handleSexChange(s)}
                            size="sm"
                            className="w-full"
                            aria-label={`Seleccionar sexo ${s}`}
                            aria-pressed={sex === s}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </MedicalButton>
                    ))}
                </div>
            </div>
            
            <MedicalButton
                variant="success"
                size="sm"
                onClick={calculateGenotype}
                disabled={!sex}
                className="w-full mt-4"
                aria-label={sex ? "Calcular genotipo basado en los datos ingresados" : "Selecciona el sexo para calcular el genotipo"}
            >
                Calcular Genotipo
            </MedicalButton>
        </div>
    );

    const renderResults = () => (
        <div className="space-y-4 text-center">
            <div>
                <MedicalHeading level={5} variant="primary" className="mb-3">Tu Genotipo</MedicalHeading>
                <MedicalText variant="caption" size="sm" className="mb-4">Haz clic en tu resultado para ver información detallada</MedicalText>
            </div>
            
            {results && results.genotypes.length > 0 ? (
                <div className="flex justify-center items-center flex-wrap gap-3 mb-4">
                    {results.genotypes.map((g, i) => (
                        <div key={i} onClick={() => setSelectedGenotype(g)} className="cursor-pointer">
                            <GenotypeBox number={g} imageUrl={`https://picsum.photos/seed/genotipo${g}/160/96`} />
                        </div>
                    ))}
                </div>
            ) : (
                <MedicalText variant="muted" size="base" className="text-center mb-4">
                    No se encontraron genotipos para esta combinación. Por favor, verifica tus datos.
                </MedicalText>
            )}
            
            <MedicalCard variant="outline" className="p-4 text-left mb-4">
                <MedicalHeading level={6} variant="muted" align="center" className="mb-3">Resumen de Cálculo</MedicalHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
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
            
            <MedicalText variant="caption" size="xs" className="text-center mb-4">
                *Genotipo 4 indica acetilación lenta.
            </MedicalText>
            
            <MedicalButton
                variant="primary"
                size="sm"
                onClick={resetForm}
                className="w-full"
            >
                Calcular de Nuevo
            </MedicalButton>
        </div>
    );

    if (selectedGenotype) {
        return <GenotypeDetail genotypeId={selectedGenotype} onBack={() => setSelectedGenotype(null)} />;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-6">
                    <MedicalHeading level={3} variant="primary" align="center" className="mb-2">
                        Calculadora Avanzada
                    </MedicalHeading>
                    <MedicalText variant="caption" size="sm" className="text-center">
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
                 <div className="text-center mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <MedicalButton
                            variant="secondary"
                            size="sm"
                            onClick={onBackToPortal}
                            className="w-full sm:w-auto px-6"
                        >
                            ← Volver al Portal
                        </MedicalButton>
                        {onNavigateToMain && (
                            <MedicalButton
                                variant="outline"
                                size="sm"
                                onClick={onNavigateToMain}
                                className="w-full sm:w-auto px-6"
                            >
                                🏠 Ir al Inicio
                            </MedicalButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedCalculator;