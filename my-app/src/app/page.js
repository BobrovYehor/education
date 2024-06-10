"use client";
import { useState, useEffect } from "react";
import Categories from "./component/Categories";
import Dishes from "./component/Dishes";
import Order from "./component/Order";
import dishes from "../../services/dishes";
import categories from "../../services/categories";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if(activeCategory) {
      const filtered = dishes.filter(dish => dish.category_id === activeCategory.id);
      setFilteredDishes(filtered);  
    } else {
        setFilteredDishes([]);
    }
  }, [activeCategory]);

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

    return (
      
      <main className="p-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ms:p-4 md:p-8">
          <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
          <Dishes filteredDishes={filteredDishes} addDishToOrder={addDishToOrder}/>
          <Order order={order} setOrder={setOrder}/>
      </main>
    );
}
