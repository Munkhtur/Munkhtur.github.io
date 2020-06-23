const tabItmes = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');
const contactNav = document.querySelector('.contact-nav');
const aboutNav = document.querySelector('.about-nav');
const bioTexts = document.querySelector('.bio');
const loadingText = document.querySelector('.loading');
document.querySelector('.tabs').style.transition = 'all 2s';
tabItmes.forEach((tab) => tab.addEventListener('click', selectItem));
contactNav.addEventListener('click', openContactTab);
aboutNav.addEventListener('click', openAboutTab);

// var text = [
//   'Welcome',
//   'uncomment this if you want to stop refreshing after one cycle',
//   'The z-ordering of multiple box shadows is the same as multiple text sha',
// ];
// var counter = 0;
// var inst = setInterval(change, 2000);

// function change() {
//   bioTexts.innerHTML = text[counter];
//   // var op = 0; // initial opacity
//   fade(bioTexts);
//   counter++;
//   if (counter >= text.length) {
//     counter = 0;
//     // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
//   }
// }

function selectItem() {
  removeBorder();
  removeShow();
  this.classList.add('tab-border');
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  tabContentItem.classList.add('show');
  fade(tabContentItem);
}

function removeBorder() {
  tabItmes.forEach((item) => item.classList.remove('tab-border'));
}
function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove('show'));
}

function openContactTab() {
  removeBorder();
  removeShow();
  const contactTab = document
    .querySelector('#tab-4-content')
    .classList.add('show');
  fade(contactTab);
  document.querySelector('#tab-4').classList.add('tab-border');
}
function openAboutTab() {
  removeBorder();
  removeShow();
  document.querySelector('#tab-2-content').classList.add('show');
  document.querySelector('#tab-2').classList.add('tab-border');
}
function fade(element) {
  var op = 0.1; // initial opacity
  var timer = setInterval(function () {
    if (op > 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ')';
    op += op * 0.1;
  }, 25);
}

var time = setInterval(loading, 1000);
let dots = 'Loading more';

function loading() {
  loadingText.innerHTML = dots += '.';
  if (dots.length > 15) {
    dots = 'Loading more';
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}
// form

let data = {};
document.getElementById('contact-form').addEventListener('submit', submitForm);

const nameField = document.getElementById('contact-name');
nameField.addEventListener('keyup', (e) => {
  data.name = e.target.value;
});
const emailField = document.getElementById('contact-email');
emailField.addEventListener('keyup', (e) => {
  data.email = e.target.value;
});
const messageField = document.getElementById('contact-message');
messageField.addEventListener('keyup', (e) => {
  data.message = e.target.value;
});

function submitForm(e) {
  post(e.target.action, data).then((data) => {
    if (data.error) {
      showMessage(data.error, 'alert');
    } else {
      nameField.value = '';
      emailField.value = '';
      messageField.value = '';
      showMessage('Message sent. Get back to you sooon', 'success');
    }
  });

  e.preventDefault();
}

async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  return resData;
}

function showMessage(error, type) {
  const errorDiv = document.createElement('div');
  const form = document.querySelector('.contact-form');
  const contactForm = document.querySelector('.form-group');

  errorDiv.className = type;
  errorDiv.appendChild(document.createTextNode(error));
  form.insertBefore(errorDiv, contactForm);

  setTimeout(() => {
    document.querySelector(`.${type}`).remove();
  }, 3000);
}

const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullText = this.words[current];
  if (this.isDeleting) {
    this.txt = fullText.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullText.substring(0, this.txt.length + 1);
  }
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  let typeSpeed = 200;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }
  if (!this.isDeleting && this.txt === fullText) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }

  // console.log(fullText);
  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener('DOMContentLoaded', init);
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}
