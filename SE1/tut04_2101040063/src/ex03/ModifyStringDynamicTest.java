package ex03;

import ex01.ModifyString;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class ModifyStringDynamicTest {
    @TestFactory
    Collection<DynamicTest> dynamicTests() {
        return Arrays.asList(
                DynamicTest.dynamicTest("Test 1", () -> assertEquals("Hello", ModifyString.modifyString(" hello "))),
                DynamicTest.dynamicTest("Test 2", () -> assertEquals("JavaIsCool", ModifyString.modifyString(" java is cool ")))
        );
    }

    @TestFactory
    Stream<DynamicTest> testAtRuntime() {
        return Stream.of(
                DynamicTest.dynamicTest("Test 1", () -> assertNotEquals(2, 4))
        );
    }
}
