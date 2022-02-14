package com.antiebay.antiebayservice.logging;

public enum StatusMessages {
    USER_EXISTS("User Exists."),
    USER_NOT_EXIST("User Does Not Exist."),
    LOGIN_SUCCESS("User Successfully Logged In."),
    LOGIN_FAIL("User Failed To Authenticate."),
    LOGIN_PASSWORD_VERIFIED("User Password Verified."),
    LOGIN_PASSWORD_NOT_VERIFIED("User Password Not Verified."),
    USER_ACCOUNT_CREATE_SUCCESS("User Account Successfully Created."),
    USER_ACCOUNT_CREATE_FAIL("User Account Creation Failed."),
    USER_NOT_LOGGED_IN("User Is Not Logged In."),
    USER_LOGGED_IN_NOT_SELLER("User Logged In Is Not Of Seller Type"),
    USER_LOGGED_IN_NOT_BUYER("User Logged In Is Not Of Buyer Type"),
    INTERACTION_SELLER_ID_NOT_MATCH_SESSION_ID("User Login ID Is Not Offer SellerID."),
    INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID("User Logged In Is Not Offer Buyer.");

    private final String message;

    StatusMessages(String s) {
        message = s;
    }

    @Override
    public String toString() {
        return message;
    }
}
