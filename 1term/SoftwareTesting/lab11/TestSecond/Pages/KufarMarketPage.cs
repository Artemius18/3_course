using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestSecond.Pages
{
    public class KufarMarketPage : AbstractPage
    {
        private string url = "https://www.kufar.by/l?b2c=1&cmp=1&cnd=2&sort=lst.d&pls_source=blognewgoods&pls_medium=article&pls_campaign=newgoods_kufarmarketis_pr_31.08.22&site=kufarby&utm_source=blognewgoods&utm_medium=article&utm_campaign=newgoods_kufarmarketis_pr_31.08.22";
        private string urlProduct = "https://www.kufar.by/item/164272339?rank=3&searchId=e014ad1c694b3c944be57b8f46abff2e879b";
        
        public KufarMarketPage(IWebDriver webDriver) : base(webDriver) { }
        public override void GoToPage()
        {
            driver.Navigate().GoToUrl(url);
        }
        public void GoToProductPage()
        {
            driver.Navigate().GoToUrl(urlProduct);
        }
        public string GetPageTitle()
        {
            return driver.Title;
        }

        
        public void ClickAddBusketButton()
        {
            Thread.Sleep(3000);
            driver.FindElement(By.XPath("//*[@id=\"adview_content\"]/div[2]/div[2]/div/button")).Click();
            Thread.Sleep(5000);
        }
        public void ClosingPolicyAndAdvertisingWindows()
        {
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div/div[3]/div/div[2]/button")).Click();
        }
        public void ClickBusketButton()
        {   
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[2]/div[2]/a/div[1]")).Click();
        }
        public void ClickBusketProduct()
        {           
            driver.FindElement(By.XPath("//*[@id=\"content\"]/div/div[2]/div/div/div[2]/div/div[2]/div")).Click();
            string parentWindowHandle = driver.CurrentWindowHandle;
            foreach (string windowHandle in driver.WindowHandles)
            {
                if (windowHandle != parentWindowHandle)
                {
                    driver.SwitchTo().Window(windowHandle);
                    break;
                }
            }
        }

    }
}
