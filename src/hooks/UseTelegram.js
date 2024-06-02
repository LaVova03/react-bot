import { useEffect, useState } from 'react';

const useTelegram = () => {
    const [tg, setTg] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tgInstance = window.Telegram.WebApp;
            setTg(tgInstance);
            setUser(tgInstance.initDataUnsafe?.user);
        }
    }, []);

    const onClose = () => {
        tg?.close();
    };

    const onToggleButton = () => {
        if (tg?.MainButton?.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    };

    return {
        onClose,
        onToggleButton,
        tg,
        user
    };
}

export default useTelegram;
