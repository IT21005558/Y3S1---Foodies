package com.project.foodies.CommentManagement;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment,Integer>{
    Optional<Comment> findById(Integer userId);
}
