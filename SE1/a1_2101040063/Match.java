package a1_2101040063;

public class Match implements Comparable<Match> {
    private Doc doc;
    private Word word;
    private int freq;
    private int firstIndex;

    /**
     * MATCH CONSTRUCTOR
     * @param d Doc
     * @param w Word
     * @param freq matching word's frequency
     * @param firstIndex the first index of the matching word
     */
    public Match(Doc d, Word w, int freq, int firstIndex) {
        this.doc = d;
        this.word = w;
        this.freq = freq;
        this.firstIndex = firstIndex;
    }

    /**
     *
     * @return the matching word
     */
    public Word getWord() {
        return this.word;
    }

    /**
     *
     * @return the freq of the matching word
     */
    public int getFreq() {
        return this.freq;
    }

    /**
     *
     * @return the first index of the matching word
     */
    public int getFirstIndex() {
        return this.firstIndex;
    }

    /**
     *
     * @param o the object to be compared.
     * @return compare 2 matches based on their firstIndex
     */
    public int compareTo(Match o) {
        return Integer.compare(this.firstIndex, o.firstIndex);
    }
}