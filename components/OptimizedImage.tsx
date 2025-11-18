import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    placeholder?: string;
    onLoad?: () => void;
    onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    placeholder,
    onLoad,
    onError
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(loading === 'eager');
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (loading === 'eager') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [loading]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div 
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
            role="img"
            aria-label={alt}
        >
            {/* Placeholder mientras carga */}
            {!isLoaded && !hasError && (
                <div 
                    className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
                    aria-hidden="true"
                >
                    {placeholder && (
                        <span className="text-gray-400 text-sm">{placeholder}</span>
                    )}
                </div>
            )}

            {/* Imagen optimizada */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`
                        transition-opacity duration-300
                        ${isLoaded ? 'opacity-100' : 'opacity-0'}
                        ${hasError ? 'hidden' : ''}
                        w-full h-full object-cover
                    `}
                    decoding="async"
                />
            )}

            {/* Estado de error */}
            {hasError && (
                <div 
                    className="absolute inset-0 bg-gray-100 flex items-center justify-center"
                    role="alert"
                    aria-label={`Error al cargar imagen: ${alt}`}
                >
                    <span className="text-gray-400 text-sm">Imagen no disponible</span>
                </div>
            )}
        </div>
    );
};

export default OptimizedImage;

