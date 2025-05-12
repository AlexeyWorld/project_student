'use strict'

document.addEventListener('DOMContentLoaded', () => {

    const intensiveImg = document.querySelector("1.png");

    intensiveImg.addEventListener('mouseenter', () => { 

             console.log('Мышка наведена на изображение, показываем текст');

     });

intensiveImg.addEventListener('mouseleave', () => {

    console.log('Мышка покинула изображение, скрываем текст');

});

intensiveImg.addEventListener('click', () => {

    alert('Изображение было кликнуто!');

});

const newElement = document.createElement('p');

newElement.textContent = 'Это динамически добавленный текст.';

intensiveImg.parentNode.insertBefore(newElement, intensiveImg.nextSibling);

newElement.style.color = 'blue';

});
    
       
       
                   

    
       
