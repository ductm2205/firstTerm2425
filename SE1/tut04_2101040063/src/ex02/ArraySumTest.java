package ex02;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ArraySumTest {
    @Test
    void testArraySum() throws Exception {
        assertEquals(6, ArraySum.arraySum(new int[]{1, 2, 3}));
    }

    @Test
    void testArraySumNullArray() {
        Exception exception = assertThrows(Exception.class, () -> ArraySum.arraySum(null));
        assertEquals("Array is null", exception.getMessage());
    }

    @Test
    void testArraySumEmptyArray() {
        Exception exception = assertThrows(Exception.class, () -> ArraySum.arraySum(new int[]{}));
        assertEquals("Array is empty", exception.getMessage());
    }
}
