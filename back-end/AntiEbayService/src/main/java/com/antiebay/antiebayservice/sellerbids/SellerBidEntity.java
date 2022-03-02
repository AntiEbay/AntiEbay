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
public class SellerBidEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id")
    private Integer bidId;
    @Column(name = "bid_amount")
    private float bidAmount;
    @Column(name = "seller_email")
    private String sellerEmail;
    @Column(name = "buyer_post_id")
    private Integer buyerPostId;
    @Column(name = "bid_path")
    private String bidPath;
    @Column(name = "accepted")
    private boolean accepted;
    @Transient
    private UserPostImage bidImage;

    public void assignBidPath() {
        bidPath = "bids/" + sellerEmail + '/' + buyerPostId + '/' + bidId + '/';
    }

    public void loadImageFromStorage() {
        String imagePath = bidPath + 0; // TODO check
        bidImage = getImageFromPath(imagePath);
    }

    private UserPostImage getImageFromPath(String path) {
        UserPostImage img = new UserPostImage();
        File f = new File(path);
        try {
            if (!f.exists()) {
                return img;
            }
            byte[] decoded = Files.readAllBytes(Path.of(path));
            String encoded  = Base64.getEncoder().encodeToString(decoded);
            img.setContents(encoded);
            img.setFileName(path + img.getType());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return img;
    }

    public void writeBidImage() {
        String topDir = "bids/";
        File bidParentDir = new File(topDir);
        if (!bidParentDir.exists()) {
            bidParentDir.mkdirs();
        }
        File userDir = new File(topDir + sellerEmail + '/');
        if (!userDir.exists()) {
            userDir.mkdirs();
        }
        File postDir = new File(topDir + sellerEmail + '/' + buyerPostId + '/');
        if (!postDir.exists()) {
            postDir.mkdirs();
        }
        File bidDir = new File(topDir + sellerEmail + '/' + buyerPostId + '/' + bidId + '/');
        if (!bidDir.exists()) {
            bidDir.mkdirs();
        }
        bidImage.setFileName(topDir + sellerEmail + '/' + buyerPostId + '/' + bidId + '/');
        bidImage.writeFile();
    }

    public Integer getBidId() {
        return bidId;
    }

    public void setBidId(Integer bidId) {
        this.bidId = bidId;
    }

    public float getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(float bidAmount) {
        this.bidAmount = bidAmount;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public Integer getBuyerPostId() {
        return buyerPostId;
    }

    public void setBuyerPostId(Integer buyerPostId) {
        this.buyerPostId = buyerPostId;
    }

    public String getBidPath() {
        return bidPath;
    }

    public void assignBidPath(String bidPath) {
        this.bidPath = bidPath;
    }

    public UserPostImage getBidImage() {
        return bidImage;
    }

    public void setBidImage(UserPostImage bidImage) {
        this.bidImage = bidImage;
    }

    public boolean getAcceptedBid() { return accepted; }

    public void setAcceptedStatus(boolean accepted) { this.accepted = accepted; }
}
