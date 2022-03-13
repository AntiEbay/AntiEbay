package com.antiebay.antiebayservice.reviews;

import org.springframework.stereotype.Component;

@Component("postReview")
public class PostReviewRegistration {

    /** 
     * Function to register a post review
     * @param postReview
     * @return PostReview
     */
    public PostReview registerPostReview(PostReview postReview) {
        return postReview;
    }

}
