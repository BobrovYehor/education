"use client";
import { useState } from "react";
import Categories from "./component/Categories";
import Dishes from "./component/Dishes";
import Order from "./component/Order";

export default function Home() {
const [activeCategory, setActiveCategory] = useState(null);

  return (
    
    <main className="p-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        <Dishes activeCategory={activeCategory} />
        <Order />
    </main>
  );
}
