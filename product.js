const hamburger = document.querySelector('.hamburger');
const cancel = document.querySelector('.cancelBtn');
const navbar = document.querySelector('#navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.add('active');
});

cancel.addEventListener('click', () => {
    navbar.classList.remove('active');
});

const products = [
    { id: 1, name: "Cartoon Astronaut T-shirt", brand: "adidas", price: 78, description: "High-quality cartoon astronaut printed T-shirt made from comfortable fabric.", image: "imgs/f1 (1).jpg" },
    { id: 2, name: "Sports Shoes", brand: "Nike", price: 120, description: "Comfortable sports shoes for running and outdoor activities.", image: "imgs/n6.jpg" },
    { id: 3, name: "Graphic T-shirt", brand: "adidas", price: 59, description: "Cool graphic T-shirt for daily wear.", image: "imgs/f2 (1).jpg" },
    { id: 4, name: "Comfortable Hoodie", brand: "Puma", price: 98, description: "Soft and warm hoodie perfect for cold weather.", image: "imgs/f3.jpg" },
    { id: 5, name: "Casual Sneakers", brand: "Nike", price: 75, description: "Stylish sneakers for casual wear.", image: "imgs/f4.jpg" },
    { id: 6, name: "Vintage Watch", brand: "Rolex", price: 1500, description: "A classic vintage watch with leather strap.", image: "imgs/f5.jpg" },
    { id: 7, name: "Running Shoes", brand: "Nike", price: 130, description: "Lightweight and breathable running shoes.", image: "imgs/f6.jpg" },
    { id: 8, name: "Leather Wallet", brand: "Gucci", price: 450, description: "Premium leather wallet with elegant design.", image: "imgs/f7.jpg" }
];

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const productId = getUrlParameter('productId');
const product = products.find(p => p.id == productId);

if (product) {
    document.getElementById('productName').innerText = product.name;
    document.getElementById('productBrand').innerText = product.brand;
    document.getElementById('productPrice').innerText = "$" + product.price;
    document.getElementById('productDescription').innerText = product.description;
    document.getElementById('productImage').src = product.image;
}

document.getElementById('addToCartBtn').addEventListener('click', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartProduct = {
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
    };

    const existingProductIndex = cart.findIndex(item => item.name === cartProduct.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push(cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
});

document.getElementById('buyNowBtn').addEventListener('click', function () {
    window.location.href = 'cart.html';
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalCount;
        cartCount.style.display = totalCount > 0 ? 'inline-block' : 'none';
    }
}

updateCartCount();
