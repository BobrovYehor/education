const OrderLine = ({ dish, increaseQuantity, decreaseQuantity, removeDish, index }) => {
    const backgroundColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-100';
    
    return (
        <div className={`flex items-center justify-between p-4 ${backgroundColor}`}>
            <div className="flex-1 text-left">{dish.title}</div>
            <div className="flex items-center">
                <button onClick={() => decreaseQuantity(dish.id)} className="px-2">-</button>
                <span className="mx-2">{dish.quantity}</span>
                <button onClick={() => increaseQuantity(dish.id)} className="px-2">+</button>
            </div>
            <div className="flex-1 text-center">${dish.price}</div>
            <div className="flex-1 text-center">${(dish.price * dish.quantity).toFixed(2)}</div>
            <button onClick={() => removeDish(dish.id)} className="px-2 bg-red-500 text-white rounded">x</button>
        </div> 
    )
}

export default OrderLine;