import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class OddAlphabetList {
    public static void main(String[] args) {
        List<Character> oddAlphabetList = new ArrayList<>();
        for (char c = 'A'; c <= 'Z'; c++) {
            if ((int) c % 2 != 0) {
                oddAlphabetList.add(c);
            }
        }

        Iterator<Character> iterator = oddAlphabetList.iterator();
        System.out.print("Odd character code letters: ");
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
    }
}
