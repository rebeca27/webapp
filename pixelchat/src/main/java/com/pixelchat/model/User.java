package com.pixelchat.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String salt;
    @Column(nullable = false)
    private String color;
    @Lob
    private byte[] share1;
    @Lob
    private byte[] share2;
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    @JsonManagedReference(value="user-sent")
    private List<FriendRequest> sentRequests = new ArrayList<>();

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    @JsonManagedReference(value="user-received")
    private List<FriendRequest> receivedRequests = new ArrayList<>();

    public List<FriendRequest> getSentRequests() {
        return sentRequests;
    }

    public void setSentRequests(List<FriendRequest> sentRequests) {
        this.sentRequests = sentRequests;
    }

    public List<FriendRequest> getReceivedRequests() {
        return receivedRequests;
    }

    public void setReceivedRequests(List<FriendRequest> receivedRequests) {
        this.receivedRequests = receivedRequests;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public byte[] getShare1() {
        return share1;
    }

    public void setShare1(byte[] share1) {
        this.share1 = share1;
    }

    public byte[] getShare2() {
        return share2;
    }

    public void setShare2(byte[] share2) {
        this.share2 = share2;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
}
