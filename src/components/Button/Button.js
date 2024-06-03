import React, { useEffect, useState } from 'react';
import './Button.css';
import { useTelegramHook } from '../../hooks/useTelegramHook';

const Button = ({ className, children, ...props }) => {
    const { tg } = useTelegramHook();
    const [buttonColor, setButtonColor] = useState('#000000');
    const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');

    useEffect(() => {
        if (tg) {
            const root = document.documentElement;
            const btnColor = getComputedStyle(root).getPropertyValue('--tg-theme-button-color').trim();
            const btnTextColor = getComputedStyle(root).getPropertyValue('--tg-theme-button-text-color').trim();

            setButtonColor(btnColor || '#000000');
            setButtonTextColor(btnTextColor || '#FFFFFF');
        }
    }, [tg]);

    return (
        <button
            {...props}
            className={`button ${className}`}
            style={{
                backgroundColor: buttonColor,
                color: buttonTextColor,
            }}
        >
            {children}
        </button>
    );
}

export default Button;
