package com.antiebay.antiebayservice.userposts;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;

import javax.persistence.*;

@Entity
@Table(name = "posts")
public class UserPosts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;
    @Column(name = "buyer_email")
    private String buyerEmail;
    @Column(name = "photo_path")
    private String postPath;
    @Column(name = "title")
    private String title;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "price")
    private Integer price;
    @Column(name = "category")
    private String category;
    @Column(name = "product_condition")
    private String productCondition;
    @Column(name = "product_description")
    private String description;


    public UserPosts() {
    }

    public Integer getId() {
        return postId;
    }

    public void setId(Integer postId) {
        this.postId = postId;
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public String getPostPath() {
        return postPath;
    }

    public void setPostPath(String postPath) {
        this.postPath = postPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProductCondition(){
        return productCondition;
    }

    public void setProductCondition(String productCondition){
        this.productCondition = productCondition;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }


    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "UserPosts{" +
                "postId=" + postId +
                ", buyerEmail='" + buyerEmail + '\'' +
                ", postPath='" + postPath + '\'' +
                ", title='" + title + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", category='" + category + '\'' +
                ", productCondition='" + productCondition + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}