using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestSecond.Pages
{
    public class AccountPage : AbstractPage
    {
        private string url = "https://www.kufar.by/account/settings/personal_info";
        Data.Data data = new Data.Data();
        

        public AccountPage(IWebDriver webDriver) : base(webDriver) { }
        public override void GoToPage()
        {
            driver.Navigate().GoToUrl(url);
        }

        public void PutBadName()
        {
            Thread.Sleep(2000);
            driver.FindElement(By.XPath("//*[@id=\"name\"]")).SendKeys(data.badName);
        }
        public string GetAccountName()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"personal_info_form\"]/div[2]/div/div[1]/span/p[1]"));
            return spanElement.Text;
        }
    }
}
