// scripts/script.js

/**
 * Основной модуль сайта
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Сайт учителя истории - скрипты загружены!');
  
  // Инициализация всех модулей
  initSmoothScrolling();
  initMaterialToggles();
  initContactForm();
  initMobileMenu();
  initBackToTop();
});

/**
 * Плавная прокрутка к якорным ссылкам
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
        
        // Обновляем URL без перезагрузки страницы
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
}

/**
 * Работа с материалами (развертывание/свертывание)
 */
function initMaterialToggles() {
  const materialToggles = document.querySelectorAll('.material-card__toggle');
  
  materialToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const materialContent = this.nextElementSibling;
      materialContent.classList.toggle('active');
      this.textContent = materialContent.classList.contains('active') 
        ? 'Скрыть материалы' 
        : 'Показать материалы';
    });
  });
}

/**
 * Обработка формы обратной связи
 */
function initContactForm() {
  const contactForm = document.querySelector('.contacts__form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      
      // Блокируем кнопку на время отправки
      submitButton.disabled = true;
      submitButton.textContent = 'Отправка...';
      
      // Здесь должна быть реальная отправка на сервер
      // Для примера используем setTimeout
      setTimeout(() => {
        console.log('Форма отправлена!', Object.fromEntries(formData));
        showNotification('Сообщение отправлено!', 'success');
        this.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить';
      }, 1500);
    });
  }
}

/**
 * Мобильное меню
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
}

/**
 * Кнопка "Наверх"
 */
function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Показ уведомлений
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Анимации при скролле
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animateElements.forEach(el => observer.observe(el));
}
   * Мобильное меню (можно добавить позже)
   */
  function initMobileMenu() {
    // Код для мобильного меню будет здесь
  }
