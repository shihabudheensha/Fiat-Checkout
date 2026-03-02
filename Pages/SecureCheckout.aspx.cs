using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Configuration;
using System.Security.Cryptography;

public partial class Pages_SecureCheckout : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [System.Web.Services.WebMethod]
    public static object ProcessPayment(string cardholderName,
                                        string cardNumber,
                                        string expiry,
                                        string cvv,
                                        decimal amount)
    {
        string connString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        string transactionId = GenerateTransactionId();

        using (OleDbConnection conn = new OleDbConnection(connString))
        {
            conn.Open();

            OleDbTransaction transaction = conn.BeginTransaction();

            try
            {
                string query = @"INSERT INTO Payments
                                (TransactionId, CardholderName, CardNumber, Expiry, CVV, Amount, PaymentStatus, CreatedAt)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                                SELECT @@IDENTITY;";

                using (OleDbCommand cmd = new OleDbCommand(query, conn, transaction))
                {
                    cmd.Parameters.AddWithValue("@TransactionId", transactionId);
                    cmd.Parameters.AddWithValue("@CardholderName", cardholderName);
                    cmd.Parameters.AddWithValue("@CardNumber", cardNumber);
                    cmd.Parameters.AddWithValue("@Expiry", expiry);
                    cmd.Parameters.AddWithValue("@CVV", cvv);
                    cmd.Parameters.AddWithValue("@Amount", amount);
                    cmd.Parameters.AddWithValue("@PaymentStatus", "Success");
                    cmd.Parameters.AddWithValue("@CreatedAt", DateTime.Now);

                    object result = cmd.ExecuteScalar();
                    int insertedId = Convert.ToInt32(result);

                    // Commit transaction
                    transaction.Commit();

                    return new
                    {
                        Status = "Success",
                        PaymentId = insertedId,
                        TransactionId = transactionId
                    };
                }
            }
            catch (Exception ex)
            {
                // Rollback if anything fails
                transaction.Rollback();

                return new
                {
                    Status = "Failed",
                    Message = ex.Message
                };
            }
        }
    }
    private static string GenerateTransactionId()
    {
        byte[] bytes = new byte[8]; // 8 bytes = 64 bit number

        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }

        long value = Math.Abs(BitConverter.ToInt64(bytes, 0));

        // Ensure 12 digits
        return (value % 900000000000 + 100000000000).ToString();
    }

}