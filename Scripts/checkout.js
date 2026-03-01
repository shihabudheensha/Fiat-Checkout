$(document).ready(function () {

    $("#cardholderName").on("blur", validateCardholder);

    $("#cardNumber").on("blur", validateCardNumber);
    $("#cardNumber").on("input", formatCardNumber);

    $("#expiryDate").on("blur", validateExpiry);
    $("#cvv").on("blur", validateCVV);

    function showPayLoader() {
        let btn = $("#paymentBtn");
        btn.addClass("loading");
        btn.prop("disabled", true);
        btn.find(".loader").show();
        btn.find(".dot").hide();
        btn.find(".amount").hide();
        btn.find(".btn-text").html("Processing");
    }
    function hidePayLoader() {
        let btn = $("#paymentBtn");
        btn.removeClass("loading");
        btn.prop("disabled", false);
        btn.find(".loader").hide();
        btn.find(".dot").show();
        btn.find(".amount").show();
        btn.find(".btn-text").html(" Pay Now ");
    }
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

        $.ajax({
            url: "../Pages/SecureCheckout.aspx/ProcessPayment",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(paymentData),
            dataType: "json",
            success: function (response) {
                hidePayLoader()
                alert("Payment Successful ✅");

            },

            error: function (err) {
                console.log(err);
                hidePayLoader()
                alert("Payment Failed ❌");
            }
        });


    });


});
