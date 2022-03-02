package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.logging.StatusMessages;
import com.antiebay.antiebayservice.reviews.PostReview;
import com.antiebay.antiebayservice.reviews.PostReviewRepository;
import com.antiebay.antiebayservice.reviews.SellerReview;
import com.antiebay.antiebayservice.reviews.SellerReviewRepository;
import com.antiebay.antiebayservice.search.*;
import com.antiebay.antiebayservice.sellerbids.BidRepository;
import com.antiebay.antiebayservice.sellerbids.BidsFromPostRequest;
import com.antiebay.antiebayservice.sellerbids.BidsFromPostResponse;
import com.antiebay.antiebayservice.sellerbids.SellerBidEntity;
import com.antiebay.antiebayservice.useraccounts.*;
import com.antiebay.antiebayservice.userposts.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class AntiEbayRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private PostReviewRepository postReviewRepository;

    @Autowired
    private SellerReviewRepository sellerReviewRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
	private SearchService searchService;

    @Autowired
    private FilterSearchResultsService filterSearchResultsService;

    private static final Logger logger = LogManager.getLogger(AntiEbayRestController.class);

    /**
     * REST API Endpoint that registers a user with our database
     * @param userAccount A user account object that is mapped via a JSON object
     * @return A status message indicating whether the registration was successful or not
     */
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

    /**
     * REST API Endpoint that logs in a user via the HTTP Session
     * @param userLoginRequest A request object that contains the user's login information
     * @param request The HTTP request object being sent to this endpoint
     * @return A JSON object indicating the login state
     * @throws JsonProcessingException Due to possible object mapping exceptions
     */
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

    /**
     * Helper method to test if a user is logged in
     * @param session The HTTP session containing user information
     * @return A boolean value denoting whether the user is logged in or not
     */
    private boolean isUserLoggedIn(HttpSession session) {
        return session.getAttribute("email") != null && session.getAttribute("userType") != null;
    }

    /**
     * REST API Endpoint that gets all the bids on a given post.
     * @param bidsFromPostRequest Request object containing the postId that is to be searched for.
     * @return Returns the JSON of an object containing a list of bids
     */
    @PostMapping(value = "/post/getbidsforpost")
    private String getBidsForPost(@RequestBody BidsFromPostRequest bidsFromPostRequest) {
        logger.info("Received Get Bids From Post Request for postId: " + bidsFromPostRequest.getPostId());

        // Empty response
        BidsFromPostResponse response = new BidsFromPostResponse();

        // get list of bids for postId
        List<SellerBidEntity> bids = bidRepository.findByBuyerPostId(bidsFromPostRequest.getPostId());

        // load images for postId
        for (SellerBidEntity bid : bids) {
            bid.loadImageFromStorage();
            response.addBid(bid);
        }

        String strToReturn = "";
        try {
            strToReturn = objectMapper.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return strToReturn;
    }

    /**
     * REST API Endpoint that writes a seller's bid to our database.
     * @param sellerBid An object mapped from JSON representing the bid that's being made.
     * @param request The HTTP request which contains the user session data
     * @return A status message indicating the status of the bid creation.
     */
    @PostMapping(value = "/user/interactions/makebid", consumes = {"application/json"})
    private String sellerMakeBid(@RequestBody SellerBidEntity sellerBid,
                                 HttpServletRequest request) {
        logger.info("Received Make Offer Request From: " + sellerBid.getSellerEmail());
        HttpSession session = request.getSession();

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Check if user logged in is user in sellerBid
        if (!session.getAttribute("userType").equals("seller")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_SELLER);
        }

        try {
            bidRepository.save(sellerBid);
            sellerBid.assignBidPath();
            sellerBid.writeBidImage();
            bidRepository.save(sellerBid);
        } catch (Exception ex) {
            ex.printStackTrace();
            logger.warn(StatusMessages.BID_SAVE_FAIL);
            return StatusMessages.BID_SAVE_FAIL.toString();
        }

        logger.info(StatusMessages.BID_SAVE_SUCCESS);

        return StatusMessages.BID_SAVE_SUCCESS.toString();
    }

    @PostMapping(value = "/user/interactions/acceptbid", consumes = {"application/json"})
    private String buyerAcceptBid(@RequestBody SellerBidEntity sellerBid,
                                  HttpServletRequest request) {
        HttpSession session = request.getSession();
        logger.info("Received Accept Offer From: " + session.getAttribute("email") +
                " for post: " + sellerBid.getBuyerPostId());

        // Check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // Check if user logged in is user in sellerBid
        if (!sellerBid.getSellerEmail().equals(session.getAttribute("email"))) {
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

    /**
     * Rest Endpoint that retrieves all the posts that a seller user has made bids for
     * @param request The http request object that is being sent to the endpoint
     * @return A list of posts that a user has made bids on
     */
    @PostMapping(value = "/user/interactions/getbidposts")
    private String retrieveAllPostsUserHasBidOn(HttpServletRequest request) {
        HttpSession session = request.getSession();
        logger.info("Recieved request to get all bids for user: " + session.getAttribute("email"));

        // check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // check if user is a seller
        if (!session.getAttribute("userType").equals("seller")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_SELLER);
            return StatusMessages.USER_LOGGED_IN_NOT_SELLER.toString();
        }

        List<SellerBidEntity> userBids = bidRepository.findBySellerEmail(String.valueOf(session.getAttribute("email")));

        HashSet<Integer> seenPosts = new HashSet<>();
        List<UserPosts> userPosts = new ArrayList<>();
        String returnStr = "";
        for (SellerBidEntity bid : userBids) {
            UserPosts post = postsRepository.getOne(bid.getBuyerPostId());
            if (!seenPosts.contains(post.getPostId())) {
                seenPosts.add(post.getPostId());
                userPosts.add(post);
            }
        }

        try {
            returnStr = objectMapper.writeValueAsString(userPosts);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return returnStr;
    }

    // i got half way through then couldnt remember if i was supposed to do this lol...
//    /**
//     * REST API Endpoint that will retrieve all the posts for a logged in buyer.
//     * @param request The HTTP request object that contains the user login data.
//     * @return A JSON object containing all the posts a user has made.
//     */
//    @PostMapping(value = "/user/getallposts")
//    private String getAllPostsForUser(HttpServletRequest request) {
//        logger.info("Received request to retrieve all posts by logged in user.");
//        HttpSession session = request.getSession();
//
//        if (!isUserLoggedIn(session)) {
//            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
//            return StatusMessages.USER_NOT_LOGGED_IN.toString();
//        }
//
//        String email = session.getAttribute("email").toString();
//        String userType = session.getAttribute("userType").toString();
//
//        if (!userType.equals("buyer")) {
//            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_BUYER);
//            return StatusMessages.USER_LOGGED_IN_NOT_BUYER.toString();
//        }
//
//        List<UserPosts> postList = postsRepository.findByBuyerEmail()
//    }


    @PostMapping(value = "/user/interactions/getAcceptedUserbids")
    private String retrieveAllPostsThatHaveAcceptedBidOn(HttpServletRequest request) {
        HttpSession session = request.getSession();
        logger.info("Recieved request to get all bids that have been accepted for user: " + session.getAttribute("email"));

        // check if user is logged in
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }

        // check if user is a seller
        if (!session.getAttribute("userType").equals("seller")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_SELLER);
            return StatusMessages.USER_LOGGED_IN_NOT_SELLER.toString();
        }

        List<SellerBidEntity> userBids = bidRepository.findBySellerEmail(String.valueOf(session.getAttribute("email")));

        HashSet<Integer> seenPosts = new HashSet<>();
        List<UserPosts> userPosts = new ArrayList<>();
        String returnStr = "";

        for (SellerBidEntity bid : userBids) {
            UserPosts post = postsRepository.getOne(bid.getBuyerPostId());
            boolean accepted = bid.getAcceptedBid();
            if (!seenPosts.contains(post.getPostId()) && accepted) {
                seenPosts.add(post.getPostId());
                userPosts.add(post);
            }
        }

        try {
            returnStr = objectMapper.writeValueAsString(userPosts);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return returnStr;
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


    /**
     * Helper function that gets the average review rating from a user's email
     * @param email The email that is to be used to determine a user's average review
     * @return The average review for the given user
     */
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

    /**
     * A REST API endpoint that handles the search functions
     * @param searchRequest The search request object that is being sent to the service
     * @return An object containing the list of user posts that match the search query and options
     */
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

        // if options are set, filter search results
        if (searchRequest.getOptions() != null) {
            returnedPosts = filterSearchResultsService.filterSearchBasedOnOptions(returnedPosts, searchRequest.getOptions());
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

    /**
     * REST API Endpoint that gets all the bids that a user has made.
     * @param request The HTTP Request that contains the user's login data.
     * @return A JSON object representing the bids that this user has made.
     */
    @PostMapping(value = "/interactions/getuserbids")
    public String getAllUserBids(HttpServletRequest request) {
        logger.info("Received retrieve all bid request.");
        HttpSession session = request.getSession();
        if (!isUserLoggedIn(session)) {
            logger.warn(StatusMessages.USER_NOT_LOGGED_IN);
            return StatusMessages.USER_NOT_LOGGED_IN.toString();
        }
        String loggedInUserEmail = String.valueOf(session.getAttribute("email"));
        String userType = String.valueOf(session.getAttribute("userType"));

        if (!userType.equals("seller")) {
            logger.warn(StatusMessages.USER_LOGGED_IN_NOT_SELLER);
            return StatusMessages.USER_LOGGED_IN_NOT_SELLER.toString();
        }

        List<SellerBidEntity> userBids = bidRepository.findBySellerEmail(loggedInUserEmail);
        for (SellerBidEntity bid : userBids) {
            bid.loadImageFromStorage();
        }

        String returnStr = null;
        try {
            returnStr = objectMapper.writeValueAsString(userBids);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return returnStr;
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
    //this is the endpoint to get retrieval of all the posts that a seller has bidded on
    /*
    @PostMapping(value = "user/post/retrieval/", consumes = {"application/json"})
    private String postCreatedRetrieval(@RequestBody  UserAccountEntity userAccountEntity,
                                        HttpServletRequest request) {
        logger.info("Recieved a request to retrieve all posts Seller has bided on for: " + userAccountEntity.getId());
        HttpSession session = request.getSession();

        String allUserPosts = "";

        try {
            List<int> listOfPostIDS = bidRepository.findBySellerEmail(userAccountEntity.getEmailAddress());
        }
        catch (Exception e) {

            return  StatusMessages.USER_NOT_EXIST.toString();
        }

        allSellerBidPosts
        try {
            for (int postID: listOfPostIDS) {
                Optional<UserPosts> userPost = postsRepository.findById(requestPost.getId());
                allSellerBidPosts += objectMapper.writeValueAsString(userPost);
            }
            return allSellerBidPosts;
        }
        catch (Exception ex){
            return StatusMessages.USER_POST_RETRIEVAL_FAILED.toString();
        }
    }
     */


    // this is the end point to get retrieval all the posts that a buyer has posted
    @PostMapping(value = "user/post/retrieval/", consumes = {"application/json"})
    private String postCreatedRetrieval(@RequestBody  UserAccountEntity userAccountEntity,
                                        HttpServletRequest request) {
        logger.info("Recieved a request to retrieve all buyerposts for: " + userAccountEntity.getId());
        HttpSession session = request.getSession();


        List<UserPosts> userPost;
        String allUserPosts = "";
        try {
            userPost = postsRepository.findByBuyerEmail(userAccountEntity.getEmailAddress());
        }
        catch (Exception e) {

            return  StatusMessages.USER_NOT_EXIST.toString();
        }

        try {
            for (UserPosts seperateUserPosts: userPost) {
                allUserPosts += objectMapper.writeValueAsString(seperateUserPosts);
            }
            return allUserPosts;
        }
        catch (Exception ex){
            return "notthign";//StatusMessages.USER_POST_RETRIEVAL_FAILED.toString();
        }
    }


    /**
     * A debug screen to test the deploy status of this service.
     * @return HTML containing ascii art of an object too big to be a space station...
     */
    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        String msg = "<h1>That's no endpoint......its a debug page</h1><br>";
        msg += "<pre>";
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
