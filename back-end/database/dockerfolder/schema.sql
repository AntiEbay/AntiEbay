CREATE DATABASE IF NOT EXISTS AntiEbay;
USE AntiEbay;

-- Table of all users. These include attributes shared by both buyer and seller
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(225),
    first_name VARCHAR(255),
    last_name VARCHAR(255), 
    email_address VARCHAR(255) PRIMARY KEY,
    user_type VARCHAR(225),  
    password CHAR(41),
    join_date DATETIME
    -- CONSTRAINT fk_email Foreign Key (email_address) REFERENCES buyer(email)--this may not work, work in progress idea
);


--Post table to keep track of posts for each user
--Each post will have these features from frontend

--One to many relationship
CREATE TABLE IF NOT EXISTS posts (
    post_id int AUTO_INCREMENT PRIMARY KEY ,
    buyer_email VARCHAR(225),
    photo_path VARCHAR(225),
    title VARCHAR(225),
    quantity int,
    price int,
    category VARCHAR(225),
    product_condition VARCHAR(225),
    product_description VARCHAR(225),
    post_is_complete VARCHAR(255)
);

-- Table containing bidding information
CREATE TABLE IF NOT EXISTS bid (
    bid_id int AUTO_INCREMENT PRIMARY KEY ,
    bid_amount float,
    seller_email VARCHAR(225),
    buyer_id VARCHAR(225),
    buyer_post_id VARCHAR(225),
    accepted VARCHAR(225),
    bid_path VARCHAR(225)
);

-- Table containing information about a review on a post made by a seller
CREATE TABLE IF NOT EXISTS post_review (
    post_review_id int AUTO_INCREMENT PRIMARY KEY ,
    rating int,
    seller_email VARCHAR(225),
    buyer_post_id int,
    comment VARCHAR(225)
);

-- Table containing information on the reviews of a seller
CREATE TABLE IF NOT EXISTS seller_review (
    seller_review_id int AUTO_INCREMENT PRIMARY KEY ,
    rating int,
    buyer_email VARCHAR(225),
    seller_email VARCHAR(225),
    comment VARCHAR(225)
);

-- Table for buyers. More attributes will be added as profile develops
CREATE TABLE IF NOT EXISTS buyer (
    email VARCHAR(225) PRIMARY KEY,
    buyer VARCHAR(225),
    buyer_id int
    -- CONSTRAINT fk_post FOREIGN KEY (buyer_id) REFERENCES posts(post_id)
);

-- Table for seller. More attributes will be added as profile develops
-- add attribute for ratings/reviews?
CREATE TABLE IF NOT EXISTS seller (
    email VARCHAR(225) PRIMARY KEY,
    seller VARCHAR(225),
    seller_id int
    -- CONSTRAINT fk_email Foreign Key (email) REFERENCES users(email_address)
);