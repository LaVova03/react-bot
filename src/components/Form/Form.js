import React, { useEffect, useState } from 'react';
import './Form.css';
import { useTelegramHook } from '../../hooks/useTelegramHook';

const Form = (props) => {
    const { tg } = useTelegramHook();

    const [dataBase, setData] = useState({
        country: '',
        street: '',
        subject: 'physical',
    });

    useEffect(() => {
        const onSendData = () => {
            const data = {
                country: dataBase.country,
                street: dataBase.street,
                subject: dataBase.subject,
                chatId: tg.initDataUnsafe.user.id,
            };
            fetch('https://telegram-react-node-js.vercel.app/webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch(error => {
                alert('Error: ' + error.message);
            });
        };

        if (tg && tg.onEvent) {
            tg.onEvent('mainButtonClicked', onSendData);
            return () => {
                tg.offEvent('mainButtonClicked', onSendData);
            };
        }
    }, [dataBase, tg]);

    useEffect(() => {
        if (tg && tg.MainButton) {
            tg.MainButton.setParams({
                text: 'Отправить данные',
            });
            if (!dataBase.country || !dataBase.street) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
            }
        }
    }, [dataBase, tg]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='form'>
            <h3>Заполните форму</h3>
            <input
                type='text'
                name='country'
                placeholder='Страна'
                className='input'
                value={dataBase.country}
                onChange={handleChange}
            />
            <input
                type='text'
                name='street'
                placeholder='Улица'
                className='input'
                value={dataBase.street}
                onChange={handleChange}
            />
            <select
                className='select'
                name='subject'
                value={dataBase.subject}
                onChange={handleChange}
            >
                <option value='physical'>Физ.лицо</option>
                <option value='legal'>Юр.лицо</option>
            </select>
        </div>
    );
};

export default Form;
