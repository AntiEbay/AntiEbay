package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.AntiEbayRestController;
import com.antiebay.antiebayservice.userposts.UserPosts;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FilterSearchResultsService {
    private static final Logger logger = LogManager.getLogger(FilterSearchResultsService.class);
    /**
     * Returns a list of user posts based on the search options
     * @param postList The unfiltered list of user posts
     * @param options The search options to be applied to the post list
     * @return The filtered search list
     */
    public List<UserPosts> filterSearchBasedOnOptions(List<UserPosts> postList, SearchOptions options) {
        logger.info("Post List: " + postList);
        logger.info("Search Options: " + options);
        List<UserPosts> filteredResults = new ArrayList<>();
        for (UserPosts post : postList) {
            // check for correct category
            logger.info("Testing" + post);
            if (!post.getCategory().equals(options.getCategory())) {
                logger.info(post + " filtered out due to category.");
                continue;
            }
            // check for correct price range
            if (post.getPrice() < options.getMinPrice() || post.getPrice() > options.getMaxPrice()) {
                logger.info(post + " filtered out due to price.");
                continue;
            }
            filteredResults.add(post);
        }
        logger.info(filteredResults);
        return filteredResults;
    }
}
