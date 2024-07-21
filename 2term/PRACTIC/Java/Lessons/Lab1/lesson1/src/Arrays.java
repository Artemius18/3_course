public class Arrays {
    public static void main(String args[]) {
        int[] numbers = {0, 1, 2, 3, 4};
        int sum = 0;
        for (int x : numbers) {
            sum += x;
        }
        System.out.println(sum);
        String[] strArr = new String[2];
        strArr[0] = "Hello, ";
        strArr[1] = "world!";
        for (String string : strArr) {
            System.out.print(string);
        }
        int[][] nums = {{0, 1, 2}, {4, 2, 9, 83, 28}, {1, 2}};
        for (int[] el : nums) {
            System.out.println(el);
        }
    }
}
