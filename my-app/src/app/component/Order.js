const Order = ({ order, setOrder }) => {
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

    return (
        <section className='h-full min-w-96 bg-pink-50 p-8'>
            <h1 className="text-2xl text-center"><strong>Order</strong></h1>
            {order.length > 0 ? (
                <div>
                    <table className="w-full text-center text-lg">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Dish</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Sum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map(dish => (
                                <tr key={dish.id}>
                                    <td className="border px-4 py-2 text-left">{dish.title}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button onClick={() => decreaseQuantity(dish.id)} className="px-2">-</button>
                                        <span className="mx-2">{dish.quantity}</span>
                                        <button onClick={() => increaseQuantity(dish.id)} className="px-2">+</button></td>
                                    <td className="border px-4 py-2">${dish.price}</td>
                                    <td className="border px-4 py-2">${(dish.price * dish.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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