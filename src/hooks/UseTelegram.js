import { useState, useEffect } from 'react';

const UseTelegram = (props) => {

    const [tg, setTg] = useState(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            setTg(window.Telegram.WebApp);
        }
    }, []);

    const onClose = () => {
        if (tg) {
            tg.close();
        }
    };

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    };
    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user
    };
}

export default UseTelegram;