import React from 'react';

interface ButtonProps {
    variant: "primary" | "secondary"; 
    children: React.ReactNode;
    font?: "manrope" | "quintessential"; 
    overrideClassName?: string; 
}

const variantStyles = {
    "primary" : "bg-primary-1 text-black hover:bg-primary-2", //white bg
    "secondary" : "bg-secondary-1 border-2 border-white hover:bg-secondary-2" //white border
}

const fontStyles = {
    "manrope": "text-font1", 
    "quintessential": "text-font2" 
}

export const Button: React.FC<ButtonProps> = ({ 
    variant, 
    children,
    font = "manrope",
    overrideClassName = ''
}) => {
    const baseStyle = 'px-3 py-1 md:px-5 md:py-2 rounded antialiased'; 
    return (
        <button className={`${baseStyle} ${fontStyles[font]} ${overrideClassName} ${variantStyles[variant]}`}>
            {children}
        </button>
    );
};