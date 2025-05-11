// scripts/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Скрипт подключен и работает!');
    
    // Здесь будет ваш основной код
    initSmoothScrolling();
    initMobileMenu();
  });
  
  /**
   * Плавная прокрутка к якорям
   */
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  /**
   * Мобильное меню (можно добавить позже)
   */
  function initMobileMenu() {
    // Код для мобильного меню будет здесь
  }