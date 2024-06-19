'use client';
import { createContext, useContext, useState, useEffect } from "react";
import dishes from "../services/dishes";
import categories from "../services/categories";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [order, setOrder] = useState([]);  
    const [orderNumber, setOrderNumber] = useState(1);
    const [orderDate, setOrderDate] = useState('');

    useEffect(() => {
        if(activeCategory) {
          const filtered = dishes.filter(dish => dish.category_id === activeCategory.id);
          setFilteredDishes(filtered);  
        } else {
            setFilteredDishes([]);
        }
    }, [activeCategory]);

    useEffect(() => {
        setOrderDate(new Date().toLocaleString());
    }, []);

    const addDishToOrder = (dish) => {
        setOrder(prevOrder => {
            const existingDish = prevOrder.find(item => item.id === dish.id);
            if (existingDish) {
                return prevOrder.map(item => 
                    item.id === dish.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            } else {
                return [...prevOrder, { ...dish, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (dishId) => {
        setOrder(prevOrder => 
            prevOrder.map(dish => 
                dish.id === dishId ? { ...dish, quantity: dish.quantity + 1 } : dish
            )
        );
    };

    const decreaseQuantity = (dishId) => {
        setOrder(prevOrder => {
            const updatedOrder = prevOrder.map(dish => 
                dish.id === dishId && dish.quantity > 1 
                    ? { ...dish, quantity: dish.quantity - 1 } 
                    : dish
            );
            const isOrderChanged = prevOrder.some((dish, index) => dish !== updatedOrder[index]);
            return isOrderChanged ? updatedOrder : prevOrder;
        });
    };

    const removeDish = (dishId) => {
        setOrder(prevOrder => prevOrder.filter(dish => dish.id !== dishId));
    };

    const handleOrderSubmit = () => {
        setOrderNumber(orderNumber + 1);
        setOrderDate(new Date().toLocaleString());
        setOrder([]);
        alert(`Order ${orderNumber} has been submitted!`);
    };

    return(
        <AppContext.Provider value= {{
            activeCategory,
            setActiveCategory,
            filteredDishes,
            order,
            addDishToOrder,
            increaseQuantity,
            decreaseQuantity,
            removeDish,
            orderNumber,
            orderDate,
            handleOrderSubmit,
            categories
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);