package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.useraccounts.UserRepository;
import com.antiebay.antiebayservice.userposts.UserPostImage;
import com.antiebay.antiebayservice.userposts.UserPosts;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

public class SearchResult {
    private UserPosts post;
    private double buyerRating;

    public SearchResult(UserPosts post) {
        this.post = post;
        post.loadImages();
    }

    public UserPosts getPost() {
        return post;
    }

    public void setPost(UserPosts post) {
        this.post = post;
    }

    public double getBuyerRating() {
        return buyerRating;
    }

    public void setBuyerRating(double buyerRating) {
        this.buyerRating = buyerRating;
    }
}
