'use strict';

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт загружен');
    
    const imageWrapper = document.querySelector('.about__image-wrapper');
    const imageCaption = document.querySelector('.image-caption');
    
    if (!imageWrapper || !imageCaption) return;
    
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
});
