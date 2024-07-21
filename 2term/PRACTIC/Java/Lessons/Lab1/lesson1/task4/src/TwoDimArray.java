import java.util.Random;

public class TwoDimArray {
    public static void main(String[] args) {

        int[][] arr = new int[12][8];

        Random random = new Random();
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                arr[i][j] = random.nextInt(50);
            }
        }

        int maxSum = 0;
        int maxSumIndex = 0;
        for (int i = 0; i < arr[0].length; i++) {
            int sum = 0;
            for (int j = 0; j < arr.length; j++) {
                sum += arr[j][i];
            }
            if (sum >= maxSum) {
                maxSum = sum;
                maxSumIndex = i;
            }
        }

        System.out.println(maxSumIndex);
    }
}
