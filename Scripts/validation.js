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
        let input = $("#cardNumber");
        let value = input.val().replace(/\s/g, ""); // remove spaces

        
        if (value === "") {
            showError("#cardNumber", "Card number is required");
            return false;
        }

        if (!/^\d+$/.test(value)) {
            showError("#cardNumber", "Only numbers allowed");
            return false;
        }

        // Allow 15 (Amex) or 16 digits
        if (!(value.length === 16 || value.length === 15)) {
            showError("#cardNumber", "Invalid card number length");
            return false;
        }

        // Luhn Check
        if (!luhnCheck(value)) {
            showError("#cardNumber", "Invalid card number");
            return false;
        }

        clearError("#cardNumber");
        return true;
    }
    function luhnCheck(num) {

        let arr = num.split("").reverse().map(x => parseInt(x));
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {

            let digit = arr[i];

            if (i % 2 !== 0) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
        }

        return sum % 10 === 0;
    }
    function formatCardNumber() {


        let value = $("#cardNumber").val();

        value = value.replace(/\D/g, "");
        value = value.substring(0, 16);
        value = value.replace(/(.{4})/g, "$1 ").trim();

        $("#cardNumber").val(value);
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

    $("#cardNumber").on("blur", validateCardNumber);
    $("#cardNumber").on("input", formatCardNumber);

    $("#expiryDate").on("blur", validateExpiry);
    $("#cvv").on("blur", validateCVV);
    

});