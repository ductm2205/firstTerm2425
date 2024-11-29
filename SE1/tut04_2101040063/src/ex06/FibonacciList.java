package ex06;

import java.util.ArrayList;
import java.util.Iterator;

public class FibonacciList extends ArrayList<Integer> {
    public FibonacciList(int n) {
        super();
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            add(a);
            int next = a + b;
            a = b;
            b = next;
        }
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            private int index = 0;

            @Override
            public boolean hasNext() {
                return index < size();
            }

            @Override
            public Integer next() {
                return get(index++);
            }
        };
    }
}
