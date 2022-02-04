package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.useraccounts.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

    private static final Logger logger = LogManager.getLogger(AntiEbayRestController.class);


    @PostMapping(value = "/user/registration", consumes = {"application/json"})
    private String registerUserAccount(@RequestBody UserAccountIntermediate userAccount,
                                     HttpServletRequest request,
                                     Errors errors) {
        logger.info("Received user registration request for: " + userAccount.getEmailAddress());
        try {
            UserAccountEntity userEntity = new UserAccountEntity(userAccount);
            userRepository.save(userEntity);
            logger.info("Successfully wrote user: " + userEntity.getEmailAddress() + " to database.");
            return userAccount.toString();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }

    @PostMapping(value = "/user/login", consumes = {"application/json"})
    private String loginUserAccount(@RequestBody UserLoginRequest userLoginRequest,
                                    HttpServletRequest request,
                                    HttpSession session,
                                    Errors errors) {

        // Check if user exists
        // If so, return all information in user table (minus password I suppose)
        logger.info("Login request received for: " + userLoginRequest.getEmailAddress());

        // Debug
        logger.info("********** INCOMING USER SESSION VARIABLES **********");
        Enumeration<String> attributes = session.getAttributeNames();
        while (attributes.hasMoreElements()) {
            String attr = attributes.nextElement();
            logger.info(attr + " -> " + session.getAttribute(attr));
        }
        logger.info("*****************************************************");

        Optional<UserAccountEntity> userAccount = userRepository.findById(userLoginRequest.getEmailAddress());

        if (userAccount.isEmpty()) {
            logger.warn("Could not sign in user: " + userLoginRequest.getEmailAddress());
            return "Could not find user: " + userLoginRequest;
        }

        UserAccountEntity userAccountEnt = userAccount.get();

        logger.info("Successfully verified that: " + userAccountEnt.getEmailAddress() +
                " exists in database.");

        if (!userLoginRequest.getPassword().equals(userAccountEnt.getPassword())) {
            logger.warn("Could not log user " + userLoginRequest.getEmailAddress() + " in: Wrong password");
            return "Password failed to verify";
        }
        logger.info("Successfully verified password for: " + userAccount.get().getEmailAddress());

        // Set session variables for login
        session.setAttribute("email", userLoginRequest.getEmailAddress());
        session.setAttribute("userType", userAccountEnt.getUserType());

        logger.info("Successfully logged in: " + userAccountEnt.getEmailAddress());

        logger.info("********** OUTGOING USER SESSION VARIABLES **********");
        attributes = session.getAttributeNames();
        while (attributes.hasMoreElements()) {
            String attr = attributes.nextElement();
            logger.info('\t' + attr + " -> " + session.getAttribute(attr));
        }
        logger.info("*****************************************************");

        return userAccount.toString();
    }


    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
