import java.util.Scanner;
//java.lang импортированы по дефолту

public class Input {
    public static void main(String [] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("Inter something: ");
        String input = s.nextLine();
        System.out.println("Your input: " + input);
    }
}
