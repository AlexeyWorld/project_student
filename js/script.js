'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт загружен');
    
    // Инициализация прелоадера
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        const content = document.getElementById('content');
        
        if (!preloader || !content) return;
        
        preloader.style.display = 'flex';
        
        setTimeout(() => {
            preloader.classList.add('fade-out');
            content.classList.add('show');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    };

    // Обработка изображения с подписью
    const initImageCaption = () => {
        const imageWrapper = document.querySelector('.about__image-wrapper');
        const imageCaption = document.querySelector('.image-caption');
        
        if (!imageWrapper || !imageCaption) return;
        
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            imageWrapper.addEventListener('click', (e) => {
                e.preventDefault();
                const isVisible = imageCaption.style.opacity === '1';
                imageCaption.style.opacity = isVisible ? '0' : '1';
                imageCaption.style.visibility = isVisible ? 'hidden' : 'visible';
            });
            
            document.addEventListener('click', (e) => {
                if (!imageWrapper.contains(e.target)) {
                    imageCaption.style.opacity = '0';
                    imageCaption.style.visibility = 'hidden';
                }
            });
        } else {
            imageWrapper.addEventListener('mouseenter', () => {
                imageCaption.style.opacity = '1';
                imageCaption.style.visibility = 'visible';
            });
            
            imageWrapper.addEventListener('mouseleave', () => {
                imageCaption.style.opacity = '0';
                imageCaption.style.visibility = 'hidden';
            });
        }
    };

    // Навигационное меню
    const initNavigationMenu = () => {
        const sectionTitles = Array.from(document.querySelectorAll('section[id] h2.title')).map(title => ({
            text: title.textContent,
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
        
        const style = document.createElement('style');
        style.textContent = `
            .headings-nav {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-width: 250px;
                z-index: 100;
            }
            .nav-title {
                margin-top: 0;
                color: #2c3e50;
                font-size: 1.2rem;
            }
            .nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .nav-item {
                margin-bottom: 8px;
            }
            .nav-link {
                color: #3498db;
                text-decoration: none;
                transition: color 0.3s;
            }
            .nav-link:hover {
                color: #2980b9;
            }
        `;
        document.head.appendChild(style);
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

        navItems.forEach(item => {
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.innerHTML = `<a href="${item.href}" class="nav-link">${item.text}</a>`;
            navContainer.appendChild(navItem);
        });

        // Плавный скролл
        navContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                if (targetId !== '#') {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
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
        document.body.appendChild(scrollBtn);
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-top {
                display: none;
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #3498db;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 20px;
                z-index: 99;
                transition: background-color 0.3s;
            }
            .scroll-top:hover {
                background-color: #2980b9;
            }
        `;
        document.head.appendChild(style);
        
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });
        
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
                    <div class="course-card__icon">${course.icon}</div>
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
                throw new Error('Не удалось загрузить галерею');
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
        if (!galleryGrid || !images) return;

        galleryGrid.innerHTML = images.map(image => `
            <div class="gallery__item">
                <img src="${image.src}" alt="${image.alt}" class="gallery__image">
                <div class="gallery__caption">${image.caption}</div>
            </div>
        `).join('');
    };

    // Инициализация всех компонентов
    initPreloader();
    initImageCaption();
    initNavigationMenu();
    initMainNavigation();
    initScrollButton();
    loadDynamicContent();
    initGallery();
});