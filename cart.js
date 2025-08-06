document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-container');
    const cartSummary = document.querySelector('.cart-summary');
    cartContainer.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        cartSummary.style.display = 'none';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Size: Medium</p>
                <div class="quantity-control">
                    <button class="decrement">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increment">+</button>
                </div>
                <h4>$${item.price}</h4>
            </div>
            <button class="remove-item"><i class="fa-solid fa-trash"></i> Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    attachCartEvents();
    updateTotalPrice();
});

function attachCartEvents() {
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', () => {
            let quantitySpan = button.previousElementSibling;
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
            updateCartInStorage();
            updateTotalPrice();
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            let quantitySpan = button.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent);

            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
            } else {
                cartItem.remove();
            }

            updateCartInStorage();

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                document.querySelector('.cart-container').innerHTML = '';
                document.querySelector('.cart-summary').style.display = 'none';
            }

            updateTotalPrice();
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            const name = cartItem.querySelector('h3').textContent;
            cartItem.remove();

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cart));

            if (cart.length === 0) {
                document.querySelector('.cart-container').innerHTML = '';
                document.querySelector('.cart-summary').style.display = 'none';
            }

            updateTotalPrice();
        });
    });
}

function updateCartInStorage() {
    const cartItems = document.querySelectorAll('.cart-item');
    let updatedCart = [];

    cartItems.forEach(item => {
        const name = item.querySelector('h3').textContent;
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.querySelector('h4').textContent.slice(1));
        const image = item.querySelector('img').src;

        updatedCart.push({ name, quantity, price, image });
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

function updateTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('h4').textContent.slice(1));
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        totalPrice += price * quantity;
    });

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
    }
}
