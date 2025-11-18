# 🎨 Guía del Sistema de Diseño Profesional

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Colores](#colores)
3. [Tipografía](#tipografía)
4. [Componentes](#componentes)
5. [Espaciado](#espaciado)
6. [Animaciones](#animaciones)
7. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Introducción

Este sistema de diseño profesional está optimizado para aplicaciones médicas y de salud, con énfasis en:
- ✅ **Accesibilidad** (WCAG 2.1 Level AA)
- ✅ **Responsividad** (Mobile-first design)
- ✅ **Performance** (Optimizado para Vercel)
- ✅ **Modernidad** (Glassmorphism, gradientes, animaciones suaves)

---

## Colores

### Paleta Principal

#### Primario (Azul Médico)
```css
--primary-50: #eff6ff;   /* Backgrounds muy claros */
--primary-100: #dbeafe;  /* Backgrounds claros */
--primary-500: #3b82f6;  /* Color principal */
--primary-700: #1d4ed8;  /* Hover states */
--primary-900: #1e3a8a;  /* Text oscuro */
```

**Uso:**
```jsx
// Botón primario
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Acción Principal
</button>

// Badge
<span className="bg-primary-100 text-primary-700">Nuevo</span>
```

#### Secundario (Gris Profesional)
```css
--secondary-100: #f1f5f9;  /* Backgrounds */
--secondary-500: #64748b;  /* Text secundario */
--secondary-900: #0f172a;  /* Text principal */
```

#### Estados

```css
--success-500: #22c55e;  /* ✓ Éxito */
--warning-500: #f59e0b;  /* ⚠ Advertencia */
--error-500: #ef4444;    /* ✗ Error */
--info-500: #6366f1;     /* ℹ Información */
```

**Uso:**
```jsx
// Mensaje de éxito
<div className="bg-success-100 border-success-500 text-success-700">
  Operación exitosa
</div>
```

---

## Tipografía

### Familias de Fuentes

```css
/* Sans-serif profesional */
font-family: 'Inter', system-ui, sans-serif;

/* Display/Headings modernos */
font-family: 'Space Grotesk', 'Inter', sans-serif;

/* Code monospace */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Tamaños Responsivos

Los headings usan `clamp()` para escalado fluido:

```css
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
```

### Pesos de Fuente

```css
300 - Light    /* Textos sutiles */
400 - Normal   /* Texto de cuerpo */
500 - Medium   /* Énfasis leve */
600 - Semibold /* Subtítulos */
700 - Bold     /* Headings */
800 - Extrabold /* Títulos principales */
```

---

## Componentes

### Botones Profesionales

#### Botón Primario con Gradiente
```jsx
<button className="btn-primary-pro">
  Acción Principal
</button>
```

Características:
- ✨ Gradiente de fondo
- 🌟 Efecto hover con elevación
- 💫 Animación suave al hacer clic

#### Botón Secundario
```jsx
<button className="btn-secondary-pro">
  Acción Secundaria
</button>
```

#### Botón Ghost
```jsx
<button className="btn-ghost-pro">
  Acción Terciaria
</button>
```

### Cards Modernos

#### Card Estándar
```jsx
<div className="card-pro p-6">
  <h3 className="text-2xl font-bold mb-4">Título</h3>
  <p className="text-secondary-600">Contenido del card</p>
</div>
```

#### Card con Glassmorphism
```jsx
<div className="glass-card p-6">
  <h3 className="text-2xl font-bold mb-4">Título</h3>
  <p>Contenido con efecto glass</p>
</div>
```

#### Card con Gradiente de Borde
```jsx
<div className="card-pro-gradient">
  <div className="card-pro-gradient-content">
    <h3>Título</h3>
    <p>Contenido</p>
  </div>
</div>
```

### Badges Modernos

```jsx
{/* Primary */}
<span className="badge-pro badge-primary">
  Nuevo
</span>

{/* Success */}
<span className="badge-pro badge-success">
  Activo
</span>

{/* Warning */}
<span className="badge-pro badge-warning">
  Pendiente
</span>

{/* Error */}
<span className="badge-pro badge-error">
  Error
</span>
```

### Inputs Profesionales

```jsx
{/* Input normal */}
<input
  type="text"
  className="input-pro"
  placeholder="Nombre"
/>

{/* Input con error */}
<input
  type="email"
  className="input-pro input-pro-error"
  placeholder="Email"
/>

{/* Input con éxito */}
<input
  type="text"
  className="input-pro input-pro-success"
  placeholder="Teléfono"
/>
```

---

## Espaciado

### Variables de Espaciado

```css
--spacing-xs: 0.25rem;   /* 4px  - Spacing muy pequeño */
--spacing-sm: 0.5rem;    /* 8px  - Spacing pequeño */
--spacing-md: 1rem;      /* 16px - Spacing medio */
--spacing-lg: 1.5rem;    /* 24px - Spacing grande */
--spacing-xl: 2rem;      /* 32px - Spacing extra grande */
--spacing-2xl: 3rem;     /* 48px - Spacing muy grande */
--spacing-3xl: 4rem;     /* 64px - Spacing masivo */
```

### Uso con Tailwind

```jsx
<div className="p-6">       {/* Padding: 24px */}
<div className="mb-4">      {/* Margin bottom: 16px */}
<div className="space-y-8"> {/* Gap vertical: 32px */}
```

---

## Animaciones

### Animaciones de Entrada

```jsx
{/* Fade In */}
<div className="animate-fadeIn">
  Contenido con fade in
</div>

{/* Slide Up */}
<div className="animate-slideUp">
  Contenido con slide up
</div>

{/* Scale In */}
<div className="animate-scaleIn">
  Contenido con scale in
</div>

{/* Bounce In */}
<div className="animate-bounceIn">
  Contenido con bounce
</div>
```

### Con Delays

```jsx
<div className="animate-slideUp animate-delay-100">Item 1</div>
<div className="animate-slideUp animate-delay-200">Item 2</div>
<div className="animate-slideUp animate-delay-300">Item 3</div>
```

### Animaciones Continuas

```jsx
{/* Pulse */}
<div className="animate-pulse">
  Contenido pulsante
</div>

{/* Float */}
<div className="animate-float">
  Contenido flotante
</div>

{/* Rotate */}
<div className="animate-rotate">
  Contenido rotando
</div>
```

### Efectos Hover

```jsx
{/* Lift Effect */}
<div className="hover-lift">
  Card que se eleva al hover
</div>

{/* Scale Effect */}
<button className="hover-scale">
  Botón que escala al hover
</button>

{/* Glow Effect */}
<div className="hover-glow">
  Elemento con glow al hover
</div>
```

---

## Efectos Especiales

### Glassmorphism

```jsx
<div className="glass-card p-8">
  <h2 className="text-3xl font-bold mb-4">Título</h2>
  <p>Contenido con efecto glass/frosted</p>
</div>
```

### Gradientes de Fondo

```jsx
{/* Gradiente Primario */}
<div className="bg-gradient-primary">
  Fondo con gradiente azul
</div>

{/* Gradiente Ocean */}
<div className="bg-gradient-ocean">
  Fondo con gradiente océano
</div>

{/* Gradiente Warm */}
<div className="bg-gradient-warm">
  Fondo con gradiente cálido
</div>

{/* Mesh Gradient Animado */}
<div className="bg-mesh">
  Fondo con gradiente mesh animado
</div>
```

### Texto con Gradiente

```jsx
<h1 className="text-gradient">
  Título con gradiente de texto
</h1>
```

### Elevación (Sombras)

```jsx
<div className="elevation-1">Sombra nivel 1</div>
<div className="elevation-2">Sombra nivel 2</div>
<div className="elevation-3">Sombra nivel 3</div>
<div className="elevation-4">Sombra nivel 4</div>
<div className="elevation-5">Sombra nivel 5</div>
```

### Tooltips

```jsx
<button
  className="tooltip-pro"
  data-tooltip="Información adicional"
>
  Hover para ver tooltip
</button>
```

---

## Ejemplos de Uso Completos

### Card de Herramienta Médica

```jsx
<div className="card-pro hover-lift p-6">
  <div className="flex items-start gap-4 mb-4">
    <div className="bg-primary-100 text-primary-600 p-3 rounded-xl">
      <Calculator className="w-6 h-6" />
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold text-secondary-900 mb-2">
        Calculadora Avanzada
      </h3>
      <span className="badge-pro badge-primary">
        Profesional
      </span>
    </div>
  </div>

  <p className="text-secondary-600 mb-4 leading-relaxed">
    Determina el genotipo nutricional basado en mediciones biométricas precisas
  </p>

  <ul className="space-y-2 mb-6">
    <li className="flex items-center gap-2 text-sm text-secondary-600">
      <CheckCircle className="w-4 h-4 text-success-500" />
      Algoritmos validados científicamente
    </li>
    <li className="flex items-center gap-2 text-sm text-secondary-600">
      <CheckCircle className="w-4 h-4 text-success-500" />
      Resultados instantáneos
    </li>
  </ul>

  <button className="btn-primary-pro w-full">
    Comenzar Evaluación
  </button>
</div>
```

### Formulario de Entrada Profesional

```jsx
<div className="card-pro p-8">
  <h2 className="text-2xl font-bold mb-6">Datos del Paciente</h2>

  <form className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-secondary-700 mb-2">
        Nombre Completo
      </label>
      <input
        type="text"
        className="input-pro"
        placeholder="Juan Pérez"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-secondary-700 mb-2">
        Email
      </label>
      <input
        type="email"
        className="input-pro"
        placeholder="juan@example.com"
      />
    </div>

    <div className="flex gap-3 mt-6">
      <button type="submit" className="btn-primary-pro flex-1">
        Guardar
      </button>
      <button type="button" className="btn-secondary-pro flex-1">
        Cancelar
      </button>
    </div>
  </form>
</div>
```

### Lista con Animación Escalonada

```jsx
<div className="stagger-children">
  <div className="card-pro p-4 mb-3">Item 1</div>
  <div className="card-pro p-4 mb-3">Item 2</div>
  <div className="card-pro p-4 mb-3">Item 3</div>
  <div className="card-pro p-4 mb-3">Item 4</div>
</div>
```

---

## Accesibilidad

### Focus States

Todos los elementos interactivos tienen estados de focus visibles:

```jsx
<button className="btn-primary-pro">
  {/* Automáticamente tiene outline al hacer focus con teclado */}
  Botón Accesible
</button>
```

### Reducción de Movimiento

El sistema respeta las preferencias de `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* Todas las animaciones se reducen automáticamente */
}
```

### Skip Links

```jsx
<a href="#main-content" className="skip-to-main">
  Saltar al contenido principal
</a>
```

---

## Best Practices

### ✅ Hacer

- Usar las clases predefinidas del sistema
- Mantener consistencia en espaciado
- Usar animaciones sutiles
- Respetar la jerarquía de colores
- Probar en diferentes dispositivos

### ❌ Evitar

- Crear estilos inline personalizados
- Mezclar diferentes sistemas de espaciado
- Animaciones excesivas o distractoras
- Colores fuera de la paleta
- Ignorar los estados de accesibilidad

---

## Responsive Design

El sistema es mobile-first por defecto:

```jsx
{/* Stacks en móvil, grid en desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card-pro">Card 1</div>
  <div className="card-pro">Card 2</div>
  <div className="card-pro">Card 3</div>
</div>
```

---

## Changelog

### v1.0.0 (2025-01-18)
- ✨ Sistema de diseño profesional inicial
- 🎨 Paleta de colores médica
- 🧩 Componentes base
- ✨ Efectos glassmorphism
- 🎭 Animaciones modernas
- ♿ Mejoras de accesibilidad

---

## Soporte

Para preguntas o sugerencias sobre el sistema de diseño:
- 📧 Email: contacto@tuapp.com
- 📚 Documentación: [Ver documentación completa]
- 🐛 Issues: [GitHub Issues]

---

**Desarrollado con ❤️ para aplicaciones médicas profesionales**
