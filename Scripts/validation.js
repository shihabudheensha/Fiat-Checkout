$(document).ready(function () {

    function showError(input, message) {
        $(input).addClass("error");
        $(input).closest(".form-group").find(".error-message").text(message);
    }

    function clearError(input) {
        $(input).removeClass("error");
        $(input).closest(".form-group").find(".error-message").text("");
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


    $("#cardholderName").on("blur", validateCardholder);
    $("#cardholderName").on("input", validateCardholder);


});