package com.antiebay.antiebayservice.useraccounts;

import com.fasterxml.jackson.databind.JsonSerializer;

public class UserLoginResponse {
    private boolean isLoggedIn;
    private String userType;

    public UserLoginResponse(boolean isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        this.userType = "none";
    }

    public UserLoginResponse(boolean isLoggedIn, String userType) {
        this.isLoggedIn = isLoggedIn;
        this.userType = userType;
    }

    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        isLoggedIn = loggedIn;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "UserLoginResponse{" +
                "isLoggedIn=" + isLoggedIn +
                ", userType='" + userType + '\'' +
                '}';
    }
}
