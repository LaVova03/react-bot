import React, { useEffect } from 'react';
import Button from '../Button/Button';
import './Header.css';
import { useTelegramHook } from '../../hooks/useTelegramHook';

const Header = () => {
    const { user, onClose, onToggleButton, tg } = useTelegramHook();

    useEffect(() => {
        if (tg) {
            tg.ready();
        }
    }, [tg]);

    return (
        <div className='header'>
            <Button onClick={onClose}>Закрыть</Button>
            <span className='username'>{user?.username}</span>
            <button onClick={onToggleButton}>Toggle</button>
        </div>
    );
}

export default Header;
