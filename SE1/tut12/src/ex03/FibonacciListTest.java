package ex03;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Iterator;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FibonacciListTest {

    static class FibonacciArgumentProvider implements ArgumentsProvider {
        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext extensionContext) {
            return Stream.of(
                    Arguments.of(new int[]{0, 1, 1, 2, 3, 5, 8}, 7),
                    Arguments.of(new int[]{0, 1, 1, 2, 3}, 5),
                    Arguments.of(new int[]{0, 1, 1}, 3),
                    Arguments.of(new int[]{0, 1}, 2),
                    Arguments.of(new int[]{0}, 1)
            );
        }
    }

    @ParameterizedTest
    @ArgumentsSource(FibonacciArgumentProvider.class)
    @DisplayName("Test FibonacciList Iterator")
    void testFibonacciIterator(int[] expectedSequence, int length) {
        FibonacciList fibonacciList = new FibonacciList();
        Iterator<Integer> iterator = fibonacciList.iterator();

        for (int i = 0; i < length; i++) {
            assertEquals(expectedSequence[i], iterator.next(), "Fibonacci sequence mismatch");
        }
    }

    @Test
    @DisplayName("Test FibonacciList Infinite Iterator")
    void testInfiniteFibonacciIterator() {
        FibonacciList fibonacciList = new FibonacciList();
        Iterator<Integer> iterator = fibonacciList.iterator();

        int[] expectedSequence = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181};
        for (int expected : expectedSequence) {
            assertEquals(expected, iterator.next(), "Fibonacci sequence mismatch");
        }
    }
}
