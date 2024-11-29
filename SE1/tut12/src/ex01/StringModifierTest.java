package ex01;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class StringModifierTest {

    // valid test-cases
    static class ValidInputsProvider implements ArgumentsProvider {
        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(
                    Arguments.of(" hello world", "Helloworld"),
                    Arguments.of("java programming", "Javaprogramming"),
                    Arguments.of("A", "A"),
                    Arguments.of("already NoSpaces", "AlreadyNoSpaces"),
                    Arguments.of("multiple   spaces   here", "Multiplespaceshere")
            );
        }
    }

    // invalid test-cases
    static class InvalidInputsProvider implements ArgumentsProvider {
        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(
                    Arguments.of(" 123java", "First character is not a letter"),
                    Arguments.of(" !hello", "First character is not a letter"),
                    Arguments.of("@java", "First character is not a letter"),
                    Arguments.of("#test", "First character is not a letter")

            );
        }
    }

    static class EmptyOrWhitespaceInputProvider implements ArgumentsProvider {
        @Override
        public Stream<? extends Arguments> provideArguments(org.junit.jupiter.api.extension.ExtensionContext context) {
            return Stream.of(
                    Arguments.of((String) null, "Input string is empty or null"),
                    Arguments.of("", "Input string is empty or null"),
                    Arguments.of("    ", "Input string is empty or null"),
                    Arguments.of("\t", "Input string is empty or null"),
                    Arguments.of("\n", "Input string is empty or null"),
                    Arguments.of("            ", "Input string is empty or null")
            );
        }
    }

    @ParameterizedTest
    @ArgumentsSource(ValidInputsProvider.class)
    @DisplayName("Test modifying string with valid input")
    void testModifyStringValid(String input, String expected) {
        assertEquals(expected, StringModifier.modifyString(input));
    }

    @ParameterizedTest
    @ArgumentsSource(InvalidInputsProvider.class)
    @DisplayName("Test modifying string with invalid input")
    void testModifyingStringInvalid(String input, String expected) {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            StringModifier.modifyString(input);
        });
        assertEquals(expected, exception.getMessage());
    }

    @ParameterizedTest
    @ArgumentsSource(EmptyOrWhitespaceInputProvider.class)
    @DisplayName("Test modifying string with empty or whitespaces input")
    void testModifyingStringWithWhitespace(String input, String expected) {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            StringModifier.modifyString(input);
        });
        assertEquals(expected, exception.getMessage());
    }
}

