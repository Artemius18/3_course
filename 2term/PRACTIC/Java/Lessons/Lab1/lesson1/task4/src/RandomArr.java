import java.util.Random;
import java.util.Scanner;

public class RandomArr {
    public static void main(String [] args) {

        System.out.println("Enter amount for array: ");
        Scanner scanner = new Scanner(System.in);
        int amount = scanner.nextInt();

        int[] arr = new int[amount];
        Random rand = new Random();
        for(int i = 0; i < arr.length; i++) {
            arr[i] = rand.nextInt(11);
            System.out.print(arr[i] + " ");
        }
        System.out.println();

        int sum = 0;
        int moreEight = 0;
        int equalsOne = 0;
        int even = 0; //чет
        int odd = 0; //нечет
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            if(arr[i] > 8) {
                moreEight++;
            }
            if(arr[i] == 1) {
                equalsOne++;
            }
            if(arr[i] % 2 == 0) {
                even++;
            } else {
                odd++;
            }
        }
        System.out.println("Length: " + arr.length);
        System.out.println("More than 8: " + moreEight);
        System.out.println("Equals one: " + equalsOne);
        System.out.println("Even: " + even);
        System.out.println("Odd: " + odd);
        System.out.println("Sum: " + sum);

    }
}
