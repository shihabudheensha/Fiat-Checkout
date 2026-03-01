$(document).ready(function () {

    $("#cardholderName").on("blur", validateCardholder);

    $("#cardNumber").on("blur", validateCardNumber);
    $("#cardNumber").on("input", formatCardNumber);

    $("#expiryDate").on("blur", validateExpiry);
    $("#cvv").on("blur", validateCVV);

});
