package com.antiebay.antiebayservice.sellerbids;

import com.antiebay.antiebayservice.userposts.UserPostImage;

import javax.persistence.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

public class BidID {
    private Integer bidId;

    /**
     * Method that returns the bidId that is associated with this object
     * @return bidId
     */
    public Integer getBidId() {
        return bidId;
    }

    /**
     * Method that sets the bidId of this object to the value passed into the method
     * @param bidId
     */
    public void setBidId(Integer bidId) {
        this.bidId = bidId;
    }
}
