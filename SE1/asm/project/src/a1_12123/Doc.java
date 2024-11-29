package a1_2101040063;

import java.util.ArrayList;
import java.util.List;

public class Doc {
    private List<Word> title;
    private List<Word> body;

    public Doc(String content) {
        String[] lines = content.split("\n");
        this.title = parseText(lines[0]);
        this.body = parseText(lines[1]);
    }

    /**
     *
     * @return doc's title
     */
    public List<Word> getTitle() {
        return this.title;
    }

    /**
     *
     * @return doc's body
     */
    public List<Word> getBody() {
        return this.body;
    }

    /**
     *
     * @param o other doc
     * @return whether 2 docs have same titles and bodies
     */
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Doc)) return false;

        Doc otherDoc = (Doc) o;
        return this.title.equals(otherDoc.title) && this.body.equals(otherDoc.body);
    }

    /**
     *
     * @param content input lines split from .txt file
     * @return List of Word objects
     */
    private List<Word> parseText(String content) {
        List<Word> words = new ArrayList<>();
        String[] rawWords = content.split("\\s+");
        for (String rawWord : rawWords) {
            words.add(Word.createWord(rawWord));
        }
        return words;
    }
}