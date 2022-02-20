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
    product_description VARCHAR(225)
);

CREATE TABLE IF NOT EXISTS offer (
    offer_id int AUTO_INCREMENT PRIMARY KEY ,
    offer_amount int,
    seller_id VARCHAR(225),
    buyer_id VARCHAR(225),
    buyer_postId VARCHAR(225),
    accepted VARCHAR(225)
);

-- Table for buyers. More attributes will be added as profile develops
CREATE TABLE IF NOT EXISTS buyer (
    email VARCHAR(225) PRIMARY KEY,
    buyer VARCHAR(225),
    buyer_id int
    -- CONSTRAINT fk_post FOREIGN KEY (buyer_id) REFERENCES posts(post_id)
);

-- Table for seller. More attributes will be added as profile develops
CREATE TABLE IF NOT EXISTS seller (
    email VARCHAR(225) PRIMARY KEY,
    seller VARCHAR(225)
    -- CONSTRAINT fk_email Foreign Key (email) REFERENCES users(email_address)
);