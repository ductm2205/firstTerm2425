package a1_2101040063;

import java.util.List;

public class Result implements Comparable<Result> {
    private Doc doc;
    private List<Match> matches;
    private int matchCount;
    private int totalFreq;
    private double averageFirstIndex;

    public Result(Doc d, List<Match> matches) {
        this.doc = d;
        this.matches = matches;
        this.matchCount = matches.size();
        this.totalFreq = calculateTotalFreq();
        this.averageFirstIndex = calculateAvgFirstIndex();
    }

    /**
     * @return the document
     */
    public Doc getDoc() {
        return this.doc;
    }

    /**
     * @return list of matches
     */
    public List<Match> getMatches() {
        return this.matches;
    }

    /**
     * @return total freq
     */
    public int getTotalFrequency() {
        return this.totalFreq;
    }

    /**
     * @return avg firstIndex
     */
    public double getAverageFirstIndex() {
        return this.averageFirstIndex;
    }

    /**
     * @return highlight matches in html
     */
    public String htmlHighlight() {
        String newTitle = "", newBody = "";
        newTitle = highlightWords(this.getDoc().getTitle(), true);
        newBody = highlightWords(this.getDoc().getBody(), false);
        return "<h3>" + newTitle.trim() + "</h3><p>" + newBody.trim() + "</p>";
    }

    /**
     * @param o the object to be compared.
     * @return which Result is greater (o or this)
     */
    public int compareTo(Result o) {
        // check matchCount
        int matchCountComparison = Integer.compare(o.getMatchCount(), this.getMatchCount());
        if (matchCountComparison != 0) return matchCountComparison;

        // check totalFreq
        int frequencyComparison = Integer.compare(o.getTotalFrequency(), this.getTotalFrequency());
        if (frequencyComparison != 0) return frequencyComparison;

        // check avg firstIndex
        return Double.compare(this.getAverageFirstIndex(), o.getAverageFirstIndex());
    }

    /* HELPER FUNCTIONS */
    public int getMatchCount() {
        return this.matchCount;
    }

    /**
     * @return total freq
     */
    private int calculateTotalFreq() {
        int total = 0;
        for (Match match : this.matches) {
            total += match.getFreq();
        }
        return total;
    }

    /**
     * @return avg firstIndex
     */
    private double calculateAvgFirstIndex() {
        double avg = 0.0;
        for (Match match : this.matches) {
            avg += match.getFirstIndex();
        }
        return avg / (double) this.matchCount;
    }

    /**
     * @param words   the list of words need highlighting
     * @param isTitle whether the target is the title or not
     * @return highlighted words
     */
    private String highlightWords(List<Word> words, boolean isTitle) {
        String highlighted;
        String result = "";
        String tag = isTitle ? "u" : "b";

        for (Word word : words) {
            highlighted = word.getText();

            for (Match match : this.matches) {
                if (highlighted.equalsIgnoreCase(match.getWord().getText())) {
                    highlighted = "<" + tag + ">" + highlighted + "</" + tag + ">";
                    break;
                }
            }

            result += word.getPrefix() + highlighted + word.getSuffix() + " ";
        }

        return result;
    }

}