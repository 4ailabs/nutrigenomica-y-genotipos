import React, { useState } from 'react';
import { Lock, Unlock, Clock, Eye, EyeOff } from 'lucide-react';

interface PremiumAuthProps {
  onAuthenticate: (password: string) => boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
  remainingTime?: number;
}

const PremiumAuth: React.FC<PremiumAuthProps> = ({ 
  onAuthenticate, 
  isAuthenticated, 
  onLogout, 
  remainingTime = 0 
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular pequeña pausa para UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = onAuthenticate(password);
    
    if (success) {
      setPassword('');
      setError('');
    } else {
      setError('Contraseña incorrecta. Contacta al administrador para acceso premium.');
    }
    
    setIsLoading(false);
  };

  const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (isAuthenticated) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Unlock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-purple-800">Acceso Premium Activo</h4>
              <p className="text-sm text-purple-600">
                Generador de recetas IA disponible
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {remainingTime > 0 && (
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(remainingTime)} restantes</span>
              </div>
            )}
            <button
              onClick={onLogout}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-amber-800 mb-2">
          Generador de Recetas IA Premium
        </h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          Accede al generador inteligente de recetas personalizadas que crea platillos únicos 
          usando exclusivamente tus superalimentos y evitando tus toxinas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="premium-password" className="block text-sm font-medium text-amber-800 mb-2">
            Contraseña Premium
          </label>
          <div className="relative">
            <input
              id="premium-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña premium"
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!password.trim() || isLoading}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {isLoading ? 'Verificando...' : 'Acceder a Premium'}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-3">Características Premium:</h4>
        <ul className="space-y-2 text-sm text-amber-700">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Recetas personalizadas generadas por IA</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Usa exclusivamente tus superalimentos del genotipo</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Evita automáticamente todas tus toxinas</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Recetas adaptadas a horarios mexicanos</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Sesión válida por 24 horas</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PremiumAuth;