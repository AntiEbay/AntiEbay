package com.antiebay.antiebayservice.userposts;

import com.antiebay.antiebayservice.sellerbids.SellerBidEntity;

import javax.persistence.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

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
    @Column(name = "post_is_complete")
    private String postIsComplete;

    @Transient
    private List<SellerBidEntity> bidList;

    @Transient
    private List<UserPostImage> imageList;

    public String getPostIsComplete() {
        return postIsComplete;
    }

    public void setPostIsComplete(String postIsComplete) {
        this.postIsComplete = postIsComplete;
    }


    public UserPosts() {
        postId = -1;
        buyerEmail = "";
        postPath = ".";
        title = "";
        quantity = -1;
        price = -1;
        category = "";
        productCondition = "";
        description = "";
        postIsComplete = "";
        bidList = new ArrayList<>();
        imageList = new ArrayList<>();
    }

    public void writeImages() {
        File userParentDir = new File("users/");
        if (!userParentDir.exists()) {
            userParentDir.mkdirs();
        }
        File userDir = new File("users/" + buyerEmail + '/');
        if (!userDir.exists()) {
            userDir.mkdirs();
        }
        File postDir = new File("users/" + buyerEmail + '/' + postId + '/');
        if (!postDir.exists()) {
            postDir.mkdirs();
        }
        for (UserPostImage img : imageList) {
            img.setFileName("users/" + buyerEmail + '/' + postId + '/');
            img.writeFile();
        }
    }

    public void loadImages() {
        if (imageList == null) {
            imageList = new ArrayList<>();
        }
        File dir = new File(postPath);
        for (int i = 0; i < Objects.requireNonNull(dir.list()).length; i++) {
            imageList.add(getImageFromPath(postPath + i));
        }
    }

    private UserPostImage getImageFromPath(String path) {
        UserPostImage img = new UserPostImage();
        File f = new File(path);
        try {
            if (!f.exists()) {
                return img;
            }
            byte[] decoded = Files.readAllBytes(Path.of(path));
            String encoded  = Base64.getEncoder().encodeToString(decoded);
            img.setContents(encoded);
            img.setFileName(path + img.getType());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return img;
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

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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

    public String getProductCondition() {
        return productCondition;
    }

    public void setProductCondition(String productCondition) {
        this.productCondition = productCondition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<SellerBidEntity> getBidList() {
        return bidList;
    }

    public void setBidList(List<SellerBidEntity> bidList) {
        this.bidList = bidList;
    }

    public List<UserPostImage> getImageList() {
        return imageList;
    }

    public void setImageList(List<UserPostImage> imageList) {
        this.imageList = imageList;
    }
}