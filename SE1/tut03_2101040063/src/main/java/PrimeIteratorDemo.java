import java.util.Iterator;
import java.util.LinkedList;

class PrimeLinkedList extends LinkedList<Integer> {
    public Iterator<Integer> primeIterator() {
        return new Iterator<Integer>() {
            private final Iterator<Integer> iterator = PrimeLinkedList.this.iterator();
            private Integer nextPrime = findNextPrime();

            private boolean isPrime(int num) {
                if (num < 2) return false;
                for (int i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i == 0) return false;
                }
                return true;
            }

            private Integer findNextPrime() {
                while (iterator.hasNext()) {
                    int val = iterator.next();
                    if (isPrime(val)) {
                        return val;
                    }
                }
                return null;
            }

            @Override
            public boolean hasNext() {
                return nextPrime != null;
            }

            @Override
            public Integer next() {
                Integer current = nextPrime;
                nextPrime = findNextPrime();
                return current;
            }
        };
    }
}

public class PrimeIteratorDemo {
    public static void main(String[] args) {
        PrimeLinkedList list = new PrimeLinkedList();
        for (int i = 1; i <= 20; i++) {
            list.add(i);
        }

        Iterator<Integer> primeIterator = list.primeIterator();
        System.out.print("Prime numbers: ");
        while (primeIterator.hasNext()) {
            System.out.print(primeIterator.next() + " ");
        }
    }
}
