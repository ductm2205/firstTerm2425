package ex05;

import ex01.ModifyString;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ModifyStringParameterizedTest {
    @ParameterizedTest
    @ValueSource(strings = {" hello", " world", " java programming"})
    void testModifyString(String input) throws Exception {
        String expected = Character.toUpperCase(input.trim().charAt(0)) + input.trim().substring(1).replaceAll(" ", "");
        assertEquals(expected, ModifyString.modifyString(input));
    }

}
