package com.project.foodies.UserManagement;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface User_FollowRep extends CrudRepository<User_Follow, Integer> {

    Optional<User_Follow> findByUserid(Integer user_id);

}

