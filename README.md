<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Nutrigenómica y GenoTipos - Sistema Médico Profesional

## 🏥 Descripción

Sistema de nutrigenómica basado en genotipos diseñado para uso médico profesional. La aplicación permite a los médicos realizar evaluaciones genotípicas completas de sus pacientes, incluyendo biomediciones, análisis de sangre y cálculo de genotipos para personalizar planes nutricionales.

## ✨ Características Principales

### 🎨 **Interfaz Médica Profesional**
- **Diseño Clínico**: Interfaz optimizada para uso médico con colores profesionales
- **Componentes Reutilizables**: Sistema de componentes médicos estandarizados
- **Tipografía Médica**: Fuente Inter optimizada para legibilidad clínica
- **Paleta de Colores Médica**: Colores profesionales que transmiten confianza y seriedad

### 🎭 **Animaciones Clave**
- **Entrada Suave**: Animaciones de entrada escalonadas para mejor experiencia
- **Transiciones Profesionales**: Efectos de hover y transiciones suaves
- **Feedback Visual**: Indicadores de progreso y estados de carga
- **Responsive**: Animaciones optimizadas para dispositivos móviles

### 🔬 **Funcionalidades Médicas**
- **Portal de Evaluación**: Sistema paso a paso para determinar genotipos
- **Biomediciones**: 8 mediciones corporales con instrucciones detalladas
- **Calculadora Avanzada**: Algoritmo científico para cálculo de genotipos
- **Exploración de GenoTipos**: Información detallada de cada perfil genético
- **Chatbot IA**: Asistente inteligente para seguimiento y consultas

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/4ailabs/sueroterapia-premiun.git

# Entrar al directorio
cd nutrigenómica-y-genotipos

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos
```
nutrigenómica-y-genotipos/
├── components/           # Componentes React
│   ├── MedicalComponents.tsx    # Componentes médicos reutilizables
│   ├── LandingPage.tsx          # Página principal mejorada
│   ├── Portal.tsx               # Portal de evaluación
│   ├── AdvancedCalculator.tsx   # Calculadora de genotipos
│   └── BiometricsPage.tsx      # Página de biomediciones
├── constants/
│   └── designSystem.ts          # Sistema de diseño médico
├── styles/
│   └── animations.css           # Estilos y animaciones CSS
├── types.ts                     # Tipos TypeScript
└── App.tsx                     # Aplicación principal
```

### Sistema de Diseño
- **Colores Médicos**: Paleta profesional con variantes para estados
- **Tipografía**: Sistema de fuentes escalable y legible
- **Espaciado**: Sistema de espaciado consistente y accesible
- **Componentes**: Biblioteca de componentes médicos estandarizados

## 🎯 Componentes Médicos

### MedicalButton
Botón con variantes para diferentes acciones médicas:
```tsx
<MedicalButton 
  variant="primary" 
  size="lg" 
  onClick={handleClick}
>
  Continuar
</MedicalButton>
```

### MedicalCard
Tarjeta con animaciones y efectos hover:
```tsx
<MedicalCard 
  animation="slideUp" 
  delay={200}
  className="p-6"
>
  Contenido de la tarjeta
</MedicalCard>
```

### MedicalInput
Campo de entrada con validación y estados:
```tsx
<MedicalInput
  label="Altura (cm)"
  name="height"
  type="number"
  required
  error="Campo requerido"
/>
```

### MedicalBadge
Badge para mostrar estados y categorías:
```tsx
<MedicalBadge variant="success" size="lg">
  Completado
</MedicalBadge>
```

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `constants/designSystem.ts`:
```typescript
export const MEDICAL_COLORS = {
  primary: {
    500: '#0ea5e9', // Color principal
    600: '#0284c7', // Hover
  },
  // ... más colores
};
```

### Animaciones
Las animaciones se pueden ajustar en `styles/animations.css`:
```css
.animate-slideUp {
  animation: slideUp 0.6s ease-out forwards;
}

.animate-delay-200 {
  animation-delay: 200ms;
}
```

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Mobile**: 320px - 767px

### Características Móviles
- Animaciones optimizadas para dispositivos táctiles
- Navegación adaptada para pantallas pequeñas
- Componentes escalables automáticamente

## 🔧 Desarrollo

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de producción
```

### Estructura de Componentes
Cada componente médico sigue el patrón:
1. **Props**: Tipos TypeScript bien definidos
2. **Estados**: Manejo de estado local cuando es necesario
3. **Animaciones**: Integración con el sistema de animaciones
4. **Accesibilidad**: Atributos ARIA y navegación por teclado

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Otros Proveedores
- **Netlify**: Compatible con build estático
- **AWS S3**: Para hosting estático
- **GitHub Pages**: Para proyectos públicos

## 📊 Métricas de Rendimiento

### Optimizaciones Implementadas
- **Lazy Loading**: Componentes cargados bajo demanda
- **Code Splitting**: División automática de bundles
- **Image Optimization**: Optimización automática de imágenes
- **CSS Purge**: Eliminación de CSS no utilizado

### Lighthouse Score Objetivo
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

## 🤝 Contribución

### Guías de Contribución
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- **TypeScript**: Tipado estricto obligatorio
- **ESLint**: Reglas de linting configuradas
- **Prettier**: Formateo automático de código
- **Husky**: Hooks de pre-commit

## 📄 Licencia

© 2024 Dr. Miguel Ojeda Rios. Todos los derechos reservados.

## 📞 Contacto

- **Desarrollador**: 4ailabs
- **Repositorio**: [sueroterapia-premiun](https://github.com/4ailabs/sueroterapia-premiun)
- **Deploy**: Vercel (configurado)

---

**Nota**: Esta aplicación está diseñada para uso médico profesional y debe ser utilizada por profesionales de la salud calificados.
