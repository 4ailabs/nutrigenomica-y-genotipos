import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GenotypePDFData {
    id: number;
    name: string;
    title: string;
    tagline: string;
    essence: {
        quote: string;
        description: string;
    };
    characteristics1: {
        title: string;
        description: string;
    }[];
    characteristics2: {
        title: string;
        description: string;
    }[];
    physicalAndMetabolic: {
        title: string;
        points: string[];
    }[];
    foodPlan: {
        title: string;
        description: string;
        sections: {
            title: string;
            points: string[];
        }[];
    };
    foodsToAvoid: {
        title: string;
        description: string;
        sections: {
            title: string;
            points: string[];
        }[];
    };
}

export const generateGenotypePDF = async (data: GenotypePDFData): Promise<void> => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    let yPosition = margin;
    
    // Configurar fuentes
    pdf.setFont('helvetica');
    
    // Título principal
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80); // Azul oscuro
    const title = `Plan Nutricional - ${data.title}`;
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, yPosition);
    yPosition += 15;
    
    // Subtítulo
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(52, 73, 94); // Azul medio
    pdf.text(data.tagline, margin, yPosition);
    yPosition += 20;
    
    // Línea separadora
    pdf.setDrawColor(52, 73, 94);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 20;
    
    // Esencia del Genotipo
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Tu Esencia Genotípica', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(52, 73, 94);
    const quote = `"${data.essence.quote}"`;
    const quoteLines = pdf.splitTextToSize(quote, contentWidth);
    pdf.text(quoteLines, margin, yPosition);
    yPosition += (quoteLines.length * 7) + 5;
    
    pdf.setFont('helvetica', 'normal');
    const descriptionLines = pdf.splitTextToSize(data.essence.description, contentWidth);
    pdf.text(descriptionLines, margin, yPosition);
    yPosition += (descriptionLines.length * 7) + 15;
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
    }
    
    // Características Principales
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Tus Fortalezas Naturales', margin, yPosition);
    yPosition += 10;
    
    data.characteristics1.forEach((char, index) => {
        if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 73, 94);
        pdf.text(`${index + 1}. ${char.title}`, margin, yPosition);
        yPosition += 8;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(44, 62, 80);
        const descLines = pdf.splitTextToSize(char.description, contentWidth);
        pdf.text(descLines, margin + 5, yPosition);
        yPosition += (descLines.length * 6) + 8;
    });
    
    yPosition += 10;
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
    }
    
    // Perfil Personal
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Tu Perfil Personal', margin, yPosition);
    yPosition += 10;
    
    data.characteristics2.forEach((char, index) => {
        if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 73, 94);
        pdf.text(`${index + 1}. ${char.title}`, margin, yPosition);
        yPosition += 8;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(44, 62, 80);
        const descLines = pdf.splitTextToSize(char.description, contentWidth);
        pdf.text(descLines, margin + 5, yPosition);
        yPosition += (descLines.length * 6) + 8;
    });
    
    yPosition += 10;
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
    }
    
    // Perfil Físico y Metabólico
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Tu Perfil Físico y Metabólico', margin, yPosition);
    yPosition += 10;
    
    data.physicalAndMetabolic.forEach((item, index) => {
        if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 73, 94);
        pdf.text(`${String(index + 1).padStart(2, '0')}. ${item.title}`, margin, yPosition);
        yPosition += 8;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(44, 62, 80);
        item.points.forEach((point, pIndex) => {
            const pointLines = pdf.splitTextToSize(`• ${point}`, contentWidth - 5);
            pdf.text(pointLines, margin + 5, yPosition);
            yPosition += (pointLines.length * 6) + 3;
        });
        yPosition += 5;
    });
    
    yPosition += 10;
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
    }
    
    // Plan Alimentario
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Plan Alimentario Recomendado', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(44, 62, 80);
    const planDescLines = pdf.splitTextToSize(data.foodPlan.description, contentWidth);
    pdf.text(planDescLines, margin, yPosition);
    yPosition += (planDescLines.length * 6) + 10;
    
    data.foodPlan.sections.forEach((section, index) => {
        if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 73, 94);
        pdf.text(`${index + 1}. ${section.title}`, margin, yPosition);
        yPosition += 8;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(44, 62, 80);
        section.points.forEach((point, pIndex) => {
            const pointLines = pdf.splitTextToSize(`• ${point}`, contentWidth - 5);
            pdf.text(pointLines, margin + 5, yPosition);
            yPosition += (pointLines.length * 6) + 3;
        });
        yPosition += 5;
    });
    
    yPosition += 10;
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
    }
    
    // Alimentos a Evitar
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(192, 57, 43); // Rojo para alimentos a evitar
    pdf.text('Alimentos a Evitar', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(44, 62, 80);
    const avoidDescLines = pdf.splitTextToSize(data.foodsToAvoid.description, contentWidth);
    pdf.text(avoidDescLines, margin, yPosition);
    yPosition += (avoidDescLines.length * 6) + 10;
    
    data.foodsToAvoid.sections.forEach((section, index) => {
        if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
        }
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(192, 57, 43);
        pdf.text(`${index + 1}. ${section.title}`, margin, yPosition);
        yPosition += 8;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(44, 62, 80);
        section.points.forEach((point, pIndex) => {
            const pointLines = pdf.splitTextToSize(`• ${point}`, contentWidth - 5);
            pdf.text(pointLines, margin + 5, yPosition);
            yPosition += (pointLines.length * 6) + 3;
        });
        yPosition += 5;
    });
    
    // Página final con información médica
    pdf.addPage();
    yPosition = margin;
    
    // Footer con información médica
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(44, 62, 80);
    pdf.text('Información Médica Importante', margin, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(44, 62, 80);
    
    const medicalInfo = [
        'Este plan nutricional está basado en tu perfil genotípico específico y debe ser utilizado como guía general.',
        'Consulta siempre con tu médico o nutricionista antes de realizar cambios significativos en tu dieta.',
        'Los alimentos recomendados son sugerencias basadas en evidencia nutrigenómica.',
        'Este documento no reemplaza la consulta médica profesional.',
        'Fecha de generación: ' + new Date().toLocaleDateString('es-ES')
    ];
    
    medicalInfo.forEach((info, index) => {
        const infoLines = pdf.splitTextToSize(`${index + 1}. ${info}`, contentWidth);
        pdf.text(infoLines, margin, yPosition);
        yPosition += (infoLines.length * 6) + 5;
    });
    
    // Guardar el PDF
    const fileName = `Plan_Nutricional_${data.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
};

// Función para generar PDF desde HTML (alternativa)
export const generatePDFFromHTML = async (elementId: string, fileName: string): Promise<void> => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Elemento no encontrado');
        return;
    }
    
    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save(fileName);
    } catch (error) {
        console.error('Error generando PDF:', error);
        throw error;
    }
};
