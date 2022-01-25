package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.useraccounts.UserAccount;
import com.antiebay.antiebayservice.useraccounts.UserRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class AntiEbayRestController {
    private final UserRegistrationService userRegistrationService;

    public AntiEbayRestController(UserRegistrationService userRegistrationService) {
        this.userRegistrationService = userRegistrationService;
    }

    @PostMapping(value = "/user/registration", consumes = {"application/json"})
    private void registerUserAccount(@RequestBody UserAccount userAccount,
                                     HttpServletRequest request,
                                     Errors errors) {
        System.out.println("Received registration request");
        try {
            UserAccount registered = userRegistrationService.registerUser(userAccount);
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
