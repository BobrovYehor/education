import { useState } from 'react';
import categories from '../../../services/categories';

const backgroundColors = ['bg-[#80ADD7]', 'bg-[#0ABDA0]', 'bg-[#EBF2EA]', 'bg-[#D4DCA9]', 'bg-[#BF9D7A]', 'bg-[#F3D4A0]', 'bg-[#D8D583]'];

const Categories = ({ activeCategory, setActiveCategory }) => {
    const [activeBorder, setActiveBorder] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId === activeCategory ? null : categoryId);
        setActiveBorder(categoryId);
    };

    return (
        <section className='h-full min-w-96 bg-pink-50 p-8'>
            <ul className='grid grid-cols-2 h-full gap-3'>
                {categories.map((category, index) => (
                    <li 
                        key={category.id} 
                        className={`flex justify-center items-center text-xl h-36 cursor-pointer border-2 ${backgroundColors[index % backgroundColors.length]} ${activeBorder === category.id ? 'border-black' : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.title}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Categories;
