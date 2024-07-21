import java.util.Scanner;

public class TwoNumbersWhileTask {
    public static void main(String [] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter two numbers: ");
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        while(a + 1 < b) {
            if(a % 5 == 0 && a % 10 != 0) {
                System.out.print(a + " ");
            }
            a++;
        }
    }
}
