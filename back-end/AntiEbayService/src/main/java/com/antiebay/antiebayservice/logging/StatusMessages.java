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
    INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID("User Logged In Is Not Offer Buyer."),
    USER_POST_CREATE_SUCCESS("Post Successfully Created."),
    USER_POST_CREATE_FAIL("Post Creation Failed."),
    POST_REVIEW_CREATE_SUCCESS("Post Review Successfully Created."),
    POST_REVIEW_CREATE_FAIL("Post Review Creation Failed."),
    POST_REVIEW_DELETE_SUCESS("Post Review Delete Success."),
    POST_REVIEW_DELETE_FAIL("Post Review Delete Fail."),
    SELLER_REVIEW_CREATE_SUCCESS("Seller Review Successfully Created."),
    SELLER_REVIEW_CREATE_FAIL("Seller Review Creation Failed."),
    SELLER_REVIEW_DELETE_FAIL("Seller Review Delete Failed"),
    SELLER_REVIEW_DELETE_SUCCESS("Seller Review Delete Success."),
    POST_DELETE_SUCCESS("Post Successfully Deleted."),
    POST_RETRIEVAL_FAIL("Post does not exist."),
    POST_DELETE_FAIL("Post Delete Failed."),
    POST_IMAGE_DELETE_SUCCESS("Post Image Delete Success."),
    POST_IMAGE_DELETE_FAIL("Post Image Delete Fail."),
    BID_SAVE_SUCCESS("Bid Successfully Created."),
    BID_SAVE_FAIL("Bid Creation Failed."),
    BID_RETRIEVAL_FAIL("Bid does not exist."),
    BID_ACCEPTED("Bid has been accepted."),
    BID_DELETE_SUCCESS("Bid Successfully Deleted."),
    BID_DELETE_FAIL("Bid Delete Failed."),
    BID_IMAGE_DELETE_FAIL("Bid Image Delete Fail."),
    BID_IMAGE_DELETE_SUCCESS("Bid Image Delete Success."),
    ACCOUNT_DELETE_SUCCESS("Account Successfully Deleted."),
    ACCOUNT_DELETE_FAIL("Account Delete Failed.");

    private final String message;

    StatusMessages(String s) {
        message = s;
    }

    @Override
    public String toString() {
        return message;
    }
}
