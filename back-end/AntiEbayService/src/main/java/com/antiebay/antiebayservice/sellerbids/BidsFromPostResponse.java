package com.antiebay.antiebayservice.sellerbids;

import com.antiebay.antiebayservice.sellerbids.SellerBidEntity;

import java.util.ArrayList;
import java.util.List;

public class BidsFromPostResponse {
    private List<SellerBidEntity> bids;

    public void addBid(SellerBidEntity bid) {
        if (bids == null) {
            bids = new ArrayList<SellerBidEntity>();
        }
        bids.add(bid);
    }

    public List<SellerBidEntity> getBids() {
        return bids;
    }

    public void setBids(List<SellerBidEntity> bids) {
        this.bids = bids;
    }
}
