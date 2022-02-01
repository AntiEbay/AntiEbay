CREATE DATABASE IF NOT EXISTS AntiEbay;
USE AntiEbay;

-- Table of all users. These include attributes shared by both buyer and seller
CREATE TABLE IF NOT EXISTS user (
    userId VARCHAR(225),
    firstName VARCHAR(255),
    lastName VARCHAR(255), 
    emailAddress VARCHAR(255) PRIMARY KEY,
    userType VARCHAR(225),  
    password CHAR(41),
    joinDate DATETIME
);

/*
-- Table for user type, eacher a buyer or a seller. Will do the logic on Backedn service so this might not be nessesay. 
CREATE TABLE IF NOT EXISTS userType (
    userType VARCHAR(225) PRIMARY KEY,
    type ENUM('buyer', 'seller'),
    CONSTRAINT FK_userType Foreign Key (userType) REFERENCES user(userType)
);
*/

-- Table for buyers. More attributes will be added as profile develops
CREATE TABLE IF NOT EXISTS buyer (
    email VARCHAR(225) PRIMARY KEY,
    CONSTRAINT 'FK_email' Foreign Key (email) REFERENCES user(emailAddress)
);

-- Table for seller. More attributes will be added as profile develops
CREATE TABLE IF NOT EXISTS seller (
    email VARCHAR(225) PRIMARY KEY,
    CONSTRAINT 'FK_email' Foreign Key (email) REFERENCES user(emailAddress)
);