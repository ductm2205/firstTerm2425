package a1_2101040063;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.InvalidPathException;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Word {
    private String text;
    private String prefix;
    private String suffix;
    private String rawText;

    public static Set<String> stopWords = new HashSet<>();

    /**
     * WORD CONSTRUCTOR
     *
     * @param prefix  word's prefix
     * @param text    word's main part
     * @param suffix  word's suffix
     * @param rawText word's raw text input
     */
    public Word(String prefix, String text, String suffix, String rawText) {
        this.prefix = prefix;
        this.text = text;
        this.suffix = suffix;
        this.rawText = rawText;
    }


    /**
     * @return whether the word's main text is a keyword or not
     */
    boolean isKeyword() {
        // the text is empty
        if (this.text.isEmpty()) return false;
        // the text contains whitespaces
        if (this.text.contains(" ")) return false;
        // the text is a stopWord
        if (stopWords.contains(this.text.toLowerCase())) return false;

        // if the word contains any digits (invalid if it does)
        for (char c : this.text.toCharArray()) {
            if (Character.isDigit(c)) return false;
        }

        // if the text starts with a letter
        return Character.isLetter(this.text.charAt(0));
    }

    /**
     * @return word's prefix
     */
    public String getPrefix() {
        return this.prefix;
    }

    /**
     * @return word's suffix
     */
    public String getSuffix() {
        return this.suffix;
    }

    /**
     * @return word's main text
     */
    public String getText() {
        return this.text;
    }

    /**
     * @param o word to be compared
     * @return whether 2 words are equal or not
     */
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Word)) return false;
        Word other = (Word) o;
        return this.getText().equalsIgnoreCase(other.getText());
    }

    /**
     * @return word's rawText
     */
    public String toString() {
        return this.rawText;
    }

    /**
     * @param rawText raw input
     * @return Word
     */
    public static Word createWord(String rawText) {
        StringBuilder prefix = new StringBuilder();
        String text = "";
        StringBuilder suffix = new StringBuilder();

        // prefix
        int start = 0;
        while (start < rawText.length() && !Character.isLetterOrDigit(rawText.charAt(start))) {
            prefix.append(rawText.charAt(start));
            start++;
        }

        // suffix
        int end = rawText.length() - 1;
        while (end >= start && !Character.isLetterOrDigit(rawText.charAt(end))) {
            suffix.insert(0, rawText.charAt(end));
            end--;
        }


        text = rawText.substring(start, end + 1);

        if (text.endsWith("'s") || text.endsWith("'d")) {
            suffix.insert(0, text.substring(text.length() - 2));
            text = text.substring(0, text.length() - 2);
        }

        if (!text.matches("[a-zA-Z'-]+")) {
            return new Word("", rawText, "", rawText);
        }

        return new Word(prefix.toString(), text, suffix.toString(), rawText);
    }

    /**
     * @param fileName path to stopwords.txt
     * @return whether the stopwords file is loaded or not
     */
    public static boolean loadStopWords(String fileName) {
        try {
            File stopwords = new File(fileName);
            Scanner reader = new Scanner(stopwords);
            while (reader.hasNextLine()) {
                stopWords.add(reader.nextLine());
            }
            reader.close();
            return true;
        } catch (InvalidPathException | FileNotFoundException e) {
            return false;
        }
    }
}