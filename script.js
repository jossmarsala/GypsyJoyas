
// Ocultar loader cuanto esté cargado
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// Aumentar precios según porcentaje
const incremento = 0.07;

document.addEventListener("DOMContentLoaded", function () {
    const precios = document.querySelectorAll(".precio");

    precios.forEach(el => {
        let precioTexto = el.textContent.replace(/[^\d]/g, "");
        let precioNumero = parseInt(precioTexto, 10);

        let nuevoPrecio = Math.round(precioNumero * (1 + incremento));

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

        el.textContent = `$${nuevoPrecio.toLocaleString("es-AR")}`;
    });
});

// Volver a cerrar menú
document.addEventListener('DOMContentLoaded', () => {
    const navbarNav = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = navbarNav.querySelectorAll('.nav-link');

    // Navbar logical simplified
    navbarToggler.addEventListener('click', () => {
        navbarNav.classList.toggle('open');
        const isOpen = navbarNav.classList.contains('open');
        navbarToggler.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('open');
            navbarToggler.setAttribute('aria-expanded', 'false');
        });
    });
});

// Desplegar sección aros
document.addEventListener("DOMContentLoaded", function () {
    let desplegar = document.getElementById("btnseccionaros");
    let secciones = document.getElementsByClassName("productosaros");
    let textos = document.getElementsByClassName("pseccionaros");
    let flecha = document.getElementById("flechaaros");

    function actualizarPosicion() {
        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.display = "grid";
            } else {
                seccion.style.display = "none";
            }
        }
    }

    desplegar.addEventListener("click", function () {
        flecha.classList.toggle("animar");

        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.maxHeight = "0";
                seccion.style.opacity = "0";
                setTimeout(() => {
                    seccion.classList.remove("mostrar");
                    actualizarPosicion();
                }, 500);
            } else {
                seccion.classList.add("mostrar");
                actualizarPosicion();
                seccion.style.maxHeight = seccion.scrollHeight + "px";
                seccion.style.opacity = "1";
            }
        }

        for (let texto of textos) {
            if (texto.classList.contains("mostrar")) {
                texto.style.maxHeight = "0";
                texto.style.opacity = "0";
                setTimeout(() => texto.classList.remove("mostrar"), 500);
            } else {
                texto.classList.add("mostrar");
                texto.style.maxHeight = texto.scrollHeight + "px";
                texto.style.opacity = "1";
            }
        }
    });

    actualizarPosicion();
});

// Desplegar sección collares
document.addEventListener("DOMContentLoaded", function () {
    let desplegar = document.getElementById("btnseccioncollares");
    let secciones = document.getElementsByClassName("productoscollares");
    let textos = document.getElementsByClassName("pseccioncollares");
    let flecha = document.getElementById("flechacollares");

    function actualizarPosicion() {
        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.display = "grid";
            } else {
                seccion.style.display = "none";
            }
        }
    }

    desplegar.addEventListener("click", function () {
        flecha.classList.toggle("animar");

        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.maxHeight = "0";
                seccion.style.opacity = "0";
                setTimeout(() => {
                    seccion.classList.remove("mostrar");
                    actualizarPosicion();
                }, 500);
            } else {
                seccion.classList.add("mostrar");
                actualizarPosicion();
                seccion.style.maxHeight = seccion.scrollHeight + "px";
                seccion.style.opacity = "1";
            }
        }

        for (let texto of textos) {
            if (texto.classList.contains("mostrar")) {
                texto.style.maxHeight = "0";
                texto.style.opacity = "0";
                setTimeout(() => texto.classList.remove("mostrar"), 500);
            } else {
                texto.classList.add("mostrar");
                texto.style.maxHeight = texto.scrollHeight + "px";
                texto.style.opacity = "1";
            }
        }
    });

    actualizarPosicion();
});

// Desplegar sección anillos
document.addEventListener("DOMContentLoaded", function () {
    let desplegar = document.getElementById("btnseccionanillos");
    let secciones = document.getElementsByClassName("productosanillos");
    let textos = document.getElementsByClassName("pseccionanillos");
    let flecha = document.getElementById("flechaanillos");

    function actualizarPosicion() {
        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.display = "grid";
            } else {
                seccion.style.display = "none";
            }
        }
    }

    desplegar.addEventListener("click", function () {
        flecha.classList.toggle("animar");

        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.maxHeight = "0";
                seccion.style.opacity = "0";
                setTimeout(() => {
                    seccion.classList.remove("mostrar");
                    actualizarPosicion();
                }, 500);
            } else {
                seccion.classList.add("mostrar");
                actualizarPosicion();
                seccion.style.maxHeight = seccion.scrollHeight + "px";
                seccion.style.opacity = "1";
            }
        }

        for (let texto of textos) {
            if (texto.classList.contains("mostrar")) {
                texto.style.maxHeight = "0";
                texto.style.opacity = "0";
                setTimeout(() => texto.classList.remove("mostrar"), 500);
            } else {
                texto.classList.add("mostrar");
                texto.style.maxHeight = texto.scrollHeight + "px";
                texto.style.opacity = "1";
            }
        }
    });

    actualizarPosicion();
});

