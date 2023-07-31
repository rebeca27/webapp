package com.pixelchat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pixelchat.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findbyEmail(String email);

    User save(User user);
}

