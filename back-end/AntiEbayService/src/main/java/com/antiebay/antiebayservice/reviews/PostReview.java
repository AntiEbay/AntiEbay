package com.antiebay.antiebayservice.reviews;

import javax.persistence.*;
import java.io.File;
import java.util.List;

@Entity
@Table(name = "post_review")
public class PostReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_review_id")
    private Integer postReviewId;
    @Column(name = "rating")
    private Integer rating;
    @Column(name = "seller_email")
    private String sellerEmail;
//    @Column(name = "buyer_postId")
//    private Integer buyerPostId;
    @Column(name = "comment")
    private String comment;
    

    public Integer getPostReviewId() {
        return postReviewId;
    }

    public void setPostReviewId(Integer postReviewId) {
        this.postReviewId = postReviewId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

//    public Integer getBuyerPostId() {
//        return buyerPostId;
//    }
//
//    public void setBuyerPostId(Integer buyerPostId) {
//        this.buyerPostId = buyerPostId;
//    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }



    @Override
    public String toString() {
        return "PostReview{" +
                "postReviewId=" + postReviewId +
                ", rating='" + rating + '\'' +
                ", sellerEmail='" + sellerEmail + '\'' +
//                ", buyerPostId='" + buyerPostId + '\'' +
                ", comment=" + comment + '\'' +
                '}';
    }
}
