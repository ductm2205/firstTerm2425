package ex03;

import java.util.ArrayList;
import java.util.Iterator;

public class FibonacciList extends ArrayList<Integer> {

    public Iterator<Integer> iterator() {
        return new FibonacciIterator();
    }

    private static class FibonacciIterator implements Iterator<Integer> {
        private int prev = 0;
        private int current = 1;
        private boolean firstYielded = false;

        @Override
        public boolean hasNext() {
            return true;
        }

        @Override
        public Integer next() {
            if (!firstYielded) {
                firstYielded = true;
                return prev;
            }
            int next = prev + current;
            prev = current;
            current = next;
            return prev;
        }
    }
}
