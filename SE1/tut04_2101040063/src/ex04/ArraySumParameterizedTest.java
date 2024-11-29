package ex04;

import ex02.ArraySum;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ArraySumParameterizedTest {
    static Stream<int[]> provideArraysForSum() {
        return Stream.of(
                new int[]{1, 2, 3},
                new int[]{10, 20, 30},
                new int[]{5, 5, 5}
        );
    }

    @ParameterizedTest
    @MethodSource("provideArraysForSum")
    void testArraySum(int[] array) throws Exception {
        assertEquals(Arrays.stream(array).sum(), ArraySum.arraySum(array));
    }
}
