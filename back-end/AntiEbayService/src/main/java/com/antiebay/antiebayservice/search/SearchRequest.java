package com.antiebay.antiebayservice.search;

public class SearchRequest {
    private String query;
    private SearchOptions options;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public SearchOptions getOptions() {
        return options;
    }

    public void setOptions(SearchOptions options) {
        this.options = options;
    }
}
