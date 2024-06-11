import OrderLine from "./OrderLine";

const Order = ({ order, setOrder }) => {
    const calculateTotal = () => {
        return order.reduce((total, dish) => (total + dish.price * dish.quantity), 0);
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

    return (
        <section className='h-full min-w-96 bg-pink-50 p-8'>
            <h1 className="text-2xl text-center"><strong>Order</strong></h1>
            {order.length > 0 ? (
                <div>
                    {order.map((dish, index) => (
                        <OrderLine 
                            key={dish.id} 
                            dish={dish} 
                            increaseQuantity={increaseQuantity} 
                            decreaseQuantity={decreaseQuantity}
                            index={index}
                        />
                    ))}
                    <div className="mt-4 text-xl text-right">
                        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl">No items in the order.</p>
            )}
        </section>
    )
}

export default Order;