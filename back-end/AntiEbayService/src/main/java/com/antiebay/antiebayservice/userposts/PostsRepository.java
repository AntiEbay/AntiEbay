package com.antiebay.antiebayservice.userposts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostsRepository extends JpaRepository<UserPosts, Integer> {
}