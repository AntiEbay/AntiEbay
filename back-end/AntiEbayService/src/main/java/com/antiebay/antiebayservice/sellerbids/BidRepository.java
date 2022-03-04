package com.antiebay.antiebayservice.sellerbids;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<SellerBidEntity, Integer> {
    List<SellerBidEntity> findBySellerEmail(String sellerEmail);
    List<SellerBidEntity> findByBuyerPostId(Integer postId);
    Optional<SellerBidEntity> findByBuyerPostIdAndSellerEmailAndAccepted(Integer postId, String sellerEmail, boolean accepted);
    void deleteBySellerEmail(String sellerEmail);
}
