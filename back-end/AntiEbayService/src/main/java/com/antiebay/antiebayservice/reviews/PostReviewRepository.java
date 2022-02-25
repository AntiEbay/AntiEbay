package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostReviewRepository extends JpaRepository<PostReview, Integer> {
    List<PostReview> findByBuyerPostId(int postId);
}
