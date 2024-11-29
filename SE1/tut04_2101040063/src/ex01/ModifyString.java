package ex01;

public class ModifyString {
    public static String modifyString(String input) throws Exception {
        if (input == null || input.isEmpty()) {
            throw new Exception("Input string is null or empty");
        }
        if (!Character.isLetter(input.trim().charAt(0))) {
            throw new Exception("First character is not a letter");
        }
        String trimmed = input.trim();
        return Character.toUpperCase(trimmed.charAt(0)) + trimmed.substring(1).replaceAll(" ", "");
    }
}
