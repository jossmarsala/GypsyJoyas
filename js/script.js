

'use strict';

(function () {
    const CONFIG = {
        categories: ['aros', 'collares', 'anillos', 'pulseras', 'accesorios'],
        animationDuration: 600,
        selectors: {
            loader: 'loader',
            navbar: 'navbarNav',
            navToggler: '.navbar__toggler',
            navLinks: '.navbar__link',
            modal: 'imageModal',
            modalImg: 'fullImage',
            modalInfo: 'modalInfo',
            prevBtn: 'modalPrev',
            nextBtn: 'modalNext',
            closeBtn: '.close'
        }
    };

    const Loader = {
        init() {
            window.addEventListener('load', () => {
                const loader = document.getElementById(CONFIG.selectors.loader);
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.style.display = 'none', 300);
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
            this.updateDisplay(allElements, false);

            const categoryData = { btn, arrow, allElements };

            btn.addEventListener('click', () => {
                const isActive = btn.classList.contains('active');
                const isMobile = window.innerWidth <= 768;

                if (isMobile) {
                    this.closeAllExcept(category);

                    if (!isActive) {
                        btn.classList.add('active');
                        allElements.forEach(el => {
                            el.classList.add('mostrar');
                            el.style.display = 'grid';
                            el.style.maxHeight = 'none';
                            el.style.opacity = '1';
                        });
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
                    if (!isActive) {
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
                const img = e.target.closest('.product-card__image');
                if (img) {
                    this.open(img);
                }
            });
        },

        createModal() {
            const modal = document.createElement('div');
            modal.id = CONFIG.selectors.modal;
            modal.className = 'modal';
            modal.innerHTML = `
                <button class="close" aria-label="Cerrar imagen">&times;</button>
                <button id="${CONFIG.selectors.prevBtn}" class="modal-nav modal-nav--prev" aria-label="Anterior">&lsaquo;</button>
                <div class="modal-container">
                    <img class="modal-content" id="${CONFIG.selectors.modalImg}" alt="Zoom producto">
                    <div id="${CONFIG.selectors.modalInfo}" class="modal-info"></div>
                </div>
                <button id="${CONFIG.selectors.nextBtn}" class="modal-nav modal-nav--next" aria-label="Siguiente">&rsaquo;</button>
            `;
            this.modalImg = modal.querySelector(`#${CONFIG.selectors.modalImg}`);
            this.modalInfo = modal.querySelector(`#${CONFIG.selectors.modalInfo}`);
            this.prevBtn = modal.querySelector(`#${CONFIG.selectors.prevBtn}`);
            this.nextBtn = modal.querySelector(`#${CONFIG.selectors.nextBtn}`);
            modal.querySelector('.close').addEventListener('click', () => this.close());
            this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
            this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });

            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-container')) this.close();
            });

            document.body.appendChild(modal);
            this.modal = modal;
        },

        open(clickedImg) {
            const grid = clickedImg.closest('.catalog__grid');
            if (!grid) return;

            this.currentGallery = Array.from(grid.querySelectorAll('.product-card__image'));
            this.currentIndex = this.currentGallery.indexOf(clickedImg);

            this.showProduct(this.currentIndex);

            this.modal.style.visibility = 'visible';
            requestAnimationFrame(() => this.modal.style.opacity = '1');
            this.keyHandler = (e) => {
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            };
            document.addEventListener('keydown', this.keyHandler);
        },

        showProduct(index) {
            const img = this.currentGallery[index];
            if (!img) return;

            this.modalImg.src = img.src;
            this.modalImg.alt = img.alt || '';
            const card = img.closest('.product-card');
            const title = card.querySelector('.product-card__title')?.innerText || '';
            const price = card.querySelector('.product-card__price')?.innerText || '';

            this.modalInfo.innerHTML = `
                <h3>${title}</h3>
                <p>${price}</p>
            `;
            this.currentIndex = index;
        },

        next() {
            let nextIndex = this.currentIndex + 1;
            if (nextIndex >= this.currentGallery.length) nextIndex = 0;
            this.showProduct(nextIndex);
        },

        prev() {
            let prevIndex = this.currentIndex - 1;
            if (prevIndex < 0) prevIndex = this.currentGallery.length - 1;
            this.showProduct(prevIndex);
        },

        close() {
            this.modal.style.opacity = '0';
            this.modal.addEventListener('transitionend', () => {
                this.modal.style.visibility = 'hidden';
                this.modalImg.src = '';
            }, { once: true });

            if (this.keyHandler) {
                document.removeEventListener('keydown', this.keyHandler);
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
window.scrollCategories = function (direction) {
    const container = document.getElementById('categoryContainer');
    if (!container) return;
    const cardOptions = container.querySelectorAll('.category-card');
    if (cardOptions.length === 0) return;
    const scrollAmount = cardOptions[0].clientWidth;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
};