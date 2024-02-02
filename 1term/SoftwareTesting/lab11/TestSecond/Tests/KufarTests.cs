using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using TestSecond.Model;
using TestSecond.Pages;
using TestSecond.services;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TestSecond.Tests
{
    public class KufarTests
    {
        User user = UserCreator.UserWitchInfoFromFile();
        Data.Data data = new Data.Data();
        private Steps.Steps steps = new Steps.Steps();

        [SetUp]
        public void Init()
        {
            steps.InitBrowser();
        }

        [TearDown]
        public void Cleanup()
        {
            steps.CloseBrowser();
        }
        [Test]
        public void TestAddItemToFavorite()
        {
            steps.CloseWarninigAndAdv();
            steps.LikeAndOpenFavoritePage(user);
            Assert.IsTrue(steps.GetPageTitle() == data.titleGifts);
        }
        [Test]
        public void TestAddItemToBasket()
        {
            steps.CloseWarninigAndAdvForMarket();
            Assert.IsTrue(steps.GetMarketPageTitle() == data.correctNameTitleProduct);
            steps.AddProductToBusketAndOpenProduct();
            Assert.IsTrue(steps.GetMarketPageTitle() == data.correctNameTitleProduct);
        }
        [Test]
        public void DisplayingProductsBySearchAndBySpecificRegion()
        {
            steps.CloseWarninigAndAdv();
            steps.ChangeRegion();
            steps.InputSearch();
            Assert.IsTrue(steps.GetProductRegion() == data.region);
        }
        [Test]
        public void CheckingTheLowerThresholdForTheNumberOfCharactersInTheDescriptionField()
        {
            steps.CloseWarninigAndAdv();
            steps.OpenSubmitAndEnteringDescription(user);
            Assert.IsTrue(Utils.Utils.GetQuantitySymbols(data.desc) == steps.GetValueFromDescription());
        }

        [Test]
        public void EnteringSpecialCharactersInTheUserName()
        {
            steps.AuthorizedUser(user);
            steps.OpenAccountSettings();
            steps.PutPutBadName();
            Assert.IsFalse(steps.GetAccountName() == data.badName);
        }
        [Test]
        public void EnteringLargeNumberOfCharactersInTheNameFieldAnAd()
        {
            steps.AuthorizedUser(user);
            steps.PutBadSeller();
            Assert.IsFalse(data.seller == steps.GetSeller());
        }
        [Test]
        public void EnteringAnIncorrectPhoneNumberAnAd()
        {

            steps.AuthorizedUser(user);
            steps.PutBadNumber();
            Assert.IsFalse(data.badNumber == steps.GetNumber());
        }
        [Test]
        public void SearchForProductsEnteredString()
        {
            steps.CloseWarninigAndAdv();
            steps.InputSomeSearch();
            Assert.IsTrue(steps.GetNameOfProductFromSearch() == data.someWords);
        }
        [Test]
        public void FilteringProductsInTheSearch()
        {
            steps.CloseWarninigAndAdv();
            steps.ClickOnFilter();
            Assert.IsTrue(data.correctFilterName == steps.GetCurrentFilterName());
        }
        [Test]
        public void DisplayingProductsByCategoryAndBySpecificRegion()
        {
            steps.CloseWarninigAndAdv();
            steps.ChangeRegion();
            steps.ClickOnFilter();
            Assert.IsTrue(data.correctRegionAndFilter == steps.GetCurrentFilterAndRegionName());
        }
    }
}
