import React from 'react';
import Button from '../Button/Button';
import './Header.css';
import { useTelegramHook } from '../../hooks/useTelegramHook';

const Header = () => {
    const { user, onClose } = useTelegramHook();

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>{user?.username}</span>
        </div>
    );
}

export default Header;
