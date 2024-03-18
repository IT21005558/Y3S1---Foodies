package com.project.foodies.CommentManagement;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_id")
    private Integer comment_id;
    
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "post_id")
    private Integer post_id;

    @Column(name = "text")
    private String text;



    public Integer getcomment_id(){
        return this.comment_id;
    }
    
    public Integer getuser_id(){
        return this.user_id;
    }

    public Integer getPost_id(){
        return this.post_id;
    }

    public String getText(){
        return this.text;
    }

    public void setcomment_id(Integer comment_id){
        this.comment_id = comment_id;
    }

    public void setuser_id(Integer user_id){
        this.user_id = user_id;
    }
    public void setPost_id(Integer post_id){
        this.post_id = post_id;
    }

    public void setText(String text){
        this.text = text;
    }

}
