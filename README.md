# 🧬 Nutrigenómica y Genotipos

> **Sistema de evaluación nutrigenómica basado en evidencia científica para determinar perfiles genotípicos nutricionales**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)](https://tailwindcss.com/)

## 🎯 Descripción

**Nutrigenómica y Genotipos** es una aplicación web profesional diseñada para médicos y profesionales de la salud que desean implementar evaluaciones nutrigenómicas basadas en evidencia científica. La aplicación permite determinar el perfil genotípico nutricional de los pacientes a través de biomediciones específicas y análisis avanzados.

## ✨ Características Principales

### 🔬 **Evaluación Biomédica Completa**
- **8 mediciones biométricas clave** para análisis nutrigenómico
- **Análisis de huellas digitales** para identificación de patrones
- **Pruebas de sensibilidad gustativa** para preferencias alimentarias
- **Mediciones antropométricas** para composición corporal

### 🧮 **Calculadora Avanzada de Genotipos**
- **Algoritmos validados científicamente** para determinación de genotipos
- **Análisis de tipo sanguíneo** y factor Rh
- **Evaluación del estado secretor** para optimización nutricional
- **Resultados instantáneos** con alta precisión

### 🧬 **6 Genotipos Nutricionales Identificados**
1. **Hunter** - Adaptado para dietas altas en proteínas
2. **Gatherer** - Optimizado para carbohidratos complejos
3. **Master** - Balanceado para nutrición mixta
4. **Explorer** - Flexible para variaciones dietéticas
5. **Warrior** - Resistente para dietas cetogénicas
6. **Nomad** - Adaptable para nutrición nómada

### 🤖 **Asistente IA Personalizado**
- **Recomendaciones nutricionales** basadas en genotipo
- **Generación de menús semanales** personalizados
- **Recetas adaptadas** al perfil genético
- **Sugerencias de suplementos** específicos

### 🎨 **Interfaz Profesional y Médica**
- **Diseño clínico** apropiado para entornos médicos
- **Colores médicos** profesionales y accesibles
- **Tipografía clara** para presentación a pacientes
- **Responsive design** para todos los dispositivos

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18.2.0 con TypeScript 5.0
- **Build Tool**: Vite 4.4.0 para desarrollo rápido
- **Styling**: Tailwind CSS 3.3.0 con sistema de diseño médico
- **Icons**: Lucide React para iconografía profesional
- **AI Integration**: Google Gemini API para recomendaciones inteligentes
- **Animations**: CSS keyframes personalizados para UX fluida

## 📋 Requisitos del Sistema

- **Node.js**: 16.0.0 o superior
- **npm**: 8.0.0 o superior
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/4ailabs/nutrigenomica-y-genotipos.git
cd nutrigenomica-y-genotipos
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 5. Construir para Producción
```bash
npm run build
```

## 🏗️ Estructura del Proyecto

```
nutrigenómica-y-genotipos/
├── components/           # Componentes React reutilizables
│   ├── AIAssistant.tsx  # Asistente IA para nutrición
│   ├── BiometricsPage.tsx # Página de biomediciones
│   ├── GenotypeBox.tsx  # Tarjetas de genotipos
│   ├── GenotypeDetail.tsx # Detalles de genotipos
│   ├── LandingPage.tsx  # Página principal
│   ├── Portal.tsx       # Portal de evaluación
│   └── ...              # Otros componentes
├── constants/            # Constantes y configuración
├── styles/              # Estilos CSS y animaciones
├── types/               # Definiciones de TypeScript
├── utils/               # Utilidades y helpers
├── App.tsx              # Componente principal
└── index.tsx            # Punto de entrada
```

## 🔧 Componentes Principales

### **LandingPage.tsx**
Página principal con información sobre el sistema nutrigenómico, beneficios y características principales.

### **Portal.tsx**
Hub central para acceder a las herramientas de evaluación, explorar genotipos y comenzar el proceso de análisis.

### **BiometricsPage.tsx**
Interfaz para realizar las 8 mediciones biométricas necesarias para el cálculo del genotipo.

### **AdvancedCalculator.tsx**
Calculadora que procesa las biomediciones y determina el genotipo nutricional del paciente.

### **GenotypeDetail.tsx**
Página detallada de cada genotipo con características, recomendaciones alimentarias y guías nutricionales.

### **AIAssistant.tsx**
Asistente de inteligencia artificial para generar recomendaciones nutricionales personalizadas.

## 🎨 Sistema de Diseño

La aplicación utiliza un **sistema de diseño médico personalizado** que incluye:

- **Paleta de colores médicos** apropiada para entornos clínicos
- **Tipografía profesional** optimizada para legibilidad
- **Componentes reutilizables** con estilos consistentes
- **Animaciones sutiles** para mejorar la experiencia del usuario
- **Responsive design** para todos los tamaños de pantalla

## 🔬 Base Científica

El sistema está basado en:

- **Investigación nutrigenómica** validada científicamente
- **Algoritmos de evaluación** desarrollados por expertos
- **Patrones biométricos** identificados en estudios clínicos
- **Correlaciones genotipo-nutrición** documentadas en literatura médica

## 📱 Características de Accesibilidad

- **Contraste optimizado** para mejor legibilidad
- **Navegación por teclado** completa
- **Etiquetas semánticas** para lectores de pantalla
- **Colores accesibles** para usuarios con daltonismo

## 🚀 Despliegue

### **Vercel (Recomendado)**
```bash
npm install -g vercel
vercel --prod
```

### **Netlify**
```bash
npm run build
# Subir la carpeta dist/ a Netlify
```

### **GitHub Pages**
```bash
npm run build
# Configurar GitHub Actions para deploy automático
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍⚕️ Autor

**Dr. Miguel Ojeda Rios**
- **GitHub**: [@4ailabs](https://github.com/4ailabs)
- **Especialidad**: Nutrigenómica y Medicina Personalizada

## 🙏 Agradecimientos

- **Comunidad médica** por la validación científica
- **Equipo de desarrollo** por la implementación técnica
- **Pacientes** por la retroalimentación continua
- **Investigadores** en el campo de la nutrigenómica

## 📞 Contacto

Para preguntas, sugerencias o colaboraciones:

- **Email**: [Tu email aquí]
- **GitHub Issues**: [Crear un issue](https://github.com/4ailabs/nutrigenomica-y-genotipos/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/4ailabs/nutrigenomica-y-genotipos/wiki)

---

<div align="center">

**⭐ Si este proyecto te resulta útil, ¡considera darle una estrella en GitHub!**

*Desarrollado con ❤️ para la comunidad médica y científica*

</div>
