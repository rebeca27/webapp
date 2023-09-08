package com.pixelchat.controller;

import com.pixelchat.model.Log;
import com.pixelchat.repository.ChatRoomRepository;
import com.pixelchat.repository.LogRepository;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private LogRepository logRepository;
    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/dashboard-overview")
    public ResponseEntity<Map<String, Object>> getDashboardOverview() {
        Map<String, Object> overview = new HashMap<>();
        overview.put("totalUsers", userRepository.count());
        overview.put("activeChatrooms", chatRoomRepository.count());
        // Add more data as needed
        return ResponseEntity.ok(overview);
    }

    @GetMapping("/logs")
    public ResponseEntity<List<Log>> getLogs() {
        // Fetch the latest logs (assuming you have a Log entity and repository)
        List<Log> logs = logRepository.findTop10ByOrderByTimestampDesc(); // Assuming you want the latest 10 logs
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();

        // Mocking user growth data
        Map<String, Object> userGrowth = new HashMap<>();
        userGrowth.put("dates", Arrays.asList("2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04"));
        userGrowth.put("counts", Arrays.asList(100, 105, 110, 120));
        analytics.put("userGrowth", userGrowth);

        // Mocking message traffic data
        Map<String, Object> messageTraffic = new HashMap<>();
        messageTraffic.put("dates", Arrays.asList("2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04"));
        messageTraffic.put("counts", Arrays.asList(500, 600, 550, 650));
        analytics.put("messageTraffic", messageTraffic);

        // Mocking peak times data
        Map<String, Object> peakTimes = new HashMap<>();
        peakTimes.put("times", Arrays.asList("Morning", "Afternoon", "Evening", "Night"));
        peakTimes.put("counts", Arrays.asList(200, 300, 250, 150));
        analytics.put("peakTimes", peakTimes);

        return ResponseEntity.ok(analytics);
    }


}
