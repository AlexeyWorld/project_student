'use strict'

  document.addEventListener("DOMContentLoaded", () => {
           console.log('Скрипт отработал корректно')
  const intensiveImg = document.querySelector(".about_image");
  intensiveImg.addEventListener('mouseenter', () => {
            console.log('Мышка наведена на изображение, показываем текст');

  });
});
       
