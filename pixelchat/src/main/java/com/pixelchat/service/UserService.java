package com.pixelchat.service;

import com.pixelchat.controller.SHA256Util;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public String hashPassword(String plainPassword) {
        return SHA256Util.hashWithSHA256(plainPassword);
    }
    public boolean isPasswordValid(String rawPassword, String hashedPasswordFromDB) {
        return hashPassword(rawPassword).equals(hashedPasswordFromDB);
    }
    public String fetchTargetColorByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getColor)
                .orElse(null);
    }
    }
