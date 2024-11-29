package a1_2101040063;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Query {
    private List<Word> keywords;

    /**
     * QUERY CONSTRUCTOR
     *
     * @param searchPhrase search input from user
     */
    public Query(String searchPhrase) {
        this.keywords = extractKeywords(searchPhrase);
    }

    /**
     * @return list of keywords
     */
    public List<Word> getKeywords() {
        return this.keywords;
    }

    /**
     * @param d input document
     * @return List of matches against d
     */
    public List<Match> matchAgainst(Doc d) {
        // list of matches
        List<Match> matches = new ArrayList<>();
        // list of words from document
        List<Word> words = new ArrayList<>(d.getTitle());
        words.addAll(d.getBody());

        // a map to store word's frequency and word's firstIndex
        Map<Word, Integer> wordFrequency = new HashMap<>();
        Map<Word, Integer> firstIndexMap = new HashMap<>();

        // loop thr the document to count word's freq and find word's firstIndex
        for (int i = 0; i < words.size(); i++) {
            Word word = words.get(i);
            for (Word keyword : keywords) {
                if (keyword.equals(word)) {
                    wordFrequency.put(keyword, wordFrequency.getOrDefault(keyword, 0) + 1);
                    firstIndexMap.putIfAbsent(keyword, i);
                }
            }
        }

        // find matches
        for (Word keyword : keywords) {
            if (wordFrequency.containsKey(keyword)) {
                matches.add(new Match(d, keyword, wordFrequency.get(keyword), firstIndexMap.get(keyword)));
            }
        }

        // sort matches by position where firstIndex is smaller
        matches.sort(null);
        return matches;
    }

    /* HELPER FUNCTION */

    /**
     * @param searchPhrase search input query
     * @return list of keywords in the input
     */
    private List<Word> extractKeywords(String searchPhrase) {
        String[] rawWords = searchPhrase.split("\\s+");
        List<Word> words = new ArrayList<>();
        for (String rawWord : rawWords) {
            Word word = Word.createWord(rawWord);
            if (word.isKeyword()) {
                words.add(word);
            }
        }
        return words;
    }
}