'use client';
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [order, setOrder] = useState([]);
    const [orderNumber, setOrderNumber] = useState(1);
    const [orderDate, setOrderDate] = useState('');
    const [recipes, setRecipes] = useState([]);

    const calculateCategoryCounts = (recipes) => {
        const categoryCounts = {};
        recipes.forEach(recipe => {
            recipe.tags.forEach(tag => {
                if (categoryCounts[tag]) {
                    categoryCounts[tag]++;
                } else {
                    categoryCounts[tag] = 1;
                }
            });
        });
        return categoryCounts;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/recipes');
                const data = await response.json();
                const categoryCounts = calculateCategoryCounts(data.recipes);
                
                const uniqueCategories = new Set();
                const optimizedRecipes = data.recipes.map(recipe => {
                    if (recipe.tags && recipe.tags.length > 0) {
                        const optimalCategory = recipe.tags.reduce((maxCategory, currentCategory) => 
                            categoryCounts[currentCategory] > (categoryCounts[maxCategory] || 0) 
                                ? currentCategory 
                                : maxCategory, 
                        recipe.tags[0]);

                        uniqueCategories.add(optimalCategory);
                        return { ...recipe, optimalCategory };
                    }
                    return recipe;
                });

                setCategories(Array.from(uniqueCategories));
                setRecipes(optimizedRecipes);
            } catch (error) {
                console.error('Ошибка загрузки категорий:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchDishes = async () => {
            if (activeCategory) {
                const filteredRecipes = recipes.filter(recipe => recipe.optimalCategory === activeCategory);
                setFilteredDishes(filteredRecipes);
            } else {
                setFilteredDishes([]);
            }
        };
        fetchDishes();
    }, [activeCategory, recipes]);

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

    return (
        <AppContext.Provider value={{
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