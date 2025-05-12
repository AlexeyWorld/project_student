'use strict'

/**
 * DYNAMIC IMAGE HOVER EFFECT
 * Алгоритм:
 * 1. Найти все изображения с классом .hover-target
 * 2. Для каждого изображения:
 *    a. Проверить существование элемента
 *    b. Получить связанные элементы (контейнер, подпись)
 *    c. Проверить поддержку hover-событий
 *    d. Добавить обработчики с проверкой существования элемента
 * 
 * Блок-схема: https://example.com/hover-flowchart
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Находим все целевые изображения
  const hoverImages = document.querySelectorAll('.hover-target');
  
  // Проверяем, найдены ли элементы
  if (!hoverImages.length) {
    console.warn('Элементы .hover-target не найдены');
    return;
  }

  // 2. Обрабатываем каждое изображение
  hoverImages.forEach(image => {
    // a. Проверяем существование элемента
    if (!image) {
      console.error('Элемент не существует', image);
      return;
    }

    // b. Получаем связанные элементы с проверкой
    const container = image.closest('.image-container') || image.parentNode;
    const caption = container?.querySelector('.image-caption');
    
    // c. Проверяем поддержку hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    if (supportsHover) {
      // d. Добавляем обработчики с проверкой
      try {
        image.addEventListener('mouseover', () => {
          image.classList.add('hovered');
          if (caption) caption.style.opacity = '1';
          console.log('Mouseover on:', image.src);
        });
        
        image.addEventListener('mouseout', () => {
          image.classList.remove('hovered');
          if (caption) caption.style.opacity = '0';
        });
      } catch (error) {
        console.error('Ошибка добавления обработчиков:', error);
      }
    }
  });
});
       
