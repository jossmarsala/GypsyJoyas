
// Ocultar loader cuanto esté cargado
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// Volver a cerrar menú
document.addEventListener('DOMContentLoaded', () => {
    const navbarNav = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = navbarNav.querySelectorAll('.nav-link');
    
    let hasClosedOnce = false; // Bandera para saber si se cerró una vez
  
    // Cuando se clickea el botón de hamburguesa
    navbarToggler.addEventListener('click', () => {
      if (navbarNav.classList.contains('open') && !hasClosedOnce) {
        // Si está abierto pero no se cerró antes, cerramos el menú
        navbarNav.classList.remove('open');
        navbarToggler.setAttribute('aria-expanded', 'false');
      } else {
        // Si está cerrado, lo abrimos y mantenemos abierto después
        navbarNav.classList.add('open');
        navbarToggler.setAttribute('aria-expanded', 'true');
        navbarNav.style.opacity = 1; // Aseguramos que la opacidad esté al 100%
      }
    });
  
    // Cuando se clickea cualquiera de los links del menú
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarNav.classList.contains('open')) {
          // Cuando se clickea un link, cerramos el menú
          navbarNav.classList.remove('open');
          navbarToggler.setAttribute('aria-expanded', 'false');
          hasClosedOnce = true; // Marcamos que ya se cerró el menú
        }
      });
    });
  });
  
  
  
// Desplegar sección productos
document.addEventListener("DOMContentLoaded", function () {
    let desplegar = document.getElementById("btnseccion");
    let secciones = document.getElementsByClassName("productos");
    let textos = document.getElementsByClassName("pseccion");
    let flecha = document.getElementById("flecha");

    desplegar.addEventListener("click", function () {
        flecha.classList.toggle("animar");

        for (let seccion of secciones) {
            if (seccion.classList.contains("mostrar")) {
                seccion.style.maxHeight = "0";
                seccion.style.opacity = "0";
                setTimeout(() => seccion.classList.remove("mostrar"), 500);
            } else {
                seccion.classList.add("mostrar");
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
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    const style = document.createElement("style");
    style.innerHTML = `
      .modal {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.25s linear;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(229, 226, 204, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .modal-content {
        max-width: 90%;
        max-height: 90vh;
        border-radius: 5px;
      }
      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 30px;
        color: #3c2415;
        background: none;
        border: none;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
});
