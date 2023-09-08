package com.pixelchat.repository;

import com.pixelchat.model.FriendRequest;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pixelchat.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    User save(User user);

    boolean existsByEmail(String email);
    List<User> findAll();

    List<User> findByEmailContainingIgnoreCase(String query);

}

