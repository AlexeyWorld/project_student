'use strict'

document.addEventListener('DOMContentLoaded', () => {

    /* Функция для работы со скроллом */
    const scrollToogleClass = (elem, heightElem, classElem) => {
        document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

            console.log('Страница скролится');

            let scrollPageY = this.scrollY;                 // получаем значение насколько прокрутили страницу

            if (scrollPageY > heightElem) {                 // условие: если расстояние от верха страницы больше высоты элемента
                elem.classList.add(classElem)               // устанавливаем класс модификатора на элемент
            } else {
                elem.classList.remove(classElem)            // удаляем класс модификатора у элемента
            }

        })
    }

    /* 1. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

    const header = document.querySelector('.header');       // создаем переменную находя блок по классу

    if (header) {                                           // проверяем существование элемента в DOM
        console.log('Константа header существует');

        /* 
        *   Алгоритм
        *
        *   1. Начало.
        *   2. Получаем высоту блока/элемента (создание переменной, которая не будет меняться).
        *   3. Проверка условия (навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку): если страница прокручивается.
        *       3.1. Да: Получаем значение насколько прокрутили страницу (создание переменной, которая будет меняться).
        *           3.1.1 Проверка условия (сравниваем высоту элемента и значение прокрученной страницы): если расстояние от верха страницы больше высоты элемента
        *               3.1.1.1. Да: устанавливаем класс модификатора на элемент
        *               3.1.1.2. Нет (если расстояние от верха экрана меньше высоты элемента): удаляем класс модификатора у элемента
        *       3.2. Нет: Конец
        *   4. Конец
        * 
        *   Блок-схема: /images/block-schema.png
        */

        const heightHeader = header.offsetHeight;           // определяем высоту блока, включая внутренние отступы

        /*  Вынесли в отдельную функцию !!!
        document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

            console.log('Страница скролится');

            let scrollPageY = this.scrollY;                 // получаем значение насколько прокрутили страницу

            if (scrollPageY > heightHeader) {               // условие: если расстояние от верха страницы больше высоты элемента
                header.classList.add('header--scroll')      // устанавливаем класс модификатора на элемент
            } else {
                header.classList.remove('header--scroll')   // удаляем класс модификатора у элемента
            }

        }) 
        */

        scrollToogleClass(header, heightHeader, 'header--scroll');
    }

    /* 2. Динамический вывод карточек тегов */

    const cardsContainer = document.querySelector('#cards');
    if (cardsContainer) {
        const cardList = cardsContainer.querySelector('.card__list');

        // Пример URL для получения данных с сервера
        const apiUrl = 'data.json';

        // Функция для создания карточки
        const createCard = (linkUrl, iconUrl, iconAlt, iconWidth, iconHeight, title, description) => {

            // Шаблонные строки и подстановки
            const card = `
                <a class="card__item" href="${linkUrl}">
                    <span class="card__icon">
                        <img src="${iconUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                    </span>
                    <h3 class="card__title">${title}</h3>
                    <p class="card__description">${description}</p>
                </a>
            `;

            return card;
        }

        // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Данные
                console.log(typeof (data)); // Тип полученных данных

                data.forEach(item => {
                    const cardElement = createCard(item.link, item.icon, item.iconAlt, item.iconWidth, item.iconHeight, item.title, item.description);
                    cardList.insertAdjacentHTML('beforeend', cardElement);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }

    /* 3. Клик на добавление рецепта в избранное */

    const favoriteBlock = document.querySelector('.recipe__indicators-favourites');

    if (favoriteBlock) {
        console.log('Константа favoriteBlock существует');

        const favoriteButton = favoriteBlock.querySelector('.recipe__indicators-button');
        const favoriteCount = favoriteBlock.querySelector('.recipe__indicators-count');

        let isFavorite = false; // Состояние избранного
        let count = parseInt(favoriteCount.textContent); // Начальное значение счетчика с приведением строки к числу

        // Обработчик клика на иконку
        favoriteButton.addEventListener('click', () => {
            isFavorite = !isFavorite; // Меняем состояние

            if (isFavorite) {
                count += 1; // Увеличиваем счетчик
                favoriteButton.children[0].classList.add('recipe__indicators-image--active'); // Делаем иконку красной
            } else {
                count -= 1; // Уменьшаем счетчик
                favoriteButton.children[0].classList.remove('recipe__indicators-image--active'); // Возвращаем иконку в серый цвет
            }

            favoriteCount.textContent = count; // Обновляем счетчик
        });
    }

    /* 4. Подбор тегов в поисковой строке при вводе */

    const searchBlock = document.querySelector('.search');

    if (searchBlock) {
        const searchFormField = searchBlock.querySelector('.search__form-name');
        const tags = searchBlock.querySelectorAll('.search__tag-item'); // Получаем все теги

        // Функция для фильтрации тегов
        const filterTags = () => {
            const searchText = searchFormField.value.toLowerCase(); // Получаем текст из поисковой строки

            tags.forEach(tag => {
                const tagText = tag.textContent.toLowerCase(); // Получаем текст тега
                if (tagText.includes(searchText)) {
                    tag.classList.remove('search__tag-item--hidden'); // Показываем тег
                } else {
                    tag.classList.add('search__tag-item--hidden'); // Скрываем тег
                }
            });
        }

        // Обработчик события ввода текста
        searchFormField.addEventListener('input', filterTags);
    }

    /* 5. Появление и работа с формами */

    const loginHeaderButton = document.querySelector('.header__login');
    const dialogLayout = document.querySelector('.dialog');

    if (loginHeaderButton && dialogLayout) {
        const closeDialogButtons = dialogLayout.querySelectorAll('[data-close]');
        const selectPopup = dialogLayout.querySelector('#popup-select');
        const loginPopup = dialogLayout.querySelector('#popup-login');
        const registrationPopup = dialogLayout.querySelector('#popup-registration');
        const switchToRegisterButtons = dialogLayout.querySelectorAll('[data-registration]');
        const switchToLoginButtons = dialogLayout.querySelectorAll('[data-login]');

        // Открытие модального окна при клике на кнопку "Войти"
        loginHeaderButton.addEventListener('click', () => {
            dialogLayout.removeAttribute('hidden');
        });

        // Закрытие модального окна при клике на кнопку закрытия
        if (closeDialogButtons) {
            closeDialogButtons.forEach(button => {
                button.addEventListener('click', () => {
                    dialogLayout.setAttribute('hidden', true);
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);
                });
            });
        }

        // Закрытие модального окна при клике вне его области
        window.addEventListener('click', (event) => {
            if (event.target === dialogLayout) {
                dialogLayout.setAttribute('hidden', true);
                selectPopup.removeAttribute('hidden');
                loginPopup.setAttribute('hidden', true);
                registrationPopup.setAttribute('hidden', true);
            }
        });

        // Переключение на форму регистрации
        if (registrationPopup) {
            switchToRegisterButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    selectPopup.setAttribute('hidden', true);
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.removeAttribute('hidden');
                });
            });
        }

        // Переключение на форму входа
        if (loginPopup) {
            switchToLoginButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    selectPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);
                    loginPopup.removeAttribute('hidden');

                    // Проверяем, есть ли сохраненный логин в localStorage
                    if (localStorage.getItem('login')) {
                        // Находим поле ввода логина
                        const loginField = document.querySelector('#userlogin');

                        // Устанавливаем значение поля из localStorage
                        loginField.value = localStorage.getItem('login');
                    }
                });
            });
        }

        // Отправка данных на форме регистрации
        registrationPopup.addEventListener('submit', event => {
            event.preventDefault(); // Предотвращаем отправку формы

            const username = registrationPopup.querySelector('#username').value;
            const login = registrationPopup.querySelector('#login').value;
            const email = registrationPopup.querySelector('#email').value;
            const password = registrationPopup.querySelector('#password').value;
            const confirmPassword = registrationPopup.querySelector('#confirm-password').value;

            const errorMessage = registrationPopup.querySelector('#error-message');

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.style.color = 'red';
                return;
            }

            if (username.length < 3) {
                errorMessage.textContent = 'Имя пользователя должно содержать не менее 3 символов';
                return;
            }

            if (password.length < 8) {
                errorMessage.textContent = 'Пароль должен содержать не менее 8 символов';
                return;
            }

            // Здесь можно добавить отправку данных на сервер
            errorMessage.textContent = 'Регистрация прошла успешно!';
            errorMessage.style.color = 'green';

            // Запишем логин
            window.localStorage.setItem("login", login);

            // Очистка формы
            document.getElementById('registration-form').reset();
        });

        loginPopup.addEventListener('submit', event => {
            event.preventDefault(); // Предотвращаем отправку формы

            const loginField = loginPopup.querySelector('#userlogin').value;
            const passwordField = loginPopup.querySelector('#userpassword').value;

            const errorMessage = loginPopup.querySelector('#error-message-login');

            const users = {
                'test': '12345678',
                'student': '0987654321',
            }

            if (users.hasOwnProperty(loginField) && users[loginField] === passwordField) {
                // Здесь можно добавить отправку данных на сервер
                errorMessage.textContent = 'Вход выполнен успешно';
                errorMessage.style.color = 'green';

                loginHeaderButton.remove();

                const userHeader = `
                    <span class="header__user">Пользователь: ${loginField}</span>
                    `;

                header.insertAdjacentHTML('beforeend', userHeader);

                setTimeout(() => {
                    dialogLayout.setAttribute('hidden', true);
                    selectPopup.removeAttribute('hidden');
                    loginPopup.setAttribute('hidden', true);
                    registrationPopup.setAttribute('hidden', true);

                    document.getElementById('login-form').reset();
                }, 3000);
            } else {
                errorMessage.textContent = 'Пользователь с таким логином и паролем не найден!';
                errorMessage.style.color = 'red';
            }
        });
    }

    // Дополнительные скрипты

    // Scroll up

    const scrollUpButton = document.querySelector('.scroll-up');

    if (scrollUpButton) {
        const windowHeight = document.documentElement.clientHeight; // Определяем высоту видимой части окна браузера

        // Показать кнопку при прокрутке вниз на высоту экрана
        scrollToogleClass(scrollUpButton, windowHeight, 'scroll-up--show');

        // Плавная прокрутка наверх при нажатии на кнопку
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    }

    // Preloader страницы

    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            // Показываем контент
            content.style.display = 'block';

            // Удаляем элемент из DOM
            preloader.remove();
        }, 3000); // Задержка 3 секунды
    }

    // Карусель (слайдер)
    const slider = document.querySelector('.swiper');

    if (slider) {
        const swiper = new Swiper(slider, {
            // Дополнительные параметры
            slidesPerView: 4, // Количество слайдов на экране
            spaceBetween: 30, // Расстояние между слайдами
            loop: true,  // Зацикливание слайдов

            // Пагинация
            pagination: {
                el: '.swiper-pagination',
            },

            // Навигационные стрелки
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
});
