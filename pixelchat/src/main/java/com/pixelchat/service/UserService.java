package com.pixelchat.service;

import com.pixelchat.model.User;
import com.pixelchat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findbyEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
