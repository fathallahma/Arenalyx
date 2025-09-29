package com.arenalyx.repositories;

import com.arenalyx.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(String email);
}

