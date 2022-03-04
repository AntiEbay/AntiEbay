package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerReviewRepository extends JpaRepository<SellerReview, String> {
    List<SellerReview> findBySellerEmail(String sellerEmail);
    List<SellerReview> findByBuyerEmail(String buyerEmail);
    void deleteByBuyerEmail(String buyerEmail);
}