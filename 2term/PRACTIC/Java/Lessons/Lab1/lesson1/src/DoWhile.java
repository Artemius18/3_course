import java.util.Scanner;

public class DoWhile {
    public static void main(String [] args) {
        Scanner s = new Scanner(System.in);
        int input;
        do {
            input = Integer.parseInt(s.nextLine());
            System.out.println("Your input: " + input);
        } while(input != 5);
    }
}
