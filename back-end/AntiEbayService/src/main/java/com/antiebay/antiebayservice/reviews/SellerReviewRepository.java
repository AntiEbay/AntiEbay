package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SellerReviewRepository extends JpaRepository<SellerReview, String> {
    List<SellerReview> findBySellerEmail(String sellerEmail);
    List<SellerReview> findByBuyerEmail(String buyerEmail);

    @Transactional
    @Modifying
    @Query("delete from SellerReview sr where sr.buyerEmail = ?1")
    int deleteByBuyerEmail(String buyerEmail);
}