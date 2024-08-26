document.addEventListener('DOMContentLoaded', function() {
    const mealsItem = localStorage.getItem('meals');
    const meals = mealsItem ? JSON.parse(mealsItem) : [];

    meals.forEach(meal => {
        // convert meal date to Date object
        meal.date = new Date(meal.date);
        console.log(meal.date);
        console.log(meal.date.toLocaleDateString());

        addScheduleMeal(meal);
    });

    if (!meals || meals.length === 0) {
        const mealsElem = document.querySelector('#meals');
        mealsElem.innerHTML = '<div class="mt-4 text-lg text-zinc-400">Não tens nenhuma refeição agendada.</div>';
    }
});

function addScheduleMeal(meal) {
    const date = new Date(meal.date);

    let htmlCode = `<div 
        class="flex h-24 bg-zinc-700 rounded-xl shadow-lg mt-4 cursor-pointer hover:bg-zinc-700 duration-150 hover:bg-opacity-80 active:bg-opacity-100">
        <img src="${meal.image}" alt="Recipe image" class="w-24 rounded-l-xl">
        <div class="p-4">
            <div class="text-sm text-zinc-400 mb-1">
                ${date.toLocaleDateString()} - ${date.toLocaleTimeString().slice(0, -3)}
            </div>
            <div class="text-md font-bold text-white">
                ${meal.name}
            </div>
            <div class="text-sm text-zinc-400">
                ${meal.description.slice(0, 25)}...
            </div>
        </div>
    </div>`
    const mealsElem = document.querySelector('#meals');
    mealsElem.innerHTML += htmlCode;
}