import dishes from "../../../services/dishes";

const Dishes = ({ activeCategory }) => {
    const filteredDishes = activeCategory ? dishes.filter(dish => dish.category_id === activeCategory) : [];

    return (
        <section className='h-full min-w-96 bg-fuchsia-300 p-8'>
            {activeCategory ? (
                <ul className='grid grid-cols-2 grid-rows-4 h-full gap-3'>
                    {filteredDishes.map((dish, index) => (
                        <li 
                            key={dish.id} 
                            className='flex justify-center items-center text-xl h-36 cursor-pointer bg-pink-200'>
                            {dish.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <h1 className="text-center text-xl">Choose a category</h1>
            )}
        </section>
    );
}

export default Dishes;