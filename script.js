// 🔥 Firebase Database Reference
const db = firebase.firestore();
let userEarnings = 0; // Wallet balance

// 📌 Update Wallet Balance from Firebase
function updateWallet() {
    let user = auth.currentUser;
    if (user) {
        db.collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists) {
                userEarnings = doc.data().balance || 0;
                document.getElementById("wallet").innerText = "₹" + userEarnings;
            } else {
                db.collection("users").doc(user.uid).set({ balance: 0 });
            }
        });
    }
}

// 🎥 Watch Ads & Earn Money
function watchAd() {
    let earnings = Math.floor(Math.random() * 5) + 1; // Earn ₹1-₹5 per ad
    userEarnings += earnings;
    document.getElementById("wallet").innerText = "₹" + userEarnings;

    let user = auth.currentUser;
    if (user) {
        db.collection("users").doc(user.uid).update({ balance: userEarnings });
    }

    alert("Ad Watched! You earned ₹" + earnings);
}

// 💳 Withdraw Money
function withdraw() {
    if (userEarnings < 10) {
        alert("Minimum ₹10 required for withdrawal!");
        return;
    }

    let upi = prompt("Enter UPI ID / Paytm / PayPal:");
    if (upi) {
        alert("₹" + userEarnings + " withdrawn to " + upi);
        userEarnings = 0; // Reset balance

        let user = auth.currentUser;
        if (user) {
            db.collection("users").doc(user.uid).update({ balance: 0 });
        }

        document.getElementById("wallet").innerText = "₹0";
    }
}

// 🌟 Premium Subscription (Auto-earn ₹10/month)
function subscribePremium() {
    let user = auth.currentUser;
    if (user) {
        let confirmSub = confirm("Pay ₹10/month to auto-earn money?");
        if (confirmSub) {
            userEarnings += 10; // Add ₹10 instantly
            db.collection("users").doc(user.uid).update({ balance: userEarnings });
            document.getElementById("wallet").innerText = "₹" + userEarnings;
            alert("Premium Activated! You got ₹10.");
        }
    }
}

// 🚀 Run on Login
auth.onAuthStateChanged(user => {
    if (user) {
        updateWallet();
        document.getElementById("dashboardSection").style.display = "block";
    } else {
        document.getElementById("dashboardSection").style.display = "none";
    }
});

