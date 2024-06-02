import React, { useEffect, useState } from 'react';
import './Form.css';
import { useTelegramHook } from '../../hooks/useTelegramHook';

const Form = (props) => {
    const { tg } = useTelegramHook();

    const [data, setData] = useState({
        country: '',
        street: '',
        subject: '',
    });

    useEffect(() => {
        if (tg && tg.MainButton) {
            tg.MainButton.setParams({
                text: 'Отправить данные',
            });
        }
    }, [tg]);

    useEffect(() => {
        if (tg && tg.MainButton) {
            if (!data.country || !data.street) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
            }
        }
    }, [data, tg]);

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
                value={data.country || ''}
                onChange={handleChange}
            />
            <input
                type='text'
                name='street'
                placeholder='Улица'
                className='input'
                value={data.street || ''}
                onChange={handleChange}
            />
            <select
                className='select'
                name='subject'
                value={data.subject}
                onChange={handleChange}
            >
                <option value='physical'>Физ.лицо</option>
                <option value='legal'>Юр.лицо</option>
            </select>
        </div>
    );
};

export default Form;
