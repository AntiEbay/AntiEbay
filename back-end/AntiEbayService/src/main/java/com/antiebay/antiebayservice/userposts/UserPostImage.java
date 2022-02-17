package com.antiebay.antiebayservice.userposts;

import javax.imageio.ImageIO;
import javax.persistence.Transient;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

public class UserPostImage {
    private String fileName;
    private String contents;
    @Transient
    private String type; // use later

    public void writeFile() {
        byte[] decodedImg = Base64.getDecoder().decode(contents.getBytes(StandardCharsets.UTF_8));
        try {
            Files.write(Path.of(fileName), decodedImg);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
}
