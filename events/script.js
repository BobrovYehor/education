document.querySelector('#btn').addEventListener('click', function(event) {
    event.preventDefault();
    const input = document.querySelector('#input');
    const category = input.value;
    if (category) {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'category';

        const categoryName = document.createElement('p');
        categoryName.textContent = category;
        categoryName.addEventListener('click', function() {
            alert(category);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            categoryContainer.remove();
        });

        categoryContainer.appendChild(categoryName);
        categoryContainer.appendChild(deleteButton);
        document.body.appendChild(categoryContainer);
    };

    input.value = '';
});