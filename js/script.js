'use strict'
      // *	1.	Начало.
      // *	2.	Получаем все элементы изображений с описанием.
      // *	3.	Для каждого изображения (проверяем есть ли такие изображения):
          // *		3.1. Добавляем обработчик наведения курсора на изображение:
             // *		3.1.1. Да:
             // *		3.1.1.1. показываем текст при наведении.
             // *		3.1.2. Нет: продолжаем.
          // *		3.2. Добавляем обработчик курсор уходит с изображения:
             // *		3.3.1. Да:
             // *		3.3.1.1. Скрываем элемент с описанием.
          // *		3.3.2. Нет: продолжаем.
      // *	4.	Конец
  document.addEventListener("DOMContentLoaded", () => {
           console.log('Скрипт отработал корректно')
  const intensiveImg = document.querySelector(".about");
  intensiveImg.addEventListener('mouseenter', () => {
            console.log('Мышка наведена на изображение, показываем текст');
  document.addEventListener('DOMContentLoaded', function() {
    const imageWrapper = document.querySelector('.about__image-wrapper');
    
    if (!imageWrapper) return;
    
    // Проверяем тип устройства
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Для touch-устройств
        imageWrapper.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
    } else {
        // Для компьютеров
        imageWrapper.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        imageWrapper.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    }
    
    // Закрытие по клику вне области (для мобильных)
    document.addEventListener('click', function(e) {
        if (isTouchDevice && imageWrapper && !imageWrapper.contains(e.target)) {
            imageWrapper.classList.remove('active');
        }
    });
});
