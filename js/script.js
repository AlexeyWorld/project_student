'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно');
    
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
        
        // Закрытие по клику вне области (для мобильных)
        document.addEventListener('click', function(e) {
            if (imageWrapper && !imageWrapper.contains(e.target)) {
                imageWrapper.classList.remove('active');
            }
        });
    } else {
        // Для компьютеров
        imageWrapper.addEventListener('mouseenter', function() {
            console.log('Мышка наведена на изображение, показываем текст');
            this.classList.add('hover-active');
        });
        
        imageWrapper.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    }
});
