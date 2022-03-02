//package com.antiebay.antiebayservice.sellerbids;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import javax.persistence.*;
//import java.util.Objects;
//
//@Entity
//@Table(name = "bid")
//public class SellerBid {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "bid_id")
//    private Integer bidId;
//    @Column(name = "bid_amount")
//    private  double bidAmount;
//    private  String sellerId;
//    private String buyerId;
//    private final String buyerPostId;
//    private boolean hasBeenAcceptedByBuyer;
//
//    public SellerBid() {
//
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public SellerBid(double offerAmount, String sellerId, String buyerPostId) {
//        this.bidAmount = offerAmount;
//        this.sellerId = sellerId;
//        this.buyerPostId = buyerPostId;
//        getBuyerIdFromPostId();
//    }
//
//    private void getBuyerIdFromPostId() {
//        // make db call to get buyer id for post
//        // for now, dummy
//
//        buyerId = "email@email.email";
//    }
//
//    public double getBidAmount() {
//        return bidAmount;
//    }
//
////    public void setOfferAmount(double offerAmount) {
////        this.offerAmount = offerAmount;
////    }
//
//    public String getSellerId() {
//        return sellerId;
//    }
//
////    public void setSellerId(String sellerId) {
////        this.sellerId = sellerId;
////    }
//
//    public String getBuyerId() {
//        return buyerId;
//    }
//
////    public void setBuyerId(String buyerId) {
////        this.buyerId = buyerId;
////    }
//
//    public String getBuyerPostId() {
//        return buyerPostId;
//    }
//
////    public void setBuyerPostId(String buyerPostId) {
////        this.buyerPostId = buyerPostId;
////    }
//
//    public boolean hasBeenAcceptedByBuyer() {
//        return hasBeenAcceptedByBuyer;
//    }
//
//    public void acceptOffer(String buyerId) {
//        hasBeenAcceptedByBuyer = Objects.equals(buyerId, this.buyerId);
//    }
//
//    @Override
//    public String toString() {
//        return "UserOffer{" +
//                "offerAmount=" + bidAmount +
//                ", sellerId='" + sellerId + '\'' +
//                ", buyerId='" + buyerId + '\'' +
//                ", buyerPostId='" + buyerPostId + '\'' +
//                ", hasBeenAcceptedByBuyer=" + hasBeenAcceptedByBuyer +
//                '}';
//    }
//
////    public void setHasBeenAcceptedByBuyer(boolean hasBeenAcceptedByBuyer) {
////        this.hasBeenAcceptedByBuyer = hasBeenAcceptedByBuyer;
////    }
//}
