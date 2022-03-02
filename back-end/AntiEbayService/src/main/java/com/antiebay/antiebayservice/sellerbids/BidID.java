package com.antiebay.antiebayservice.sellerbids;

import com.antiebay.antiebayservice.userposts.UserPostImage;

import javax.persistence.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

@Entity
@Table(name = "bid")
public class BidID {
    @Column(name = "bid_id")
    private Integer bidId;


    public Integer getBidId() {
        return bidId;
    }

    public void setBidId(Integer bidId) {
        this.bidId = bidId;
    }
}
