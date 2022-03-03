package com.antiebay.antiebayservice.useraccounts;

import com.antiebay.antiebayservice.userposts.UserPosts;

import java.util.List;
import java.util.Optional;

public class GetAllPostsUserHasBidOnResponse {
    private List<UserPosts> posts;

    public List<UserPosts> getPosts() {
        return posts;
    }

    public void setPosts(List<UserPosts> posts) {
        this.posts = posts;
    }
}
