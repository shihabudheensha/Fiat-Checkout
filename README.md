# Fiat Checkout – Frontend Assignment 2

A fully functional **Fiat Payment Checkout Page** built using **ASP.NET**, styled with custom CSS, and powered by **SQL Server** using ADO.NET.

This project replicates a pixel-perfect checkout UI and includes complete form validation, payment API simulation, database integration, transaction management, and success/failure flows.

---

## Live Deployment

🔗 https://aws.rimpexpmis.com/shahanad/app/

---

## Project Architecture
```
📂 FIAT-CHECKOUT
│
├── 📁 Pages/
│   ├── 📄 SecureCheckout.aspx        # Main checkout UI (Card details, Billing info)
│   ├── 📄 SecureCheckout.aspx.cs     # Backend logic (WebMethod, DB Insertion, Logic)
│   ├── 📄 PaymentSuccess.aspx        # Post-payment receipt/confirmation screen
│   └── 📄 PaymentSuccess.aspx.cs     # Logic to fetch and display transaction details
│
├── 📁 Scripts/
│   ├── 📜 validation.js              # Client-side validation & Regex input masking
│   ├── 📜 checkout.js                # UI/UX interactions (loading states, toggles)
│   ├── 📜 checkoutApi.js             # AJAX wrappers for ProcessPayment WebMethod
│   └── 📜 paymentSuccess.js          # Client-side logic for receipt rendering
│
├── 📁 Styles/
│   ├── 🎨 checkout.css               # Custom styles for the SecureCheckout UI
│   └── 🎨 paymentSuccess.css         # Styling for the confirmation & receipt view
```
## Demo Video

[![Watch the demo](https://img.youtube.com/vi/3AlTtP_TAms/0.jpg)](https://youtu.be/3AlTtP_TAms)

📺 [Watch the demo video on YouTube](https://youtu.be/3AlTtP_TAms)

##  Tech Stack

| Layer        | Technology |
|-------------|------------|
| Framework   | ASP.NET |
| Frontend    | HTML5, CSS3, JavaScript |
| Client Logic| jQuery |
| Data Access | ADO.NET |
| Database    | SQL Server |
| Deployment  | AWS |

## Database Schema

### Payments Table

```sql
CREATE TABLE [dbo].[Payments] (
    Id INT IDENTITY(1,1) PRIMARY KEY,

    CardholderName NVARCHAR(100) NOT NULL,
    CardNumber NVARCHAR(20) NOT NULL,
    Expiry NVARCHAR(5) NOT NULL,
    CVV NVARCHAR(4) NOT NULL,

    Amount DECIMAL(10,2) NOT NULL,

    PaymentStatus NVARCHAR(20) NOT NULL,

    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),

    TransactionId NVARCHAR(12) NOT NULL UNIQUE
);
