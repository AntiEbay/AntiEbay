package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.useraccounts.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class AntiEbayRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRegistrationService userRegistrationService;

    @PostMapping(value = "/user/registration", consumes = {"application/json"})
    private String registerUserAccount(@RequestBody UserAccountIntermediate userAccount,
                                     HttpServletRequest request,
                                     Errors errors) {
        System.out.println("Received registration request for:\n\t" + userAccount.toString());
        try {
            UserAccountEntity userEntity = new UserAccountEntity(userAccount);
            userRepository.save(userEntity);
            System.out.println("Successfully wrote:\n\t" + userEntity + "\nto database.");
            return userAccount.toString();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }

    @GetMapping(value = "/user/login", consumes = {"application/json"})
    private String loginUserAccount(@RequestBody UserLoginRequest userLoginRequest,
                                    HttpServletRequest request,
                                    HttpSession session,
                                    Errors errors) {
        // Debug
        Enumeration<String> attributes = session.getAttributeNames();
        while (attributes.hasMoreElements()) {
            String attr = attributes.nextElement();
            System.out.println(attr + " -> " + session.getAttribute(attr));
        }

        // Check if user exists
        // If so, return all information in user table (minus password I suppose)
        System.out.println("Login request recieved for\n" + userLoginRequest.toString());
        Optional<UserAccountEntity> userAccount = userRepository.findById(userLoginRequest.getEmailAddress());

        if (userAccount.isEmpty()) {
            System.out.println("Could not log user " + userLoginRequest.getEmailAddress() + " in.");
            return "Could not find user:" + userLoginRequest;
        }
        System.out.println("Successfully verified that:\n\t" + userAccount + "\nexists in database.");

        UserAccountEntity userAccountEnt = userAccount.get();

        if (!userLoginRequest.getPassword().equals(userAccountEnt.getPassword())) {
            System.out.println("Could not log user " + userLoginRequest.getEmailAddress() + " in: Wrong password");
            return "Password failed to verify";
        }
        System.out.println("Successfully verified password for:\n\t" + userAccount.get().getEmailAddress());

        // Set session variables for login
        session.setAttribute("email", userLoginRequest.getEmailAddress());
        session.setAttribute("userType", userAccountEnt.getUserType());

        System.out.println("Successfully logged in: " + userAccountEnt);
        return userAccount.toString();
    }


    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
