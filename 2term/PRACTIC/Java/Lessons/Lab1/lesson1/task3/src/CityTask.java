import java.util.Scanner;

public class CityTask {
    public static void main(String [] args) {
        Scanner scanner = new Scanner(System.in);
        while(true) {
            String city = scanner.nextLine();
            switch (city) {
                case "Москва":
                case "Владивосток":
                case "Ростов": {
                    System.out.println("Россия");
                    break;
                }
                case "Рим":
                case "Милан":
                case "Турин": {
                    System.out.println("Италия");
                    break;
                }
                case "Ливерпуль":
                case "Манчестер":
                case "Лондон": {
                    System.out.println("Англия");
                    break;
                }
                case "Берлин":
                case "Мюнхен":
                case "Кёльн": {
                    System.out.println("Гемания");
                    break;
                }
                default:
                    System.out.println("Неизвестная страна");
            }
        }
    }
}
