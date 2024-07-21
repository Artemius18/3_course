import java.util.Scanner;

public class TwoNums {
    public static void main(String [] args) {
        int counter = 0;

        while(counter < 5) {
            Scanner scanner = new Scanner(System.in);
            float num1 = scanner.nextFloat();
            float num2 = scanner.nextFloat();
            counter++;
            if(num2 == 0) {
                System.out.println("Деление на 0");
                continue;
            }
            System.out.println("Result: " + num1 / num2);
        }
    }
}
