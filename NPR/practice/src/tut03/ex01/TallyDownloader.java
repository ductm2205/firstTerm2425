package tut03.ex01;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.TreeMap;

public class TallyDownloader extends Downloader {
    private URL url;


    public TallyDownloader(String urlString) throws MalformedURLException {
        super(urlString);
    }

    @Override
    public void download(String targetFileName) throws IOException {
        super.download(targetFileName);

        Map<Character, Integer> counts = new TreeMap<>();
        FileInputStream fileInputStream = new FileInputStream(targetFileName);

        while (true) {
            int n = fileInputStream.read();

            if (n == -1) {
                break;
            }

            char ch = (char) n;

            if (counts.containsValue(ch)) {
                counts.put(ch, counts.get(ch) + 1);
            } else {
                counts.put(ch, 1);
            }
            System.out.println(ch);

            fileInputStream.close();
            System.out.println(counts);
        }
    }
}
