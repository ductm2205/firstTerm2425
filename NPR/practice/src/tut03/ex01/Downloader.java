package tut03.ex01;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class Downloader {
    private URL url;

    public Downloader(String urlString) throws MalformedURLException {
        url = new URL(urlString);
    }

    public void download(String targetFileName) throws IOException {
        InputStream in = url.openStream();
        FileOutputStream out = new FileOutputStream(targetFileName);

        while (true) {
            int n = in.read();
            if (n == -1) {
                break;
            }
            out.write(n);
        }
        in.close();
        out.close();
    }
}
