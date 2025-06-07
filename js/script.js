'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт загружен');
    
    // Ключи для LocalStorage
    const STORAGE_KEYS = {
        GALLERY_LAST_VIEWED: 'gallery_last_viewed',
        GALLERY_LAST_VIEWED_INDEX: 'gallery_last_viewed_index',
        DARK_MODE: 'dark_mode',
        FONT_SIZE: 'font_size'
    };

    // Инициализация прелоадера
    const initPreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        const hidePreloader = () => {
            preloader.classList.add('preloader--hidden');
            
            preloader.addEventListener('transitionend', function() {
                this.remove();
            }, { once: true });
        };

        // Если страница уже загружена, скрываем прелоадер сразу
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
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
            let clickTimer;
            
            imageWrapper.addEventListener('click', (e) => {
                e.preventDefault();
                clearTimeout(clickTimer);
                
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
        const sectionTitles = Array.from(document.querySelectorAll('section[id] h2.title'))
            .filter(title => title.closest('section'))
            .map(title => ({
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
        
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        scrollBtn.addEventListener('click', scrollToTop);
        
        // Инициализация начального состояния
        handleScroll();
    };

    // Динамическая загрузка контента
    const loadDynamicContent = () => {
        const coursesData = [
            {
                icon: "📜",
                title: "Всемирная история",
                description: "Основные эпохи и ключевые события мировой истории. Для учащихся 5-9 классов.",
                buttonText: "Подробнее",
                files: [
                    { name: "Программа курса.pdf", path: "courses/world-history/program.pdf" },
                    { name: "Конспект лекций.zip", path: "courses/world-history/lectures.zip" },
                    { name: "Тестовые задания.docx", path: "courses/world-history/tests.docx" }
                ],
                details: `
                    <div class="course-details">
                        <h4>Содержание курса:</h4>
                        <ul>
                            <li>Древний мир</li>
                            <li>Средние века</li>
                            <li>Новое время</li>
                            <li>Новейшая история</li>
                        </ul>
                        <div class="course-files">
                            <h4>Файлы для скачивания:</h4>
                            <ul>
                                <li><a href="courses/world-history/program.pdf" download="Программа курса.pdf">Программа курса (PDF)</a></li>
                                <li><a href="courses/world-history/lectures.zip" download="Конспект лекций.zip">Конспект лекций (ZIP)</a></li>
                                <li><a href="courses/world-history/tests.docx" download="Тестовые задания.docx">Тестовые задания (DOCX)</a></li>
                            </ul>
                        </div>
                    </div>
                `
            
            },
            {
                icon: "🏛️",
                title: "История России",
                description: "От древности до современности. Для учащихся 6-11 классов.",
                buttonText: "Подробнее",
                files: [
                    { name: "Хронология.pdf", path: "/courses/russian-history/timeline.pdf" },
                    { name: "Карты.zip", path: "/courses/russian-history/maps.zip" },
                    { name: "Биографии.docx", path: "/courses/russian-history/biographies.docx" }
                ],
                details: `
                    <div class="course-details">
                        <h4>Основные темы:</h4>
                        <ul>
                            <li>Киевская Русь</li>
                            <li>Московское царство</li>
                            <li>Российская империя</li>
                            <li>Советский период</li>
                        </ul>
                        <div class="course-files">
                            <h4>Файлы для скачивания:</h4>
                            <ul>
                                <li><a href="courses/russian-history/timeline.pdf" download>Хронология (PDF)</a></li>
                                <li><a href="courses/russian-history/maps.zip" download>Карты (ZIP)</a></li>
                                <li><a href="courses/russian-history/biographies.docx" download>Биографии (DOCX)</a></li>
                            </ul>
                        </div>
                    </div>
                `
            },
            {
                icon: "✍️",
                title: "Подготовка к ЕГЭ/ОГЭ",
                description: "Разбор заданий, тесты и индивидуальные консультации.",
                buttonText: "Подробнее",
                files: [
                    { name: "Типовые задания.pdf", path: "/courses/exam-prep/tasks.pdf" },
                    { name: "Методичка.zip", path: "/courses/exam-prep/methods.zip" },
                    { name: "Примеры сочинений.docx", path: "/courses/exam-prep/essays.docx" }
                ],
                details: `
                    <div class="course-details">
                        <h4>Включает:</h4>
                        <ul>
                            <li>Разбор всех типов заданий</li>
                            <li>Методические рекомендации</li>
                            <li>Примеры исторических сочинений</li>
                            <li>Пробные тесты</li>
                        </ul>
                        <div class="course-files">
                            <h4>Файлы для скачивания:</h4>
                            <ul>
                                <li><a href="courses/exam-prep/tasks.pdf" download>Типовые задания (PDF)</a></li>
                                <li><a href="courses/exam-prep/methods.zip" download>Методичка (ZIP)</a></li>
                                <li><a href="courses/exam-prep/essays.docx" download>Примеры сочинений (DOCX)</a></li>
                            </ul>
                        </div>
                    </div>
                `
            }
        ];

        const coursesGrid = document.querySelector('.courses__grid');
    if (coursesGrid) {
        coursesGrid.innerHTML = coursesData.map(course => `
            <article class="course-card">
                <div class="course-card__icon" aria-hidden="true">${course.icon}</div>
                <h3 class="course-card__title">${course.title}</h3>
                <p class="course-card__description">${course.description}</p>
                <button class="course-card__button button button_theme_primary" data-course-id="${course.title.replace(/\s+/g, '-').toLowerCase()}">
                    ${course.buttonText}
                </button>
                <div class="course-files-modal" id="modal-${course.title.replace(/\s+/g, '-').toLowerCase()}" hidden>
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        ${course.details}
                    </div>
                </div>
            </article>
        `).join('');

        // Обработчик для кнопок "Подробнее"
        document.querySelectorAll('.course-card__button').forEach(button => {
            button.addEventListener('click', function() {
                const courseId = this.getAttribute('data-course-id');
                const modal = document.getElementById(`modal-${courseId}`);
                modal.hidden = false;
                
                // Закрытие модального окна
                modal.querySelector('.close-modal').addEventListener('click', () => {
                    modal.hidden = true;
                });
            });
        });

        // Обработчик для всех ссылок скачивания
        document.addEventListener('click', function(e) {
            if (e.target.matches('.course-files a[download]')) {
                e.preventDefault();
                const link = e.target;
                const fileUrl = link.getAttribute('href');
                const fileName = link.getAttribute('download');
                
                // Создаем временную ссылку для скачивания
                const a = document.createElement('a');
                a.href = fileUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // Логирование для отладки
                console.log(`Попытка скачать файл: ${fileUrl}`);
            }
        });
    
        }

        const materialsData = [
            { name: "Конспект по Древнему миру (PDF)", path: "materials/ancient-world.pdf" },
            { name: "Таблица правителей России (XLSX)", path: "materials/russian-rulers.xlsx" },
            { name: "Хронология Второй мировой войны (PDF)", path: "materials/ww2-timeline.pdf" }
        ];

        const materialsList = document.querySelector('.materials__list');
        if (materialsList) {
            materialsList.innerHTML = materialsData.map(material => `
                <li class="materials__item">
                    <a href="${material.path}" download class="materials__link">${material.name}</a>
                </li>
            `).join('');
        }

        const learningMaterialsData = [
            {
                badge: "5 класс",
                title: "Древний мир",
                description: "Конспекты, карты и тесты по истории Древнего Египта, Греции и Рима.",
                buttonText: "Скачать",
                path: "learning-materials/grade5-ancient-world.zip"
            },
            {
                badge: "6 класс",
                title: "Средние века",
                description: "Таблицы феодальной системы, крестовые походы, Возрождение.",
                buttonText: "Скачать",
                path: "learning-materials/grade6-middle-ages.zip"
            },
            {
                badge: "7 класс",
                title: "Новое время",
                description: "Великие географические открытия, реформация, абсолютизм.",
                buttonText: "Скачать",
                path: "learning-materials/grade7-new-age.zip"
            }
        ];

        const learningMaterialsGrid = document.querySelector('.learning-materials__grid');
        if (learningMaterialsGrid) {
            learningMaterialsGrid.innerHTML = learningMaterialsData.map(material => `
                <article class="material-card">
                    <span class="material-card__badge">${material.badge}</span>
                    <h3 class="material-card__title">${material.title}</h3>
                    <p class="material-card__description">${material.description}</p>
                    <a href="${material.path}" download class="material-card__button button button_theme_primary">${material.buttonText}</a>
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
        
        galleryGrid.innerHTML = images.map((image, index) => `
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
            initialSlide: lastViewedIndex,
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
            }
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
