package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostReviewRepository extends JpaRepository<PostReview, Integer> {
    List<PostReview> findByPostId(Integer postId);
//    List<PostReview> findByBuyerPostId(int postId);
//    List<PostReview> findBySeller(int postId);
    List<PostReview> findBySellerEmail(String sellerEmail);
    @Transactional
    @Modifying
    @Query("delete from PostReview pr where pr.sellerEmail = ?1")
    int deleteBySellerEmail(String sellerEmail);
}
