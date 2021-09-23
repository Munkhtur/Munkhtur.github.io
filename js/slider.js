import projects from './projects.js';

const header = document.querySelector('.content-header');
const slider = document.querySelector('.p-content');
const paginationWrapper = document.querySelector('.pagination');
const mediaQuery = window.matchMedia('(max-width: 650px)');

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    sliderEnabled();
  } else {
    gridEnabled();
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange);

// Initial check
handleTabletChange(mediaQuery);

function sliderEnabled(e) {
  paginationWrapper.style.display = '';
  var items = '';
  projects.forEach((project, index) => {
    items += `<div class="item item-${index}">
        <div class="image">
            <img src="/assets/img/${project.image}" alt="">
        </div>
        <div class="description">
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p class="tools">${project.tools}</p>
            <div class="buttons">
                <div class="button">
                    <a target="_blank" href="${project.repoLink}" class="">Repo</a>
                </div>
                 <div class="button">
                     <a target="_blank" href="${project.liveLink}" class="">Live</a>
                </div>
            </div>
        </div>
    </div>`;
  });

  slider.innerHTML = items;
  const slides = Array.from(document.querySelectorAll('.item'));

  let isDragging = false,
    startPosition = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    currentIndex = 0,
    prevIndex = 0;

  slides.forEach((slide, index) => {
    const dots = Array.from(document.querySelectorAll('.dot'));
    if (dots.length < slides.length) {
      var node = document.createElement('div');
      node.className = 'dot';
      if (index == 0) {
        node.classList.add('active');
      }
      node.id = 'dot-' + index;
      //   node.innerHTML = '<i class="far fa-circle"></i>';
      paginationWrapper.appendChild(node);
    }

    const slideImage = slide.querySelector('img');
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    //touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    //mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
  });

  // window.oncontextmenu = function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   return false;
  // };

  function touchStart(index) {
    return function (event) {
      isDragging = true;
      currentIndex = index;
      startPosition = getPositionX(event);
      animationId = requestAnimationFrame(animation);
      slider.classList.add('grabbing');
    };
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationId);
    slider.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
      prevIndex = currentIndex;
      currentIndex += 1;
    }
    if (movedBy > 100 && currentIndex > 0) {
      prevIndex = currentIndex;
      currentIndex -= 1;
    }

    setPositionByIndex();
  }
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPosition;
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    paginate();
  }

  function paginate() {
    const prevDot = document.getElementById('dot-' + prevIndex);
    const currentDot = document.getElementById('dot-' + currentIndex);
    prevDot.classList.remove('active');
    currentDot.classList.add('active');
  }
}

function gridEnabled() {
  paginationWrapper.style.display = 'none';
  slider.style.transform = '';
  var items = '';
  projects.forEach((project, index) => {
    items += `<div class="item">
          <div class="image img-${index}">
              <img src="/assets/img/${project.image}" alt="">
          </div>
          <div class="description">
              <h2>${project.title}</h2>
              <p>${project.description}</p>
              <p class="tools">${project.tools}</p>
              <div class="buttons">
                    <div class="button">
                        <a target="_blank" href="${project.repoLink}" class="">Repo</a>
                    </div>
                    <div class="button">
                        <a target="_blank" href="${project.liveLink}" class="">Live</a>
                    </div>
              </div>
          </div>
      </div>`;
  });

  slider.innerHTML = items;
}
