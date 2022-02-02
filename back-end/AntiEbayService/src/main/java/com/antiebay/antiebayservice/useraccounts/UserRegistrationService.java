package com.antiebay.antiebayservice.useraccounts;

import org.springframework.stereotype.Component;

@Component("userRegistrationService")
public class UserRegistrationService {
    public UserAccount registerUser(UserAccount userAccount) {
        return userAccount;
    }
}
