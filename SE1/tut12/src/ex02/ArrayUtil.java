package ex02;

public class ArrayUtil {
    public static int arraySum(int[] array) {
        if (array == null) {
            throw new IllegalArgumentException("Array is null");
        }
        if (array.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }

        int sum = 0;
        for (int num : array) {
            sum += num;
        }
        return sum;
    }
}
