package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.userposts.UserPosts;

import java.util.ArrayList;
import java.util.List;

public class SearchResponse {
    List<SearchResult> searchResults;

    public SearchResponse() {
        this.searchResults = new ArrayList<>();
    }

    public List<SearchResult> getSearchResults() {
        return searchResults;
    }

    public void setSearchResults(List<SearchResult> searchResults) {
        this.searchResults = searchResults;
    }

    public void addSearchResult(SearchResult res) {
        searchResults.add(res);
    }
}
