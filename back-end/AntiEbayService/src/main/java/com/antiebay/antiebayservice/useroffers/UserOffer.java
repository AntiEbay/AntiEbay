package com.antiebay.antiebayservice.useroffers;

import java.util.Objects;

public class UserOffer {
    private double offerAmount;
    private String sellerId;
    private String buyerId;
    private String buyerPostId;
    private boolean hasBeenAcceptedByBuyer;

    public UserOffer(double offerAmount, String sellerId, String buyerPostId) {
        this.offerAmount = offerAmount;
        this.sellerId = sellerId;
        this.buyerPostId = buyerPostId;
        getBuyerIdFromPostId();
    }

    private void getBuyerIdFromPostId() {
        // make db call to get buyer id for post
        // for now, dummy
        buyerId = "email@email.email";
    }

    public double getOfferAmount() {
        return offerAmount;
    }

//    public void setOfferAmount(double offerAmount) {
//        this.offerAmount = offerAmount;
//    }

    public String getSellerId() {
        return sellerId;
    }

//    public void setSellerId(String sellerId) {
//        this.sellerId = sellerId;
//    }

    public String getBuyerId() {
        return buyerId;
    }

//    public void setBuyerId(String buyerId) {
//        this.buyerId = buyerId;
//    }

    public String getBuyerPostId() {
        return buyerPostId;
    }

//    public void setBuyerPostId(String buyerPostId) {
//        this.buyerPostId = buyerPostId;
//    }

    public boolean hasBeenAcceptedByBuyer() {
        return hasBeenAcceptedByBuyer;
    }

    public void acceptOffer(String buyerId) {
        hasBeenAcceptedByBuyer = Objects.equals(buyerId, this.buyerId);
    }

//    public void setHasBeenAcceptedByBuyer(boolean hasBeenAcceptedByBuyer) {
//        this.hasBeenAcceptedByBuyer = hasBeenAcceptedByBuyer;
//    }
}
