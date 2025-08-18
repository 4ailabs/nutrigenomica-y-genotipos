import React from 'react';
import { MEDICAL_COLORS, MEDICAL_COMPONENTS, MEDICAL_ANIMATIONS } from '../constants/designSystem';

// Botón médico principal
export const MedicalButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  className = '',
  icon 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500',
    success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800 focus:ring-yellow-500',
    error: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Tarjeta médica con animaciones
export const MedicalCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn';
  delay?: number;
}> = ({ 
  children, 
  className = '', 
  hover = true, 
  animation = 'fadeIn',
  delay = 0 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-md transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  const animationClasses = {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    slideIn: 'animate-slideIn',
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${animationClasses[animation]} ${className}`;
  
  return (
    <div 
      className={classes}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

// Campo de entrada médico
export const MedicalInput: React.FC<{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}> = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  success, 
  required = false,
  className = '',
  icon 
}) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  let inputClasses = `${baseClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
  if (error) inputClasses = `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-500`;
  if (success) inputClasses = `${baseClasses} border-green-300 focus:ring-green-500 focus:border-green-500`;
  
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
          required={required}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 animate-fadeIn">{error}</p>
      )}
      
      {success && (
        <p className="text-sm text-green-600 animate-fadeIn">{success}</p>
      )}
    </div>
  );
};

// Badge médico
export const MedicalBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';
  
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-gray-100 text-gray-800',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// Separador médico
export const MedicalDivider: React.FC<{
  text?: string;
  className?: string;
}> = ({ text, className = '' }) => {
  if (text) {
    return (
      <div className={`relative my-6 ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 font-medium">{text}</span>
        </div>
      </div>
    );
  }
  
  return <hr className={`border-t border-gray-200 my-6 ${className}`} />;
};

// Indicador de progreso médico
export const MedicalProgress: React.FC<{
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}> = ({ 
  value, 
  max, 
  label, 
  showPercentage = true, 
  variant = 'primary',
  className = '' 
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const variantClasses = {
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">{percentage}%</span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantClasses[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Alertas médicas
export const MedicalAlert: React.FC<{
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}> = ({ 
  type, 
  title, 
  message, 
  onClose, 
  className = '' 
}) => {
  const alertClasses = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800',
  };
  
  const iconClasses = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  };
  
  const icons = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✗',
  };
  
  return (
    <div className={`p-4 rounded-lg ${alertClasses[type]} ${className} animate-slideIn`}>
      <div className="flex items-start">
        <div className={`text-xl mr-3 ${iconClasses[type]}`}>
          {icons[type]}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-lg opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Modal médico
export const MedicalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '' 
}) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay de fondo */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity animate-fadeIn"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full ${className}`}>
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">Cerrar</span>
                ×
              </button>
            </div>
          </div>
          
          {/* Contenido */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tooltip médico
export const MedicalTooltip: React.FC<{
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}> = ({ 
  children, 
  content, 
  position = 'top',
  className = '' 
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };
  
  return (
    <div className={`relative group ${className}`}>
      {children}
      
      <div className={`absolute ${positionClasses[position]} z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
        {content}
        
        {/* Flecha del tooltip */}
        <div className={`absolute ${position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2' : ''} ${position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2' : ''} ${position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2' : ''} ${position === 'right' ? 'right-full top-1/2 transform -translate-y-1/2' : ''} w-0 h-0 border-4 border-transparent ${position === 'top' ? 'border-t-gray-900' : ''} ${position === 'bottom' ? 'border-b-gray-900' : ''} ${position === 'left' ? 'border-l-gray-900' : ''} ${position === 'right' ? 'border-r-gray-900' : ''}`} />
      </div>
    </div>
  );
};
