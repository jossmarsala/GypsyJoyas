/**
 * Gypsy Joyas Main Script
 * Refactored for performance, maintainability, and accessibility.
 * @version 2.0.0
 */

'use strict';

(function () {
    // =========================================
    // Constants & Config
    // =========================================
    const CONFIG = {
        categories: ['aros', 'collares', 'anillos', 'pulseras', 'accesorios'],
        animationDuration: 600, // Fallback, we prefer transitionend
        selectors: {
            loader: 'loader',
            navbar: 'navbarNav',
            navToggler: '.navbar-toggler',
            navLinks: '.nav-link',
            modal: 'imageModal',
            modalImg: 'fullImage',
            closeBtn: '.close'
        }
    };

    // =========================================
    // Core Modules
    // =========================================

    const Loader = {
        init() {
            window.addEventListener('load', () => {
                const loader = document.getElementById(CONFIG.selectors.loader);
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.style.display = 'none', 300); // Smooth fade out
                }
            });
        }
    };

    const Navbar = {
        init() {
            const navbarNav = document.getElementById(CONFIG.selectors.navbar);
            const navbarToggler = document.querySelector(CONFIG.selectors.navToggler);
            const navLinks = document.querySelectorAll(CONFIG.selectors.navLinks);

            if (!navbarNav || !navbarToggler) return;

            const toggleMenu = () => {
                const isOpen = navbarNav.classList.toggle('open');
                navbarToggler.setAttribute('aria-expanded', isOpen);
            };

            const closeMenu = () => {
                if (navbarNav.classList.contains('open')) {
                    navbarNav.classList.remove('open');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            };

            navbarToggler.addEventListener('click', toggleMenu);
            navLinks.forEach(link => link.addEventListener('click', closeMenu));
        }
    };

    const ProductsAccordion = {
        init() {
            CONFIG.categories.forEach(cat => this.setupCategory(cat));
        },

        setupCategory(category) {
            const btn = document.getElementById(`btnseccion${category}`);
            const arrow = document.getElementById(`flecha${category}`);
            const sections = Array.from(document.getElementsByClassName(`productos${category}`));
            const titles = Array.from(document.getElementsByClassName(`pseccion${category}`));
            const allElements = [...sections, ...titles];

            if (!btn || !arrow) return;

            // Initial State: Ensure hidden elements are display:none
            this.updateDisplay(allElements, false);

            btn.addEventListener('click', () => {
                const isExpanding = !arrow.classList.contains('animar');

                // Toggle Arrow & Aria
                arrow.classList.toggle('animar', isExpanding);
                btn.setAttribute('aria-expanded', isExpanding);

                if (isExpanding) {
                    this.expand(allElements);
                } else {
                    this.collapse(allElements);
                }
            });
        },

        expand(elements) {
            elements.forEach(el => {
                el.classList.add('mostrar');
                el.style.display = 'grid'; // Or block/flex based on CSS, but logic says grid/block

                // Force Clean DOM Read for reflow
                const height = el.scrollHeight;

                el.style.maxHeight = `${height}px`;
                el.style.opacity = '1';

                // After transition, clear max-height so it can grow if content changes (responsiveness)
                const onTransitionEnd = () => {
                    if (el.classList.contains('mostrar')) {
                        el.style.maxHeight = 'none'; // Allow flexible height
                    }
                    el.removeEventListener('transitionend', onTransitionEnd);
                };
                el.addEventListener('transitionend', onTransitionEnd);
            });
        },

        collapse(elements) {
            elements.forEach(el => {
                // To animate TO 0, we must first set it back to a fixed pixel value
                // because you can't transition from "none" or "auto" to 0.
                el.style.maxHeight = `${el.scrollHeight}px`;

                // Force reflow
                void el.offsetWidth;

                el.classList.remove('mostrar');
                el.style.maxHeight = '0';
                el.style.opacity = '0';

                const onTransitionEnd = () => {
                    if (!el.classList.contains('mostrar')) {
                        el.style.display = 'none';
                    }
                    el.removeEventListener('transitionend', onTransitionEnd);
                };
                el.addEventListener('transitionend', onTransitionEnd);
            });
        },

        updateDisplay(elements, show) {
            elements.forEach(el => {
                el.style.display = show ? 'grid' : 'none';
            });
        }
    };

    const Lightbox = {
        init() {
            this.createModal();
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('imgprod')) {
                    this.open(e.target.src, e.target.alt);
                }
            });
        },

        createModal() {
            const modal = document.createElement('div');
            modal.id = CONFIG.selectors.modal;
            modal.className = 'modal';
            modal.innerHTML = `
                <button class="close" aria-label="Cerrar imagen">&times;</button>
                <img class="modal-content" id="${CONFIG.selectors.modalImg}" alt="Zoom producto">
            `;

            // Close logic
            modal.querySelector('.close').addEventListener('click', () => this.close());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.close();
            });

            document.body.appendChild(modal);
            this.modal = modal;
            this.modalImg = modal.querySelector(`#${CONFIG.selectors.modalImg}`);
        },

        open(src, alt) {
            this.modalImg.src = src;
            this.modalImg.alt = alt || '';
            this.modal.style.visibility = 'visible';
            requestAnimationFrame(() => this.modal.style.opacity = '1');

            // Bind Escape key
            this.escapeHandler = (e) => {
                if (e.key === 'Escape') this.close();
            };
            document.addEventListener('keydown', this.escapeHandler);
        },

        close() {
            this.modal.style.opacity = '0';
            this.modal.addEventListener('transitionend', () => {
                this.modal.style.visibility = 'hidden';
                this.modalImg.src = ''; // Clear memory
            }, { once: true });

            if (this.escapeHandler) {
                document.removeEventListener('keydown', this.escapeHandler);
            }
        }
    };

    const AppUtils = {
        checkDeepLink() {
            const ua = navigator.userAgent || navigator.vendor || window.opera;
            if (ua.includes('Instagram') && /android/i.test(ua)) {
                setTimeout(() => {
                    window.location.href = "intent://gypsy-joyas.vercel.app#Intent;scheme=https;package=com.android.chrome;end;";
                }, 500);
            }
        }
    };

    // =========================================
    // Initialization
    // =========================================

    function initApp() {
        Loader.init();
        Navbar.init();
        ProductsAccordion.init();
        Lightbox.init();
        AppUtils.checkDeepLink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();