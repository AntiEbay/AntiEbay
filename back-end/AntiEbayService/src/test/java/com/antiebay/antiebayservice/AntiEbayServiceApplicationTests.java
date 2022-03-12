package com.antiebay.antiebayservice;

import com.antiebay.antiebayservice.JSONUtilities.JSONObjectMapper;
import com.antiebay.antiebayservice.logging.StatusMessages;

import com.antiebay.antiebayservice.reviews.PostReview;
import com.antiebay.antiebayservice.reviews.PostReviewRepository;
import com.antiebay.antiebayservice.reviews.SellerReviewRepository;
import com.antiebay.antiebayservice.search.FilterSearchResultsService;
import com.antiebay.antiebayservice.search.SearchService;
import com.antiebay.antiebayservice.sellerbids.BidRepository;
import com.antiebay.antiebayservice.useraccounts.UserAccountEntity;
import com.antiebay.antiebayservice.useraccounts.UserRepository;
import com.antiebay.antiebayservice.userposts.PostsRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

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

    // ********* ENDPOINT TESTS *********
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

    @Test
    void registerUserAccountWhenUserAlreadyExists() throws Exception {
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


   //For post review
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
}
