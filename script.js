
let cust_order = [];
const cartItems = document.querySelector('.cart-items');
const cartItem = document.createElement('div');
const totalContainer = document.querySelector('.total-container');
const totalElement = totalContainer.querySelector('.total-price');
const inputOrder = document.querySelector('.fake-input');

init();
bindEvents();
updateCart();

function init() {
    document.querySelector('.fake-input').value = '';
    for (const item of products) {
        let card = document.querySelector(".product-card").cloneNode(true);
        card.querySelector('.card-img-top').setAttribute('src', `${item.prod_image}`);
        card.querySelector('.card-title').innerText = item.prod_name;
        card.querySelector('.card-text').innerText = `${formatPrice(item.prod_price)}`;
        card.dataset.prod_name = item.prod_name;
        card.dataset.prod_price = Number(item.prod_price);
        document.getElementById(item.prod_category).querySelector('.product-list').appendChild(card);
    }
    document.querySelector(".card-template").remove();
}

function formatPrice(price) {
    return Number(price).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function bindEvents() {
    const btnAddToCart = document.querySelectorAll('.btn-addToCart');

    for (const button of btnAddToCart) {
       addCart(button);
    }
}

function addCart(button) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const item = {
            prod_name: e.target.closest('.card').dataset.prod_name,
            prod_price: Number(e.target.closest('.card').dataset.prod_price),
        }
        cust_order.push(item);
        updateCart();
        inputOrder.value = JSON.stringify(cust_order);
        console.log(inputOrder.value);
    });
}

function updateCart() {
    if (cust_order.length) {
        cartItems.innerHTML = '';
        for (const item of cust_order) {
            const itemList = document.createElement('div');
            itemList.classList.add('list-group-item', 'cart-item');
            itemList.innerHTML = `<div>
            <p class="product-name font-weight-bold">${item.prod_name}</p>
            <p class="product-price">${formatPrice(item.prod_price)}</p>
            </div>
            <button type="button" class="close">
            <span>&times;</span>
            </button>`;

            cartItems.appendChild(itemList);
            totalContainer.style.display = 'block';
            bindRemoveEvent(itemList.querySelector('button'));
            totalPrice();

        }
    } else {
        cartItems.innerHTML = '<span class="text-secondary"> Cart is empty.</span>';
        totalContainer.style.display = 'none';
    }
    console.log(cust_order);
}

function bindRemoveEvent(button) {
    button.addEventListener('click', function (e) {
        const selected = button.closest('.cart-item');
        const name = selected.querySelector('.product-name').innerText;
        let proceed = false;
        const updatedOrder = [];

        for (const item of cust_order) {
            if (item.prod_name !== name || proceed) {
                updatedOrder.push(item);
            } else {
                proceed = true;
            }
        }

        cust_order = updatedOrder;
        updateCart();
    });
}

function totalPrice() {
    const total = cust_order.map(item => item.prod_price).reduce((prev, curr) => prev + curr, 0);
    totalElement.innerText = formatPrice(total);
}