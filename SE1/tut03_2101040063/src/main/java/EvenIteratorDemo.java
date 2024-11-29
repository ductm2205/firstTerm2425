import java.util.Iterator;
import java.util.LinkedList;

class IntegerLinkedList extends LinkedList<Integer> {
    public Iterator<Integer> evenIterator() {
        return new Iterator<Integer>() {
            private final Iterator<Integer> iterator = IntegerLinkedList.this.iterator();
            private Integer nextEven = findNextEven();

            private Integer findNextEven() {
                while (iterator.hasNext()) {
                    int val = iterator.next();
                    if (val % 2 == 0) {
                        return val;
                    }
                }
                return null;
            }

            @Override
            public boolean hasNext() {
                return nextEven != null;
            }

            @Override
            public Integer next() {
                Integer current = nextEven;
                nextEven = findNextEven();
                return current;
            }
        };
    }
}

public class EvenIteratorDemo {
    public static void main(String[] args) {
        IntegerLinkedList list = new IntegerLinkedList();
        for (int i = 1; i <= 10; i++) {
            list.add(i);
        }

        Iterator<Integer> evenIterator = list.evenIterator();
        System.out.print("Even numbers: ");
        while (evenIterator.hasNext()) {
            System.out.print(evenIterator.next() + " ");
        }
    }
}
