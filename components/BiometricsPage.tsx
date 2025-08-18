import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, Home, ClipboardList, BarChart3, Target, Clock, Zap, TestTube, Ruler, Fingerprint, Users, Activity, Brain } from 'lucide-react';

interface BiometricsPageProps {
    onBackToPortal: () => void;
    onNavigateToMain?: () => void; // Nueva prop para navegar al inicio
}

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ title, children, isOpen, onClick }) => (
    <div className="border-b border-slate-200 last:border-b-0">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-6 px-8 hover:bg-slate-50 transition-all duration-200">
            <h3 className="font-bold text-slate-800 text-lg flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-200 ${
                    isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                {title}
            </h3>
            <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.3s ease-out'
        }}>
            <div className="overflow-hidden">
                 <div className="pb-8 px-8 text-slate-600 text-base space-y-4 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const RadioPill: React.FC<{ name: string; value: string; label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ name, value, label, checked, onChange }) => (
    <label className={`block w-full text-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-2 font-medium ${
        checked 
        ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
        : 'bg-white hover:border-blue-400 hover:shadow-md hover:bg-blue-50 border-slate-200'
    }`}>
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
        {label}
    </label>
);

const FingerprintSelect: React.FC<{ name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; }> = ({ name, value, onChange }) => (
    <select name={name} value={value} onChange={onChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-slate-400">
        <option value="">...</option>
        <option value="arco">Arco</option>
        <option value="lazo">Lazo</option>
        <option value="espiral">Espiral</option>
        <option value="compuesta">Compuesta</option>
    </select>
);


const BiometricsPage: React.FC<BiometricsPageProps> = ({ onBackToPortal, onNavigateToMain }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({
        fingerprints: { right: {}, left: {} }
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev: any) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            const isCheckbox = type === 'checkbox';
            const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;
            setFormData((prev: any) => ({ ...prev, [name]: val }));
        }
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'biomediciones_paciente.json';
        link.click();
        URL.revokeObjectURL(url);
        alert('Datos exportados como JSON (simulando PDF)');
    };

    // Función para exportar a JSON
    const exportToJSON = () => {
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'biomediciones_paciente.json';
        link.click();
        URL.revokeObjectURL(url);
        alert('Datos exportados como JSON exitosamente');
    };

    // Función para copiar al portapapeles
    const copyToClipboard = async () => {
        try {
            const dataStr = JSON.stringify(formData, null, 2);
            await navigator.clipboard.writeText(dataStr);
            alert('Datos copiados al portapapeles exitosamente');
        } catch (err) {
            // Fallback para navegadores que no soportan clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = JSON.stringify(formData, null, 2);
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Datos copiados al portapapeles exitosamente');
        }
    };
    
    const biometricsData = [
        {
            title: "1: Prueba Gustador de PROP",
            content: (
                <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Cierra los ojos</li>
                        <li>Sin decirte cual te dará, pídele a tu amigo que te de una tira reactiva de PROP o tira reactiva del control</li>
                        <li>Prueba la tira reactiva</li>
                        <li>Nota si te sabe a nada, amarga o te produce una fuerte sensación amarga</li>
                        <li>Cierra los ojos y pídele a tu amigo que te de la siguiente tira reactiva</li>
                        <li>Una vez más, nota la reacción al probar la tira reactiva</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                            <TestTube className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-bold">No sabe a nada:</span> "No gustador"</li>
                        <li><span className="font-bold">Sabe amarga:</span> "Gustador"</li>
                        <li><span className="font-bold">Fuerte repulsión:</span> "Supergustador"</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>La capacidad de probar PTC (o no) se transmite mediante un solo gen (TAS2R38) que codifica un receptor de sabor en la lengua. Las combinaciones de las variantes de este gen determinan si alguien encuentra el PTC intensamente amargo, algo amargo o sin sabor en absoluto.</p>
                    </div>
                </>
            )
        },
        {
            title: "2: Ángulo gonial",
            content: (
                <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Coloca tu dedo índice en la parte inferior de tu mandíbula</li>
                        <li>Mueve tu dedo hacia atrás hasta que sientas un cambio en la forma de la mandíbula</li>
                        <li>Anota cuantos grados de amplitud tiene.</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
                            <Ruler className="w-12 h-12 text-teal-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Ángulo de 120° o menos, ángulo gonial <span className="font-bold">cerrado</span></li>
                        <li>Ángulo de superior a 130°, ángulo gonial <span className="font-bold">abierto</span></li>
                    </ul>
                    <div className="mt-4 p-3 bg-teal-50 border-l-4 border-teal-500 text-teal-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>El ángulo gonial (ángulo entre la mandíbula y el hueso temporal) es un indicador de la estructura facial y puede influir en la forma de la cabeza y la posición de los dientes.</p>
                    </div>
                </>
            )
        },
        {
            title: "3: Huellas dactilares",
            content: (
                <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Limpia los dedos con torundas con alcohol.</li>
                        <li>Coloca el cojín de tinta y el papel justo en el borde de la mesa.</li>
                        <li>Haz rodar el dedo ligeramente sobre la tinta, de dentro hacia afuera (lo contrario con el pulgar). No presiones demasiado.</li>
                        <li>Presiona y rueda ligeramente el dedo sobre el papel.</li>
                        <li>Repite con todos los dedos de ambas manos.</li>
                        <li>Etiqueta tus huellas para identificarlas correctamente.</li>
                    </ul>
                     <p className="font-semibold mt-4">Cómo interpretar los resultados:</p>
                     <p>Identifica el <span className="font-bold">trirradio o delta</span> (un pequeño triángulo) para determinar el patrón.</p>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Fingerprint className="w-12 h-12 text-indigo-600" />
                        </div>
                    </div>
                    
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-bold">ARCO:</span> Sucesión de crestas que se parecen a una colina. No tienen deltas.</li>
                        <li><span className="font-bold">LAZOS:</span> Impresiones de crestas que se curvan formando un lazo (una delta).</li>
                        <li><span className="font-bold">ESPIRALES:</span> Series de anillos concéntricos. Pueden ser helicoidales, ovaladas, circulares (dos deltas).</li>
                        <li><span className="font-bold">COMPUESTAS:</span> Mezcla de dos o más formas.</li>
                    </ul>
                     <p className="font-semibold mt-4">Líneas blancas:</p>
                     <p>Observa si hay una serie de líneas blancas entre tus huellas dactilares. Son pliegues secundarios que se vuelven visibles cuando las crestas están bajas, y pueden indicar intolerancia al gluten o sensibilidad a las lectinas.</p>
                    <div className="mt-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>Las huellas dactilares son únicas para cada individuo y pueden revelar información sobre la estructura del sistema nervioso central y la predisposición a ciertas enfermedades.</p>
                    </div>
                </>
            )
        },
        {
            title: "4: Abertura de las piernas",
            content: (
                 <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Siéntate en el suelo con las piernas estiradas</li>
                        <li>Separa las piernas lo máximo posible</li>
                        <li>Nota si se tocan las rodillas o no.</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="w-12 h-12 text-purple-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Pequeña abertura entre las piernas, o las rodillas se tocan (<span className="font-bold">gínico</span>).</li>
                        <li>Gran abertura entre las piernas (<span className="font-bold">ándrico</span>).</li>
                    </ul>
                    <div className="mt-4 p-3 bg-purple-50 border-l-4 border-purple-500 text-purple-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>La abertura de las piernas puede ser un indicador de la predisposición a ciertas enfermedades cardíacas y vasculares.</p>
                    </div>
                </>
            )
        },
        {
            title: "5: Medición de muñeca",
            content: (
                <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Envuelve tu muñeca con el pulgar y el dedo medio de la otra mano</li>
                        <li>Observa si el pulgar y el dedo medio no se tocan, se tocan o se solapan.</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center">
                            <Activity className="w-12 h-12 text-pink-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>El dedo pulgar y el dedo medio <span className="font-bold">no se tocan</span>.</li>
                        <li>El dedo pulgar y el dedo medio <span className="font-bold">se tocan</span>.</li>
                        <li>El dedo pulgar y el dedo medio <span className="font-bold">se solapan</span>.</li>
                    </ul>
                    <div className="mt-4 p-3 bg-pink-50 border-l-4 border-pink-500 text-pink-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>La medición de la muñeca puede ser un indicador de la estructura ósea y la predisposición a ciertas enfermedades.</p>
                    </div>
                </>
            )
        },
        {
            title: "6: Somatotipo",
            content: (
                 <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-bold">Simple:</span> Observa tu tipo de cuerpo en el espejo</li>
                        <li><span className="font-bold">Opcional (más preciso):</span> Mide tu cintura en la parte más estrecha y tu cadera en la parte más amplia. Divide la medida de la cintura entre la medida de la cadera para obtener el índice cintura/cadera.</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                            <Users className="w-12 h-12 text-orange-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Cuerpo Esbelto, delgado (<span className="font-bold">ectomorfo</span>) o índice ideal.</li>
                        <li>Cuerpo Esbelto, muscular (<span className="font-bold">mesoectomorfo</span>) o índice ideal.</li>
                        <li>Cuerpo Musculoso (<span className="font-bold">mesomorfo</span>) o índice ideal.</li>
                        <li>Cuerpo Musculoso redondeado (<span className="font-bold">mesoendomorfo</span>) o índice alto.</li>
                        <li>Cuerpo redondeado (<span className="font-bold">endomorfo</span>) o índice alto.</li>
                    </ul>
                    <div className="mt-4 p-3 bg-orange-50 border-l-4 border-orange-500 text-orange-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>El somatotipo (tipo corporal) es un sistema de clasificación de la constitución corporal que puede influir en la predisposición a ciertas enfermedades y la capacidad de resistencia.</p>
                    </div>
                </>
            )
        },
        {
            title: "7: Forma de la cabeza",
            content: (
                <>
                    <p className="font-semibold">Cómo hacerlo (Método simple):</p>
                    <p>Tomando como base la figura de arriba, analiza si la cabeza es larga, pequeña o mediana.</p>
                     <p className="font-semibold mt-2">Cómo hacerlo (Índice cefálico):</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Mide la longitud de tu cabeza (frente a nuca).</li>
                        <li>Mide la anchura de tu cabeza (de lado a lado en la parte más ancha).</li>
                        <li>Divide la anchura entre la longitud y multiplica por 100.</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                            <Brain className="w-12 h-12 text-red-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Índice &gt; 80: Cabeza amplia y corta (<span className="font-bold">braquicéfalo</span>).</li>
                        <li>Índice 76-80: Cabeza mediana (<span className="font-bold">mesocéfalo/normocéfalo</span>).</li>
                        <li>Índice &lt; 76: Cabeza alargada (<span className="font-bold">dolicocéfalo</span>).</li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>La forma de la cabeza puede ser un indicador de la estructura cerebral y la predisposición a ciertas enfermedades.</p>
                    </div>
                </>
            )
        },
        {
            title: "8: Forma de los dientes",
            content: (
                 <>
                    <p className="font-semibold">Cómo hacerlo:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Busca en los incisivos para determinar si están en forma de pala en la superficie interior.</li>
                        <li>De los dientes de enfrente cuenta cinco dientes hacia atrás para encontrar los primeros molares.</li>
                        <li>Observa si en el primer molar existe una cúspide extra en la superficie (cúspide de Carabelli).</li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                            <Activity className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                    
                    <p className="font-semibold mt-4">Resultados:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-bold">Incisivos en forma de pala:</span> Presentes en la superficie interior</li>
                        <li><span className="font-bold">Cúspide de Carabelli:</span> Presente en el primer molar</li>
                        <li><span className="font-bold">Ausencia de características:</span> Dientes con forma estándar</li>
                    </ul>
                    <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-r-lg">
                        <h4 className="font-bold">Contexto Genético</h4>
                        <p>La forma de los dientes puede ser un indicador de la estructura dental y la predisposición a ciertas enfermedades.</p>
                    </div>
                </>
            )
        },
    ];

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
             <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                 {/* Header Mejorado */}
                 <header className="mb-12 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-3">
                            <button onClick={onBackToPortal} className="text-slate-600 hover:text-slate-800 p-2 rounded-full hover:bg-white/80 transition-all duration-200">
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            {onNavigateToMain && (
                                <button onClick={onNavigateToMain} className="text-slate-600 hover:text-slate-800 p-2 rounded-full hover:bg-white/80 transition-all duration-200" title="Ir al inicio">
                                    <Home className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                            <ClipboardList className="w-4 h-4 mr-2" />
                            Sistema de Evaluación Biomédica
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                            Biomediciones <span className="text-blue-600">Nutrigenómicas</span>
                        </h1>
                        
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Guía completa para realizar las 8 mediciones biomédicas que determinarán tu genotipo nutricional personalizado.
                        </p>
                        

                    </div>
                 </header>

                {/* Instrucciones Mejoradas */}
                <section id="instructions" className="mb-20">
                     <div className="text-center mb-6">
                         <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center justify-center">
                             <ClipboardList className="w-6 h-6 mr-3 text-blue-600" />
                             Instrucciones de Medición
                         </h2>
                         <p className="text-slate-600 text-base">Sigue paso a paso cada medición para obtener resultados precisos</p>
                     </div>
                     
                     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20">
                        {biometricsData.map((item, index) => (
                             <AccordionItem key={index} title={item.title} isOpen={openAccordion === index} onClick={() => toggleAccordion(index)}>
                                {item.content}
                            </AccordionItem>
                        ))}
                     </div>
                 </section>
                 
                 {/* Formulario Mejorado */}
                 <section id="results-form">
                     <div className="text-center mb-6">
                         <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center justify-center">
                             <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                             Hoja de Resultados
                         </h2>
                         <p className="text-slate-600 text-base">Registra tus mediciones para calcular tu genotipo nutricional</p>
                     </div>
                     
                     <form className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 space-y-14 border border-white/20">
                         
                        {/* 1. PROP */}
                        <fieldset className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                            <legend className="text-xl font-bold text-slate-800 mb-4 px-4">1. Prueba gustador PROP</legend>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <RadioPill name="propTest" value="supergustador" label="Supergustador" checked={formData.propTest === 'supergustador'} onChange={handleFormChange} />
                                <RadioPill name="propTest" value="gustador" label="Gustador" checked={formData.propTest === 'gustador'} onChange={handleFormChange} />
                                <RadioPill name="propTest" value="nogustador" label="No gustador" checked={formData.propTest === 'nogustador'} onChange={handleFormChange} />
                            </div>
                        </fieldset>
                        
                        {/* 2. Angulo gonial */}
                        <fieldset className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                            <legend className="text-xl font-bold text-slate-800 mb-4 px-4">2. Ángulo gonial</legend>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <RadioPill name="gonialAngle" value="<120" label="Menor a 120°" checked={formData.gonialAngle === '<120'} onChange={handleFormChange} />
                                <RadioPill name="gonialAngle" value=">130" label="Mayor a 130°" checked={formData.gonialAngle === '>130'} onChange={handleFormChange} />
                            </div>
                        </fieldset>

                        {/* 3. Huellas dactilares */}
                        <fieldset>
                             <legend className="text-lg font-semibold text-gray-800 mb-2">3. Huellas dactilares</legend>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-center">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 font-semibold">Mano Derecha</th>
                                            <th>Pulgar</th><th>Índice</th><th>Medio</th><th>Anular</th><th>Meñique</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-2 font-semibold">Patrón</td>
                                            {['thumb', 'index', 'middle', 'ring', 'pinky'].map(finger => (
                                                <td key={finger} className="p-1"><FingerprintSelect name={`fingerprints.right.${finger}`} value={formData.fingerprints.right[finger] || ''} onChange={handleFormChange} /></td>
                                            ))}
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 font-semibold">Mano Izquierda</th>
                                            <th>Pulgar</th><th>Índice</th><th>Medio</th><th>Anular</th><th>Meñique</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-2 font-semibold">Patrón</td>
                                            {['thumb', 'index', 'middle', 'ring', 'pinky'].map(finger => (
                                                <td key={finger} className="p-1"><FingerprintSelect name={`fingerprints.left.${finger}`} value={formData.fingerprints.left[finger] || ''} onChange={handleFormChange} /></td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex items-center">
                                <input type="checkbox" id="whiteLines" name="whiteLines" checked={!!formData.whiteLines} onChange={handleFormChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="whiteLines" className="ml-2 block text-sm text-gray-900">Tienes líneas blancas en las huellas dactilares</label>
                            </div>
                        </fieldset>

                        {/* 4. Abertura de las piernas */}
                         <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-2">4. Abertura de las piernas</legend>
                             <div className="grid grid-cols-2 gap-2">
                                <RadioPill name="legOpening" value="ginico" label="Pequeña (gínico)" checked={formData.legOpening === 'ginico'} onChange={handleFormChange} />
                                <RadioPill name="legOpening" value="andrico" label="Grande (ándrico)" checked={formData.legOpening === 'andrico'} onChange={handleFormChange} />
                            </div>
                        </fieldset>

                         {/* 5. Medición de la muñeca */}
                        <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-2">5. Medición de la muñeca</legend>
                            <div className="grid grid-cols-3 gap-2">
                                <RadioPill name="wrist" value="notouch" label="No se tocan" checked={formData.wrist === 'notouch'} onChange={handleFormChange} />
                                <RadioPill name="wrist" value="touch" label="Se tocan" checked={formData.wrist === 'touch'} onChange={handleFormChange} />
                                <RadioPill name="wrist" value="overlap" label="Se solapan" checked={formData.wrist === 'overlap'} onChange={handleFormChange} />
                            </div>
                        </fieldset>

                        {/* 6. Somatotipo */}
                        <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-2">6. Somatotipo</legend>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <RadioPill name="somatotype" value="ectomorfo" label="Esbelto, delgado" checked={formData.somatotype === 'ectomorfo'} onChange={handleFormChange} />
                                <RadioPill name="somatotype" value="mesoectomorfo" label="Esbelto, muscular" checked={formData.somatotype === 'mesoectomorfo'} onChange={handleFormChange} />
                                <RadioPill name="somatotype" value="mesomorfo" label="Musculoso" checked={formData.somatotype === 'mesomorfo'} onChange={handleFormChange} />
                                <RadioPill name="somatotype" value="mesoendomorfo" label="Musculoso, redondeado" checked={formData.somatotype === 'mesoendomorfo'} onChange={handleFormChange} />
                                <RadioPill name="somatotype" value="endomorfo" label="Redondeado" checked={formData.somatotype === 'endomorfo'} onChange={handleFormChange} />
                            </div>
                        </fieldset>

                        {/* 7. Forma de la cabeza */}
                        <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-2">7. Forma de la cabeza</legend>
                            <div className="grid grid-cols-3 gap-2">
                                <RadioPill name="headShape" value="braquicefalo" label="Braquicéfalo" checked={formData.headShape === 'braquicefalo'} onChange={handleFormChange} />
                                <RadioPill name="headShape" value="normocefalo" label="Normocéfalo" checked={formData.headShape === 'normocefalo'} onChange={handleFormChange} />
                                <RadioPill name="headShape" value="dolicocefalo" label="Dolicocéfalo" checked={formData.headShape === 'dolicocefalo'} onChange={handleFormChange} />
                            </div>
                        </fieldset>

                        {/* 8. Forma de los dientes */}
                         <fieldset>
                            <legend className="text-lg font-semibold text-gray-800 mb-2">8. Forma de los dientes</legend>
                             <div className="space-y-2">
                                <div className="flex items-center">
                                    <input type="checkbox" id="shovelIncisors" name="shovelIncisors" checked={!!formData.shovelIncisors} onChange={handleFormChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label htmlFor="shovelIncisors" className="ml-2 block text-sm text-gray-900">Incisivos en forma de pala</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="carabelliCusp" name="carabelliCusp" checked={!!formData.carabelliCusp} onChange={handleFormChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label htmlFor="carabelliCusp" className="ml-2 block text-sm text-gray-900">Cúspide adicional en el primer molar (de Carabelli)</label>
                                </div>
                            </div>
                        </fieldset>

                        {/* Resumen de Datos Capturados */}
                        <div className="pt-8 border-t border-slate-200">
                            <div className="bg-blue-50 p-6 rounded-xl mb-6">
                                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <ClipboardList className="w-6 h-6 mr-2" />
                                    Resumen de Datos Capturados
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <h4 className="font-semibold text-blue-700 mb-2">Datos Básicos:</h4>
                                        <ul className="space-y-1 text-blue-600">
                                            <li>• Gustador PROP: {formData.propTest || 'No seleccionado'}</li>
                                            <li>• Somatotipo: {formData.somatotype || 'No seleccionado'}</li>
                                            <li>• Forma de cabeza: {formData.headShape || 'No seleccionado'}</li>
                                            <li>• Abertura de piernas: {formData.legOpening || 'No seleccionado'}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-700 mb-2">Características Específicas:</h4>
                                        <ul className="space-y-1 text-blue-600">
                                            <li>• Líneas blancas: {formData.whiteLines ? 'Sí' : 'No'}</li>
                                            <li>• Incisivos pala: {formData.shovelIncisors ? 'Sí' : 'No'}</li>
                                            <li>• Cúspide Carabelli: {formData.carabelliCusp ? 'Sí' : 'No'}</li>
                                            <li>• Muñeca: {formData.wrist || 'No seleccionado'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    type="button" 
                                    onClick={() => exportToPDF()} 
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500/30"
                                >
                                    <BarChart3 className="w-5 h-5 inline mr-2" />
                                    Exportar a PDF
                                </button>
                                
                                <button 
                                    type="button" 
                                    onClick={() => exportToJSON()} 
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
                                >
                                    <TestTube className="w-5 h-5 inline mr-2" />
                                    Exportar a JSON
                                </button>
                                
                                <button 
                                    type="button" 
                                    onClick={() => copyToClipboard()} 
                                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
                                >
                                    <ClipboardList className="w-5 h-5 inline mr-2" />
                                    Copiar Datos
                                </button>
                            </div>
                            
                            <p className="text-slate-500 text-sm mt-4 text-center">
                                Los datos capturados están listos para ser exportados o copiados al portapapeles
                            </p>
                        </div>
                    </form>
                </section>
             </div>
        </div>
    );
};

export default BiometricsPage;