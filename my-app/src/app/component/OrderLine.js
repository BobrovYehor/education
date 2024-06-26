import { memo } from 'react';
import { useApp } from '../../../context/AppContext';
import DishQuantity from './DishQuantity';
import prices from '../../../services/prices.json'

const OrderLine = ({ dish, index }) => {
    const { increaseQuantity, decreaseQuantity, removeDish } = useApp();
    const backgroundColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-100';

    return (
        <div className={`flex items-center justify-between p-4 ${backgroundColor}`}>
            <div className="flex-1 text-left">{dish.name}</div>
            <DishQuantity dish={dish} />
            <div className="flex-1 text-center">${prices[dish.id].toFixed(2)}</div>
            <div className="flex-1 text-center">${(prices[dish.id] * dish.quantity).toFixed(2)}</div>
            <button onClick={() => removeDish(dish.id)} className="px-2 bg-red-500 text-white rounded">x</button>
        </div>
    );
};

export default memo(OrderLine);