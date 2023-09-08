package com.pixelchat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pixelchat.repository.UserRepository;

import java.util.Map;
import java.util.HashMap;

@Service
public class AnalyticsService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getUserGrowthData() {
        Map<String, Object> userGrowthData = new HashMap<>();

        // Fetch user growth data from the userRepository and populate the map
        // This is just a placeholder. You'll need to define the actual logic.
        long totalUsers = userRepository.count();
        userGrowthData.put("totalUsers", totalUsers);

        // Add more data points as needed

        return userGrowthData;
    }
}
