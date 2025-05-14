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
    
    // Проверяем, является ли устройство сенсорным
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice && imageWrapper) {
        let isCaptionVisible = false;
        
        imageWrapper.addEventListener('click', function(e) {
            e.preventDefault();
            const caption = this.querySelector('.image-caption');
            
            if (isCaptionVisible) {
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            } else {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
            
            isCaptionVisible = !isCaptionVisible;
        });
    }

  });
});
       
