function renderCategories() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.forEach(category => createCategoryElement(category));
}
function createCategoryElement(category) {
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category';

    const categoryName = document.createElement('p');
    categoryName.textContent = category;
    categoryName.className = 'category__name';

    const categoryInput = document.createElement('input');
    categoryInput.className = 'category__input';
    categoryInput.style.display = 'none';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn_delete';

    categoryContainer.appendChild(categoryName);
    categoryContainer.appendChild(categoryInput);
    categoryContainer.appendChild(deleteButton);
    document.body.appendChild(categoryContainer);
}

function saveCategories() {
    const categories = Array.from(document.querySelectorAll('.category__name')).map(category => category.textContent);
    localStorage.setItem('categories', JSON.stringify(categories));
}

document.querySelector('#btn').addEventListener('click', function(event) {
    event.preventDefault();
    const input = document.querySelector('#input');
    const category = input.value;
    if (!category) return;

    createCategoryElement(category);
    saveCategories();

    input.value = '';
});

document.body.addEventListener('click', function(event) {
    if(event.target.className === 'category__name') {
        const categoryName = event.target;
        const categoryInput = categoryName.nextElementSibling;
        categoryInput.value = categoryName.textContent;
        categoryName.style.display = 'none';
        categoryInput.style.display = 'block';
        categoryInput.focus();
    } else if (event.target.className === 'btn_delete') {
        event.target.parentElement.remove();
        saveCategories();
    } else {
        const activeInput = document.querySelector('.category__input[style="display: block;"]');
        if(activeInput) {
            const categoryName = activeInput.previousElementSibling;
            categoryName.textContent = activeInput.value;
            activeInput.style.display = 'none';
            categoryName.style.display = 'block';
            saveCategories();
        }
    }
});

renderCategories();