const dishes = [
    {
        id: '1',
        category_id: '1',
        title: 'Salmon Canapés',
        weight: '100g',
        price: 9.99,
    },

    {
        id: '2',
        category_id: '1',
        title: 'Shrimp Cocktail',
        weight: '120g',
        price: 12.99,
    },

    {
        id: '3',
        category_id: '1',
        title: 'Caprese Skewers',
        weight: '150g',
        price: 8.49,
    },

    {
        id: '4',
        category_id: '1',
        title: 'Bruschetta',
        weight: '130g',
        price: 7.99,
    },

    {
        id: '5',
        category_id: '1',
        title: 'Cheese Platter',
        weight: '200g',
        price: 14.99,
    },

    {
        id: '6',
        category_id: '1',
        title: 'Tuna Tartare',
        weight: '160g',
        price: 13.99,
    },

    {
        id: '7',
        category_id: '2',
        title: 'Mozzarella Sticks',
        weight: '180g',
        price: 8.99,
    },

    {
        id: '8',
        category_id: '2',
        title: 'Fried Calamari',
        weight: '170g',
        price: 11.49,
    },

    {
        id: '9',
        category_id: '2',
        title: 'Mini Quesadillas',
        weight: '180g',
        price: 7.99,
    },
    
    {
        id: '10',
        category_id: '2',
        title: 'Crab Cakes',
        weight: '180g',
        price: 14.99,
    },
    
    {
        id: '11',
        category_id: '2',
        title: 'Spring Rolls',
        weight: '160g',
        price: 8.49,
    },
    
    {
        id: '12',
        category_id: '3',
        title: 'Caesar Salad',
        weight: '300g',
        price: 9.99,
    },
    
    {
        id: '13',
        category_id: '3',
        title: 'Greek Salad',
        weight: '280g',
        price: 8.49,
    },
    
    {
        id: '14',
        category_id: '3',
        title: 'Caprese Salad',
        weight: '250g',
        price: 10.99,
    },
    
    {
        id: '15',
        category_id: '3',
        title: 'Cobb Salad',
        weight: '320g',
        price: 11.99,
    },
    
    {
        id: '15',
        category_id: '3',
        title: 'Spinach Salad',
        weight: '270g',
        price: 8.49,
    },
    
    {
        id: '16',
        category_id: '3',
        title: 'Asian Slaw',
        weight: '250g',
        price: 7.49,
    },
    
    {
        id: '17',
        category_id: '3',
        title: 'Kale Salad',
        weight: '280g',
        price: 9.99,
    },
    
    {
        id: '18',
        category_id: '3',
        title: 'Waldorf Salad',
        weight: '280g',
        price: 9.99,
    },
    
    {
        id: '19',
        category_id: '4',
        title: 'Tomato Soup',
        weight: '300g',
        price: 5.99,
    },
    
    {
        id: '20',
        category_id: '4',
        title: 'Lentil Soup',
        weight: '280g',
        price: 5.49,
    },
    
    {
        id: '21',
        category_id: '4',
        title: 'Minestrone Soup',
        weight: '300g',
        price: 7.49,
    },
    
    {
        id: '22',
        category_id: '4',
        title: 'Gazpacho',
        weight: '300g',
        price: 7.99,
    },
    
    {
        id: '23',
        category_id: '5',
        title: 'Grilled Salmon',
        weight: '250g',
        price: 18.99,
    },
    
    {
        id: '24',
        category_id: '5',
        title: 'Chicken Parmesan',
        weight: '300g',
        price: 16.99,
    },
    {
        id: '25',
        category_id: '5',
        title: 'Steak Frites',
        weight: '350g',
        price: 24.99,
    },
    
    {
        id: '26',
        category_id: '5',
        title: 'Pasta Primavera',
        weight: '400g',
        price: 15.99,
    },
    
    {
        id: '27',
        category_id: '5',
        title: 'Beef Stroganoff',
        weight: '350g',
        price: 19.99,
    },
    
    {
        id: '28',
        category_id: '5',
        title: 'Eggplant Parmesan',
        weight: '300g',
        price: 16.99,
    },
    
    {
        id: '29',
        category_id: '5',
        title: 'Teriyaki Chicken',
        weight: '300g',
        price: 17.99,
    },
    
    {
        id: '30',
        category_id: '5',
        title: 'Shrimp Scampi',
        weight: '300g',
        price: 22.99,
    },
    
    {
        id: '31',
        category_id: '5',
        title: 'Lamb Chops',
        weight: '300g',
        price: 28.99,
    },
    
    {
        id: '32',
        category_id: '5',
        title: 'Beef Wellington',
        weight: '400g',
        price: 32.99,
    },
    
    {
        id: '33',
        category_id: '6',
        title: 'Barbecue Ribs',
        weight: '500g',
        price: 26.99,
    },
    
    {
        id: '34',
        category_id: '6',
        title: 'Pulled Pork',
        weight: '300g',
        price: 14.99,
    },
    
    {
        id: '35',
        category_id: '6',
        title: 'Grilled Chicken',
        weight: '350g',
        price: 16.99,
    },
    
    {
        id: '36',
        category_id: '6',
        title: 'Smoked Brisket',
        weight: '400g',
        price: 22.99,
    },
    
    {
        id: '37',
        category_id: '6',
        title: 'Grilled Corn',
        weight: '200g',
        price: 7.99,
    },
    
    {
        id: '38',
        category_id: '6',
        title: 'Chicken Wings',
        weight: '300g',
        price: 10.99,
    },
    
    {
        id: '39',
        category_id: '6',
        title: 'Smoked Sausages',
        weight: '250g',
        price: 12.99,
    },
    
    {
        id: '40',
        category_id: '7',
        title: 'Chocolate Cake',
        weight: '150g',
        price: 7.99,
    },
    
    {
        id: '41',
        category_id: '7',
        title: 'Cheesecake',
        weight: '200g',
        price: 8.99,
    },
    
    {
        id: '42',
        category_id: '7',
        title: 'Apple Pie',
        weight: '180g',
        price: 6.99,
    },
    
    {
        id: '43',
        category_id: '7',
        title: 'Tiramisu',
        weight: '200g',
        price: 9.99,
    },
    
    {
        id: '44',
        category_id: '8',
        title: 'Mojito',
        weight: '300ml',
        price: 9.99,
    },
    
    {
        id: '45',
        category_id: '8',
        title: 'Margarita',
        weight: '250ml',
        price: 8.99,
    },
    
    {
        id: '46',
        category_id: '8',
        title: 'Cosmopolitan',
        weight: '300ml',
        price: 10.99,
    },
    
    {
        id: '47',
        category_id: '8',
        title: 'Martini',
        weight: '200ml',
        price: 8.99,
    },
    
    {
        id: '48',
        category_id: '8',
        title: 'Mai Tai',
        weight: '350ml',
        price: 11.99,
    },
    
    {
        id: '49',
        category_id: '8',
        title: 'Pina Colada',
        weight: '300ml',
        price: 10.99,
    },
    
    {
        id: '50',
        category_id: '8',
        title: 'Sangria',
        weight: '350ml',
        price: 9.99,
    },
]

export default dishes;