
// Configuración de incremento de precios
const INCREMENTO = 0.07;

// Función para calcular el precio final con la lógica del negocio
function calcularPrecioFinal(precioBase) {
    let nuevoPrecio = Math.round(precioBase * (1 + INCREMENTO));

    let centenas = nuevoPrecio % 1000;
    if (![0, 200, 500, 800].includes(centenas)) {
        if (centenas < 200) {
            nuevoPrecio = nuevoPrecio - centenas + 200;
        } else if (centenas < 500) {
            nuevoPrecio = nuevoPrecio - centenas + 500;
        } else if (centenas < 800) {
            nuevoPrecio = nuevoPrecio - centenas + 800;
        } else {
            nuevoPrecio = nuevoPrecio - centenas + 1000;
        }
    }
    return nuevoPrecio;
}

// Función para formatear precio como moneda (AR)
function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-AR")}`;
}

// Función principal para cargar productos
async function cargarProductos(categoria) {
    try {
        const response = await fetch(`data/${categoria}.json`);
        if (!response.ok) {
            throw new Error(`No se pudo cargar la categoría ${categoria}`);
        }
        const productos = await response.json();

        // Filtrar por material
        const productosBronce = productos.filter(p => p.material.toLowerCase() === 'bronce');
        const productosAlpaca = productos.filter(p => p.material.toLowerCase() === 'alpaca');

        // Renderizar en sus contenedores respectivos
        renderizarProductos(productosBronce, `${categoria}-bronce`);
        renderizarProductos(productosAlpaca, `${categoria}-alpaca`);

    } catch (error) {
        console.error(`Error al cargar productos de ${categoria}:`, error);
    }
}

// Función para generar el HTML y renderizar
function renderizarProductos(listaProductos, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return; // Si no existe el contenedor (ej. no hay alpaca en esta cat), salimos

    // Limpiar contenedor por seguridad (aunque debería estar vacío)
    contenedor.innerHTML = '';

    // Generar fragmento para evitar multiples reflows
    const fragment = document.createDocumentFragment();

    listaProductos.forEach(producto => {
        const precioFinal = calcularPrecioFinal(producto.precio);
        let precioAnteriorHtml = '';

        if (producto.precioAnterior) {
            // Si hay precio anterior, también le aplicamos el aumento? 
            // Asumo que el tachado es histórico y no se calcula, O se calcula igual.
            // En el HTML original, el tachado también era estático.
            // Voy a dejar el tachado tal cual viene del JSON por ahora, o formatearlo si es número.
            const precioAnt = typeof producto.precioAnterior === 'number' ?
                formatearPrecio(producto.precioAnterior) : producto.precioAnterior;
            precioAnteriorHtml = `<p class="product-card__price--old">${precioAnt}</p>`;
        }

        const article = document.createElement('article');
        article.classList.add('product-card');

        // Lazy loading para imagen
        // Clase extra para imagen si existe (ej. filter-contrast)
        const claseImagen = producto.claseImagen ? ` ${producto.claseImagen}` : '';

        article.innerHTML = `
            <img class="product-card__image${claseImagen}" loading="lazy" width="300" height="300"
                src="${producto.imagen}" alt="${producto.alt}">
            <h4 class="product-card__title">${producto.nombre}</h4>
            ${precioAnteriorHtml}
            <p class="product-card__price">${formatearPrecio(precioFinal)}</p>
        `;

        fragment.appendChild(article);
    });

    contenedor.appendChild(fragment);
}

// Inicializar carga cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const categorias = ['aros', 'collares', 'anillos', 'pulseras', 'accesorios'];
    categorias.forEach(cat => cargarProductos(cat));
});
