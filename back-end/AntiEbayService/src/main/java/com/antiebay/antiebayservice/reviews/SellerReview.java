package com.antiebay.antiebayservice.reviews;

import javax.persistence.*;
import java.io.File;
import java.util.List;

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
    @Column(name = "seller_Id")
    private Integer sellerId;
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

    public Integer getBuyerPostId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
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
                ", sellerId='" + sellerId + '\'' +
                ", comment=" + comment + '\'' +
                '}';
    }
}
