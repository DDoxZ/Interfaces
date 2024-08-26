const publishButton = document.querySelector('#publish-button');

const titleInput = document.querySelector('#title-input');
const imageInput = document.querySelector('#image-input');
const descriptionInput = document.querySelector('#description-input');
const instructionsInput = document.querySelector('#instructions-input');
const tagsInput = document.querySelector('#tags-input');

const addIngredientButton = document.querySelector('#add-ingredient-btn');
const ingredientList = document.querySelector('#ingredients-container');
const removeIngredientButtons = document.querySelectorAll('.remove-ingredient-btn');

removeIngredientButtons.forEach(button => {
    button.addEventListener('click', function() {
        // check if there is only one ingredient
        if (ingredientList.children.length === 1) {
            return;
        }
        
        button.parentElement.remove();
    });
});

addIngredientButton.addEventListener('click', function() {
    let code = `
        <div class="flex gap-2 ingredient">
            <input type="text" class="p-2 bg-zinc-700 rounded-lg text-white text-md w-2/3" placeholder="Ingrediente">
            <input type="text" class="p-2 bg-zinc-700 rounded-lg text-white text-md w-1/3" placeholder="Quantidade">
            <button class="remove-ingredient-btn bg-red-600 text-white px-2 py-2 rounded-lg hover:bg-red-700 duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `

    ingredientList.insertAdjacentHTML('beforeend', code);

    // add event listener to the new button
    const newButton = ingredientList.lastElementChild.querySelector('.remove-ingredient-btn');
    newButton.addEventListener('click', function() {
        // check if there is only one ingredient
        if (ingredientList.children.length === 1) {
            return;
        }
        
        newButton.parentElement.remove();
    });
});

publishButton.addEventListener('click', function() {
    const titleError = document.querySelector('#title-error');
    const imageError = document.querySelector('#image-error');
    const descriptionError = document.querySelector('#description-error');
    const ingredientsError = document.querySelector('#ingredients-error');
    const instructionsError = document.querySelector('#instructions-error');
    const tagsError = document.querySelector('#tags-error');
    const ingredients = document.querySelectorAll('.ingredient');

    if (!titleInput.value) {
        titleError.textContent = 'Por favor coloca um título';
    } else {
        titleError.textContent = '';
    }

    if (!imageInput.value) {
        imageError.textContent = 'Por favor coloca uma imagem';
    } else {
        imageError.textContent = '';
    }

    if (!descriptionInput.value) {
        descriptionError.textContent = 'Por favor coloca uma descrição';
    } else {
        descriptionError.textContent = '';
    }

    if (!instructionsInput.value) {
        instructionsError.textContent = 'Por favor coloca as instruções';
    } else {
        instructionsError.textContent = '';
    }

    if (!tagsInput.value) {
        tagsError.textContent = 'Por favor coloca as tags';
    } else {
        tagsError.textContent = '';
    }

    let ingredientsArray = [];
    ingredients.forEach(ingredient => {
        const name = ingredient.children[0].value;
        const quantity = ingredient.children[1].value;

        if (quantity <= 0) {
            console.log('error');
            ingredientsError.textContent = 'Por favor coloca uma quantidade válida';
        } else {
            ingredientsError.textContent = '';
        }

        if (!name && ingredientsError.textContent === '') {
            console.log('error');
            ingredientsError.textContent = 'Por favor coloca o nome do ingrediente';
        }

        if (name && quantity) {
            ingredientsArray.push({ name, quantity });
        }
    });

    if (ingredientsArray.length === 0) {
        ingredientsError.textContent = 'Por favor coloca os ingredientes';
    }

    if (!titleInput.value || !imageInput.value || !descriptionInput.value || !instructionsInput.value || !tagsInput.value || ingredientsArray.length === 0 || ingredientsError.textContent) {
        return;
    }
    
    ingredientsError.textContent = '';
    window.location.href = 'index.html';
});