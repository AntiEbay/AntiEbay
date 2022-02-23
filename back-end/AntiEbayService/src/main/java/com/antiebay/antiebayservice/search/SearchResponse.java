package com.antiebay.antiebayservice.search;

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

    public void addSearchResult(SearchResult result) {
        searchResults.add(result);
    }
}
