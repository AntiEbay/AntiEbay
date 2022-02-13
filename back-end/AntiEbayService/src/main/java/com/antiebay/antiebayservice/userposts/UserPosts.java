package com.antiebay.antiebayservice.userposts;

//import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;

import javax.persistence.*;

@Entity
@Table(name = "post")
public class UserPosts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer postId;
    private String postPath;
    private String title;
    private String quality;
    private Integer price;
    private String category;
    private String productCondition;
    private String description;
}