// Desplegar sección pulseras
document.addEventListener("DOMContentLoaded", function () {
    let desplegar = document.getElementById("btnseccionpulseras");
    let secciones = document.getElementsByClassName("productospulseras");
    let textos = document.getElementsByClassName("pseccionpulseras");
    let flecha = document.getElementById("flechapulseras");

    function actualizarPosicion() {
        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.display = "grid";
            } else {
                seccion.style.display = "none";
            }
        }
    }

    desplegar.addEventListener("click", function () {
        flecha.classList.toggle("animar");

        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.maxHeight = "0";
                seccion.style.opacity = "0";
                setTimeout(() => {
                    seccion.classList.remove("mostrar");
                    actualizarPosicion();
                }, 500);
            } else {
                seccion.classList.add("mostrar");
                actualizarPosicion();
                seccion.style.maxHeight = seccion.scrollHeight + "px";
                seccion.style.opacity = "1";
            }
        }

        for (let texto of textos) {
            if (texto.classList.contains("mostrar")) {
                texto.style.maxHeight = "0";
                texto.style.opacity = "0";
                setTimeout(() => texto.classList.remove("mostrar"), 500);
            } else {
                texto.classList.add("mostrar");
                texto.style.maxHeight = texto.scrollHeight + "px";
                texto.style.opacity = "1";
            }
        }
    });

    actualizarPosicion();
});


// Desplegar sección accesorios
document.addEventListener("DOMContentLoaded", function () {
    let desplegar = document.getElementById("btnseccionaccesorios");
    let secciones = document.getElementsByClassName("productosaccesorios");
    let textos = document.getElementsByClassName("pseccionaccesorios");
    let flecha = document.getElementById("flechaaccesorios");

    function actualizarPosicion() {
        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.display = "grid";
            } else {
                seccion.style.display = "none";
            }
        }
    }

    desplegar.addEventListener("click", function () {
        flecha.classList.toggle("animar");

        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.maxHeight = "0";
                seccion.style.opacity = "0";
                setTimeout(() => {
                    seccion.classList.remove("mostrar");
                    actualizarPosicion();
                }, 500);
            } else {
                seccion.classList.add("mostrar");
                actualizarPosicion();
                seccion.style.maxHeight = seccion.scrollHeight + "px";
                seccion.style.opacity = "1";
            }
        }

        for (let texto of textos) {
            if (texto.classList.contains("mostrar")) {
                texto.style.maxHeight = "0";
                texto.style.opacity = "0";
                setTimeout(() => texto.classList.remove("mostrar"), 500);
            } else {
                texto.classList.add("mostrar");
                texto.style.maxHeight = texto.scrollHeight + "px";
                texto.style.opacity = "1";
            }
        }
    });

    actualizarPosicion();
});

// Lightbox, ver imagen
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.createElement("div");
    modal.id = "imageModal";
    modal.classList.add("modal");
    modal.innerHTML = `
      <button class="close" aria-label="Close">&times;</button>
      <img class="modal-content" id="fullImage">
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector("#fullImage");
    const closeButton = modal.querySelector(".close");

    document.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("imgprod")) {
            showModal(target);
        }
    });

    function showModal(img) {
        modal.style.visibility = "visible";
        requestAnimationFrame(() => {
            modal.style.opacity = "1";
        });
        modalImg.src = img.src;
        document.addEventListener("keydown", handleEscape, false);
    }

    function closeModal() {
        modal.style.opacity = "0";
        modal.addEventListener(
            "transitionend",
            () => {
                modal.style.visibility = "hidden";
            },
            { once: true }
        );
        document.removeEventListener("keydown", handleEscape, false);
    }

    function handleEscape(event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal();
        }
    }

    closeButton.addEventListener("click", closeModal);
    document.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // CSS injection removed (moved to estilos.css)
});

// Instagram & Android Detection
(function () {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isInstagram = ua.includes('Instagram');
    const isAndroid = /android/i.test(ua);

    if (isInstagram && isAndroid) {
        setTimeout(() => {
            window.location.href = "intent://gypsy-joyas.vercel.app#Intent;scheme=https;package=com.android.chrome;end;";
        }, 500);
    }
})();

// Anime.js Initialization
document.addEventListener("DOMContentLoaded", function () {
    // Check if anime is defined (loaded via CDN in HTML)
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.animacion',
            easing: 'easeInQuad',
            opacity: 1,
            duration: 700,
            delay: 500
        });
    }
});

// Desktop blocker removed








