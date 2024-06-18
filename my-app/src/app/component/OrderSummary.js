import { memo, useMemo } from 'react';

const OrderSummary = ({ order, categories }) => {
    const calculateTotal = useMemo(() => {
        return order.reduce((total, dish) => total + dish.price * dish.quantity, 0);
    }, [order]);

    const calculateCategoryTotal = () => {
        return categories.map(category => {
            const categoryTotal = order
                .filter(dish => dish.category_id === category.id)
                .reduce((total, dish) => total + dish.price * dish.quantity, 0);
            return { ...category, total: categoryTotal };
        }).filter(category => category.total > 0);
    }

    return (
        <div className='bg-gray-50 p-8'>
            <h2 className="text-2xl text-center"><strong>Order Summary</strong></h2>
            <ul className="mt-4">
                {calculateCategoryTotal().map(category => (
                    <li key={category.id} className="text-lg">
                        <strong>{category.title}:</strong> ${category.total.toFixed(2)}
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