const hamburgerContainer = document.querySelector('#header__main-nav');
const hamburger = document.querySelector('.header__main-nav--hamburger');
const links = document.querySelectorAll('.header__main-nav--links li');
const emailField = document.querySelector('.email-address');
const subjectField = document.querySelector('.email-subject');
const messageField = document.querySelector('.email-message');
const contactForm = document.querySelector('.contact__form');
const errorMessage = document.querySelector('.error-message');
const successMessage = document.querySelector('.success-message');
const submitButton = document.querySelector('input[type="submit"]');

hamburger.addEventListener('click', e => {
	hamburgerContainer.classList.toggle('clicked');
	links.forEach(link => link.classList.toggle('fade'));
});

contactForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
	e.preventDefault();
	errorMessage.textContent = '';
	successMessage.textContent = '';

	const from = emailField.value;
	const subject = subjectField.value;
	const body = messageField.value;

	if (!from || !subject || !body) {
		errorMessage.textContent = 'Please fill out all fields before submitting.';
		return;
	}

	submitButton.disabled = true;
	submitButton.value = 'Submitting...';

	const payload = {
		from,
		subject,
		body,
	};

	fetch('https://email-j933.onrender.com/api/v1/email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(() => {
			successMessage.textContent = 'Email sent successfully!';
			resetFormInputs();
		})
		.catch(() => {
			errorMessage.textContent = 'Failed to send email.';
		})
		.finally(() => {
			submitButton.value = 'Submit';
			submitButton.disabled = false;
		});
}

function resetFormInputs() {
	subjectField.value = '';
	emailField.value = '';
	messageField.value = '';
}
