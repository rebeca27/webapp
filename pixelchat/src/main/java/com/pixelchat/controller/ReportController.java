package com.pixelchat.controller;

import com.pixelchat.model.ReportedMessage;
import com.pixelchat.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")  // Base path for this controller
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/reportedmessages")
    public ResponseEntity<List<ReportedMessage>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    @PostMapping("/reportmessage/{messageId}")
    public ResponseEntity<?> reportMessage(@PathVariable Long messageId, @RequestBody Long reporterId) {
        try {
            reportService.reportMessage(messageId, reporterId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/accept/{reportId}")
    public ResponseEntity<String> acceptReport(@PathVariable Long reportId) {
        try {
            reportService.acceptReport(reportId);
            return ResponseEntity.ok("Report accepted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error accepting report.");
        }
    }

    @PostMapping("/reject/{reportId}")
    public ResponseEntity<String> rejectReport(@PathVariable Long reportId, @RequestBody Map<String, String> payload) {
        String reason = payload.get("reason");
        try {
            reportService.rejectReport(reportId, reason);
            return ResponseEntity.ok("Report rejected successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error rejecting report.");
        }
    }
}
