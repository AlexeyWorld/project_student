'use strict'

const element = document.getElementById('.png'); // Замените 'myElement' на ID вашего элемента

// Функция, которая будет выполняться при возникновении события
function handleEvent(event) {
  console.log('Событие произошло:', event.type); // Выводим в консоль тип события
  console.log('Целевой элемент:', event.target); // Выводим целевой элемент
  // Здесь можно добавить любую другую логику, которую нужно выполнить при событии
}

// Добавляем слушатель события
// Первый аргумент - тип события (например, 'scroll', 'click', 'mouseover')
// Второй аргумент - функция, которая будет вызвана при возникновении события
element.addEventListener('click', handleEvent); // Пример: слушаем событие 'click'

// Пример добавления слушателя для события прокрутки (scroll) на всем окне:
window.addEventListener('scroll', function(event) {
  console.log('Прокрутка страницы:', window.scrollY); // Выводим текущую позицию прокрутки
});
       
                   

    
       
