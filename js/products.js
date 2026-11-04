/* ============================================
   STYLOS BARBER'S CLUB - Datos de Productos y Servicios
   ============================================ */

const PRODUCTS = [
    {
        id: 1,
        name: "Pomada Fijadora Premium",
        description: "Fijación fuerte, brillo natural.",
        price: 45,
        badge: "MÁS VENDIDO",
        img: "productos/premium.jpeg"
    },
    {
        id: 2,
        name: "Shampoo Anticaída",
        description: "Limpieza profunda y fortalecimiento.",
        price: 38,
        badge: null,
        img: "productos/shampo anticaida.jpeg"
    },
    {
        id: 3,
        name: "Aceite para Barba",
        description: "Hidratación y brillo para la barba.",
        price: 52,
        badge: "NUEVO",
        img: "productos/aceite.jpeg"
    },
    {
        id: 4,
        name: "Gel Capilar Control",
        description: "Definición y control todo el día.",
        price: 30,
        badge: null,
        img: "productos/gel.jpeg"
    },
    {
        id: 5,
        name: "Crema para Peinar",
        description: "Suave fijación con acabado mate.",
        price: 42,
        badge: null,
        img: "productos/crema wax.jpeg"
    },
    {
        id: 6,
        name: "Aftershave Revitalizante",
        description: "Refresca y calma después del afeitado.",
        price: 58,
        badge: "PREMIUM",
        img: "productos/Aftershave Revitalizante.jpeg"
    },
    {
        id: 7,
        name: "Cera Modeladora",
        description: "Textura flexible, resultado profesional.",
        price: 35,
        badge: null,
        img: "productos/cera modeladora .jpeg"
    },
    {
        id: 8,
        name: "Kit Completo de Cuidado",
        description: "Todo lo que necesitas en un solo kit.",
        price: 120,
        badge: "OFERTA",
        img: "productos/kit cuidado.jpeg"
    }
];

const SERVICES = [
    {
        id: "clasico",
        name: "CORTE CLÁSICO",
        description: "Un estilo atemporal que nunca pasa de moda. Ideal para una imagen formal y elegante.",
        price: "Bs. 40",
        img: "servicios/clasico.jpeg"
    },
    {
        id: "moderno",
        name: "CORTE MODERNO",
        description: "Estilos actuales y personalizados adaptados a tu personalidad.",
        price: "Bs. 50",
        img: "servicios/moderno.jpeg"
    },
    {
        id: "degradado",
        name: "DEGRADADO",
        description: "Acabados modernos con transiciones suaves y perfectamente definidas.",
        price: "Bs. 55",
        img: "servicios/degradado.jpeg"
    },
    {
        id: "infantil",
        name: "CORTE INFANTIL",
        description: "Atención especial y cuidadosa para los más pequeños del hogar.",
        price: "Bs. 30",
        img: "servicios/infantil.jpeg"
    },
    {
        id: "barba",
        name: "ARREGLO DE BARBA",
        description: "Delineado, recorte y cuidado de barba con técnicas profesionales.",
        price: "Bs. 35",
        img: "servicios/arreglo de barba.jpeg"
    },
    {
        id: "completo",
        name: "CORTE + BARBA",
        description: "Servicio completo: corte de cabello y arreglo de barba en una sola visita.",
        price: "Bs. 75",
        img: "servicios/corte-barba.jpeg"
    },
    {
        id: "afeitado",
        name: "AFEITADO CLÁSICO",
        description: "Afeitado tradicional con navaja, toalla caliente y aftershave.",
        price: "Bs. 45",
        img: "servicios/afeitado.jpeg"
    },
    {
        id: "tratamiento",
        name: "TRATAMIENTO CAPILAR",
        description: "Hidratación profunda y revitalización para el cabello.",
        price: "Bs. 60",
        img: "servicios/tratamiento capilar.jpeg"
    }
];

/* ---- RENDERIZAR PRODUCTOS ---- */
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map(p => `
        <div class="product">
            <div class="product-img-wrap">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <span class="price">Bs. ${p.price.toFixed(2)}</span>
                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    + AGREGAR AL CARRITO
                </button>
            </div>
        </div>
    `).join('');
}

/* ---- RENDERIZAR SERVICIOS ---- */
function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = SERVICES.map(s => `
        <div class="service">
            <div class="service-img-wrap">
                <img src="${s.img}" alt="${s.name}" loading="lazy">
            </div>
            <div class="service-body">
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <span class="service-price">${s.price}</span>
            </div>
        </div>
    `).join('');
}

/* ---- POBLAR SELECT DE SERVICIOS EN RESERVAS ---- */
function populateServiceSelect() {
    const sel = document.getElementById('servicioElegido');
    if (!sel) return;

    SERVICES.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.name} — ${s.price}`;
        sel.appendChild(opt);
    });
}

/* ---- INICIALIZAR ---- */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderServices();
    populateServiceSelect();
});
