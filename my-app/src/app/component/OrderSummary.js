import { memo, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';

const OrderSummary = () => {
    const { order, categories } = useApp();

    const calculateTotal = useMemo(() => {
        return order.reduce((total, dish) => total + dish.reviewCount * dish.quantity, 0);
    }, [order]);

    const calculateCategoryTotal = useMemo(() => {
        return categories.map(category => {
            const categoryTotal = order
                .filter(dish => dish.tags.includes(category))
                .reduce((total, dish) => total + dish.reviewCount * dish.quantity, 0);
            return { name: category, total: categoryTotal };
        }).filter(category => category.total > 0);
    }, [order, categories]);

    return (
        <div className='bg-gray-50 p-8'>
            <h2 className="text-2xl text-center"><strong>Order Summary</strong></h2>
            <ul className="mt-4">
                {calculateCategoryTotal.map(category => (
                    <li key={category.name} className="text-lg">
                        <strong>{category.name}:</strong> ${category.total.toFixed(2)}
                    </li>
                ))}
            </ul>
            <div className="mt-4 text-xl text-center">
                <strong>Total Order: ${calculateTotal.toFixed(2)}</strong>
            </div>
        </div>
    );
} 

export default memo(OrderSummary);