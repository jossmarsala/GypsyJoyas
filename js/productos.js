const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? 'http://localhost:3001' : ''; // Relative for prod
const API_URL = `${API_BASE_URL}/api`;

// Función para formatear precio como moneda (AR)
function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-AR")}`;
}

// Helper para URLs de imagen
function obtenerUrlImagen(path) {
    if (!path || path === '') return 'assets/img/ui/placeholder-producto.png'; // New premium fallback
    if (path.startsWith('http')) return path; // Handles Vercel Blob URLs (https://...)
    if (path.startsWith('uploads/')) return `${API_BASE_URL}/${path}`; // Legacy local uploads
    return path; // Es un asset local relativo
}

// Función principal para cargar productos desde la API
async function cargarProductos(categoria) {
    try {
        // Fetch a la API con filtro de categoría
        const response = await fetch(`${API_URL}/products?category=${categoria}`);

        if (!response.ok) {
            throw new Error(`Error al cargar categoría ${categoria}`);
        }

        const productos = await response.json();

        // Filtrar por material (la API ya podría filtrar, pero por compatibilidad lo hacemos aquí o allá)
        // La API devuelve todo lo de la categoría. Filtramos por material en cliente para reutilizar lógica.
        const productosBronce = productos.filter(p => p.material.toLowerCase() === 'bronce');
        const productosAlpaca = productos.filter(p => p.material.toLowerCase() === 'alpaca');
        const productosCobre = productos.filter(p => p.material.toLowerCase() === 'cobre');

        // Renderizar en sus contenedores respectivos
        renderizarProductos(productosBronce, `${categoria}-bronce`);
        renderizarProductos(productosAlpaca, `${categoria}-alpaca`);
        renderizarProductos(productosCobre, `${categoria}-cobre`);

    } catch (error) {
        console.error(`Error al cargar productos de ${categoria}:`, error);
    }
}

// Función para generar el HTML y renderizar
function renderizarProductos(listaProductos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    // Buscar el subtítulo (label de material) que precede al contenedor
    // En el HTML actual, el label es el hermano anterior (p.catalog__subtitle)
    const labelMaterial = contenedor.previousElementSibling;

    if (listaProductos.length === 0) {
        contenedor.classList.add('u-hidden');
        if (labelMaterial && labelMaterial.classList.contains('catalog__subtitle')) {
            labelMaterial.classList.add('u-hidden');
        }
        return;
    }

    // Si hay productos, asegurar que sean visibles
    contenedor.classList.remove('u-hidden');
    if (labelMaterial && labelMaterial.classList.contains('catalog__subtitle')) {
        labelMaterial.classList.remove('u-hidden');
    }

    contenedor.innerHTML = '';
    const fragment = document.createDocumentFragment();

    listaProductos.forEach(producto => {
        const article = document.createElement('article');
        article.classList.add('product-card');

        const claseImagen = producto.claseImagen ? ` ${producto.claseImagen}` : '';
        const imgUrl = obtenerUrlImagen(producto.imagen);

        article.innerHTML = `
            <img class="product-card__image${claseImagen}" loading="lazy" width="300" height="300"
                src="${imgUrl}" alt="${producto.alt}">
            <h4 class="product-card__title">${producto.nombre}</h4>
            <p class="product-card__price">${formatearPrecio(producto.precio)}</p>
        `;

        fragment.appendChild(article);
    });

    contenedor.appendChild(fragment);
}

// Verificar modo mantenimiento
async function verificarMantenimiento() {
    try {
        const response = await fetch(`${API_URL}/settings/maintenance`);
        const data = await response.json();

        const overlay = document.getElementById('maintenance-overlay');
        if (overlay) {
            if (data.maintenanceMode) {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Bloquear scroll
            } else {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    } catch (error) {
        console.error("Error verificando mantenimiento:", error);
    }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    const categorias = ['aros', 'collares', 'anillos', 'pulseras', 'accesorios'];

    // 1. Cargar productos
    categorias.forEach(cat => cargarProductos(cat));

    // 2. Verificar mantenimiento
    verificarMantenimiento();
});
