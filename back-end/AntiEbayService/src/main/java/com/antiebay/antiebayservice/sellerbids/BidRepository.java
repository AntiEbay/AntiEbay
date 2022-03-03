package com.antiebay.antiebayservice.sellerbids;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<SellerBidEntity, Integer> {
    List<SellerBidEntity> findBySellerEmail(String sellerEmail);
    List<SellerBidEntity> findByBuyerPostId(Integer postId);
    void deleteBySellerEmail(String sellerEmail);
}
