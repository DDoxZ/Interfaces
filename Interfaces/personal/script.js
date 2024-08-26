// on page load
document.addEventListener('DOMContentLoaded', function() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    console.log(recipes);

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            addRecipe(recipe);
        });
    } else {
        document.querySelector('#recipes-elem').innerHTML = '<p class="text-white">Não há receitas salvas</p>';
    }
});

function addRecipe(recipe) {
    // replace breaks with spaces
    let url = `../recipe/${recipe.url}`.replace(/\s/g, '').replace(/\n/g, '');

    let htmlCode = `<div 
        onclick="window.location.href = '${url}'"
        class="flex h-24 bg-zinc-700 rounded-xl shadow-lg mt-4 cursor-pointer hover:bg-zinc-700 duration-150 hover:bg-opacity-80 active:bg-opacity-100">
        <img src="${recipe.image}" alt="Recipe image" class="w-24 rounded-l-xl">
        <div class="p-4">
            <div class="text-md font-bold text-white">
                ${recipe.name}
            </div>
            <div class="text-sm text-zinc-400">
                ${recipe.description.slice(0, 25)}...
            </div>
        </div>
    </div>`
    const recipesElem = document.querySelector('#recipes-elem');
    recipesElem.innerHTML += htmlCode;
}