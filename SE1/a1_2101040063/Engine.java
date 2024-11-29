package a1_2101040063;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Engine {
    private File[] files;

    private List<Doc> docs;

    public Engine() {
        this.docs = new ArrayList<>();
    }

    /**
     * @param dirname the path to the docs dir
     * @return the number of documents loaded by the engine
     */
    public int loadDocs(String dirname) {
        File directory = new File(dirname);
        files = directory.listFiles();

        // no file found
        if (files == null) return 0;

        // load the documents
        // clear old docs in case of reloading
        this.docs.clear();
        // add to docs
        for (File file : files) {
            try (Scanner fileIn = new Scanner(file)) {
                String content = fileIn.nextLine() + "\n" + fileIn.nextLine();
                Doc doc = new Doc(content);
                this.docs.add(doc);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }

        return files.length;
    }

    /**
     * @return the documents loaded by the engine
     */
    public Doc[] getDocs() {
        return this.docs.toArray(new Doc[0]);
    }

    /**
     * @param q the input query
     * @return the list of sorted search results
     */
    public List<Result> search(Query q) {
        List<Result> results = new ArrayList<>();
        Result result;

        for (Doc doc : this.getDocs()) {
            List<Match> matches = q.matchAgainst(doc);

            if (!matches.isEmpty()) {
                result = new Result(doc, matches);
                results.add(result);
            }
        }

        // sorting the results based on comparison logic
        Collections.sort(results);

        return results;
    }

    /**
     * @param results the list of result objects
     * @return convert results list to HTMl
     */
    public String htmlResult(List<Result> results) {
        StringBuilder htmlResult = new StringBuilder();
        for (Result result : results) {
            htmlResult.append(result.htmlHighlight());
        }
        return htmlResult.toString();
    }
}
