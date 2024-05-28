"use client";
import Categories from "./component/Categories";
import Dishes from "./component/Dishes";
import Order from "./component/Order";

export default function Home() {
  return (
    
    <main className="flex items-center justify-between p-24 h-4/5">
        <Categories />
        <Dishes />
        <Order />
    </main>
  );
}
