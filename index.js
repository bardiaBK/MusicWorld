// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import {getFirestore, setDoc, doc} from  "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBobTuwOYqo_NAQbDAOPxmFc6z5ipc5EnY",
  authDomain: "sign-up-buy-beats-music-world.firebaseapp.com",
  projectId: "sign-up-buy-beats-music-world",
  storageBucket: "sign-up-buy-beats-music-world.appspot.com",
  messagingSenderId: "839196729383",
  appId: "1:839196729383:web:d352b340d65b37537f6e02",
  measurementId: "G-L61BXS9V9R"
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
    const confirmPassword=document.getElementById('rConfirmPassword').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userdata={
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        showMessage('اکانت با موفقیت ساخته شد', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userdata)
        .then(()=>{
            window.location.href='Home.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('ایمیل تکراری است !!!', 'signUpMessage');
        }
        else{
            showMessage('مشکل در ایجاد اکانت', 'signUpMessage');
        }
    })
  });

  const signIn=document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('شما با موفقیت لاگین کردید', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='Home.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('ایمیل یا پسورد اشتباه', 'signInMessage');
        }
        else{
            showMessage('اکانتی ساخته نشده', 'signInMessage');
        }
    })
});