package com.antiebay.antiebayservice.userposts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepository extends JpaRepository<UserPosts, Integer> {
    List<UserPosts> findByBuyerEmail(String buyerEmail);
}