import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegramHook } from '../../hooks/useTelegramHook';
import Socks from '../../assets/socks.png';
import Jacket from '../../assets/jacket.png';
import Jeans from '../../assets/jeans.png';
import Pants from '../../assets/pants.png';
import Snikers from '../../assets/snikers.png';
import Tshirt from '../../assets/t-shirt.png';

const ProductList = () => {
    const { tg, queryId } = useTelegramHook();

    const [addedItems, setAddedItems] = useState([]);

    const getTotalPrice = (items) => {
        return items.reduce((acc, item) => acc + parseInt(item.price), 0);
    };

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        };
        fetch('http://localhost:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert('Data sent successfully');
                } else {
                    alert('Failed to send data');
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    }, [addedItems, queryId]);

    useEffect(() => {
        if (tg && tg.WebApp) {
            tg.WebApp.onEvent('mainButtonClicked', onSendData);
            return () => {
                tg.WebApp.offEvent('mainButtonClicked', onSendData);
            };
        }
    }, [tg, onSendData]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }
        setAddedItems(newItems);

        if (tg && tg.MainButton) {
            if (newItems.length === 0) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
                tg.MainButton.setParams({
                    text: `Купить ${getTotalPrice(newItems)}`
                });
            }
        }
    };

    const products = [
        { id: '1', title: 'Джинсы', price: '5000', description: 'Синего цвета', img: Jeans },
        { id: '2', title: 'Куртка', price: '4000', description: 'Красного цвета', img: Jacket },
        { id: '3', title: 'Футболка', price: '3000', description: 'Желтого цвета', img: Tshirt },
        { id: '4', title: 'Носки', price: '2000', description: 'Зеленого цвета', img: Socks },
        { id: '5', title: 'Кроссовки', price: '1000', description: 'Красного цвета', img: Snikers },
        { id: '6', title: 'Брюки', price: '500', description: 'Черного цвета', img: Pants },
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
};

export default ProductList;
