const messagesElement = document.querySelector('#messages');
const groupOptionsModal = document.querySelector('#group-options-modal');
const groupOptionsOpenButton = document.querySelector('#group-options-open-button');
const groupOptionsShareButton = document.querySelector('#group-options-share-button');
const groupOptionsLeaveButton = document.querySelector('#group-options-leave-button');

const successModal = document.getElementById('success-modal');
const successModalCloseButton = document.getElementById('close-button');

successModalCloseButton.addEventListener('click', function() {
    successModal.classList.add('hidden');
});

groupOptionsOpenButton.addEventListener('click', function() {
    groupOptionsModal.classList.remove('hidden');
});

groupOptionsLeaveButton.addEventListener('click', function() {
    groupOptionsModal.classList.add('hidden');

    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    groups.pop();
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('messages', []);

    window.location.href = 'index.html';
});

groupOptionsShareButton.addEventListener('click', function() {
    groupOptionsModal.classList.add('hidden');
    successModal.classList.remove('hidden');

    // copy to clipboard
    navigator.clipboard.writeText("https://www.google.com/");
});

// close modal when clicking outside
window.addEventListener('click', function(event) {
    // if clicked outside the modal
    // if event.target is the modal, return
    if (event.target === groupOptionsModal) return;
    // if event.target is the button, return
    if (event.target === groupOptionsOpenButton) return;
    // if event.target has data-modal, return
    if (event.target.dataset.modal) return;

    groupOptionsModal.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function() {
    // if url doesnt end in index.html, return
    if (!window.location.href.endsWith('message.html')) return;

    messages.forEach(message => {
        addMessageToGroup(message);
        console.log(message);
    });

    const ms = JSON.parse(localStorage.getItem('messages')) || [];
    console.log(ms);
    ms.forEach(m => {
        addUserMessage(m);
    });
});

const messageInputText = document.querySelector('#message-input-text');
const messageSendButton = document.querySelector('#message-send-button');

messageSendButton.addEventListener('click', function() {
    if (messageInputText.value.trim() === '') return;

    const message = {
        user: 'Utilizador',
        text: messageInputText.value.trim(),
        time: new Date().toLocaleTimeString().slice(0, -3)
    };
    
    addUserMessage(message);
    messageInputText.value = '';

    const ms = JSON.parse(localStorage.getItem('messages')) || [];
    ms.push(message);

    localStorage.setItem('messages', JSON.stringify(ms));

    // scroll to bottom
    messagesElement.scrollTop = messagesElement.scrollHeight;
});

const messages = [
    {
        user: 'João',
        text: 'Olá, tudo bem?',
        time: '12:00'
    },
    {
        user: 'Maria',
        text: 'Estou bem e vocês?',
        time: '12:01'
    },
    {
        user: 'Afonso',
        text: 'Estou bem também. Já comia um kebab.',
        time: '12:02'
    },
    {
        user: 'Marta',
        text: 'Que fome!',
        time: '12:02'
    },
    {
        user: 'João',
        text: 'Vamos marcar um jantar? Vou procurar a receita.',
        time: '12:03'
    },
        
];

function addUserMessage(message) {
    messagesElement.innerHTML += `
    <!-- Message -->
    <div class="flex gap-4 mt-4 justify-end">
        <div class="flex flex-col gap-1 bg-zinc-700 px-4 py-2 w-44 rounded-b-xl rounded-l-xl">
            <div class="flex items-center justify-between gap-2">
                <p class="text-zinc-400 text-sm">${message.user}</p>
            </div>
            <p class="text-white text-sm">${message.text}</p>
            <p class="text-zinc-400 text-xs text-right ml-6">${message.time}</p>
        </div>
        <div class="w-8 h-8 bg-zinc-700 rounded-full"></div>    
    </div>
    `;
}

function addMessageToGroup(message) {
    messagesElement.innerHTML += `
    <!-- Message -->
    <div class="flex gap-4 mt-4">
        <div class="w-8 h-8 bg-zinc-700 rounded-full"></div>
        <div class="flex flex-col gap-1 bg-zinc-700 px-4 py-2 w-44 rounded-b-xl rounded-r-xl">
            <div class="flex items-center justify-between gap-2">
                <p class="text-zinc-400 text-sm">${message.user}</p>
            </div>
            <p class="text-white text-sm">${message.text}</p>
            <p class="text-zinc-400 text-xs text-right ml-6">${message.time}</p>
        </div>
    </div>
    `;
}