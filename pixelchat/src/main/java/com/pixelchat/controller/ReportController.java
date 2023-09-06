package com.pixelchat.controller;

import com.pixelchat.model.ReportedMessage;
import com.pixelchat.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
