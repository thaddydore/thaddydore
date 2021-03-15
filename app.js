const hamburgerContainer = document.querySelector('#header__main-nav');
const hamburger = document.querySelector('.header__main-nav--hamburger');
const links = document.querySelectorAll('.header__main-nav--links li');
const emailField = document.querySelector('.email-address');
const subjectField = document.querySelector('.email-subject');
const messageField = document.querySelector('.email-message');
const contactForm = document.querySelector('.contact__form');
let subject = "";
let email = "";
let message = "";

hamburger.addEventListener('click', (e) => {
  hamburgerContainer.classList.toggle('clicked');
  links.forEach(link => link.classList.toggle('fade'));
});


emailField.addEventListener('change', (e) => {
  email += e.target.value;
});

subjectField.addEventListener('change', (e) => {
  subject += e.target.value;
});

messageField.addEventListener('change', (e) => {
  message += e.target.value;
});

contactForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  emailjs.init('user_ve3tnEm07NTG7ofkeRfUf');

  this.message_subject = subject;
  this.message = message;
  this.senders_email = email;


  emailjs.sendForm('contact_service', 'contact_form', this)
    .then(function () {
      console.log('SUCCESS!');
      resetFormInputs();
    }, function (error) {
      console.log('FAILED...', error);
    });

}

function resetFormInputs() {
  subjectField.value = "";
  emailField.value = "";
  messageField.value = "";
}