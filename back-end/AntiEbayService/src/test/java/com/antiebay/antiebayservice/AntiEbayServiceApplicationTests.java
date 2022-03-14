package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;
import com.antiebay.antiebayservice.logging.StatusMessages;
import com.antiebay.antiebayservice.reviews.PostReview;
import com.antiebay.antiebayservice.reviews.PostReviewRepository;
import com.antiebay.antiebayservice.reviews.SellerReview;
import com.antiebay.antiebayservice.reviews.SellerReviewRepository;
import com.antiebay.antiebayservice.search.FilterSearchResultsService;
import com.antiebay.antiebayservice.search.SearchService;
import com.antiebay.antiebayservice.sellerbids.BidRepository;
import com.antiebay.antiebayservice.sellerbids.SellerBidEntity;
import com.antiebay.antiebayservice.useraccounts.UserAccountEntity;
import com.antiebay.antiebayservice.useraccounts.UserLoginResponse;
import com.antiebay.antiebayservice.useraccounts.UserRepository;
import com.antiebay.antiebayservice.userposts.PostsRepository;
import com.antiebay.antiebayservice.userposts.UserPostImage;
import com.antiebay.antiebayservice.userposts.UserPosts;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.hibernate.HibernateException;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import static junit.framework.TestCase.*;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
//@SpringBootTest
@WebMvcTest(AntiEbayRestController.class)
class AntiEbayServiceApplicationTests {

    @MockBean
    UserRepository userRepository;

    @MockBean
    PostsRepository postsRepository;

    @MockBean
    PostReviewRepository postReviewRepository;

    @MockBean
    SellerReviewRepository sellerReviewRepository;

    @MockBean
    BidRepository bidRepository;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    SearchService searchService;

    @MockBean
    FilterSearchResultsService filterSearchResultsService;

    @Autowired
    private MockMvc mockMVc;

    // ********* USER ACCOUNT TESTS *********

