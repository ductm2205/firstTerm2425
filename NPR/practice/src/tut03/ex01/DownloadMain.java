package tut03.ex01;

import java.io.IOException;
import java.util.Scanner;

public class DownloadMain {
    public static void main(String[] args) {
        // take input from user
        Scanner console = new Scanner(System.in);
        System.out.println("URL to download: ");
        String urlString = console.nextLine();

        // create a downloader with input url
        Downloader downloader = null;
        while (downloader == null) {
            try {
                downloader = new Downloader(urlString);
            } catch (Exception e) {
                System.out.println("Try again with other URL: ");
                urlString = console.nextLine();
            }
        }

        // take target file name to write to
        System.out.println("Target file name: ");
        String targetFileName = console.nextLine();

        // perform downloading
        try {
            downloader.download(targetFileName);
            System.out.println("Done!");
        } catch (IOException e) {
            System.out.println("Failed");
        }
    }
}
