const baseUrl = 'http://localhost:5000';

const loginForm = document.querySelector('.login-wrap');
const signupForm = document.querySelector('.signup-wrap');
const title = document.querySelector('title');

const signupToggleBtn = document.querySelector('#toggle-signup');
const loginToggleBtn = document.querySelector('#toggle-login');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');

signupToggleBtn.onclick = () => {
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
  title.textContent = 'Signup form';
};

loginToggleBtn.onclick = () => {
  signupForm.classList.remove('active');
  loginForm.classList.add('active');
  title.textContent = 'Login form';
};

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('.signup-wrap form #name').value;
  const email = document.querySelector('.signup-wrap form #email').value;
  const password = document.querySelector('.signup-wrap form #password').value;

  if (!name || !email || !password) {
    return alert('Please fill all the details!');
  }

  const user = { name, email, password };
  registerNewUser(user);
});

async function registerNewUser(user) {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const result = await response.json();

    if (response.ok && result.message === 'Signed up successfully') {
      alert('Signed up successfully');
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
      title.textContent = 'Login form';
    } else if (result.message === 'User already exists') {
      alert('You are already registered!');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong!');
  }
}

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.querySelector('.login-wrap form #email').value;
  const password = document.querySelector('.login-wrap form #password').value;

  if (!email || !password) {
    return alert('Please fill all the details!');
  }

  const credentials = { email, password };
  loginUser(credentials);
});

async function loginUser(credentials) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();

    if (response.ok && result.message === 'Login successful') {
      const token = result.token;

      sessionStorage.setItem('token', token);

      const userResponse = await fetch(`${baseUrl}/users/${credentials.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      const userInfo = await userResponse.json();

      if (userResponse.ok) {
        sessionStorage.setItem('name', userInfo.name);

        console.log(credentials, result, userInfo);
        alert('You logged in successfully');
        window.location.href = './index.html';
      } else {
        console.error('Failed to fetch user details:', userInfo);
        alert('Failed to fetch user details');
      }
    } else if (result.message === 'Invalid credentials') {
      alert('Wrong Credentials');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong!');
  }
}
//     const userInfo = await fetch(`${baseUrl}/users/:${credentials.email}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${result.token}`
//       },
//     });
//
//     if (response.ok && result.message === 'Login successful') {
//       sessionStorage.setItem('token', result.token);
//       console.log(userInfo);
//       sessionStorage.setItem('name', await userInfo.name);
//
//       alert('You logged in successfully');
//       window.location.href = './index.html';
//     } else if (result.message === 'Invalid credentials') {
//       alert('Wrong Credentials');
//     } else {
//       alert(result.message);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('Something went wrong!');
//   }
// }
