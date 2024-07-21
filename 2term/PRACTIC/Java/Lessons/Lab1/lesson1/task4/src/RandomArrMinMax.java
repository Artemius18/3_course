import java.util.Random;

public class RandomArrMinMax {
    public static void main(String [] args) {
        int[] arr = new int[100];

        Random random = new Random();
        for (int i = 0; i < arr.length; i++) {
            arr[i] = random.nextInt(0, 10001);
        }

        int endWithZeroCounter = 0;
        int sum = 0;
        int max = 0;
        int min = 20000;
        for (int el : arr) {
            if(el % 10 == 0) {
                endWithZeroCounter++;
                sum += el;
            }
            if(el > max) {
                max = el;
            }
            if(el < min) {
                min = el;
            }
        }
        System.out.println(endWithZeroCounter);
        System.out.println(sum);
        System.out.println(max);
        System.out.println(min);
    }
}
