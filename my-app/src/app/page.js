"use client";
import Categories from "./component/Categories";
import Dishes from "./component/Dishes";
import Order from "./component/Order";

export default function Home() {
  return (
    <main className="flex-grow flex-wrap flex md:overflow-auto p-0 ms:p-4 md:p-8">
        <Categories />
        <Dishes />
        <Order />
    </main>
  );
}