    /** 
     * @throws Exception
     */
    @Test
    void registerUserAccountShouldSucceed() throws Exception {
        UserAccountEntity newUser = new UserAccountEntity();
        newUser.setFirstName("First");
        newUser.setLastName("Last");
        newUser.setUserType("UserName");
        newUser.setPassword("Password");
        newUser.setEmailAddress("email");

        when(userRepository.findById(any())).thenReturn(Optional.empty());

        when(userRepository.save(any()))
                .thenReturn(newUser);

        MvcResult result = mockMVc.perform(post("/user/registration")
                        .content(mapper.writeValueAsString(newUser))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals(StatusMessages.USER_ACCOUNT_CREATE_SUCCESS.toString(), result.getResponse().getContentAsString());
    }

    
    /** 
     * @throws Exception
     */
    @Test
    void registerUserAccountWhenUserAlreadyExistsShouldFail() throws Exception {
        UserAccountEntity newUser = new UserAccountEntity();
        newUser.setFirstName("First");
        newUser.setLastName("Last");
        newUser.setUserType("UserName");
        newUser.setPassword("Password");
        newUser.setEmailAddress("email");

        when(userRepository.findById(newUser.getEmailAddress()))
                .thenReturn(Optional.of(newUser));

        MvcResult result = mockMVc.perform(post("/user/registration")
                .content(mapper.writeValueAsString(newUser))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.USER_ACCOUNT_CREATE_FAIL.toString());
    }

    @Test
    void loginAccountShouldSucceed() throws JsonProcessingException, Exception {
        UserAccountEntity loginUser = new UserAccountEntity();
        loginUser.setFirstName("First");
        loginUser.setLastName("Last");
        loginUser.setUserType("UserName");
        loginUser.setPassword("Password");
        loginUser.setEmailAddress("email");
        loginUser.setUserType("buyer");

        UserLoginResponse response = new UserLoginResponse(true, "buyer");
        
        when(userRepository.findById(any())).thenReturn(Optional.of(loginUser));

        MvcResult result = mockMVc.perform(post("/user/login")
                .content(mapper.writeValueAsString(loginUser))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals(mapper.writeValueAsString(response), result.getResponse().getContentAsString());
    }

    @Test
    void loginAccountWhenUserExistsShouldFail() throws JsonProcessingException, Exception {
        UserAccountEntity loginUser = new UserAccountEntity();
        loginUser.setFirstName("First");
        loginUser.setLastName("Last");
        loginUser.setUserType("UserName");
        loginUser.setPassword("Password");
        loginUser.setEmailAddress("email");

        UserLoginResponse response = new UserLoginResponse(false, "none");

        when(userRepository.findById(loginUser.getEmailAddress())).thenReturn(Optional.empty());

        MvcResult result = mockMVc.perform(post("/user/login")
                .content(mapper.writeValueAsString(loginUser))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals(mapper.writeValueAsString(response), result.getResponse().getContentAsString());
    }

    // Delete account test
    // login account

    // ********* POST TESTS *********

    /** 
     * @throws JsonProcessingException
     * @throws Exception
     */
    @Test
    void writePostWhenUserNotLoggedInShouldFail() throws JsonProcessingException, Exception {
        UserPosts post = new UserPosts();
        post.setTitle("Title");
        post.setDescription("Description");
        post.setPrice(100);
        post.setCategory("Category");
        post.setProductCondition("Condition");
        post.setImageList(new ArrayList<UserPostImage>());
        post.setBidList(new ArrayList<SellerBidEntity>());
        post.setBuyerEmail("buyerEmail");
        post.setQuantity(1);

        MvcResult result = mockMVc.perform(post("/user/post/writing")
                                .content(mapper.writeValueAsString(post))
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
        Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.USER_NOT_LOGGED_IN.toString());       
    }
    
    
    /** 
     * @throws JsonProcessingException
     * @throws Exception
     */
    @Test
    void writePostWhenUserNotOfBuyerTypeShouldFail() throws JsonProcessingException, Exception {
        UserPosts post = new UserPosts();
        post.setTitle("Title");
        post.setDescription("Description");
        post.setPrice(100);
        post.setCategory("Category");
        post.setProductCondition("Condition");
        post.setImageList(new ArrayList<UserPostImage>());
        post.setBidList(new ArrayList<SellerBidEntity>());
        post.setBuyerEmail("buyerEmail");
        post.setQuantity(1);

        MockHttpSession mockSession = new MockHttpSession();
        mockSession.setAttribute("email", "sellerEmail");
        mockSession.setAttribute("userType", "seller");

        MvcResult result = mockMVc.perform(post("/user/post/writing")
                                .content(mapper.writeValueAsString(post))
                                .contentType(MediaType.APPLICATION_JSON)
                                .session(mockSession))
                                .andExpect(status().isOk())
                                .andReturn();
        Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.USER_LOGGED_IN_NOT_BUYER.toString());
    }

    @Test
    void writePostWhenBadDatabaseShouldFail() throws JsonProcessingException, Exception {
        UserPosts post = new UserPosts();
        post.setTitle("Title");
        post.setDescription("Description");
        post.setPrice(100);
        post.setCategory("Category");
        post.setProductCondition("Condition");
        post.setImageList(new ArrayList<UserPostImage>());
        post.setBidList(new ArrayList<SellerBidEntity>());
        post.setBuyerEmail("buyerEmail");
        post.setQuantity(1);

        MockHttpSession mockSession = new MockHttpSession();
        mockSession.setAttribute("email", post.getBuyerEmail());
        mockSession.setAttribute("userType", "buyer");

        when(postsRepository.save(any()))
            .thenThrow(new HibernateException("Database error"));

        MvcResult result = mockMVc.perform(post("/user/post/writing")
                                .content(mapper.writeValueAsString(post))
                                .contentType(MediaType.APPLICATION_JSON)
                                .session(mockSession))
                                .andExpect(status().isOk())
                                .andReturn();
        Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.USER_POST_CREATE_FAIL.toString());
    }


    /** 
     * @throws Exception
     */
   @Test
   void writePostShouldSucceed() throws Exception {
       UserPosts newUserPosts = new UserPosts();
       newUserPosts.setPostId(1);
       newUserPosts.setBuyerEmail("BuyerEmail");
       newUserPosts.setPostPath("PostPath");
       newUserPosts.setTitle("Title");
       newUserPosts.setQuantity(1);
       newUserPosts.setPrice(1);
       newUserPosts.setCategory("Category");
       newUserPosts.setProductCondition("ProductCondition");
       newUserPosts.setDescription("Description");
       newUserPosts.setImageList(new ArrayList<>());
       

       MockHttpSession mockSession = new MockHttpSession();
       mockSession.setAttribute("email", newUserPosts.getBuyerEmail());
       mockSession.setAttribute("userType", "buyer");
       when(postReviewRepository.save(any()))
               .thenReturn(newUserPosts);

       MvcResult result = mockMVc.perform(post("/user/post/writing")
                       .content(mapper.writeValueAsString(newUserPosts))
                       .session(mockSession)
                       .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andReturn();
       Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.USER_POST_CREATE_SUCCESS.toString());
   }

   
   
   // complete post
   // delete post
   // all posts with user bids
   // post retrieve
   // get all posts
   // get completed posts

    // ********* SEARCH TESTS *********


    // ********* BID TESTS *********
            // /post/getbidsforpost
            // accept bid
            // make bid
            // get user bids
            // get accepted user bids
            // bid delete
            
    // 

    /** 
    * Unit test for making a bid that should succeed
    * @throws Exception
    */
    @Test
    void makePostBidShouldSucceed() throws Exception {
        SellerBidEntity newBid = new SellerBidEntity();
        newBid.setBidId(1);
        newBid.setBidAmount(1);
        newBid.setSellerEmail("SellerEmail");
        newBid.setBuyerPostId(1);
        newBid.setBidImage(new ArrayList<>());
 
        MockHttpSession mockSession = new MockHttpSession();
        mockSession.setAttribute("email", newBid.getSellerEmail());
        mockSession.setAttribute("userType", "seller");
        when(postReviewRepository.save(any()))
                .thenReturn(newBid);
 
        MvcResult result = mockMVc.perform(post("/user/interactions/makebid")
                        .content(mapper.writeValueAsString(newBid))
                        .session(mockSession)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.BID_SAVE_SUCCESS.toString());
    }

    
    /** 
     * Unit test for accepting a bid that should succeed
     * @throws Exception
     */
    @Test
    void acceptPostBidShouldSucceed() throws Exception {
        SellerBidEntity newBid = new SellerBidEntity();
        newBid.setBidId(1);
        newBid.setBidAmount(1);
        newBid.setSellerEmail("SellerEmail");
        newBid.setBuyerPostId(1);
        newBid.setBidImage(new ArrayList<>());
        newBid.setAccepted(true);

        UserPosts userPost = new UserPosts();
        userPost.setPostId(1);
        userPost.setBuyerEmail(userPost.getBuyerEmail());
        userPost.setPostPath("PostPath");
        userPost.setTitle("Title");
        userPost.setQuantity(1);
        userPost.setPrice(1);
        userPost.setCategory("Category");
        userPost.setProductCondition("ProductCondition");
        userPost.setDescription("Description");
        userPost.setImageList(new ArrayList<>());

        ArrayList<UserPosts> userPosts = new ArrayList<>();
        userPosts.add(userPost);
 
        MockHttpSession mockSession = new MockHttpSession();
        mockSession.setAttribute("email", newBid.getSellerEmail());
        mockSession.setAttribute("userType", "buyer");
        when(bidRepository.save(any()))
                .thenReturn(newBid);
 
        MvcResult result = mockMVc.perform(post("/user/interactions/acceptbid")
                        .content(mapper.writeValueAsString(newBid))
                        .session(mockSession)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.BID_ACCEPTED.toString());
    }



   // ********* REVIEW TESTS *********

   /** 
    * Unit test for writing a post review that should succeed
    * @throws Exception
    */
   @Test
   void writePostReviewShouldSucceed() throws Exception {
       PostReview newPostReview = new PostReview();
       newPostReview.setRating(1);
       newPostReview.setSellerEmail("SellerEmail");
       newPostReview.setPostId(1);
       newPostReview.setComment("Comment");

       MockHttpSession mockSession = new MockHttpSession();
       mockSession.setAttribute("email", newPostReview.getSellerEmail());
       mockSession.setAttribute("userType", "seller");
       when(postReviewRepository.save(any()))
               .thenReturn(newPostReview);

       MvcResult result = mockMVc.perform(post("/post/review/writing")
                       .content(mapper.writeValueAsString(newPostReview))
                       .session(mockSession)
                       .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andReturn();
       Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.POST_REVIEW_CREATE_SUCCESS.toString());
   }

   
   /** 
    * Unit test for writing a seller review that should succeed
    * @throws Exception
    */
   @Test
   void writeSellerReviewShouldSucceed() throws Exception {
       SellerReview newSellerReview = new SellerReview();
       newSellerReview.setRating(1);
       newSellerReview.setBuyerEmail("BuyerEmail");
       newSellerReview.setSellerEmail("SellerEmail");
       newSellerReview.setComment("Comment");

       MockHttpSession mockSession = new MockHttpSession();
       mockSession.setAttribute("email", newSellerReview.getBuyerEmail());
       mockSession.setAttribute("userType", "buyer");
       when(postReviewRepository.save(any()))
               .thenReturn(newSellerReview);

       MvcResult result = mockMVc.perform(post("/seller/review/writing")
                       .content(mapper.writeValueAsString(newSellerReview))
                       .session(mockSession)
                       .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andReturn();
       Assertions.assertEquals(result.getResponse().getContentAsString(), StatusMessages.SELLER_REVIEW_CREATE_SUCCESS.toString());
   }

   /** 
    * Unit test for for buyer review average that should succeed
    * @throws Exception
    */
   @Test
   void buyerUserAverageReviewRetrieveShouldSucceed() throws Exception {
        UserAccountEntity userAccount = new UserAccountEntity();
        userAccount.setEmailAddress("email");
        userAccount.setUserType("buyer");
        userAccount.setFirstName("");
        userAccount.setLastName("");
        userAccount.setPassword("pass");
        
        UserPosts userPost = new UserPosts();
        userPost.setPostId(1);
        userPost.setBuyerEmail(userAccount.getEmailAddress());
        userPost.setPostPath("PostPath");
        userPost.setTitle("Title");
        userPost.setQuantity(1);
        userPost.setPrice(1);
        userPost.setCategory("Category");
        userPost.setProductCondition("ProductCondition");
        userPost.setDescription("Description");
        userPost.setImageList(new ArrayList<>());        

       PostReview newPostReview = new PostReview();
       newPostReview.setRating(1);
       newPostReview.setPostId(1);
       newPostReview.setSellerEmail(userAccount.getEmailAddress());
       newPostReview.setComment("Comment");

       ArrayList<UserPosts> userPosts = new ArrayList<>();
        userPosts.add(userPost);
        ArrayList<PostReview> postReviews = new ArrayList<>();
        postReviews.add(newPostReview);

       MockHttpSession mockSession = new MockHttpSession();
       mockSession.setAttribute("email", userAccount.getEmailAddress());
       mockSession.setAttribute("userType", "buyer");
       
       when(userRepository.findById(userAccount.getEmailAddress())).thenReturn(Optional.of(userAccount));
       when(postsRepository.findByBuyerEmail(userAccount.getEmailAddress())).thenReturn(userPosts);
       when(postReviewRepository.findByPostId(userPost.getPostId())).thenReturn(postReviews);

        double expectedAverage = newPostReview.getRating() / postReviews.size();

       MvcResult result = mockMVc.perform(post("/user/review/retrieve")
                       .session(mockSession)
                       .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andReturn();
       Assertions.assertEquals(result.getResponse().getContentAsString(), String.valueOf(expectedAverage));
   }

   @Test
   void userReviewRetrieveWhenNoDataExistsShouldFail() throws Exception {
           
   }
}
