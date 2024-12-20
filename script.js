document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);

    const recipeForm = document.getElementById('recipeForm');
    const suggestRecipeButton = document.getElementById('suggestRecipeButton');
    const viewRecipesButton = document.getElementById('viewRecipesButton');
    const recipeModal = document.getElementById('recipeModal');
    const recipeListModal = document.getElementById('recipeListModal');
    const editRecipeModal = document.getElementById('editRecipeModal');
    const closeModalButtons = document.querySelectorAll('.modal .close');
    const recipeName = document.getElementById('recipeName');
    const recipeIngredients = document.getElementById('recipeIngredients');
    const recipeInstructions = document.getElementById('recipeInstructions');
    const recipeList = document.getElementById('recipeList');
    const editRecipeForm = document.getElementById('editRecipeForm');
    const editRecipeNameInput = document.getElementById('editRecipeNameInput');
    const editRecipeIngredientsInput = document.getElementById('editRecipeIngredientsInput');
    const editRecipeInstructionsInput = document.getElementById('editRecipeInstructionsInput');

    let recipeData = JSON.parse(localStorage.getItem('recipeData')) || [];
    let currentEditIndex = null;

    recipeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('recipeNameInput').value;
        const ingredients = document.getElementById('recipeIngredientsInput').value;
        const instructions = document.getElementById('recipeInstructionsInput').value;

        addRecipeData(name, ingredients, instructions);
        recipeForm.reset();
    });

    suggestRecipeButton.addEventListener('click', function () {
        suggestRandomRecipe();
    });

    viewRecipesButton.addEventListener('click', function () {
        updateRecipeList();
        recipeListModal.style.display = 'block';
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target == recipeModal || event.target == recipeListModal || event.target == editRecipeModal) {
            event.target.style.display = 'none';
        }
    });

    editRecipeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = editRecipeNameInput.value;
        const ingredients = editRecipeIngredientsInput.value;
        const instructions = editRecipeInstructionsInput.value;

        updateRecipeData(currentEditIndex, name, ingredients, instructions);
        editRecipeModal.style.display = 'none';
    });

    function addRecipeData(name, ingredients, instructions) {
        recipeData.push({ name, ingredients, instructions });
        localStorage.setItem('recipeData', JSON.stringify(recipeData));
    }

    function suggestRandomRecipe() {
        if (recipeData.length === 0) {
            alert('No recipes available. Please add some recipes first.');
            return;
        }
        const randomIndex = Math.floor(Math.random() * recipeData.length);
        const recipe = recipeData[randomIndex];
        recipeName.textContent = recipe.name;
        recipeIngredients.textContent = recipe.ingredients;
        recipeInstructions.textContent = recipe.instructions;
        recipeModal.style.display = 'block';
    }

    function updateRecipeList() {
        recipeList.innerHTML = '';
        recipeData.forEach((recipe, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${recipe.name}`;
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => openEditModal(index));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => removeRecipeData(index));
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            recipeList.appendChild(listItem);
        });
    }

    function openEditModal(index) {
        currentEditIndex = index;
        const recipe = recipeData[index];
        editRecipeNameInput.value = recipe.name;
        editRecipeIngredientsInput.value = recipe.ingredients;
        editRecipeInstructionsInput.value = recipe.instructions;
        editRecipeModal.style.display = 'block';
    }

    function updateRecipeData(index, name, ingredients, instructions) {
        recipeData[index] = { name, ingredients, instructions };
        localStorage.setItem('recipeData', JSON.stringify(recipeData));
        updateRecipeList();
    }

    function removeRecipeData(index) {
        recipeData.splice(index, 1);
        localStorage.setItem('recipeData', JSON.stringify(recipeData));
        updateRecipeList();
    }
});