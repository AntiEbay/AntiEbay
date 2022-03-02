package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.logging.StatusMessages;
import com.antiebay.antiebayservice.reviews.PostReview;
import com.antiebay.antiebayservice.reviews.PostReviewRepository;
import com.antiebay.antiebayservice.reviews.SellerReview;
import com.antiebay.antiebayservice.reviews.SellerReviewRepository;
import com.antiebay.antiebayservice.search.SearchRequest;
import com.antiebay.antiebayservice.search.SearchResponse;
import com.antiebay.antiebayservice.search.SearchResult;
import com.antiebay.antiebayservice.search.SearchService;
import com.antiebay.antiebayservice.useraccounts.*;
import com.antiebay.antiebayservice.useroffers.UserOffer;
import com.antiebay.antiebayservice.userposts.PostsRegistration;
import com.antiebay.antiebayservice.userposts.PostsRepository;
import com.antiebay.antiebayservice.userposts.UserPosts;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.antiebay.antiebayservice.userposts.PostRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
	private SearchService searchService;

    @Autowired
    private PostReviewRepository postReviewRepository;

    @Autowired
    private SellerReviewRepository sellerReviewRepository;

    


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
                                    HttpServletRequest request) throws JsonProcessingException {

        // Default Login Response
        UserLoginResponse userLoginResponse = new UserLoginResponse(false);
        String responseStr = objectMapper.writeValueAsString(userLoginResponse);

        // Get session for writing
        HttpSession session = request.getSession();

        // Check if user exists
        // If so, return all information in user table (minus password I suppose)
        logger.info("Login request received for: " + userLoginRequest.getEmailAddress());

        // Get user from database
        Optional<UserAccountEntity> userAccount = userRepository.findById(userLoginRequest.getEmailAddress());

        // if database does not contain user
        if (userAccount.isEmpty()) {
            logger.warn(StatusMessages.LOGIN_FAIL + " Cause: " + StatusMessages.USER_NOT_EXIST);
            return responseStr;
        }

        // Get user account from Optional object for easier use later
        UserAccountEntity userAccountEnt = userAccount.get();

        logger.info(StatusMessages.USER_EXISTS);

        // If the incoming password does not match the database password
        if (!userLoginRequest.getPassword().equals(userAccountEnt.getPassword())) {
            logger.warn(StatusMessages.LOGIN_FAIL + " Cause: " + StatusMessages.LOGIN_PASSWORD_NOT_VERIFIED);
            return responseStr;
        }

        logger.info(StatusMessages.LOGIN_PASSWORD_VERIFIED);

        // Modify Login Response
        userLoginResponse.setUserType(userAccountEnt.getUserType());
        userLoginResponse.setLoggedIn(true);

        // Set response
        responseStr = objectMapper.writeValueAsString(userLoginResponse);

        // Set session variables for login
        session.setAttribute("email", userLoginRequest.getEmailAddress());
        session.setAttribute("userType", userAccountEnt.getUserType());

        logger.info(StatusMessages.LOGIN_SUCCESS);

        return responseStr;
    }

    private boolean isUserLoggedIn(HttpSession session) {
        return session.getAttribute("email") != null && session.getAttribute("userType") != null;
    }


    // TODO: Idea for security: introduce integrity hash check for requests?
    @PostMapping(value = "/user/interactions/makeoffer", consumes = {"application/json"})
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

    @PostMapping(value = "/user/interactions/acceptoffer", consumes = {"application/json"})
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

        // debug
//        for (UserPostImage img : userPosts.getImageList()) {
//            if (!img.getFileName().contains(".")) {
//                img.setFileName(img.getFileName() + ".png");
//            }
//            img.setFileName(System.nanoTime() + '_' + img.getFileName());
//            img.writeFile();
//        }
        // end debug

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Get email from http
//        if (!userPosts.getBuyerEmail().equals(session.getAttribute("email"))) {
//            logger.warn(StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID);
//            return StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID.toString();
//        }

        // Check if user logged in is of buyer type
        if (!session.getAttribute("userType").equals("buyer")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_BUYER);
            return StatusMessages.USER_LOGGED_IN_NOT_BUYER.toString();
        }

        // set email from session
        userPosts.setBuyerEmail(String.valueOf(session.getAttribute("email")));

        // debug
