// Sistema de Diseño Médico - Colores Profesionales
export const MEDICAL_COLORS = {
  // Colores primarios médicos
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Azul médico principal
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Colores secundarios para acentos
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Gris médico
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Colores de estado médico
  status: {
    success: '#10b981', // Verde para éxito
    warning: '#f59e0b', // Amarillo para advertencia
    error: '#ef4444',   // Rojo para error
    info: '#3b82f6',    // Azul para información
  },
  
  // Colores de fondo
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    dark: '#0f172a',
  },
  
  // Colores de texto
  text: {
    primary: '#1e293b',
    secondary: '#475569',
    tertiary: '#64748b',
    light: '#94a3b8',
    white: '#ffffff',
  }
};

// Tipografía médica profesional
export const MEDICAL_TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  }
};

// Espaciado y dimensiones médicas
export const MEDICAL_SPACING = {
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  }
};

// Animaciones médicas profesionales
export const MEDICAL_ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideIn: {
      '0%': { transform: 'translateX(-20px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    bounce: {
      '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
      '40%, 43%': { transform: 'translate3d(0,-30px,0)' },
      '70%': { transform: 'translate3d(0,-15px,0)' },
      '90%': { transform: 'translate3d(0,-4px,0)' },
    },
    shimmer: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    }
  }
};

// Componentes médicos reutilizables
export const MEDICAL_COMPONENTS = {
  card: {
    base: 'bg-white rounded-xl shadow-md border border-gray-100',
    hover: 'hover:shadow-lg hover:border-gray-200 transition-all duration-300',
    active: 'active:shadow-sm active:scale-[0.98]',
  },
  
  button: {
    primary: 'bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    outline: 'border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  },
  
  input: {
    base: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
    error: 'border-red-300 focus:ring-red-500 focus:border-red-500',
    success: 'border-green-300 focus:ring-green-500 focus:border-green-500',
  },
  
  badge: {
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-gray-100 text-gray-800',
  }
};
