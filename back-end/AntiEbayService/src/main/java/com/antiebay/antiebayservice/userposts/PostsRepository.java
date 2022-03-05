package com.antiebay.antiebayservice.userposts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostsRepository extends JpaRepository<UserPosts, Integer> {
    List<UserPosts> findByBuyerEmail(String buyerEmail);
    List<UserPosts> findByBuyerEmailAndPostIsComplete(String buyerEmail, String state);
    @Transactional
    @Modifying
    @Query("delete from UserPosts up where up.buyerEmail = ?1")
    int deleteByBuyerEmail(String buyerEmail);
}