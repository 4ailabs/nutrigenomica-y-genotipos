import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
    return (
        <nav 
            className={`flex items-center space-x-2 text-sm ${className}`}
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isFirst = index === 0;
                    
                    return (
                        <li 
                            key={index}
                            className="flex items-center"
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            {!isFirst && (
                                <ChevronRight 
                                    className="w-4 h-4 text-gray-400 mx-2" 
                                    aria-hidden="true"
                                />
                            )}
                            
                            {isLast ? (
                                <span 
                                    className="text-gray-900 font-medium"
                                    itemProp="name"
                                    aria-current="page"
                                >
                                    {isFirst && <Home className="w-4 h-4 inline-block mr-1" />}
                                    {item.label}
                                </span>
                            ) : (
                                <a
                                    href={item.href || '#'}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                    }}
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center"
                                    itemProp="item"
                                    aria-label={`Ir a ${item.label}`}
                                >
                                    {isFirst && <Home className="w-4 h-4 inline-block mr-1" />}
                                    <span itemProp="name">{item.label}</span>
                                </a>
                            )}
                            <meta itemProp="position" content={String(index + 1)} />
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;

