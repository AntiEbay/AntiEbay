package com.antiebay.antiebayservice.sellerbids;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<SellerBidEntity, Integer> {
    @Transactional
    @Modifying
    @Query("delete from SellerBidEntity s where s.sellerEmail = ?1")
    void deleteBySellerEmail(String sellerEmail);
    List<SellerBidEntity> findBySellerEmail(String sellerEmail);
    List<SellerBidEntity> findByBuyerPostId(Integer postId);
    Optional<SellerBidEntity> findByBuyerPostIdAndSellerEmailAndAccepted(Integer postId, String sellerEmail, boolean accepted);
}
