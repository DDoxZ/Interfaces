const createGroupName = document.querySelector('#create-group-name');
const createGroupDescription = document.querySelector('#create-group-description');
const createGroupButton = document.querySelector('#create-group-button');
const createGroupError = document.querySelector('#create-group-error');

createGroupButton.addEventListener('click', function() {
    let name = createGroupName.value;
    let description = createGroupDescription.value;

    if (name.length < 3) {
        //alert('O nome do grupo deve ter pelo menos 3 caracteres.');
        createGroupError.innerHTML = 'O nome do grupo deve ter pelo menos 3 caracteres.';
        return;
    }

    /* if (description.length < 3) {
        //alert('A descrição do grupo deve ter pelo menos 3 caracteres.');
        createGroupError.innerHTML = 'A descrição do grupo deve ter pelo menos 3 caracteres.';
        return;
    } */
    if (!description) {
        description = 'Sem descrição';
    }

    const groups = JSON.parse(localStorage.getItem('groups')) || [];

    groups.push({
        name: name,
        description: description
    });

    localStorage.setItem('groups', JSON.stringify(groups));

    createGroupName.value = '';
    createGroupDescription.value = '';
    createGroupError.innerHTML = '';

    window.location.href = 'share.html';
});