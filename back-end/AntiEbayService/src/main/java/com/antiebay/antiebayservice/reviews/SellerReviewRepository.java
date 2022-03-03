package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerReviewRepository extends JpaRepository<SellerReview, Integer> {
    List<SellerReview> findBySellerId(Integer sellerId);
    List<SellerReview> findByBuyerEmail(String buyerEmail);
    List<SellerReview> deleteByBuyerEmail(String buyerEmail);
}
