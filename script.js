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
