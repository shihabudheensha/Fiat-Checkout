<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PaymentSuccess.aspx.cs" Inherits="Shahanad_app_Pages_PaymentSuccess" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Payment Success</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
     <link rel="stylesheet" href="../Styles/paymentSuccess.css" />
</head>
<body>
    <form id="form1" runat="server">
        
        <div class="app">

            <div class="header">
                Payment Status
            </div>

            <div class="success-wrapper">

                <div class="success-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
                    </svg>
                </div>

                <div class="success-title">
                    Payment Successful 
                </div>

                <div class="success-subtitle">
                    Your transaction has been completed successfully.
                </div>

                  <div class="summary-card">
                    <div class="summary-row">
                        <span>Transaction ID</span>
                        <span>#123456</span>
                    </div>
                    <div class="summary-row">
                        <span>Amount Paid</span>
                        <span>₹14,900</span>
                    </div>
                    <div class="summary-row">
                        <span>Payment Method</span>
                        <span>Card •••• 4242</span>
                    </div>
                    <div class="summary-row">
                        <span>Date</span>
                        <span>01 Mar 2026</span>
                    </div>
                </div>

            </div>

        </div>

        <div class="footer">
            <button type="button"  id="home-btn" class="primary-btn">
                Back to Home
            </button>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="../Scripts/paymentSuccess.js"></script>
    </form>
</body>
</html>
