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
    


    
    /** 
     * Get function to get the unique the sellerReveiwId 
     * @return Integer
     */
    public Integer getSellerReviewId() {
        return sellerReviewId;
    }

    
    /** 
     * Set function to set the sellerReviewId to whatever value is passed through the function
     * @param sellerReviewId
     */
    public void setSellerReviewId(Integer sellerReviewId) {
        this.sellerReviewId = sellerReviewId;
    }

    
    /** 
     * Get function to the rating
     * @return The rating
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
     * Get function to get the buyerEmail
     * @return buyerEmail
     */
    public String getBuyerEmail() {
        return buyerEmail;
    }

    
    /** 
     * Set function to set the buyerEmail to whatever value is passed through the function
     * @param buyerEmail
     */
    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    //Following two functions are not used
    public String getBuyerPostId() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerId) {
        this.sellerEmail = sellerId;
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
        return "SellerReview{" +
                "sellerReviewId=" + sellerReviewId +
                ", rating='" + rating + '\'' +
                ", buyerEmail='" + buyerEmail + '\'' +
                ", sellerId='" + sellerEmail + '\'' +
                ", comment=" + comment + '\'' +
                '}';
    }
}
