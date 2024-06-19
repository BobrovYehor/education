import { memo } from "react";
import { useApp } from "../../../context/AppContext";
import OrderLine from "./OrderLine";
import OrderSummary from "./OrderSummary";

const Order = () => {
    const { order, orderNumber, orderDate, handleOrderSubmit, categories } = useApp();

    return (
        <section className='md:h-full flex-1 min-w-80 sm:min-w-96 bg-pink-50 p-4 md:p-8 flex flex-col '>
            <h1 className="text-2xl text-center"><strong>Order</strong></h1>
            {order.length > 0 ? (
                <div className="flex flex-col overflow-hidden">
                    <div className="mb-4 text-lg text-right">
                        <div><strong>Order Number:</strong> {orderNumber}</div>
                        {orderDate && <div><strong>Order Date:</strong> {orderDate}</div>}
                    </div>
                    <div className="overflow-y-auto">
                        {order.map((dish, index) => (
                            <OrderLine 
                                key={dish.id} 
                                dish={dish} 
                                index={index}
                            />
                        ))}
                    </div>
                    <OrderSummary />
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

export default memo(Order);