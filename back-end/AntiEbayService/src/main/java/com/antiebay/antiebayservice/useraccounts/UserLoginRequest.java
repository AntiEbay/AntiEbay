package com.antiebay.antiebayservice.useraccounts;

public class UserLoginRequest {
    private String emailAddress;
    private String password;
    private String userType;

    public UserLoginRequest(String emailAddress, String password, String userType) {
        this.emailAddress = emailAddress;
        this.password = password;
        this.userType = userType;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "UserLoginRequest{" +
                "emailAddress='" + emailAddress + '\'' +
                ", password='" + password + '\'' +
                ", userType='" + userType + '\'' +
                '}';
    }
}
