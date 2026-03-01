$(document).ready(function () {

    function showError(input, message) {
        $(input).addClass("error");
        $(input).closest(".payment-input").find(".error-message").text(message);
    }

    function clearError(input) {
        $(input).removeClass("error");
        $(input).closest(".payment-input").find(".error-message").text("");
    }
    function validateCardholder() {
        let value = $("#cardholderName").val().trim();
        let regex = /^[A-Za-z\s'-]+$/;


        if (value === "") {
            showError("#cardholderName", "Cardholder name is required");
            return false;
        }

        if (value.length < 3) {
            showError("#cardholderName", "Minimum 3 characters required");
            return false;
        }

        if (!regex.test(value)) {
            showError("#cardholderName", "Only letters allowed");
            return false;
        }

        clearError("#cardholderName");
        return true;
    }
    function validateCardNumber() {
        let value = $("#cardNumber").val().replace(/\s/g, "");

        if (value === "") {
            showError("#cardNumber", "Card number is required");
            return false;
        }

        if (!/^\d{16}$/.test(value)) {
            showError("#cardNumber", "Card number must be 16 digits");
            return false;
        }

        clearError("#cardNumber");
        return true;
    }
    function validateExpiry() {
        let value = $("#expiryDate").val();

        if (value === "") {
            showError("#expiryDate", "Expiry date is required");
            return false;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
            showError("#expiryDate", "Invalid format (MM/YY)");
            return false;
        }

        let parts = value.split("/");
        let month = parseInt(parts[0]);
        let year = parseInt("20" + parts[1]);

        let today = new Date();
        let expiryDate = new Date(year, month);

        if (expiryDate <= today) {
            showError("#expiryDate", "Card is expired");
            return false;
        }

        clearError("#expiryDate");
        return true;
    }
    function validateCVV() {
        let value = $("#cvv").val();

        if (value === "") {
            showError("#cvv", "CVV is required");
            return false;
        }

        if (!/^\d{3,4}$/.test(value)) {
            showError("#cvv", "Invalid CVV");
            return false;
        }

        clearError("#cvv");
        return true;
    }



    $("#cardholderName").on("blur", validateCardholder);
    $("#cardholderName").on("input", validateCardholder);

    $("#cardNumber").on("blur", validateCardNumber);
    $("#cardNumber").on("input", validateCardNumber);

    $("#expiryDate").on("blur", validateExpiry);
    $("#expiryDate").on("input", validateExpiry);

    $("#cvv").on("blur", validateCVV);
    $("#cvv").on("input", validateCVV);

});