'use strict'
document.addEventListener("DOMContentLoaded", () => {
     
     const intensiveImg = document.querySelector("1.png");
     intensiveImg.addEventListener('mouseenter', () => {
            console.log('Мышка наведена на изображение, показываем текст');
     });
});
