package ex02;

public class ArraySum {
    public static int arraySum(int[] array) throws Exception {
        if (array == null) {
            throw new Exception("Array is null");
        }
        if (array.length == 0) {
            throw new Exception("Array is empty");
        }
        int sum = 0;
        for (int num : array) {
            sum += num;
        }
        return sum;
    }
}
