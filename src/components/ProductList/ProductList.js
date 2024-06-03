import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegramHook } from '../../hooks/useTelegramHook';

const ProductList = (props) => {
    const { tg, queryId } = useTelegramHook();

    const [addedItems, setAddedItems] = useState([]);

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://telegram-react-node-js.vercel.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId]);

    useEffect(() => {
        if (tg && tg.WebApp) {
            tg.WebApp.onEvent('mainButtonClicked', onSendData);
            return () => {
                tg.WebApp.offEvent('mainButtonClicked', onSendData);
            };
        }
    }, [tg, onSendData]);

    const getTotalPrice = (items) => {
        return items.reduce((acc, item) => {
            return acc + parseInt(item.price);
        }, 0);
    }

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItem = [];

        if (alreadyAdded) {
            newItem = addedItems.filter(item => item.id !== product.id);
        } else {
            newItem = [...addedItems, product];
        }
        setAddedItems(newItem);

        if (newItem.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItem)}`
            });
        }
    }

    const products = [
        { id: '1', title: 'Джинсы', price: '5000', description: 'Синего цвета' },
        { id: '2', title: 'Куртка', price: '4000', description: 'Красного цвета' },
        { id: '3', title: 'Футболка', price: '3000', description: 'Зеленого цвета' },
        { id: '4', title: 'Носки', price: '2000', description: 'Желтого цвета' },
        { id: '5', title: 'Кроссовки', price: '1000', description: 'Черного цвета' },
        { id: '6', title: 'Брюки', price: '500', description: 'Белого цвета' },
    ];

    return (
        <div className='product_list'>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={() => onAdd(item)}
                    className={'item'}
                />
            ))}
        </div>
    );
}

export default ProductList;
