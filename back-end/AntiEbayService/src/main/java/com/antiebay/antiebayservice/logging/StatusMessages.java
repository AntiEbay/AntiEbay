package com.antiebay.antiebayservice.logging;

public enum StatusMessages {
    USER_EXISTS("User Exists"),
    USER_NOT_EXIST("User Does Not Exist"),
    LOGIN_SUCCESS("User Successfully Logged In"),
    LOGIN_FAIL("User Failed To Authenticate"),
    LOGIN_PASSWORD_VERIFIED("User Password Verified"),
    LOGIN_PASSWORD_NOT_VERIFIED("User Password Not Verified"),
    USER_ACCOUNT_CREATE_SUCCESS("User Account Successfully Created"),
    USER_ACCOUNT_CREATE_FAIL("User Account Creation Failed");

    StatusMessages(String s) {
    }
}
