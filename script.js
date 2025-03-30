// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGFz3y6JOVcd8a6aU6siWrk0oVywmbarQ",
  authDomain: "earning-4462f.firebaseapp.com",
  projectId: "earning-4462f",
  storageBucket: "earning-4462f.firebasestorage.app",
  messagingSenderId: "727491133656",
  appId: "1:727491133656:web:74cf4022deaa29418797ad",
  measurementId: "G-5101E1DZ43"
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🛡️ Setup reCAPTCHA
window.onload = function() {
    renderCaptcha();
};

function renderCaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: "normal",
        callback: function(response) {
            console.log("reCAPTCHA solved!");
        }
    });
}

// 📲 Send OTP
function sendOTP() {
    let phoneNumber = document.getElementById("phoneNumber").value;
    let appVerifier = window.recaptchaVerifier;

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            alert("OTP sent!");
        })
        .catch(error => {
            alert("Error sending OTP: " + error.message);
        });
}

// 🔑 Verify OTP
function verifyOTP() {
    let otpCode = document.getElementById("otpCode").value;

    confirmationResult.confirm(otpCode)
        .then(result => {
            alert("Login Successful!");
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("dashboardSection").style.display = "block";
        })
        .catch(error => {
            alert("Incorrect OTP!");
        });
}

// 💰 Wallet System
let walletBalance = 0;

document.getElementById("watchAd").addEventListener("click", function() {
    walletBalance += 10;
    document.getElementById("wallet").innerText = walletBalance;
    alert("Ad watched! ₹10 added to wallet.");
});

document.getElementById("withdraw").addEventListener("click", function() {
    if (walletBalance >= 50) {
        alert("Withdrawal request sent!");
        walletBalance -= 50;
        document.getElementById("wallet").innerText = walletBalance;
    } else {
        alert("You need at least ₹50 to withdraw.");
    }
});
