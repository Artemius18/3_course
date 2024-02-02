using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestSecond.Data;
using TestSecond.Model;

namespace TestSecond.Pages
{
    public class KufarPage : AbstractPage
    {
        Data.Data data = new Data.Data();
        private string url = "https://www.kufar.by/l/r~minsk";
        private string urlProduct = "https://www.kufar.by/item/214160074?rank=3&searchId=dd7c208fce5bf1dbf87d02e2b655c6a7744d";
        public KufarPage(IWebDriver webDriver) : base(webDriver) { }

       

        public string GetPageTitle()
        {
            return driver.Title;
        }

        public override void GoToPage()
        {
            driver.Navigate().GoToUrl(url);
        }
        public void ClosingPolicyAndAdvertisingWindows()
        {
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div[2]/div/div[2]/button")).Click();
        }
        public void GoToProductPage()
        {
            driver.Navigate().GoToUrl(urlProduct);
        }
        public void ClickLikeButton()
        {
            Thread.Sleep(3000);
            driver.FindElement(By.XPath("//*[@id=\"adview_content\"]/div[1]/div[2]/div[2]/div")).Click();
            Thread.Sleep(5000);
        }
        public void LoginToAccount(User user)
        {
            driver.FindElement(By.XPath("//*[@id=\"login\"]")).SendKeys(user.username);
            driver.FindElement(By.XPath("//*[@id=\"password\"]")).SendKeys(user.password);
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div[3]/div/div/form/div[4]/button")).Click();
            Thread.Sleep(5000);
        }
        
        public void ClickFavorites()
        {
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div/div[2]/div[1]")).Click();
            Thread.Sleep(4000);
        }
        public void ClickFavoriteProduct()
        {
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div[1]/div/div[2]/div[1]/div[2]/div[2]/div[2]/div/a[1]/div[1]/div/div[2]")).Click();
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
        public void ChangeRegionToGrodno()
        {
            Thread.Sleep(3000);
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[3]/div/button")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[3]/div/div/div/div[1]/div/select")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[3]/div/div/div/div[1]/div/select/option[5]")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[3]/div/div/div/div[2]/div/select")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[3]/div/div/div/div[2]/div/select/option[2]")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[3]/div/div/div/button")).Click();
            Thread.Sleep(3000);
        }
        public void InputSomeProductInSearch()
        {
            Thread.Sleep(11000);
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[2]/div/div/div/div/input")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[2]/div/div[1]/div/div/input")).SendKeys("дом");
            Thread.Sleep(3000);
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[2]/div/div[1]/div/div/button[2]")).Click();
            Thread.Sleep(11000);

        }

        public void ClickProduct()
        {
            Thread.Sleep(5000);
            driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div[4]/div[1]/div/div/div[2]/div/div/section[2]/a/div[1]/div/div[2]")).Click();
            Thread.Sleep(3000);
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
        public string GetRegionOfProductPage()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div[4]/div[1]/div/div/div[2]/div/div/section[1]/a/div[2]/div[2]/p"));
            return spanElement.Text;
        }
        public void ClickSubmit()
        {
            Thread.Sleep(15000);
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[2]/div[1]/div/button/span[2]")).Click();
            Thread.Sleep(4000);
        }
        public void Login(User user)
        {
            Thread.Sleep(5000);
            driver.FindElement(By.XPath("//*[@id=\"login\"]")).SendKeys(user.username);
            driver.FindElement(By.XPath("//*[@id=\"password\"]")).SendKeys(user.password);
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div[3]/div/form/div[4]/button")).Click();
            
        }
        public void CloseWarningWindow()
        {
            driver.FindElement(By.XPath("//*[@id=\"error-portal\"]/div/div/img")).Click();
        }
        //*[@id="ai-form"]/div[4]/div/div[1]/div[1]/textarea
        public void EnteringSymbolsInDescriptionField()
        {
            Thread.Sleep(7000);
            driver.FindElement(By.XPath("//*[@id=\"ai-form\"]/div[4]/div/div[1]/div[1]/textarea")).SendKeys(data.desc);
        }
        
        public string GetValueField()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"ai-form\"]/div[4]/p/span"));
            return spanElement.Text;
        }
        public void ClickProfile()
        {  
            driver.FindElement(By.XPath("//*[@id=\"__next\"]/div[3]/div[3]/div/div/svg")).Click();
        }
        public IWebDriver GetDriver()
        {
            return driver;
        }
        public void PutSeller()
        {
            driver.FindElement(By.XPath("//*[@id=\"ai-form\"]/div[7]/div[2]/div/div/div[2]/input")).SendKeys(data.seller);
        }
        public string GetSeller()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"ai-form\"]/div[7]/div[1]/span"));
            return spanElement.Text;
        }
        public void PutBadNumber()
        {
            driver.FindElement(By.XPath("//*[@id=\"ai-form\"]/div[7]/div[4]/div[1]/div/div[2]/input")).SendKeys(data.badNumber);
        }
        public string GetNumber()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"ai-form\"]/div[7]/div[1]/span"));
            return spanElement.Text;
        }
        public string GetBadNumber()
        {
            return data.badNumber;
        }
        public void InputSomeWordsInSearch()
        {
            Thread.Sleep(10000);
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[2]/div/div/div/div/input")).Click();
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[2]/div/div[1]/div/div/input")).SendKeys(data.someWords);
            Thread.Sleep(3000);
            driver.FindElement(By.XPath("//*[@id=\"header\"]/div[1]/div[2]/div/div[1]/div/div/button[2]")).Click();
            Thread.Sleep(6000);
        }
        //*[@id="main-content"]/div[4]/div[1]/div/div/div[1]/div[3]/div/div/div
        public string GetNameOfProductFromSearch()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div[4]/div[1]/div/div/div[1]/div[3]/div/div/div"));
            
            return Utils.Utils.RemoveQuotes(spanElement.Text);
        }
        public string GetSomeWords()
        {
            return data.someWords;
        }
        public void ClickOnFilter()
        {
            driver.FindElement(By.XPath("//*[@id=\"14000\"]/span")).Click();
        }
        public string GetCorrectFilterName()
        {
            return data.correctFilterName;
        }
        public string GetCurrentFilterName()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div[4]/div[1]/div/div/div[1]/div[3]/h1"));
            return spanElement.Text;
        }
        public string GetCorrectFilterAndRegionName()
        {
            return data.correctRegionAndFilter;
        }
        public string GetCurrentFilterAndRegionName()
        {
            IWebElement spanElement = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div[4]/div[1]/div/div/div[1]/div[3]/h1"));
            return spanElement.Text;
        }
    }
}
