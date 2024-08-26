const clearCartButton = document.querySelector('#clear-cart');
clearCartButton.addEventListener('click', askForConfirmation);

const totalPriceElement = document.querySelector('#total-price-value');

const successModal2 = document.getElementById('success-modal-2');
const confirmModal = document.getElementById('confirm-modal');
const successModal = document.getElementById('success-modal');
const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');
const closeButton = document.getElementById('close-button');
const buyButton = document.getElementById('cart-button');
const closeButton2 = document.getElementById('close-button-2');

clearCartButton.addEventListener('click', askForConfirmation);

buyButton.addEventListener('click', function() {
    successModal2.style.display = 'block';
    localStorage.removeItem('cart');
});

confirmButton.addEventListener('click', function() {
    clearCart();

    confirmModal.style.display = 'none';
    successModal.style.display = 'block';
});
cancelButton.addEventListener('click', function() {
    confirmModal.style.display = 'none';
});

closeButton.addEventListener('click', function() {
    successModal.style.display = 'none';
});

closeButton2.addEventListener('click', function() {
    successModal2.style.display = 'none';
    clearCart(); 
});

// on page load
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length > 0) {
        cart.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                addCartItem(ingredient);
                total += Number(ingredient.price.replace('€', '').trim()) * ingredient.quantity;
            });
        });
        document.querySelector('#cart-buttons').style.display = 'flex';
        document.querySelector('#total-price').style.display = 'flex';

    } else {
        console.log('Carrinho vazio');
        document.querySelector('#cart-page').innerHTML = `
            <div class="flex flex-col items-center justify-center h-full min-h-screen gap-2">
                <p class="text-3xl font-bold text-white">Carrinho</p>
                <p class="text-white text-center mb-4">O carrinho está vazio</p>
                <div class="text-zinc-600 rounded-xl text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
            </div>
        `
    }

    console.log(total);

    totalPriceElement.innerText ="€ " + Number(total).toFixed(2);
});

function addCartItem(item) {
    let htmlCode = `<div class="flex items
    -center justify-between bg-zinc-700 p-4 rounded-xl">
        <div class="flex items
        -center gap-4">
            <!-- Add one / remove one buttons -->
            <div class="flex items-center gap-4">
                <div class="flex text-white gap-1">
                    <div class="bg-zinc-800 p-1 text-white hover:text-zinc-30 hover:bg-zinc-600 duration-150 rounded-md cursor-pointer active:bg-zinc-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                   <div class="bg-zinc-800 p-1 text-white hover:text-zinc-30 hover:bg-zinc-600 duration-150 rounded-md cursor-pointer active:bg-zinc-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                   </div>
                </div>
            </div>
            <div>
                <p class="text-md font-semibold text-white">
                    ${item.name}
                </p>
                <div class="flex items-center gap-4 justify-between">
                    <p class="text-sm text-white mt-2">
                        ${item.quantity} ${item.quantity > 1 ? 'unidades' : 'unidade'}
                    </p>
                    <p class="text-sm text-white mt-2">
                        ${item.price} uni. 
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center text-white">
            <div class="text-red-200 bg-red-500 p-1 rounded-md hover:bg-zinc-600 duration-150 rounded-md cursor-pointer active:bg-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
        </div>                       
    </div>`

    const cartItemsDiv = document.querySelector('#cart-items');
    cartItemsDiv.innerHTML += htmlCode;
}

function askForConfirmation() {
    confirmModal.style.display = 'block';
}

function clearCart() {
    localStorage.removeItem('cart');
    document.querySelector('#cart-items').innerHTML = '<p class="text-white">O carrinho está vazio</p>';
    document.querySelector('#cart-buttons').style.display = 'none';
    document.querySelector('#total-price').style.display = 'none';
}