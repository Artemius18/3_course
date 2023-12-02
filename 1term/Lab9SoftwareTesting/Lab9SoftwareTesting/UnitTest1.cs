using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;
using System;
using System.Threading;

namespace LanguageChangeTest
{
    public class Tests
    {
        private IWebDriver driver;
        private string baseURL;
        private string englishTextButton;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            baseURL = "https://www.mts.by";
        }

        [Test]
        public void LanguageChangeTest()
        {
            driver.Navigate().GoToUrl("https://www.mts.by");
            Thread.Sleep(25000);
            driver.Manage().Window.Maximize();

            IWebElement changeLanguageButton = driver.FindElement(By.XPath("/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]"));
            Thread.Sleep(5000);
            changeLanguageButton.Click();

            IWebElement englishTextButtonForCompare = driver.FindElement(By.XPath("/html/body/div[6]/header/div[1]/div/div/div[1]/div[1]/a"));
            Thread.Sleep(5000);
            string actualText = englishTextButtonForCompare.Text;
            englishTextButton = "Private customers";
            Assert.AreEqual(englishTextButton, actualText);
            Thread.Sleep(5000);
        }

        [TearDown]
        public void TearDown()
        {
            try
            {
                driver.Quit();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}
