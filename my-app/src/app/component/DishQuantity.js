import { memo } from 'react';
import { useApp } from '../../../context/AppContext';

const DishQuantity = ({ dish }) => {
    const { increaseQuantity, decreaseQuantity } = useApp();

    return (
        <div className="flex items-center">
            <button onClick={() => decreaseQuantity(dish.id)} className="px-2">-</button>
            <span className="mx-2">{dish.quantity}</span>
            <button onClick={() => increaseQuantity(dish.id)} className="px-2">+</button>
        </div>
    );
};

export default memo(DishQuantity);