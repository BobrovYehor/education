import { memo } from 'react';
import { useApp } from '../../../context/AppContext';

const Dishes = () => {
    const { filteredDishes, addDishToOrder } = useApp();
    console.log('Dishes rendered');
    return (
        <section className='flex-1 min-w-80 sm:min-w-96 bg-fuchsia-300 p-4 md:p-8'>
            {filteredDishes.length > 0 ? (
                <ul className='grid grid-cols-2 grid-rows-4 h-full gap-3 text-center'>
                    {filteredDishes.map((dish) => (
                        <li 
                            key={dish.id} 
                            className='flex justify-center items-center text-xl h-36 cursor-pointer bg-pink-200'
                            onClick={() => addDishToOrder(dish)}>
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

export default memo(Dishes);