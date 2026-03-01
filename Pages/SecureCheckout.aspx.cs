using System;
using System.Configuration;
using System.Data.OleDb;

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

        using (OleDbConnection conn = new OleDbConnection(connString))
        {
            conn.Open();

            OleDbTransaction transaction = conn.BeginTransaction();

            try
            {
                string query = @"INSERT INTO Payments
                                (CardholderName, CardNumber, Expiry, CVV, Amount, PaymentStatus, CreatedAt)
                                VALUES (?, ?, ?, ?, ?, ?, ?);
                                SELECT @@IDENTITY;";

                using (OleDbCommand cmd = new OleDbCommand(query, conn, transaction))
                {
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
                        PaymentId = insertedId
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
}