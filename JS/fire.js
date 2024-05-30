
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, collection, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-IQMg-vVM4APyiKK6_9UPy6YMqFYT1ak",
    authDomain: "travel-1a39d.firebaseapp.com",
    databaseURL: "https://travel-1a39d-default-rtdb.firebaseio.com",
    projectId: "travel-1a39d",
    storageBucket: "travel-1a39d.appspot.com",
    messagingSenderId: "979726929683",
    appId: "1:979726929683:web:9f2061a315d76e533dd4e6",
    measurementId: "G-XDLDYH35ZY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Handle signup form submission
function forme(e) {
    e.preventDefault();
    var c = checkRequired([username, email, password, password2]);
    var u = checkLength(username, 3, 15);
    var l = checkLength(password, 6, 20);
    var e = checkEmail(email);
    var p = checkPassword(password, password2);

    console.log(c, p)

    if (c && u && l && e && p) {
        // Create user with email and password
        createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed up successfully
                var user = userCredential.user;
                console.log(saveUserToFirestore(username.value, email.value)); // Save user details to Firestore
                // window.location.href = "home.html";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    } else {
        alert("Please fill in the correct information.");
    }
}

// Function to save user details to Firestore
function saveUserToFirestore(username, email) {
    firebase.firestore().collection("users").doc(email).set({
        username: username,
        email: email
    })
        .then(() => {
            console.log("User details saved to Firestore");
        })
        .catch((error) => {
            console.error("Error saving user details to Firestore: ", error);
        });
}


const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("Passwords do not match");
        return;
    }

    // Sign up with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            alert("Signup successful!");
            // Optionally, redirect the user to another page after signup
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
