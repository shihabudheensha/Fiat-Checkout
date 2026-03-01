function PayNow(paymentData) {
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

}
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