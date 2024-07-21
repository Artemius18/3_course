import java.util.Scanner;

public class Switch {
    public static void main(String [] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("Inter your age: ");
        while(true) {
            String age = s.nextLine();
            switch(age) {
                case "ноль": {
                    System.out.println("U were born");
                    break;
                }
                case "семь": {
                    System.out.println("You are in the 1 class");
                    break;
                }
                case "восемнадцать": {
                    System.out.println("You graduated from school");
                    break;
                }
                default: {
                    System.out.println("Another value");
                    break;
                }
            }
        }
    }
}
