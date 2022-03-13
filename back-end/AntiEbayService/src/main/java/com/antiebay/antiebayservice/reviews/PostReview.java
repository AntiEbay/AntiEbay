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
     * Set function to set the post review Id to whatever value is passed through the function
     * @param postReviewId
     */
    public void setPostReviewId(Integer postReviewId) {
        this.postReviewId = postReviewId;
    }

    
    /** 
     * Get function to get the rating
     * @return Integer
     */
    public Integer getRating() {
        return rating;
    }

    
    /** 
     * Set function to set the rating to whatever value is passed through the function
     * @param rating
     */
    public void setRating(Integer rating) {
        this.rating = rating;
    }

    
    /** 
     * Get function to get the seller email
     * @return String
     */
    public String getSellerEmail() {
        return sellerEmail;
    }

    
    /** 
     * Set function to set the seller email to whatever value is passed through the function
     * @param sellerEmail
     */
    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    
    /** 
     * Get function to get the comment for a review
     * @return String
     */
    public String getComment() {
        return comment;
    }

    
    /** 
     * Set function to set the comment to whatever value is passed through the function
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
     * Get function to get the post Id for which the review is on
     * @return postId
     */
    public Integer getPostId() {
        return postId;
    }

    
    /** 
     * Set function to set the post Id to whatever value is passed through the function
     * @param postId
     */
    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
