import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class OddAlphabet {
    public static void main(String[] args) {
        List<Integer> l1 = new ArrayList<>();
        List<Integer> l2 = new ArrayList<>();

        for (char c = 'A'; c <= 'Z'; c++) {
            l1.add((int) c);
        }

        Iterator<Integer> iterator = l1.iterator();
        while (iterator.hasNext()) {
            int code = iterator.next();
            if (code % 2 != 0) {
                l2.add(code);
            }
        }

        System.out.println("Character codes (l1): " + l1);
        System.out.println("Odd character codes (l2): " + l2);
    }
}
