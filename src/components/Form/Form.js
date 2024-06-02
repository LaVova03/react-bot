import React, { useState } from 'react';
import './Form.css';

const Form = (props) => {

    const [data, setData] = useState({
        county: '',
        srteet: '',
        subject: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
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
                value={data.county || ''}
                onChange={(e) => handleChange(e.target.value)}
            />
            <input
                type='text'
                name='srteet'
                placeholder='Улица'
                className='input'
                value={data.srteet || ''}
                onChange={(e) => handleChange(e.target.value)}
            />
            <select
                className='select'
                name='subject'
                value={data.subject}
                onChange={(e) => handleChange(e.target.value)}
            >
                <option value={'physical'}>Физ.лицо</option>
                <option value={'legal'}>Юр.лицо</option>
            </select>
        </div>
    );
}

export default Form;