// on page load
document.addEventListener('DOMContentLoaded', function() {
    // if url doesnt end in index.html, return
    if (!window.location.href.endsWith('index.html')) return;

    const groups = JSON.parse(localStorage.getItem('groups')) || [];

    if (groups.length > 0) {
        groups.forEach(group => {
            addGroup(group);
        });
    } else {
        document.querySelector('#groups-elem').innerHTML = '<p class="text-white text-center text-zinc-400">Você não está em nenhum grupo.</p>';
    }
});

function addGroup(group) {
    // replace breaks with spaces
    let htmlCode = `<div 
        onclick="window.location.href = 'message.html';"
        class="flex flex-col gap-2 justify-center h-22 bg-zinc-800 rounded-xl shadow-lg cursor-pointer hover:bg-zinc-700 duration-150 hover:bg-opacity-80 active:bg-opacity-100">
        <div class="flex justify-between items-center p-4">
            <div>
                <div class="text-md font-bold text-white">
                    ${group.name}
                </div>
                <p class="text-sm text-white mt-1">
                    ${group.description.length > 65 ? group.description.substring(0, 65) + '...' : group.description}
                </p>
            </div>
            <div class="text-white opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
          
            </div>
        </div>
    </div>`
    const groupsElem = document.querySelector('#groups-elem');
    groupsElem.innerHTML += htmlCode;
}