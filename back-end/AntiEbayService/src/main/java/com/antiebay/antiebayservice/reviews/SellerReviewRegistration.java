package com.antiebay.antiebayservice.reviews;

import org.springframework.stereotype.Component;

@Component("sellerReview")
public class SellerReviewRegistration {
    
    public SellerReview registerSellerReview(SellerReview sellerReview) {
        return sellerReview;
    }
     
}
