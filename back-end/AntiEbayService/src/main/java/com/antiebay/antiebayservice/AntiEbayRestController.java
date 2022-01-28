package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.useraccounts.UserAccount;
import com.antiebay.antiebayservice.useraccounts.UserRegistrationService;
import com.antiebay.antiebayservice.useraccounts.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*")
public class AntiEbayRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRegistrationService userRegistrationService;

    @PostMapping(value = "/user/registration", consumes = {"application/json"})
    private String registerUserAccount(@RequestBody UserAccount userAccount,
                                     HttpServletRequest request,
                                     Errors errors) {
        System.out.println("Received registration request");
        try {
            userRepository.save(userAccount);
            return userAccount.toString();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }


    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
