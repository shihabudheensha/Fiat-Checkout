
getPaymentData()

function getPaymentData() {

     const params = new URLSearchParams(window.location.search);
             const paymentId = params.get("id");

            
    if (!paymentId) {
        alert("Invalid payment ID");
    }else{
                 
        $.ajax({
            type: "POST",
            url: "PaymentSuccess.aspx/GetPaymentById",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ id: parseInt(paymentId) }),
            dataType: "json",

            success: function (response) {

                let result = response.d;
                console.log(result);

                if (result.Status === "Success") {

                    $("#transactionId").text("#" + result.PaymentId);
                    $("#amountPaid").text("₹" + result.Amount);
                    $("#maskedCard").text(result.MaskedCard);
                    $("#paymentDate").text(result.Date);

                } else {
                    alert("Payment not found");
                }
            },

            error: function (err) {
                console.log(err);
                alert("Server error");
            }
        });

    }

}

$("#home-btn").on("click", function (e) {
    window.location.href =
                    "../Pages/SecureCheckout.aspx";
});
