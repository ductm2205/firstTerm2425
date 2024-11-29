package ex01;

public class StringModifier {
    public static String modifyString(String input) {
        //
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Input string is empty or null");
        }

        //
        String trimmedInput = input.replace(" ", "");
        if (trimmedInput.isEmpty() || !Character.isLetter(trimmedInput.charAt(0))) {
            throw new IllegalArgumentException("First character is not a letter");
        }

        return Character.toUpperCase(trimmedInput.charAt(0)) + trimmedInput.substring(1);
    }
}
