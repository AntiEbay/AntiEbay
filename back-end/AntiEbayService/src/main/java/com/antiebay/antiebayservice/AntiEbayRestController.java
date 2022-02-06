package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.logging.StatusMessages;
import com.antiebay.antiebayservice.useraccounts.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class AntiEbayRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRegistrationService userRegistrationService;

    private static final Logger logger = LogManager.getLogger(AntiEbayRestController.class);

    @PostMapping(value = "/user/registration", consumes = {"application/json"})
    private String registerUserAccount(@RequestBody UserAccountIntermediate userAccount) {
        logger.info("Received user registration request for: " + userAccount.getEmailAddress());

        // Check if user already exists
        Optional<UserAccountEntity> userAccountEnt = userRepository.findById(userAccount.getEmailAddress());
        if (userAccountEnt.isPresent()) {
            logger.warn(StatusMessages.USER_ACCOUNT_CREATE_FAIL + " Cause: " + StatusMessages.USER_EXISTS);
            return StatusMessages.USER_ACCOUNT_CREATE_FAIL.toString();
        }

        try {
            userRepository.save(new UserAccountEntity(userAccount));
            logger.info(StatusMessages.USER_ACCOUNT_CREATE_SUCCESS);
            return StatusMessages.USER_ACCOUNT_CREATE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getStackTrace());
            logger.warn(StatusMessages.USER_ACCOUNT_CREATE_FAIL);
            return StatusMessages.USER_ACCOUNT_CREATE_FAIL.toString();
        }
    }

    @PostMapping(value = "/user/login", consumes = {"application/json"})
    private String loginUserAccount(@RequestBody UserLoginRequest userLoginRequest,
                                    HttpServletRequest request) {

        // Get session for writing
        HttpSession session = request.getSession();

        // Check if user exists
        // If so, return all information in user table (minus password I suppose)
        logger.info("Login request received for: " + userLoginRequest.getEmailAddress());

        Optional<UserAccountEntity> userAccount = userRepository.findById(userLoginRequest.getEmailAddress());

        if (userAccount.isEmpty()) {
            logger.warn(StatusMessages.LOGIN_FAIL + " Cause: " + StatusMessages.USER_NOT_EXIST);
            return StatusMessages.LOGIN_FAIL.toString();
        }

        UserAccountEntity userAccountEnt = userAccount.get();

        logger.info(StatusMessages.USER_EXISTS);

        if (!userLoginRequest.getPassword().equals(userAccountEnt.getPassword())) {
            logger.warn(StatusMessages.LOGIN_FAIL + " Cause: " + StatusMessages.LOGIN_PASSWORD_NOT_VERIFIED);
            return StatusMessages.LOGIN_FAIL.toString();
        }
        logger.info(StatusMessages.LOGIN_PASSWORD_VERIFIED);

        // Set session variables for login
        session.setAttribute("email", userLoginRequest.getEmailAddress());
        session.setAttribute("userType", userAccountEnt.getUserType());

        logger.info(StatusMessages.LOGIN_SUCCESS);
        return StatusMessages.LOGIN_SUCCESS.toString();
    }


    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
