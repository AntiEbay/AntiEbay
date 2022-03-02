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
    protected String fileName;
    protected String contents;
    @Transient
    protected String type; // use later

    public UserPostImage() {
        fileName = "";
        contents = "";
        type = "";
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void writeFile() {
        byte[] decodedImg = Base64.getDecoder().decode(contents.getBytes(StandardCharsets.UTF_8));
        try {
            File dir = new File(fileName);
            String[] filesAtPath = dir.list();
            int fileCount = (filesAtPath == null) ? 0 : filesAtPath.length;
            Files.write(Path.of(fileName + fileCount), decodedImg);
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
