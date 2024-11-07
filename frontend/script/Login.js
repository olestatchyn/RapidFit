// let baseUrl=http://localhost:5000


// let loginForm = document.querySelector('.login-wrap');
// let signupForm = document.querySelector('.signup-wrap');
// let title = document.querySelector('title');

// let signupToggleBtn = document.querySelector('#toggle-signup');
// let loginToggleBtn = document.querySelector('#toggle-login');
// let signupBtn=document.querySelector(".signup-btn");
// let loginBtn=document.querySelector(".login-btn");

// signupToggleBtn.onclick = () => {
//     loginForm.classList.remove('active');
//     signupForm.classList.add('active');
//     title.textContent = 'Signup form';
// }

// loginToggleBtn.onclick = () => {
//     signupForm.classList.remove('active');
//     loginForm.classList.add('active');
//     title.textContent = 'Login form';
// }

// signupBtn.addEventListener("click",(e)=>{
//     e.preventDefault();
//     let name=document.querySelector(".signup-wrap form #name").value;
//     let email=document.querySelector(".signup-wrap form #email").value;
//     let password=document.querySelector(".signup-wrap form #password").value;
//     if(name==undefined||email==undefined||password==undefined){
//         return alert("Please fill all the details!")
//     }
//     let obj={
//         name,
//         email,
//         password
//     }
//     //console.log(obj);
//     registerNewUser(obj);
// })

// async function registerNewUser(obj){
//     //console.log(obj);
//     try {
//        let res=await fetch(${baseUrl}/auth/signup,{
//         method:'POST',
//         headers:{
//             'Content-type':'application/json'
//         },
//         body:JSON.stringify(obj)
//        })
//        let out=await res.json();
//        if(out.msg=="You are already registerd!"){
//         alert("You are already registered!")
//        }else if(out.msg=="Signed up successfully"){
//         alert("Signed up successfully")
//        }else{
//         alert("Something went wrong!")
//        }
//     } catch (error) {
//         console.log("err",error)
//         alert("Something went wrong!")
//     }
// }

// loginBtn.addEventListener("click",(e)=>{
//     e.preventDefault();
//     let email=document.querySelector(".login-wrap form #email").value;
//     let password=document.querySelector(".login-wrap form #password").value;
//     if(email==""||password==""){
//         return alert("Please fill all the details!")
//     }
//     else{
//         let obj={
//             email,
//             password
//         }
//         loginUser(obj);
//     }
    
// })

// async function loginUser(obj){
//     try {
//        let res=await fetch(${baseUrl}/auth/login,{
//         method:'POST',
//         headers:{
//             'Content-type':'application/json'
//         },
//         body:JSON.stringify(obj)
//        })
//        let out=await res.json();
//        //console.log(out);
//        if(out.msg=="Wrong Credentials"){
//         alert("Wrong Credentials")
//        }else if(out.msg=="Login successfull"){
//         sessionStorage.setItem("token", out.token);
//         sessionStorage.setItem("name", out.name);
//         alert("You logged in successfully")
//         window.location.href="./index.html"
//        }else{
//         alert("Something went wrong!")
//        }
//     } catch (error) {
//         console.log("err",error)
//         alert("Something went wrong!")
//     }
// }


// import * as dotenv from 'dotenv';

// dotenv.config();

// const baseUrl = process.env.BASE_URL;

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
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('name', credentials.email);
      alert('You logged in successfully');
      window.location.href = './index.html';
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
