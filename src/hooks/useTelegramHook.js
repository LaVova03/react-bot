import { useEffect, useState } from 'react';

export const useTelegramHook = () => {
    const [tg, setTg] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tgInstance = window.Telegram.WebApp;
            setTg(tgInstance);
            setUser(tgInstance.initDataUnsafe?.user);

            // Устанавливаем CSS-переменные темы
            document.documentElement.style.setProperty('--tg-theme-button-color', tgInstance.themeParams.button_color || '#0088cc');
            document.documentElement.style.setProperty('--tg-theme-button-text-color', tgInstance.themeParams.button_text_color || '#ffffff');
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
        user,
        queryId: tg?.initDataUnsafe?.query_id,
    };
}
