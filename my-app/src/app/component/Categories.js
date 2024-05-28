import React, { useState } from 'react';
import categories from '../../../services/categories';

const backgroundColors = ['#80ADD7', '#0ABDA0', '#EBF2EA', '#D4DCA9', '#BF9D7A', '#F3D4A0', '#D8D583'];

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId === activeCategory ? null : categoryId);
    };

    return (
        <section className='categories h-full w-1/3'>
            <ul className='categories__item grid grid-cols-2 h-full gap-3'>
                {categories.map((category, index) => (
                    <li 
                        key={category.id} 
                        className='flex justify-center items-center text-xl' 
                        style={{ 
                            backgroundColor: backgroundColors[index % backgroundColors.length],
                            cursor: 'pointer',
                            border: '5px solid',
                            borderColor: activeCategory === category.id ? 'white' : backgroundColors[index % backgroundColors.length],
                        }}
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
