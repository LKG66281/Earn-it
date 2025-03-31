// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID",
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 🚀 Register (Signup) Function
function register() {
    let phoneNumber = document.getElementById("phone").value;
    let appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            let code = prompt("Enter OTP:");
            return confirmationResult.confirm(code);
        })
        .then((result) => {
            alert("Registration Successful!");
            saveUserData(result.user);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// 🔥 Save User Data to Firestore
function saveUserData(user) {
    let userRef = db.collection("users").doc(user.uid);
    userRef.set({
        phone: user.phoneNumber,
        balance: 0, // Start with ₹0 balance
        premium: false
    }).then(() => {
        alert("User data saved!");
        window.location.href = "dashboard.html"; // Redirect to Dashboard
    });
}

// 🔑 Login Function
function login() {
    let phoneNumber = document.getElementById("phone").value;
    let appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            let code = prompt("Enter OTP:");
            return confirmationResult.confirm(code);
        })
        .then((result) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect to Dashboard
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// 🚀 Display User Balance on Dashboard
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                document.getElementById("balance").innerText = doc.data().balance;
            }
        });
    }
});

// 🚪 Logout Function
function logout() {
    auth.signOut().then(() => {
        alert("Logged out!");
        window.location.href = "index.html"; // Redirect to Login
    });
}
