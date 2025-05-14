'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт загружен');
    
    // 1. Обработка изображения с подписью
    const imageWrapper = document.querySelector('.about__image-wrapper');
    const imageCaption = document.querySelector('.image-caption');
    
    if (imageWrapper && imageCaption) {
        // Проверяем тип устройства
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            // Для touch-устройств
            imageWrapper.addEventListener('click', function(e) {
                e.preventDefault();
                imageCaption.style.opacity = imageCaption.style.opacity === '1' ? '0' : '1';
                imageCaption.style.visibility = imageCaption.style.visibility === 'visible' ? 'hidden' : 'visible';
            });
            
            // Закрытие по клику вне области (для мобильных)
            document.addEventListener('click', function(e) {
                if (!imageWrapper.contains(e.target)) {
                    imageCaption.style.opacity = '0';
                    imageCaption.style.visibility = 'hidden';
                }
            });
        } else {
            // Для компьютеров
            imageWrapper.addEventListener('mouseenter', function() {
                console.log('Навели курсор на изображение');
                imageCaption.style.opacity = '1';
                imageCaption.style.visibility = 'visible';
            });
            
            imageWrapper.addEventListener('mouseleave', function() {
                console.log('Убрали курсор с изображения');
                imageCaption.style.opacity = '0';
                imageCaption.style.visibility = 'hidden';
            });
        }
    }

    // 2. Создаем массив из заголовков разделов
    const sectionTitles = Array.from(document.querySelectorAll('section[id] h2.title')).map(title => ({
        text: title.textContent,
        id: title.closest('section').id
    }));

    // 3. Создаем навигационное меню
    const createNavigationMenu = () => {
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
        
        // Стили для навигационного меню
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

    // 4. Проверяем наличие всплывающих форм
    const checkForModals = () => {
        const modal = document.querySelector('.modal');
        const modalButtons = document.querySelectorAll('[data-modal]');
        
        if (modal && modalButtons.length > 0) {
            // Настраиваем открытие форм
            modalButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.style.display = 'block';
                });
            });
            
            // Закрытие формы
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
            
            // Закрытие при клике вне формы
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        } else {
            // Если форм нет - добавляем кнопку скролла
            addScrollToTopButton();
        }
    };

    // 5. Добавляем кнопку скролла вверх
    const addScrollToTopButton = () => {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Наверх';
        document.body.appendChild(scrollBtn);
        
        // Стили для кнопки
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
        
        // Показываем/скрываем кнопку при скролле
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        // Плавный скролл при клике
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Инициализация всех функций
    if (sectionTitles.length > 0) {
        createNavigationMenu();
    }
    
    checkForModals();
  // 1. Инициализация навигации
        const initNavigation = () => {
            const navItems = [
                { text: "Главная", href: "#" },
                { text: "Обо мне", href: "#about" },
                { text: "Курсы", href: "#courses" },
                { text: "Материалы", href: "#materials" },
                { text: "Контакты", href: "#contacts" }
            ];

            const navContainer = document.getElementById('mainNavigation');
            if (navContainer) {
                navItems.forEach(item => {
                    const navItem = document.createElement('li');
                    navItem.className = 'nav-item';
                    navItem.innerHTML = `<a href="${item.href}" class="nav-link">${item.text}</a>`;
                    navContainer.appendChild(navItem);
                });
            }
        };

        // 2. Динамическая загрузка курсов
        const loadCourses = () => {
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
                coursesGrid.innerHTML = ''; // Очищаем существующие элементы
                
                coursesData.forEach(course => {
                    const courseElement = document.createElement('article');
                    courseElement.className = 'course-card';
                    courseElement.innerHTML = `
                        <div class="course-card__icon">${course.icon}</div>
                        <h3 class="course-card__title">${course.title}</h3>
                        <p class="course-card__description">${course.description}</p>
                        <a href="#" class="course-card__button button button_theme_primary">${course.buttonText}</a>
                    `;
                    coursesGrid.appendChild(courseElement);
                });
            }
        };

        // 3. Динамическая загрузка материалов
        const loadMaterials = () => {
            const materialsData = [
                { name: "Конспект по Древнему миру (PDF)" },
                { name: "Таблица правителей России (XLSX)" },
                { name: "Хронология Второй мировой войны (PDF)" }
            ];

            const materialsList = document.querySelector('.materials__list');
            if (materialsList) {
                materialsList.innerHTML = ''; // Очищаем существующие элементы
                
                materialsData.forEach(material => {
                    const materialItem = document.createElement('li');
                    materialItem.className = 'materials__item';
                    materialItem.innerHTML = `
                        <a href="#" class="materials__link">${material.name}</a>
                    `;
                    materialsList.appendChild(materialItem);
                });
            }
        };

        // 4. Динамическая загрузка обучающих материалов
        const loadLearningMaterials = () => {
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
                learningMaterialsGrid.innerHTML = ''; // Очищаем существующие элементы
                
                learningMaterialsData.forEach(material => {
                    const materialElement = document.createElement('article');
                    materialElement.className = 'material-card';
                    materialElement.innerHTML = `
                        <span class="material-card__badge">${material.badge}</span>
                        <h3 class="material-card__title">${material.title}</h3>
                        <p class="material-card__description">${material.description}</p>
                        <a href="#" class="material-card__button button button_theme_primary">${material.buttonText}</a>
                    `;
                    learningMaterialsGrid.appendChild(materialElement);
                });
            }
        };

        // Инициализация всех компонентов
        initNavigation();
        loadCourses();
        loadMaterials();
        loadLearningMaterials();

        // Плавный скролл для навигационных ссылок
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
});
