import dishes from "../../../services/dishes";

const Dishes = () => {
    return (
        <section className='dishes h-full w-1/3'>
            <ul className='dishes__item grid grid-cols-2 h-full gap-3'>
                {dishes.map((dish, index) => (
                    <li 
                        key={dish.id} 
                        className='flex justify-center items-center text-xl'>
                        {dish.title}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Dishes;