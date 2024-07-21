import java.util.Scanner;

public class ScannerTask {
    public static void main(String [] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Enter a number: ");
            int number = scanner.nextInt();
            if(number < 1) {
                System.out.println("Incorrect value");
            } else if(number > 0 && number < 5) {
                System.out.println("Low-rise house");
            } else if(number > 4 && number < 9) {
                System.out.println("Mid-rise house");
            } else {
                System.out.println("Multy-story house");
            }
        }
    }
}
