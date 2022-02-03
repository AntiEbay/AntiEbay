package com.antiebay.antiebayservice.useraccounts;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "users")
public class UserAccountEntity {
    @Id
    @Column(name = "email_address")
    private String emailAddress;
    @Column(name = "user_id")
    private Integer id;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "password")
    private String password;
    @Column(name = "user_type")
    private String userType;

    public UserAccountEntity(UserAccountIntermediate userAccountI) {
        this.userName = userAccountI.getUserName();
        this.firstName = userAccountI.getFirstName();
        this.lastName = userAccountI.getLastName();
        this.emailAddress = userAccountI.getEmailAddress();
        this.password = userAccountI.getPassword();
        this.userType = userAccountI.getUserType();
    }

    public UserAccountEntity() {
    }

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

    @Override
    public String toString() {
        return "UserAccountEntity{" +
                "emailAddress='" + emailAddress + '\'' +
                ", id=" + id +
                ", userName='" + userName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", userType='" + userType + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
