import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ 
    content, 
    position = 'top',
    className = '' 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const trigger = triggerRef.current.getBoundingClientRect();
            const tooltip = tooltipRef.current.getBoundingClientRect();
            
            let top = 0;
            let left = 0;

            switch (position) {
                case 'top':
                    top = -tooltip.height - 8;
                    left = (trigger.width - tooltip.width) / 2;
                    break;
                case 'bottom':
                    top = trigger.height + 8;
                    left = (trigger.width - tooltip.width) / 2;
                    break;
                case 'left':
                    top = (trigger.height - tooltip.height) / 2;
                    left = -tooltip.width - 8;
                    break;
                case 'right':
                    top = (trigger.height - tooltip.height) / 2;
                    left = trigger.width + 8;
                    break;
            }

            setTooltipStyle({ top, left });
        }
    }, [isVisible, position]);

    return (
        <div 
            ref={triggerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            
            {isVisible && (
                <div
                    ref={tooltipRef}
                    style={tooltipStyle}
                    className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs whitespace-normal"
                >
                    <div className="relative">
                        {content}
                        <div 
                            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                                position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
                                position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
                                position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
                                'left-[-4px] top-1/2 -translate-y-1/2'
                            }`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;

