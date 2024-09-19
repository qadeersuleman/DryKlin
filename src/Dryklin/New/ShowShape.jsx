import { useEffect } from 'react';
import "../Homepage.css";

function ShowShape() {
  useEffect(() => {
    const shapes = [
        '<i class="fas fa-heart"></i>',
        '<i class="fas fa-star"></i>',
        '<i class="fas fa-moon"></i>',
        '<i class="fas fa-rocket"></i>',
        '<i class="fas fa-cloud-sun"></i>',
        '<i class="fas fa-bolt"></i>',
        '<i class="fas fa-tree"></i>',
        '<i class="fas fa-fish"></i>',
      ];

    function getRandomPosition() {
      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * window.innerHeight);
      return { x, y };
    }

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function showShape(shapeHTML) {
      const shapeContainer = document.createElement('div');
      shapeContainer.classList.add('shape');

      // Inject the shapeHTML (the i tag for the FontAwesome icon)
      shapeContainer.innerHTML = shapeHTML;

      // Get the icon element
      const icon = shapeContainer.querySelector('i');

      // Set random color to the icon
      icon.style.color = getRandomColor();

      const { x, y } = getRandomPosition();
      shapeContainer.style.left = `${x}px`;
      shapeContainer.style.top = `${y}px`;

      document.body.appendChild(shapeContainer);

      // Make the shape visible and move it around
      setTimeout(() => {
        shapeContainer.style.opacity = '1';
        shapeContainer.style.transform = `translate(${x}px, ${y + 100}px)`;  // Slight movement
      }, 100);  // Delay to apply opacity

      // Hide and remove the shape after 3 seconds
      setTimeout(() => {
        shapeContainer.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(shapeContainer);
        }, 1000);  // Wait for the fade-out transition
      }, 3000);
    }

    function startShapeAnimation() {
      shapes.forEach((shape, index) => {
        setTimeout(() => {
          showShape(shape);
        }, index * 1000);  // Show one by one
      });
    }

    // Start the animation and repeat every 5 seconds
    const interval = setInterval(startShapeAnimation, 5000);

    return () => clearInterval(interval);  // Clean up the interval on unmount
  }, []);

  return null;  // No visible output, just shapes animating in the background
}

export default ShowShape;
