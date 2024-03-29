using System.Net.Http;
using System.Threading.Tasks;
using System.Windows;

namespace WPF_SUM
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (!int.TryParse(XValue.Text, out var xValue))
            {
                YValue.Text = "X is not a number";
                return; 
            }
            if (!int.TryParse(YValue.Text, out var yValue))
            {
                YValue.Text = "Y is not a number";
                return; 
            }
            GetSum(yValue, xValue);
        }

        private async Task GetSum(int x, int y)
        {
            var url = $"http://localhost:5056/Sum?x={x}&y={y}";

            using var client = new HttpClient();

            var response = await client.PostAsync(url, new StringContent(""));

            if (!response.IsSuccessStatusCode) return;

            var result = await response.Content.ReadAsStringAsync();

            await Application.Current.Dispatcher.InvokeAsync(() =>
            {
                Result.Text = $"Результат: {result}";
            });
        }
    }
}
