'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт загружен');
    
    // Ключи для LocalStorage
    const STORAGE_KEYS = {
        GALLERY_LAST_VIEWED: 'gallery_last_viewed',
        DARK_MODE: 'dark_mode',
        FONT_SIZE: 'font_size'
    };

    // Инициализация прелоадера
    const initPreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        setTimeout(() => {
            preloader.classList.add('preloader--hidden');
            
            preloader.addEventListener('transitionend', function() {
                this.remove();
            });
        }, 1000);
    };

    // Сохранение данных в LocalStorage
    const saveToStorage = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Ошибка сохранения в LocalStorage:', e);
        }
    };

    // Получение данных из LocalStorage
    const getFromStorage = (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error('Ошибка чтения из LocalStorage:', e);
            return defaultValue;
        }
    };

    // Обработка изображения с подписью
    const initImageCaption = () => {
        const imageWrapper = document.querySelector('.about__image-wrapper');
        const imageCaption = document.querySelector('.image-caption');
        
        if (!imageWrapper || !imageCaption) return;
        
        const toggleCaption = (show) => {
            imageCaption.style.opacity = show ? '1' : '0';
            imageCaption.style.visibility = show ? 'visible' : 'hidden';
        };
        
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            imageWrapper.addEventListener('click', (e) => {
                e.preventDefault();
                const isVisible = imageCaption.style.opacity === '1';
                toggleCaption(!isVisible);
            });
            
            document.addEventListener('click', (e) => {
                if (!imageWrapper.contains(e.target)) {
                    toggleCaption(false);
                }
            });
        } else {
            imageWrapper.addEventListener('mouseenter', () => toggleCaption(true));
            imageWrapper.addEventListener('mouseleave', () => toggleCaption(false));
        }
    };

    // Навигационное меню
    const initNavigationMenu = () => {
        const sectionTitles = Array.from(document.querySelectorAll('section[id] h2.title')).map(title => ({
            text: title.textContent.trim(),
            id: title.closest('section').id
        }));

        if (sectionTitles.length === 0) return;

        const navContainer = document.createElement('div');
        navContainer.className = 'headings-nav';
        navContainer.innerHTML = `
            <h3 class="nav-title">Быстрая навигация</h3>
            <ul class="nav-list">
                ${sectionTitles.map(item => `
                    <li class="nav-item">
                        <a href="#${item.id}" class="nav-link">${item.text}</a>
                    </li>
                `).join('')}
            </ul>
        `;
        
        document.body.appendChild(navContainer);
    };

    // Основная навигация
    const initMainNavigation = () => {
        const navItems = [
            { text: "Главная", href: "#" },
            { text: "Обо мне", href: "#about" },
            { text: "Курсы", href: "#courses" },
            { text: "Материалы", href: "#materials" },
            { text: "Контакты", href: "#contacts" }
        ];

        const navContainer = document.getElementById('mainNavigation');
        if (!navContainer) return;

        navContainer.innerHTML = navItems.map(item => `
            <li class="nav-item">
                <a href="${item.href}" class="nav-link">${item.text}</a>
            </li>
        `).join('');

        navContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    };

    // Кнопка скролла вверх
    const initScrollButton = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Наверх';
        scrollBtn.setAttribute('aria-label', 'Наверх');
        document.body.appendChild(scrollBtn);
        
        const handleScroll = () => {
            scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Динамическая загрузка контента
    const loadDynamicContent = () => {
        const coursesData = [
            {
                icon: "📜",
                title: "Всемирная история",
                description: "Основные эпохи и ключевые события мировой истории. Для учащихся 5-9 классов.",
                buttonText: "Подробнее"
            },
            {
                icon: "🏛️",
                title: "История России",
                description: "От древности до современности. Для учащихся 6-11 классов.",
                buttonText: "Подробнее"
            },
            {
                icon: "✍️",
                title: "Подготовка к ЕГЭ/ОГЭ",
                description: "Разбор заданий, тесты и индивидуальные консультации.",
                buttonText: "Подробнее"
            }
        ];

        const coursesGrid = document.querySelector('.courses__grid');
        if (coursesGrid) {
            coursesGrid.innerHTML = coursesData.map(course => `
                <article class="course-card">
                    <div class="course-card__icon" aria-hidden="true">${course.icon}</div>
                    <h3 class="course-card__title">${course.title}</h3>
                    <p class="course-card__description">${course.description}</p>
                    <a href="#" class="course-card__button button button_theme_primary">${course.buttonText}</a>
                </article>
            `).join('');
        }

        const materialsData = [
            { name: "Конспект по Древнему миру (PDF)" },
            { name: "Таблица правителей России (XLSX)" },
            { name: "Хронология Второй мировой войны (PDF)" }
        ];

        const materialsList = document.querySelector('.materials__list');
        if (materialsList) {
            materialsList.innerHTML = materialsData.map(material => `
                <li class="materials__item">
                    <a href="#" class="materials__link">${material.name}</a>
                </li>
            `).join('');
        }

        const learningMaterialsData = [
            {
                badge: "5 класс",
                title: "Древний мир",
                description: "Конспекты, карты и тесты по истории Древнего Египта, Греции и Рима.",
                buttonText: "Скачать"
            },
            {
                badge: "6 класс",
                title: "Средние века",
                description: "Таблицы феодальной системы, крестовые походы, Возрождение.",
                buttonText: "Скачать"
            },
            {
                badge: "7 класс",
                title: "Новое время",
                description: "Великие географические открытия, реформация, абсолютизм.",
                buttonText: "Скачать"
            }
        ];

        const learningMaterialsGrid = document.querySelector('.learning-materials__grid');
        if (learningMaterialsGrid) {
            learningMaterialsGrid.innerHTML = learningMaterialsData.map(material => `
                <article class="material-card">
                    <span class="material-card__badge">${material.badge}</span>
                    <h3 class="material-card__title">${material.title}</h3>
                    <p class="material-card__description">${material.description}</p>
                    <a href="#" class="material-card__button button button_theme_primary">${material.buttonText}</a>
                </article>
            `).join('');
        }
    };

    // Загрузка и отображение галереи из JSON
    const initGallery = async () => {
        try {
            const response = await fetch('images.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const galleryData = await response.json();
            renderGallery(galleryData);
            
            // Сохраняем время последнего просмотра галереи
            saveToStorage(STORAGE_KEYS.GALLERY_LAST_VIEWED, new Date().toISOString());
        } catch (error) {
            console.error('Ошибка загрузки галереи:', error);
            const galleryGrid = document.getElementById('galleryGrid');
            if (galleryGrid) {
                galleryGrid.innerHTML = '<p class="error-message">Не удалось загрузить галерею. Пожалуйста, попробуйте позже.</p>';
            }
        }
    };

    // Рендеринг галереи с Swiper
    const renderGallery = (images) => {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid || !Array.isArray(images)) return;

        // Получаем последний просмотренный слайд из LocalStorage
        const lastViewedIndex = getFromStorage(STORAGE_KEYS.GALLERY_LAST_VIEWED_INDEX, 0);
        
        galleryGrid.innerHTML = images.map(image => `
            <div class="swiper-slide">
                <img src="${image.src}" alt="${image.alt || ''}" class="gallery__image" loading="lazy">
                ${image.caption ? `<div class="gallery__caption">${image.caption}</div>` : ''}
            </div>
        `).join('');

        const swiper = new Swiper('.gallerySwiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
            speed: 800,
            grabCursor: true,
            initialSlide: lastViewedIndex
        });

        // Сохраняем текущий слайд при изменении
        swiper.on('slideChange', () => {
            saveToStorage(STORAGE_KEYS.GALLERY_LAST_VIEWED_INDEX, swiper.realIndex);
        });
    };

    // Инициализация темы (темный/светлый режим)
    const initTheme = () => {
        const darkMode = getFromStorage(STORAGE_KEYS.DARK_MODE, false);
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        // Можно добавить кнопку переключения темы
    };

    // Инициализация всех компонентов
    const init = () => {
        initPreloader();
        initTheme();
        initImageCaption();
        initNavigationMenu();
        initMainNavigation();
        initScrollButton();
        loadDynamicContent();
        initGallery();
    };

    init();
});