package com.antiebay.antiebayservice.sellerbids;

public class BidsFromPostRequest {
    private Integer postId;

    /**
     * Method that returns the objects postId
     * @return postId
     */
    public Integer getPostId() {
        return postId;
    }

    /**
     * Method that sets the integer that is past to the method and sets it as this objects postId
     * @param postId
     */
    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
