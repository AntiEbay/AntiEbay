package com.antiebay.antiebayservice.useraccounts;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserAccount {
    private String userName;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public String toString() {
        return JSONObjectMapper.mapObjectToString(this);
    }
}
