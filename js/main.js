(() => {
  console.log("IIFE Fired");

  // Masonry Grid

  // Hamburger Menu
  const hamMenu = document.querySelector('.ham');
  const hamIconOpen = document.querySelector('.menu-open');
  const hamIconClose = document.querySelector('.menu-close');

  hamMenu.style.display = 'none';

  hamIconOpen.addEventListener('click', function () {
    hamMenu.style.display = 'block';
  });

  hamIconClose.addEventListener('click', function () {
    hamMenu.style.display = 'none';
  });
})();
