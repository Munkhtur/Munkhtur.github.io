/*!
 * Start Bootstrap - Stylish Portfolio v6.0.3 (https://startbootstrap.com/theme/stylish-portfolio)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
 */
window.addEventListener('DOMContentLoaded', (event) => {
  const sidebarWrapper = document.getElementById('sidebar-wrapper');
  let scrollToTopVisible = false;
  // Closes the sidebar menu
  const menuToggle = document.body.querySelector('.menu-toggle');

  menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    sidebarWrapper.classList.toggle('active');
    _toggleMenuIcon();
    menuToggle.classList.toggle('active');
  });

  // Closes responsive menu when a scroll trigger link is clicked
  var scrollTriggerList = [].slice.call(
    document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger')
  );
  scrollTriggerList.map((scrollTrigger) => {
    scrollTrigger.addEventListener('click', (e) => {
      if (window.innerWidth > 650) {
        document
          .getElementById(e.target.href)
          .scrollIntoView({ behavior: 'smooth' });
      }

      sidebarWrapper.classList.remove('active');
      menuToggle.classList.remove('active');
      _toggleMenuIcon();
    });
  });

  function _toggleMenuIcon() {
    const menuToggleBars = document.body.querySelector(
      '.menu-toggle > .fa-bars'
    );
    const menuToggleTimes = document.body.querySelector(
      '.menu-toggle > .fa-times'
    );
    if (menuToggleBars) {
      menuToggleBars.classList.remove('fa-bars');
      menuToggleBars.classList.add('fa-times');
      document.addEventListener('click', handleMousePos);
    }
    if (menuToggleTimes) {
      menuToggleTimes.classList.remove('fa-times');
      menuToggleTimes.classList.add('fa-bars');
      document.removeEventListener('click', handleMousePos);
    }
  }

  function handleMousePos(event) {
    event.preventDefault();
    if (Array.from(menuToggle.classList).includes('active')) {
      if (
        event.target.id !== 'sidebar-wrapper' &&
        event.target.id !== 'menu-toggle'
      ) {
        sidebarWrapper.classList.remove('active');
        menuToggle.classList.remove('active');
        _toggleMenuIcon();
      }
    }
  }

  // Scroll to top button appear
  document.addEventListener('scroll', () => {
    const scrollToTop = document.body.querySelector('.scroll-to-top');
    const navBar = document.getElementById('sidebar-wrapper');
    if (document.documentElement.scrollTop > 100) {
      navBar.classList.add('navbar-scroll');
      if (!scrollToTopVisible) {
        fadeIn(scrollToTop);
        scrollToTopVisible = true;
      }
    } else {
      navBar.classList.remove('navbar-scroll');
      if (scrollToTopVisible) {
        fadeOut(scrollToTop);
        scrollToTopVisible = false;
      }
    }
  });
});

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = 'none';
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
