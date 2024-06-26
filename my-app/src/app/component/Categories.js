import { memo } from 'react';
import { useApp } from '../../../context/AppContext';

const backgroundColors = ['bg-[#80ADD7]', 'bg-[#0ABDA0]', 'bg-[#EBF2EA]', 'bg-[#D4DCA9]', 'bg-[#BF9D7A]', 'bg-[#F3D4A0]', 'bg-[#D8D583]'];

const Categories = () => {
    const { categories, activeCategory, setActiveCategory } = useApp();
    return <CategoriesList categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />;
}

const CategoriesList = memo(({ categories, activeCategory, setActiveCategory }) => {
    // console.log('Categories rendered');
    const handleCategoryClick = (category) => {
        setActiveCategory(category === activeCategory ? null : category);
    };

    return (
        <section className='flex-1 min-w-80 sm:min-w-96 bg-pink-50 p-4 md:p-8'>
            <ul className='grid grid-cols-2 h-full gap-3'>
                {categories.length > 0 && categories.map((category, index) => (
                    <li
                        key={category}
                        className={`flex justify-center items-center text-xl h-36 cursor-pointer border-2 ${backgroundColors[index % backgroundColors.length]} ${activeCategory === category ? 'border-black' : 'border-transparent'}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </section>
    );
});

export default Categories;