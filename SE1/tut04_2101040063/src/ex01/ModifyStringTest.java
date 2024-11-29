package ex01;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ModifyStringTest {
    @Test
    void testModifyString() throws Exception {
        assertEquals("HelloWorld", ModifyString.modifyString(" hello world "));
    }

    @Test
    void testModifyStringException() {
        Exception exception = assertThrows(Exception.class, () -> ModifyString.modifyString(" 1hello world"));
        assertEquals("First character is not a letter", exception.getMessage());
    }
}
