package com.antiebay.antiebayservice.userposts;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;

import javax.persistence.*;
import java.io.File;
import java.util.List;

@Entity
@Table(name = "requested post")
public class PostRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;
    @Column(name = "buyer_email")
    private String buyerEmail;

    @Transient
    private List<UserPostImage> imageList;

    public PostRequest() {
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

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    @Override
    public String toString() {
        return "UserPosts{" +
                "postId=" + postId +
                ", buyerEmail='" + buyerEmail + '\'' +
                '}';
    }
}