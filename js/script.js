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
});
