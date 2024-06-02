import React from 'react';
import Button from '../components/Button/Button';
import { UseTelegram } from '../hooks/usetelegram';

const Header = () => {

    const { user, onClose } = UseTelegram;

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>{user?.username}</span>
        </div>
    );
}

export default Header;