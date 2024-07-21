public class BreakContinue {
    public static void main(String [] args) {
        for (int i = 0; i <= 30; i++) {
            if(i % 2 == 0) {
                continue;
            }
            System.out.println("odd: " + i);
        }
    }
}
