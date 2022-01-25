CREATE DATABASE IF NOT EXISTS AntiEbay;
USE AntiEbay;

CREATE TABLE IF NOT EXISTS user (
    userId VARCHAR(225) NOT NULL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255), 
    emailAddress VARCHAR(255),
    userType VARCHAR(225),  
    password CHAR(41),
    joinDate DATETIME
);