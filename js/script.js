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
            navToggler: '.navbar__toggler',
            navLinks: '.navbar__link',
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
            this.categoryElements = {};
            CONFIG.categories.forEach(cat => {
                this.categoryElements[cat] = this.setupCategory(cat);
            });
        },

        setupCategory(category) {
            const btn = document.getElementById(`btnseccion${category}`);
            const arrow = document.getElementById(`flecha${category}`);
            const sections = Array.from(document.getElementsByClassName(`productos${category}`));
            const titles = Array.from(document.getElementsByClassName(`pseccion${category}`));
            const allElements = [...sections, ...titles];

            if (!btn) return null;

            // Initial State: Ensure hidden elements are display:none
            this.updateDisplay(allElements, false);

            const categoryData = { btn, arrow, allElements };

            btn.addEventListener('click', () => {
                const isActive = btn.classList.contains('active');
                const isMobile = window.innerWidth <= 768; // Check if mobile view

                if (isMobile) {
                    // ON MOBILE: Do not trigger accordion folds.
                    // Just show the products grid instantly and scroll down to them.
                    this.closeAllExcept(category);

                    if (!isActive) {
                        btn.classList.add('active');
                        // Show products without height animation
                        allElements.forEach(el => {
                            el.classList.add('mostrar');
                            el.style.display = 'grid';
                            el.style.maxHeight = 'none'; // Prevent max-height animation capping
                            el.style.opacity = '1';
                        });

                        // Scroll slightly down to make products visible
                        setTimeout(() => {
                            const firstProductSection = sections[0];
                            if (firstProductSection) {
                                firstProductSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 50);

                    } else {
                        btn.classList.remove('active');
                        allElements.forEach(el => {
                            el.classList.remove('mostrar');
                            el.style.display = 'none';
                        });
                    }

                } else {
                    // ON DESKTOP: Run standard accordion JS
                    if (!isActive) {
                        // Close all others first
                        this.closeAllExcept(category);
                        this.expand(allElements);
                        btn.classList.add('active');
                        if (arrow) arrow.classList.add('animar');
                        btn.setAttribute('aria-expanded', 'true');
                    } else {
                        this.collapse(allElements);
                        btn.classList.remove('active');
                        if (arrow) arrow.classList.remove('animar');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            return categoryData;
        },

        closeAllExcept(activeCategory) {
            Object.keys(this.categoryElements).forEach(cat => {
                if (cat !== activeCategory && this.categoryElements[cat]) {
                    const { btn, arrow, allElements } = this.categoryElements[cat];
                    if (btn.classList.contains('active')) {
                        this.collapse(allElements);
                        btn.classList.remove('active');
                        if (arrow) arrow.classList.remove('animar');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        },

        expand(elements) {
            elements.forEach(el => {
                el.classList.add('mostrar');
                el.style.display = 'grid';

                const height = el.scrollHeight;
                el.style.maxHeight = `${height}px`;
                el.style.opacity = '1';

                const onTransitionEnd = () => {
                    if (el.classList.contains('mostrar')) {
                        el.style.maxHeight = 'none';
                    }
                    el.removeEventListener('transitionend', onTransitionEnd);
                };
                el.addEventListener('transitionend', onTransitionEnd);
            });
        },

        collapse(elements) {
            elements.forEach(el => {
                el.style.maxHeight = `${el.scrollHeight}px`;
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
                if (e.target.classList.contains('product-card__image')) {
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

// =========================================
// Mobile Horizontal Scrolling function
// =========================================
window.scrollCategories = function (direction) {
    const container = document.getElementById('categoryContainer');
    if (!container) return;

    // Scroll by roughly the width of one card + gap
    const cardOptions = container.querySelectorAll('.category-card');
    if (cardOptions.length === 0) return;

    // Calculate one scroll move
    const scrollAmount = cardOptions[0].clientWidth;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
};