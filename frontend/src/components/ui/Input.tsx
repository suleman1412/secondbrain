import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, value, ...props }) => {
    return (
        <input
            className='bg-secondary-2 placeholder-border text-white text-[0.8rem] lg:text-[1rem] h-[2.5rem] px-3'
            placeholder={placeholder}
            value={value || ''}
            {...props}
        />
    );
}

export default Input;