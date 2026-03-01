using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Fiat_Checkout.Startup))]
namespace Fiat_Checkout
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
