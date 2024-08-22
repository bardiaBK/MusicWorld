// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import {getFirestore, setDoc, doc} from  "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvfgufH7Bdcka89lLHefmnTmN9ZWAtay4",
  authDomain: "login-music-world.firebaseapp.com",
  projectId: "login-music-world",
  storageBucket: "login-music-world.appspot.com",
  messagingSenderId: "175978890407",
  appId: "1:175978890407:web:f788ab59d3c43e833d0782",
  measurementId: "G-K1R10RZNPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
  }
  const signUp=document.getElementById('submitSignUp')
  signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    // const confirmPassword=document.getElementById('rConfirmPassword').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userdata={
            email: email,
            password: password,
            // confirmPassword: confirmPassword
        };
        showMessage('شما با موفقیت لاگین کردید', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userdata)
        .then(()=>{
            window.location.href='Buy-Beat2.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('نام کاربری معتبر نیست!!!', 'signUpMessage');
        }
        else{
            showMessage('مشکل در ورود', 'signUpMessage');
        }
    })
});