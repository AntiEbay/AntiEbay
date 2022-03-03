package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostReviewRepository extends JpaRepository<PostReview, Integer> {
    List<PostReview> findByPostId(Integer postId);
//    List<PostReview> findByBuyerPostId(int postId);
//    List<PostReview> findBySeller(int postId);
    List<PostReview> findBySellerEmail(String sellerEmail);
    void deleteBySellerEmail(String sellerEmail);
}
