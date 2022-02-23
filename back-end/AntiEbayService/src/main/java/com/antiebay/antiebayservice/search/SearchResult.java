package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.userposts.UserPostImage;
import com.antiebay.antiebayservice.userposts.UserPosts;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Base64;

public class SearchResult {
    private int postId;
    private String postTitle;
    private String postDescription;
    private UserPostImage image;

    public SearchResult(UserPosts post) {
        this.postId = post.getPostId();
        this.postTitle = post.getTitle();
        this.postDescription = post.getDescription();
        this.image = getImageFromPath(post.getPostPath());
    }

    private UserPostImage getImageFromPath(String path) {
        UserPostImage img = new UserPostImage();
        try {
            File dir = new File(path);
            String[] filesAtDir = dir.list();
            if (filesAtDir == null || filesAtDir.length == 0) {
                return img;
            }
            byte[] decoded = Files.readAllBytes(Path.of(path + 0));
            String encoded  = Base64.getEncoder().encodeToString(decoded);
            img.setContents(encoded);
            img.setFileName("dir + 0" + img.getType());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return img;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public UserPostImage getImage() {
        return image;
    }

    public void setImage(UserPostImage image) {
        this.image = image;
    }
}
