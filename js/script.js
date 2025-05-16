'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт загружен');
    
    // Инициализация прелоадера
    const initPreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        // Задержка для демонстрации (можно убрать)
        setTimeout(() => {
            preloader.classList.add('preloader--hidden');
            
            // Удаляем прелоадер из DOM после анимации
            preloader.addEventListener('transitionend', function() {
                this.remove();
            });
        }, 1000); // Время в миллисекундах
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

        // Плавный скролл
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
        handleScroll(); // Инициализация начального состояния
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Динамическая загрузка контента
    const loadDynamicContent = () => {
        // Курсы
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

        // Материалы
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

        // Обучающие материалы
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
        } catch (error) {
            console.error('Ошибка загрузки галереи:', error);
            const galleryGrid = document.getElementById('galleryGrid');
            if (galleryGrid) {
                galleryGrid.innerHTML = '<p class="error-message">Не удалось загрузить галерею. Пожалуйста, попробуйте позже.</p>';
            }
        }
    };

    // Рендеринг галереи
    const renderGallery = (images) => {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid || !Array.isArray(images)) return;

        galleryGrid.innerHTML = images.map(image => `
            <figure class="gallery__item">
                <img src="${image.src}" alt="${image.alt || ''}" class="gallery__image" loading="lazy">
                <figcaption class="gallery__caption">${image.caption || ''}</figcaption>
            </figure>
        `).join('');
    };

    // Инициализация всех компонентов
    const init = () => {
        initPreloader();
        initImageCaption();
        initNavigationMenu();
        initMainNavigation();
        initScrollButton();
        loadDynamicContent();
        initGallery();
    };

    init();
});