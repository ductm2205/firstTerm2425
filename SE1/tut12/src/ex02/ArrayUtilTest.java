package ex02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ArrayUtilTest {

    static class ValidInputProvider implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext extensionContext) {
            return Stream.of(
                    Arguments.of(new int[]{1, 2, 3}, 6),
                    Arguments.of(new int[]{-1, 0, 1}, 0),
                    Arguments.of(new int[]{100, 200}, 300),
                    Arguments.of(new int[]{0}, 0),
                    Arguments.of(new int[]{Integer.MAX_VALUE, Integer.MIN_VALUE, -1, 1}, -1)
            );
        }


    }

    static class InvalidInputsProvider implements ArgumentsProvider {
        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(
                    Arguments.of( null, "Array is null"),
                    Arguments.of(new int[]{}, "Array is empty")
            );
        }
    }

    @ParameterizedTest
    @ArgumentsSource(ValidInputProvider.class)
    @DisplayName("Test arraySum() with valid input")
    void testValid(int[] input, int expected) {
        assertEquals(expected, ArrayUtil.arraySum(input));
    }

    @ParameterizedTest
    @ArgumentsSource(InvalidInputsProvider.class)
    @DisplayName("Test arraySum() with invalid input")
    void testInvalid(int[] input, String expected) {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            ArrayUtil.arraySum(input);
        });
        assertEquals(expected, exception.getMessage());
    }
}
