package com.project.foodies.UserManagement;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;


@Entity
@Table(name = "user")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer user_id;

    @NotNull(message = "Username is required")
    @Size(min = 3, message = "Username must be at least 3 characters long", max = 10)
    @Column(name = "username")
    private String username;

    @NotNull(message = "Name is required")
    @Size(min = 3, message = "Name must be at least 3 characters long", max = 20)
    @Column(name = "name")
    private String name;

    @NotNull(message = "Name is required")
    @Size(min = 3, message = "Name must be at least 3 characters long", max = 20)

    
    @Column(name = "email")
    @Email(message = "Email should be valid")
    private String email;
    

    @NotNull(message = "Password is required")
    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
             message = "Password must contain at least one digit, one lowercase, one uppercase, and one special character")
    @Column(name = "password")
    private String password;

    @Lob
    @Column(name="profilepictureurl", nullable=false, columnDefinition="mediumblob")
    private byte[] profilepictureurl;

    @Column(name = "bio")
    private String bio;

    //GETTERS AND SETTERS
    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public byte[] getProfilepictureurl() {
        return profilepictureurl;
    }

    public void setProfilepictureurl(byte[] profilepictureurl) {
        this.profilepictureurl = profilepictureurl;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
