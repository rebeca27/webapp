package com.pixelchat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pixelchat.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    User save(User user);

}

