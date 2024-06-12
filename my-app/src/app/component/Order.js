import { useState, useEffect } from "react";
import OrderLine from "./OrderLine";

const Order = ({ order, setOrder }) => {
    const [orderNumber, setOrderNumber] = useState(1);
    const [orderDate, setOrderDate] = useState('');

    useEffect(() => {
        setOrderDate(new Date().toLocaleString());
    }, []);

    const handleOrderSubmit = () => {
        setOrderNumber(orderNumber + 1);
        setOrderDate(new Date().toLocaleString());
        setOrder([]);
        alert(`Order ${orderNumber} has been submitted!`);
    };

    const calculateTotal = () => {
        return order.reduce((total, dish) => total + dish.price * dish.quantity, 0);
    };

    const increaseQuantity = (dishId) => {
        setOrder(prevOrder => 
            prevOrder.map(dish => 
                dish.id === dishId ? { ...dish, quantity: dish.quantity + 1 } : dish
            )
        );
    };

    const decreaseQuantity = (dishId) => {
        setOrder(prevOrder => 
            prevOrder.map(dish => 
                dish.id === dishId && dish.quantity > 1 ? { ...dish, quantity: dish.quantity - 1 } : dish
            )
        );
    };

    const removeDish = (dishId) => {
        setOrder(prevOrder => prevOrder.filter(dish => dish.id !== dishId));
    };

    return (
        <section className='h-full min-w-96 bg-pink-50 p-8'>
            <h1 className="text-2xl text-center"><strong>Order</strong></h1>
            {order.length > 0 ? (
                <div>
                    <div className="mb-4 text-lg text-right">
                        <div><strong>Order Number:</strong> {orderNumber}</div>
                        {orderDate && <div><strong>Order Date:</strong> {orderDate}</div>}
                    </div>
                    {order.map((dish, index) => (
                        <OrderLine 
                            key={dish.id} 
                            dish={dish} 
                            increaseQuantity={increaseQuantity} 
                            decreaseQuantity={decreaseQuantity}
                            removeDish={removeDish}
                            index={index}
                        />
                    ))}
                    <div className="mt-4 text-xl text-right">
                        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                    </div>
                    <div className="mt-4 text-right">
                        <button 
                            onClick={handleOrderSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit Order
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl">No items in the order.</p>
            )}
        </section>
    )
}

export default Order;