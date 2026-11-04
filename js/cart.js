/* ============================================
   STYLOS BARBER'S CLUB - Lógica del Carrito
   ============================================ */

const WHATSAPP_NUMBER = "59168307053";

let cart = JSON.parse(localStorage.getItem('stylos_cart') || '[]');

/* ---- GUARDAR EN LOCALSTORAGE ---- */
function saveCart() {
    localStorage.setItem('stylos_cart', JSON.stringify(cart));
}

/* ---- ABRIR / CERRAR PANEL ---- */
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

/* ---- AGREGAR AL CARRITO ---- */
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    renderCart();
    showToast(`✓ ${product.name} agregado al carrito`);
    updateCartCount();
}

/* ---- CAMBIAR CANTIDAD ---- */
function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCart();
    renderCart();
    updateCartCount();
}

/* ---- ELIMINAR ITEM ---- */
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

/* ---- VACIAR CARRITO ---- */
function clearCart() {
    if (cart.length === 0) return;
    if (confirm('¿Vaciar el carrito?')) {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
    }
}

/* ---- ACTUALIZAR CONTADOR ---- */
function updateCartCount() {
    const total = cart.reduce((sum, i) => sum + i.qty, 0);
    const el = document.getElementById('cart-count');
    if (el) {
        el.textContent = total;
        el.style.display = total > 0 ? 'inline-flex' : 'inline-flex';
    }
}

/* ---- RENDERIZAR CARRITO ---- */
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-price');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">🛒 Tu carrito está vacío.</p>';
        if (totalEl) totalEl.textContent = 'Bs. 0.00';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" id="cart-item-${item.id}">
            <img class="cart-item-img" src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Bs. ${(item.price * item.qty).toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Eliminar">×</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (totalEl) totalEl.textContent = `Bs. ${total.toFixed(2)}`;
}

/* ---- ENVIAR A WHATSAPP ---- */
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos primero.');
        return;
    }

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    let msg = "🛒 *PEDIDO — STYLOS BARBER'S CLUB*\n\n";
    msg += "━━━━━━━━━━━━━━━━━━━━\n";

    cart.forEach((item, idx) => {
        msg += `*${idx + 1}. ${item.name}*\n`;
        msg += `   Cantidad: ${item.qty}\n`;
        msg += `   Precio unitario: Bs. ${item.price.toFixed(2)}\n`;
        msg += `   Subtotal: Bs. ${(item.price * item.qty).toFixed(2)}\n\n`;
    });

    msg += "━━━━━━━━━━━━━━━━━━━━\n";
    msg += `💰 *TOTAL: Bs. ${total.toFixed(2)}*\n\n`;
    msg += "¡Hola! Me gustaría realizar este pedido. ¿Me pueden confirmar disponibilidad y forma de entrega? 😊";

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}

/* ---- TOAST NOTIFICACIÓN ---- */
function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.className = 'cart-toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<span class="toast-check">✓</span> ${message}`;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ---- INICIALIZAR ---- */
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
});
