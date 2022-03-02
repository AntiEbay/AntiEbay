package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.userposts.UserPosts;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterSearchResultsService {
    /**
     * Returns a list of user posts based on the search options
     * @param postList The unfiltered list of user posts
     * @param options The search options to be applied to the post list
     * @return The filtered search list
     */
    public List<UserPosts> filterSearchBasedOnOptions(List<UserPosts> postList, SearchOptions options) {
        List<UserPosts> filteredResults = new ArrayList<>();
        for (UserPosts post : postList) {
            // check for correct category
            if (!post.getCategory().equals(options.getCategory())) {
                continue;
            }
            // check for correct price range
            if (post.getPrice() < options.getMinPrice() || post.getPrice() > options.getMaxPrice()) {
                continue;
            }
            filteredResults.add(post);
        }
        return filteredResults;
    }
}
