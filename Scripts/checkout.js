$(document).ready(function () {

    $("#cardholderName").on("blur", validateCardholder);

    $("#cardNumber").on("blur", validateCardNumber);
    $("#cardNumber").on("input", formatCardNumber);

    $("#expiryDate").on("blur", validateExpiry);
    $("#cvv").on("blur", validateCVV);

    $("#paymentBtn").on("click", function (e) {

        let v1 = validateCardholder();
        let v2 = validateCardNumber();
        let v3 = validateExpiry();
        let v4 = validateCVV();

        if (!(v1 && v2 && v3 && v4)) return;



        // Loading state
        showPayLoader()

        let paymentData = {
            cardholderName: $("#cardholderName").val().trim(),
            cardNumber: $("#cardNumber").val().replace(/\s/g, ""),
            expiry: $("#expiryDate").val(),
            cvv: $("#cvv").val(),
            amount: 14900
        };

        console.log(paymentData);

        PayNow(paymentData);


    });


});
