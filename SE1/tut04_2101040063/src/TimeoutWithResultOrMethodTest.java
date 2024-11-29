import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTimeout;

public class TimeoutWithResultOrMethodTest {
    @Test
    void timeoutNotExceedWithResult() {
        String actualResult = assertTimeout(Duration.ofMinutes(1), () -> "Hi there!");
        assertEquals("Hi there!", actualResult);
    }

    @Test
    void timeoutNotExceedWithMethod() {
        String actual = assertTimeout(Duration.ofMinutes(1), TimeoutWithResultOrMethodTest::greeting);
        assertEquals("Hi there!", actual);
    }

    private static String greeting() {
        return "Hi there!";
    }

    // update an entry in a very complex database
    // => make sure that the algorithm works in a given period
    // => assertTimeout() => make sure something work under a given amount of time
}
