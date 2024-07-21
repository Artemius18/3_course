import java.util.Random;

public class MaxTrioSum {
    public static void main(String [] args) {
        int[] arr = new int[100];
        Random random = new Random();
        for(int i = 0; i < arr.length; i++) {
           arr[i] = random.nextInt(0, 10000);
        }
        int maxSum = 0;
        int sum = 0;
        int firstElIndex = 0;
        for(int i = 0; i < arr.length - 2; i++) {
            sum = arr[i] + arr[i+1] + arr[i+2];
            if(sum > maxSum) {
                maxSum = sum;
                firstElIndex = i;
            }
        }
        System.out.println("sum: " + maxSum);
        System.out.println("index: " + firstElIndex);
    }
}
