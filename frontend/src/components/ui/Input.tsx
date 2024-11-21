import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
    return (
        <input
            className='bg-secondary-2 placeholder-text text-white text-[0.8rem] lg:text-[1rem] h-[2.5rem] px-3'
            placeholder={placeholder}
            {...props}
        />
    );
}

export default Input;