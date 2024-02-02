using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestSecond.Pages
{
    public abstract class AbstractPage
    {
        protected IWebDriver driver;

        public abstract void GoToPage();

        public AbstractPage(IWebDriver webDriver)
        {
            driver = webDriver;
        }

        public void Exit()
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
