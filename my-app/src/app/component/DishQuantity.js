import { memo } from 'react';

const DishQuantity = ({ dish, increaseQuantity, decreaseQuantity }) => {
    return (
        <div className="flex items-center">
            <button onClick={decreaseQuantity} className="px-2">-</button>
            <span className="mx-2">{dish.quantity}</span>
            <button onClick={increaseQuantity} className="px-2">+</button>
        </div>
    );
};

export default memo(DishQuantity);