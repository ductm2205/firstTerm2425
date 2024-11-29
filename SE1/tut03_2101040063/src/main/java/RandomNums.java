import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomNums {
    public static void main(String[] args) {
        Random random = new Random();
        List<Integer> randomNumbers = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            randomNumbers.add(random.nextInt(100) + 1);
        }

        System.out.print("Random numbers: ");
        for (int number : randomNumbers) {
            System.out.print(number + " ");
        }
    }
}
