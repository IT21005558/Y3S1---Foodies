package com.project.foodies.UserManagement;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByUsername(String username); // for add user

    Optional<User> findByEmail(String email); // for login check
}

