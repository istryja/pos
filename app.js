let products = [
    { id: 1, name: 'Apple', price: 0.5, barcode: '12345' },
    { id: 2, name: 'Banana', price: 0.3, barcode: '23456' },
    { id: 3, name: 'Milk', price: 1.5, barcode: '34567' },
    { id: 4, name: 'Bread', price: 2.0, barcode: '45678' },
    { id: 5, name: 'Eggs', price: 3.0, barcode: '56789' }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('POS System loaded');
    console.log('Products loaded:', products);
    
    // Now that products are loaded locally, you can proceed with your normal search and add-to-cart functionality.
});


// Cart array to store added items
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('POS System loaded');
    
    // Correcting event handlers
    window.showSearchResults = function() {
        const searchTerm = document.getElementById('product-search').value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = ''; // Clear previous results
        searchResults.style.display = 'none'; // Hide initially

        if (searchTerm.length > 0) {
            const matchingProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

            if (matchingProducts.length > 0) {
                matchingProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
                    resultItem.onclick = () => addToCart(product);
                    searchResults.appendChild(resultItem);
                });
                searchResults.style.display = 'block'; // Show results if matches found
            }
        }
    };

    window.processPayment = function(method) {
        console.log(`Processing payment via ${method}`);
        // Implement payment logic here
    };
});

// Function to add a product to the cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    calculateTotal();

    // Hide search results and clear the search input
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('product-search').value = '';
}

// Function to update the cart display
function updateCartDisplay() {
    const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = ''; // Clear the existing cart display

    cart.forEach(item => {
        const row = cartTable.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity(${item.id})">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
    });
}

// Function to increase quantity
function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
        updateCartDisplay();
        calculateTotal();
    }
}

// Function to decrease quantity
function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity--;
    } else {
        removeFromCart(productId);
    }
    updateCartDisplay();
    calculateTotal();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    calculateTotal();
}

// Function to calculate the total
function calculateTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1; // Assuming 10% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}
