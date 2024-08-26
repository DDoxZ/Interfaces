const selectRecipe = document.querySelector('#select-recipe');
const selectGroup = document.querySelector('#select-group');
const scheduleButton = document.querySelector('#schedule-button');

const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const descriptionInput = document.querySelector('#description-input');

window.addEventListener('DOMContentLoaded', function() {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];

    if (savedRecipes.length === 0) {
        // disable select
        selectRecipe.disabled = true;
        // add default option
        const option = document.createElement('option');
        option.value = 'Não tens nenhuma receita guardada';
        option.textContent = 'Não tens nenhuma receita guardada';
        selectRecipe.appendChild(option);

        // make select text gray
        selectRecipe.classList.add('text-zinc-400');
    }

    if (savedGroups.length === 0) {
        // disable select
        selectGroup.disabled = true;
        // add default option
        const option = document.createElement('option');
        option.value = 'Não tens nenhum grupo guardado';
        option.textContent = 'Não tens nenhum grupo guardado';
        selectGroup.appendChild(option);

        // make select text gray
        selectGroup.classList.add('text-zinc-400');
    }

    savedRecipes.forEach(recipe => {
        const option = document.createElement('option');
        option.value = recipe.name;
        option.textContent = recipe.name;
        selectRecipe.appendChild(option);
    });

    savedGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.name;
        option.textContent = group.name;
        selectGroup.appendChild(option);
    });
});

scheduleButton.addEventListener('click', function() {
    const recipeError = document.querySelector('#recipe-error');
    const dateError = document.querySelector('#date-error');
    const timeError = document.querySelector('#time-error');
    const groupError = document.querySelector('#group-error');

    if (!selectRecipe.value) {
        recipeError.textContent = 'Por favor seleciona uma receita';
    } else {
        recipeError.textContent = '';
    }

    const date = new Date(dateInput.value);
    const time = timeInput.value;

    // set date hours to the input time
    date.setHours(time.split(':')[0], time.split(':')[1]);

    // check if date exists and is not in the past
    if (!dateInput.value || !date || date < new Date()) {
        dateError.textContent = 'Por favor seleciona uma data futura';
    } else {
        dateError.textContent = '';
    }

    // check if time exists and is in the future
    if (!timeInput.value || date < new Date()) {
        timeError.textContent = 'Por favor seleciona uma hora futura';
    } else {
        timeError.textContent = '';
    }

    const selectedRecipe = selectRecipe.value;
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const recipe = savedRecipes.find(recipe => recipe.name === selectedRecipe);

    /* const selectedGroup = selectGroup.value;
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];

    const group = savedGroups.find(group => group.name === selectedGroup);

    if (!group) {
        groupError.textContent = 'Por favor seleciona um grupo';
    } else {
        groupError.textContent = '';
    } */

    if (!recipe) {
        const recipeError = document.querySelector('#recipe-error');
        recipeError.textContent = 'Por favor seleciona uma receita guardada';
    } else if (!recipeError.textContent) {
        recipeError.textContent = '';
    }

    if (recipeError.textContent || dateError.textContent || timeError.textContent) {
        return;
    }

    const meal = {
        name: recipe.name,
        image: recipe.image,
        date,
        description: descriptionInput.value
    };


    const mealsItem = localStorage.getItem('meals');
    const meals = mealsItem ? JSON.parse(mealsItem) : [];
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));

    window.location.href = 'index.html';
});