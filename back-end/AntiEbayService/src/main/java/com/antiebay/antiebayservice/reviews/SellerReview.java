package com.antiebay.antiebayservice.reviews;

import javax.persistence.*;

@Entity
@Table(name = "seller_review")
public class SellerReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seller_review_id")
    private Integer sellerReviewId;
    @Column(name = "rating")
    private Integer rating ;
    @Column(name = "buyer_email")
    private String buyerEmail;
    @Column(name = "seller_email")
    private String sellerEmail;
    @Column(name = "comment")
    private String comment;
    

    public Integer getSellerReviewId() {
        return sellerReviewId;
    }

    public void setSellerReviewId(Integer sellerReviewId) {
        this.sellerReviewId = sellerReviewId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public String getBuyerPostId() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerId) {
        this.sellerEmail = sellerId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }



    @Override
    public String toString() {
        return "SellerReview{" +
                "sellerReviewId=" + sellerReviewId +
                ", rating='" + rating + '\'' +
                ", buyerEmail='" + buyerEmail + '\'' +
                ", sellerId='" + sellerEmail + '\'' +
                ", comment=" + comment + '\'' +
                '}';
    }
}