//        userPosts.setBuyerEmail(session.getAttribute("email").toString());

        // Try writing user to database
        try {
            postsRepository.save(userPosts);
            userPosts.setPostPath("users/" + userPosts.getBuyerEmail() + '/' + userPosts.getPostId() + '/');
            postsRepository.save(userPosts);
            logger.info(StatusMessages.USER_POST_CREATE_SUCCESS);
            userPosts.writeImages();
            return StatusMessages.USER_POST_CREATE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getMessage());
            logger.warn(StatusMessages.USER_POST_CREATE_FAIL);
            return StatusMessages.USER_POST_CREATE_FAIL.toString();
        }
    }

    //A retrieval function that will send back whole post back to the front end with just the ID and email
    @PostMapping(value = "/user/post/retrieval", consumes = {"application/json"})
    private String userPostRequest(@RequestBody PostRequest requestPost,
                                   HttpServletRequest request) throws JsonProcessingException {

        Optional<UserPosts> userPost = postsRepository.findById(requestPost.getId());

        if(userPost.isEmpty()) {
            return objectMapper.writeValueAsString(userPost);
        }

        String strToReturn = "";
        try {
            strToReturn = objectMapper.writeValueAsString(userPost);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return strToReturn;
    }


    private double getUserAverageReviewFromEmail(String email) {
        double reviewSum = 0;
        double reviewCount = 0;
        double averageReivew = 0;
        try {
            UserAccountEntity user = userRepository.getOne(email);

            if (user.getUserType().equals("buyer")) {
                List<UserPosts> userPosts = postsRepository.findByBuyerEmail(user.getEmailAddress());
                for (UserPosts post : userPosts) {
                    List<PostReview> postReviews = postReviewRepository.findByBuyerPostId(post.getPostId());
                    reviewCount += postReviews.size();
                    for (PostReview review : postReviews) {
                        reviewSum += review.getRating();
                    }
                }
            } else {
                List<SellerReview> sellerReviews = sellerReviewRepository.findBySellerId(user.getId());
                reviewCount += sellerReviews.size();
                for (SellerReview review : sellerReviews) {
                    reviewSum += review.getRating();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (reviewCount != 0) {
            averageReivew = reviewSum / reviewCount;
        }
        return averageReivew;
    }

    //Read keyword

    @PostMapping(value = "/search", consumes = {"application/json"})
    public String searchFunction(@RequestBody SearchRequest searchRequest) {
        SearchResponse response = new SearchResponse();
        List<UserPosts> returnedPosts = new ArrayList();
        try {
             returnedPosts = searchService.listAll(searchRequest.getQuery());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        for (UserPosts post : returnedPosts) {
            post.loadImages();
        }

        // calculate average review score for user
        for (UserPosts post : returnedPosts) {
            SearchResult searchRes = new SearchResult(post);
            double averageReviewScore = getUserAverageReviewFromEmail(post.getBuyerEmail());
            searchRes.setBuyerRating(averageReviewScore);
            response.addSearchResult(searchRes);
        }

        // get rating for each search result

        String strToReturn = "";
        try {
            strToReturn = objectMapper.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return strToReturn;
    }

    //PostMapping for writing a post review to the databse
    @PostMapping(value = "post/review/writing", consumes = {"application/json"})
    private String postReview(@RequestBody PostReview postReview, 
                                    HttpServletRequest request) {
        logger.info("Received post review request for: " + postReview.getPostReviewId());
        HttpSession session = request.getSession();

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Get email from http

        //if (!userPosts.getBuyerEmail().equals(session.getAttribute("email"))) {
            //logger.warn(StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID);
            //return StatusMessages.INTERACTION_BUYER_ID_NOT_MATCH_SESSION_ID.toString();
        //}

        // Check if user logged in is of seller type
        if (!session.getAttribute("userType").equals("seller")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_SELLER);
            return StatusMessages.USER_LOGGED_IN_NOT_SELLER.toString();
        }

        // debug
        //userPosts.setBuyerEmail(session.getAttribute("email").toString());

        // Try writing user to database
        try {
            postReviewRepository.save(postReview);
            logger.info(StatusMessages.POST_REVIEW_CREATE_SUCCESS);
            return StatusMessages.POST_REVIEW_CREATE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getMessage());
            logger.warn(StatusMessages.POST_REVIEW_CREATE_FAIL);
            return StatusMessages.POST_REVIEW_CREATE_FAIL.toString();
        }
    }

    //PostMapping for writing a seller review to the databse
    @PostMapping(value = "seller/review/writing", consumes = {"application/json"})
    private String sellerReview(@RequestBody SellerReview sellerReview,
                                    HttpServletRequest request) {
        logger.info("Received post review request for: " + sellerReview.getSellerReviewId());
        HttpSession session = request.getSession();

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }


        // Check if user logged in is of buyer type
        if (!session.getAttribute("userType").equals("buyer")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_BUYER);
            return StatusMessages.USER_LOGGED_IN_NOT_BUYER.toString();
        }


        // Try writing user to database
        try {
            sellerReviewRepository.save(sellerReview);
            logger.info(StatusMessages.SELLER_REVIEW_CREATE_SUCCESS);
            return StatusMessages.SELLER_REVIEW_CREATE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getMessage());
            logger.warn(StatusMessages.SELLER_REVIEW_CREATE_FAIL);
            return StatusMessages.SELLER_REVIEW_CREATE_FAIL.toString();
        }
    }

    //PostMapping for deleting a post from the databse
    @PostMapping(value = "post/delete", consumes = {"application/json"})
    private String postDelete(@RequestBody UserPosts userPosts, 
                                    HttpServletRequest request) {
        logger.info("Received user post request for: " + userPosts.getId());
        HttpSession session = request.getSession();


        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // set email from session
        userPosts.setBuyerEmail(String.valueOf(session.getAttribute("email")));

        // Try writing user to database
        try {
            postsRepository.deleteById(userPosts.getId());
            logger.info(StatusMessages.POST_DELETE_SUCCESS);
            return StatusMessages.POST_DELETE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getMessage());
            logger.warn(StatusMessages.POST_DELETE_FAIL);
            return StatusMessages.POST_DELETE_FAIL.toString();
        }
    }

    /*
    //PostMapping for deleting a bid from the databse
    @PostMapping(value = "bid/delete", consumes = {"application/json"})
    private String postDelete(@RequestBody UserOffer userOffer, 
                                    HttpServletRequest request) {
        logger.info("Received user post request for: " + userOffer.getId());//change this
        HttpSession session = request.getSession();


        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }


        // Try deleting bid from database
        try {
            postsRepository.deleteById(userPosts.getId());
            logger.info(StatusMessages.POST_DELETE_SUCCESS);
            return StatusMessages.POST_DELETE_SUCCESS.toString();
        } catch (Exception ex) {
            logger.warn(ex.getMessage());
            logger.warn(StatusMessages.POST_DELETE_FAIL);
            return StatusMessages.POST_DELETE_FAIL.toString();
        }
    }
    */
    

    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        String msg = "<h1>That's no endpoint......its a debug page</h1><br>";
        msg += "<pre>";
        msg += "            .          .\n" +
                "  .          .                  .          .              .\n" +
                "        +.           _____  .        .        + .                    .\n" +
                "    .        .   ,-~\"     \"~-.                                +\n" +
                "               ,^ ___         ^. +                  .    .       .\n" +
                "              / .^   ^.         \\         .      _ .\n" +
                "             Y  l  o  !          Y  .         __CL\\H--.\n" +
                "     .       l_ `.___.'        _,[           L__/_\\H' \\\\--_-          +\n" +
                "             |^~\"-----------\"\"~ ^|       +    __L_(=): ]-_ _-- -\n" +
                "   +       . !                   !     .     T__\\ /H. //---- -       .\n" +
                "          .   \\                 /               ~^-H--'\n" +
                "               ^.             .^            .      \"       +.\n" +
                "                 \"-.._____.,-\" .                    .\n" +
                "          +           .                .   +                       .\n" +
                "   +          .             +                                  .\n" +
                "          .             .      .       \n";
        msg += "<pre/>";
        return msg;
    }
}
