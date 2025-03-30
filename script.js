// 🔥 Firebase Configuration (Required)
const firebaseConfig = {
  apiKey: "AIzaSyBGFz3y6JOVcd8a6aU6siWrk0oVywmbarQ",
  authDomain: "earning-4462f.firebaseapp.com",
  projectId: "earning-4462f",
  storageBucket: "earning-4462f.firebaseapp.com", // Fixed incorrect storageBucket
  messagingSenderId: "727491133656",
  appId: "1:727491133656:web:74cf4022deaa29418797ad",
  measurementId: "G-5101E1DZ43"
};
// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 📌 Register New User
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Registration Successful! Now Login.");
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

// 🔑 Login Existing User
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            alert("Login Successful!");
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("dashboardSection").style.display = "block";
        })
        .catch(error => {
            alert("Login Failed: " + error.message);
        });
}

// 🚀 Logout Function
function logout() {
    auth.signOut().then(() => {
        alert("Logged Out Successfully!");
        document.getElementById("loginSection").style.display = "block";
        document.getElementById("dashboardSection").style.display = "none";
    });
}
