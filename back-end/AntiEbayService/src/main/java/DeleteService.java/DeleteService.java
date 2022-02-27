/*
package com.antiebay.antiebayservice.deleteservice;

import com.antiebay.antiebayservice.userposts.UserPosts;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class DeleteService implements DeletePost {

    private final AtomicLong counter = new AtomicLong();

    private final Set<UserPosts> posts = new HashSet<>(Set.of(new UserPosts(counter.incrementAndGet(), "Post one"),
            new UserPosts(counter.incrementAndGet(), "Post two"), new Post(counter.incrementAndGet(), "Post three"),
            new UserPosts(counter.incrementAndGet(), "Post four")));


    public boolean delete(Integer postId) {

        var isRemoved = this.posts.removeIf(post -> post.getId().equals(postId));

        return isRemoved;
    }

    public Set<UserPosts> all() {

        return this.posts;
    }
}
*/
