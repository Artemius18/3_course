using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestSecond.Model;
using TestSecond.Pages;

namespace TestSecond.Steps
{
    public class Steps
    {
        IWebDriver driver;

        public void InitBrowser()
        {
            driver = Driver.DriverInstance.GetInstance();
        }
        public void CloseBrowser()
        {
            Driver.DriverInstance.CloseBrowser();
        }
        public void CloseWarninigAndAdv()
        {
            KufarPage kufarPage = new KufarPage(driver);
            kufarPage.GoToPage();
            kufarPage.ClosingPolicyAndAdvertisingWindows();
            
        }
        
        public void LikeAndOpenFavoritePage(User user)
        {
            KufarPage kufarPage = new KufarPage(driver);
            kufarPage.GoToProductPage();
            kufarPage.ClickLikeButton();
            kufarPage.LoginToAccount(user);
            kufarPage.ClickFavorites();
            kufarPage.ClickFavoriteProduct();
        }
        public string GetPageTitle()
        {
            KufarPage page = new KufarPage(driver);
            return page.GetPageTitle();
        }
        public void AddProductToBusketAndOpenProduct()
        {
            KufarMarketPage marketPage = new KufarMarketPage(driver);
            marketPage.ClickAddBusketButton();
            marketPage.ClickBusketButton();
            marketPage.ClickBusketProduct();
        }
        public void CloseWarninigAndAdvForMarket()
        {
            KufarMarketPage marketPage = new KufarMarketPage(driver);
            marketPage.GoToPage();
            marketPage.GoToProductPage();
            marketPage.ClosingPolicyAndAdvertisingWindows();
        }
        public string GetMarketPageTitle()
        {
            KufarMarketPage page = new KufarMarketPage(driver);
            return page.GetPageTitle();
        }
        public void ChangeRegion()
        {
            KufarPage page = new KufarPage(driver);
            Thread.Sleep(15000);
            page.ChangeRegionToGrodno();
        }
        public void InputSearch()
        {
            KufarPage page = new KufarPage(driver);
            page.InputSomeProductInSearch();
        }
        public string GetProductRegion()
        {
            KufarPage page = new KufarPage(driver);
            return page.GetRegionOfProductPage();
        }
        public void OpenSubmitAndEnteringDescription(User user)
        {
            KufarPage kufarPage = new KufarPage(driver);
            kufarPage.ClickSubmit();
            kufarPage.Login(user);
            kufarPage.EnteringSymbolsInDescriptionField();
        }
        public string GetValueFromDescription()
        {
            KufarPage kufarPage = new KufarPage(driver);
            return kufarPage.GetValueField();
        }
        public void AuthorizedUser(User user)
        {
            KufarPage kufarPage = new KufarPage(driver);
            kufarPage.GoToPage();
            kufarPage.ClosingPolicyAndAdvertisingWindows();
            kufarPage.GoToPage();
            kufarPage.ClickSubmit();
            kufarPage.Login(user);
        }
        public void OpenAccountSettings()
        {
            AccountPage accountPage = new AccountPage(driver);
            Thread.Sleep(2000);
            accountPage.GoToPage();
        }
        public void PutPutBadName()
        {
            AccountPage accountPage = new AccountPage(driver);
            accountPage.PutBadName();
        }

        public string GetAccountName()
        {
            AccountPage accountPage = new AccountPage(driver);
            return accountPage.GetAccountName();
        }
        public void PutBadSeller()
        {
            KufarPage kufarPage = new KufarPage(driver);
            Thread.Sleep(7000);
            kufarPage.PutSeller();
        }
        public string GetSeller()
        {
            KufarPage kufarPage = new KufarPage(driver);
            return kufarPage.GetSeller();
        }
        public void PutBadNumber()
        {
            KufarPage kufarPage = new KufarPage(driver);
            Thread.Sleep(7000);
            kufarPage.PutBadNumber();
        }
        public string GetNumber()
        {
            KufarPage kufarPage = new KufarPage(driver);
            return kufarPage.GetNumber();
        }
        public string GetNameOfProductFromSearch()
        {
            KufarPage kufarPage = new KufarPage(driver);
            return kufarPage.GetNameOfProductFromSearch();
        }
        public void InputSomeSearch()
        {
            KufarPage page = new KufarPage(driver);
            page.InputSomeWordsInSearch();
        }
        public void ClickOnFilter()
        {
            Thread.Sleep(15000);
            KufarPage kufarPage = new KufarPage(driver);
            kufarPage.ClickOnFilter();
        }
        public string GetCurrentFilterName()
        {
            KufarPage kufarPage = new KufarPage(driver);
            return kufarPage.GetCurrentFilterName();
        }
        public string GetCurrentFilterAndRegionName()
        {
            KufarPage kufarPage = new KufarPage(driver);
            return kufarPage.GetCurrentFilterAndRegionName();
        }









    }
}
