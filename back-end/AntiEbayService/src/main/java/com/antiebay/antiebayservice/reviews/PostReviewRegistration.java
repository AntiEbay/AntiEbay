package com.antiebay.antiebayservice.reviews;

import org.springframework.stereotype.Component;

@Component("postReview")
public class PostReviewRegistration {

    public PostReview registerPostReview(PostReview postReview) {
        return postReview;
    }

}
