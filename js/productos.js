const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? 'http://localhost:3001' : '';
const API_URL = `${API_BASE_URL}/api`;
function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-AR")}`;
}
function obtenerUrlImagen(path) {
    if (!path || path === '') return 'assets/img/ui/placeholder-producto.png';
    if (path.startsWith('http')) return path;
    if (path.startsWith('uploads/')) return `${API_BASE_URL}/${path}`;
    return path;
}
async function cargarProductos(categoria) {
    try {
        const response = await fetch(`${API_URL}/products?category=${categoria}`);

        if (!response.ok) {
            throw new Error(`Error al cargar categoría ${categoria}`);
        }

        const productos = await response.json();
        const productosBronce = productos.filter(p => p.material.toLowerCase() === 'bronce');
        const productosAlpaca = productos.filter(p => p.material.toLowerCase() === 'alpaca');
        const productosCobre = productos.filter(p => p.material.toLowerCase() === 'cobre');
        renderizarProductos(productosBronce, `${categoria}-bronce`);
        renderizarProductos(productosAlpaca, `${categoria}-alpaca`);
        renderizarProductos(productosCobre, `${categoria}-cobre`);

    } catch (error) {
        console.error(`Error al cargar productos de ${categoria}:`, error);
    }
}
function renderizarProductos(listaProductos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    const labelMaterial = contenedor.previousElementSibling;

    if (listaProductos.length === 0) {
        contenedor.classList.add('u-hidden');
        if (labelMaterial && labelMaterial.classList.contains('catalog__subtitle')) {
            labelMaterial.classList.add('u-hidden');
        }
        return;
    }
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
async function verificarMantenimiento() {
    try {
        const response = await fetch(`${API_URL}/settings/maintenance`);
        const data = await response.json();

        const container = document.getElementById('maintenance-container');
        let overlay = document.getElementById('maintenance-overlay');

        if (data.maintenanceMode) {
            if (!overlay && container) {
                const comment = Array.from(container.childNodes).find(node => node.nodeType === 8);
                if (comment) {
                    const content = comment.nodeValue.replace('Maintenance Overlay', '').trim();
                    container.innerHTML = content;
                    overlay = document.getElementById('maintenance-overlay');
                }
            }

            if (overlay) {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        } else {
            if (overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    } catch (error) {
        console.error("Error verificando mantenimiento:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const categorias = ['aros', 'collares', 'anillos', 'pulseras', 'accesorios'];
    categorias.forEach(cat => cargarProductos(cat));
    verificarMantenimiento();
});
