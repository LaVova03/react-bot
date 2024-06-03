import './ProductItem.css';
import React, { useEffect, useState } from 'react';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import Button from '../Button/Button';

const ProductItem = ({ product, className, onAdd }) => {

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

    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div
            className={`product ${className}`}
            style={{
                backgroundColor: buttonTextColor,
                border: `1px solid ${buttonColor}`,
            }}>
            <div
                className='img'
                style={{
                    backgroundColor: buttonColor,
                }} />
            <div className='title'>{product.title}</div>
            <div className='description'>{product.description}</div>
            <div className='price'>
                <span>Стоимость:<b>{product.price}</b></span>
            </div>
            <Button className='add-btn' onClick={onAddHandler}>Добавить в корзину</Button>
        </div>
    );
}

export default ProductItem;
