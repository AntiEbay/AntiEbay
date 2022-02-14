package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.logging.StatusMessages;
import com.antiebay.antiebayservice.useraccounts.*;
import com.antiebay.antiebayservice.useroffers.UserOffer;
import com.antiebay.antiebayservice.userposts.*;
import jdk.jshell.Snippet;
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

    @Autowired
    private PostsRepository postsRepository; 

    @Autowired
    private PostsRegistration userPosts;

    private static final Logger logger = LogManager.getLogger(AntiEbayRestController.class);

    @PostMapping(value = "/user/registration", consumes = {"application/json"})
    private String registerUserAccount(@RequestBody UserAccountIntermediate userAccount) {
        logger.info("Received user registration request for: " + userAccount.getEmailAddress());

        // Check if user already exists
        Optional<UserAccountEntity> userAccountEnt = userRepository.findById(userAccount.getEmailAddress());

        // If user already exists, don't write new data
        if (userAccountEnt.isPresent()) {
            logger.warn(StatusMessages.USER_ACCOUNT_CREATE_FAIL + " Cause: " + StatusMessages.USER_EXISTS);
            return StatusMessages.USER_ACCOUNT_CREATE_FAIL.toString();
        }

        // Try writing user to database
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

        // Get user from database
        Optional<UserAccountEntity> userAccount = userRepository.findById(userLoginRequest.getEmailAddress());

        // if databse does not contain user
        if (userAccount.isEmpty()) {
            logger.warn(StatusMessages.LOGIN_FAIL + " Cause: " + StatusMessages.USER_NOT_EXIST);
            return StatusMessages.LOGIN_FAIL.toString();
        }

        // Get user account from Optional object for easier use later
        UserAccountEntity userAccountEnt = userAccount.get();

        logger.info(StatusMessages.USER_EXISTS);

        // If the incoming password does not match the database password
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

    private boolean isUserLoggedIn(HttpSession session) {
        return session.getAttribute("email") != null && session.getAttribute("userType") != null;
    }


    // TODO: Idea for security: introduce integrity hash check for requests?
    @PostMapping(value = "/user/interactions/makeoffer")
    private String userSellerMakeOffer(@RequestBody UserOffer userOffer,
                                       HttpServletRequest request) {
        logger.info("Received Make Offer Request From: " + userOffer.getSellerId());
        HttpSession session = request.getSession();

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Check if user logged in is user in userOffer
        if (!userOffer.getSellerId().equals(session.getAttribute("email"))) {
            logger.warn(StatusMessages.INTERACTION_SELLER_ID_NOT_MATCH_SESSION_ID);
            return StatusMessages.INTERACTION_SELLER_ID_NOT_MATCH_SESSION_ID.toString();
        }

        // Check if user logged in is of seller type
        if (!session.getAttribute("userType").equals("seller")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_SELLER);
            return StatusMessages.USER_LOGGED_IN_NOT_SELLER.toString();
        }

        logger.info("Debug: User Make Offer Success.");

        // make write request to db

        return "";
    }

    @PostMapping(value = "/user/interactions/acceptoffer")
    private String userBuyerAcceptOffer(@RequestBody UserOffer userOffer,
                                        HttpServletRequest request) {
        logger.info("Received Accept Offer From: " + userOffer.getBuyerId());
        HttpSession session = request.getSession();

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Check if user logged in is user in userOffer
        if (!userOffer.getSellerId().equals(session.getAttribute("email"))) {
            logger.warn(StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID);
            return StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID.toString();
        }

        // Check if user logged in is of seller type
        if (!session.getAttribute("userType").equals("buyer")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_BUYER);
            return StatusMessages.USER_LOGGED_IN_NOT_BUYER.toString();
        }

        logger.info("Debug: User Make Offer Success.");
        // verify that offer exists

        // mark offer as accepted

        return "";
    }

    
    //PostMapping for writing a post to the databse
    @PostMapping(value = "user/post/writing", consumes = {"application/json"})
    private String userPostWriting(@RequestBody UserPosts userPosts, 
                                    HttpServletRequest request) {
        logger.info("Received user post request for: " + userPosts.getId());
        HttpSession session = request.getSession();

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Check if user logged in is user in buyer table
        //HOW CAN WE CONNECT USER ID TO THE POST ID?
        /*
        if (!userAccount.getBuyerId().equals(session.getAttribute("email"))) {
            logger.warn(StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID);
            return StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID.toString();
        }
        */

        // Check if user logged in is of buyer type
        if (!session.getAttribute("userType").equals("buyer")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_BUYER);
            return StatusMessages.USER_LOGGED_IN_NOT_BUYER.toString();
        }

        // Try writing user to database
        //THIS PART IS HAVING ISSUES
        /*
        try {
            postsRepository.save(new UserPosts(userPosts));
            logger.info(StatusMessages.USER_POST_CREATE_SUCCESS);
            return StatusMessages.USER_POST_CREATE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getStackTrace());
            logger.warn(StatusMessages.USER_POST_CREATE_FAIL);
            return StatusMessages.USER_POST_CREATE_FAIL.toString();
        }
        */
    }
    
    



    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
