using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace calculator
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            result.Content = "";
            result.Content = $"Result = {Get_Summ(X.Text, Y.Text)}";
        }

        private static string Get_Summ(string x, string y)
        {
            string result;
            WebRequest request = WebRequest.Create($"http://localhost:5118/getSumParams?x={x}&y={y}");
            request.Method = "POST";
            request.ContentLength = 0;

            var response = request.GetResponse();
            using (var stream = response.GetResponseStream())
            {
                using (var reader = new StreamReader(stream))
                {
                    result = reader.ReadToEnd();
                }
            }

            response.Close();

            return result;
        }
    }
}
