package ex06;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FibonacciListTest {
    @ParameterizedTest
    @ArgumentsSource(FibonacciArgumentsProvider.class)
    void testFibonacciList(int n, int expected) {
        FibonacciList list = new FibonacciList(n);
        assertEquals(expected, list.get(n - 1));
    }
}

class FibonacciArgumentsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        return Stream.of(
                Arguments.of(5, 3),
                Arguments.of(10, 34),
                Arguments.of(15, 377)
        );
    }
}
