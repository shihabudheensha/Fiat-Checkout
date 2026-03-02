using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Configuration;

public partial class Shahanad_app_Pages_PaymentSuccess : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [System.Web.Services.WebMethod]
    public static object GetPaymentById(string id)
    {
        string connString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        using (OleDbConnection conn = new OleDbConnection(connString))
        {
            try
            {
                conn.Open();

                string query = @"SELECT TransactionId, CardNumber, Amount, CreatedAt 
                                 FROM Payments 
                                 WHERE TransactionId = ?";

                using (OleDbCommand cmd = new OleDbCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@TransactionId", id);

                    using (OleDbDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string fullCard = reader["CardNumber"].ToString();
                            string maskedCard = "Card •••• " +
                                fullCard.Substring(fullCard.Length - 4);
                            decimal amount = Convert.ToDecimal(reader["Amount"]);

                            return new
                            {
                                Status = "Success",
                                PaymentId = reader["TransactionId"],
                                Amount = amount.ToString("N0"),
                                MaskedCard = maskedCard,
                                Date = Convert.ToDateTime(reader["CreatedAt"])
                                        .ToString("dd MMM yyyy")
                            };
                        }
                        else
                        {
                            return new
                            {
                                Status = "Failed",
                                Message = "Payment not found"
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new
                {
                    Status = "Failed",
                    Message = ex.Message
                };
            }
        }
    }

}