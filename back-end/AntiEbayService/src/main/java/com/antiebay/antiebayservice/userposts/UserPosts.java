package com.antiebay.antiebayservice.userposts;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;

import javax.persistence.*;

@Entity
@Table(name = "post")
public class UserPosts {
    @Id
    @Column(name = "post_id")
    private Integer postId;
    @Column(name = "post_path")
    private String postPath;
    @Column(name = "title")
    private String title;
    @Column(name = "quality")
    private String quality;
    @Column(name = "price")
    private Integer price;
    @Column(name = "category")
    private String category;
    @Column(name = "product_condition")
    private String productCondition;
    @Column(name = "description")
    private String description;


    public UserPosts() {
    }

    public Integer getId() {
        return postId;
    }

    public void setId(Integer postId) {
        this.postId = postId;
    }

    public String getPostPath() {
        return postPath;
    }

    public void setFirstName(String postPath) {
        this.postPath = postPath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
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

    @Override
    public String toString() {
        return "UserPosts{" +
                "postId='" + postId + '\'' +
                ", postPath=" + postPath +
                ", title='" + title + '\'' +
                ", quality='" + quality + '\'' +
                ", price='" + price+ '\'' +
                ", category='" + category + '\'' +
                ", productCondition='" + productCondition + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

}