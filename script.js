document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('#navbar');
    const cancelBtn = document.querySelector('.cancelBtn');

    // Toggle menu visibility
    function toggleNavbar() {
        navbar.classList.toggle('active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleNavbar);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', toggleNavbar);
    }

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
});

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('#navbar');
    const cancelBtn = document.querySelector('.cancelBtn');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function () {
            navbar.classList.toggle('active');
        });
    }

    if (cancelBtn && navbar) {
        cancelBtn.addEventListener('click', function () {
            navbar.classList.toggle('active');
        });
    }
});

