package com.antiebay.antiebayservice.deleteservice;

import com.antiebay.antiebayservice.userposts.UserPosts;

import java.util.Set;

public interface DeletePost {

    boolean delete(Integer postId);
    Set<UserPosts> all();
}