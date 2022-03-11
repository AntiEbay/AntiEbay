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
    @Column(name = "buyer_post_id")
    private Integer postId;
    @Column(name = "comment")
    private String comment;
    

    
    /** 
     * Get function to get the post review Id
     * @return The post review Id
     */
    public Integer getPostReviewId() {
        return postReviewId;
    }

    
    /** 
     * Set function to set the post review Id
     * @param postReviewId from 
     */
    public void setPostReviewId(Integer postReviewId) {
        this.postReviewId = postReviewId;
    }

    
    /** 
     * @return Integer
     */
    public Integer getRating() {
        return rating;
    }

    
    /** 
     * @param rating
     */
    public void setRating(Integer rating) {
        this.rating = rating;
    }

    
    /** 
     * @return String
     */
    public String getSellerEmail() {
        return sellerEmail;
    }

    
    /** 
     * @param sellerEmail
     */
    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    
    /** 
     * @return String
     */
    public String getComment() {
        return comment;
    }

    
    /** 
     * @param comment
     */
    public void setComment(String comment) {
        this.comment = comment;
    }



    
    /** 
     * @return String
     */
    @Override
    public String toString() {
        return "PostReview{" +
                "postReviewId=" + postReviewId +
                ", rating='" + rating + '\'' +
                ", sellerEmail='" + sellerEmail + '\'' +
                ", buyerPostId='" + postId + '\'' +
                ", comment=" + comment + '\'' +
                '}';
    }

    
    /** 
     * @return Integer
     */
    public Integer getPostId() {
        return postId;
    }

    
    /** 
     * @param postId
     */
    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
