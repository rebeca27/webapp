package com.pixelchat.service;

import com.pixelchat.model.Message;
import com.pixelchat.model.ReportedMessage;
import com.pixelchat.model.User;
import com.pixelchat.repository.MessageRepository;
import com.pixelchat.repository.ReportedMessageRepository;
import com.pixelchat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportedMessageRepository reportedMessageRepository;

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ReportedMessage> getAllReports() {
        return reportedMessageRepository.findAll();
    }
    public void reportMessage(Long messageId, Long reporterId) {
        // Fetch the message and user from their respective repositories (assuming you have them)
        // Then create a new ReportedMessage and save it
        Message message = messageRepository.findById(messageId).orElseThrow(() -> new RuntimeException("Message not found"));
        User reporter = userRepository.findById(reporterId).orElseThrow(() -> new RuntimeException("User not found"));

        ReportedMessage reportedMessage = new ReportedMessage();
        reportedMessage.setMessage(message);
        reportedMessage.setReporter(reporter);

        reportedMessageRepository.save(reportedMessage);
    }


    public void acceptReport(Long reportId) {
        // Fetch the report from the database
        ReportedMessage report = reportedMessageRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Report not found"));

        // Handle the acceptance logic. For example, you might want to change the report's status to "Accepted"
        report.setStatus("Accepted");

        // Save the updated report
        reportedMessageRepository.save(report);

        // You can also add any other logic here, like notifying the user who reported the message
    }

    public void rejectReport(Long reportId, String reason) {
        // Fetch the report from the database
        ReportedMessage report = reportedMessageRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Report not found"));

        // Handle the rejection logic. For example, you might want to change the report's status to "Rejected"
        report.setStatus("Rejected");
        report.setRejectionReason(reason); // Assuming you have a field in the Report entity to store the rejection reason

        // Save the updated report
        reportedMessageRepository.save(report);

        // You can also add any other logic here, like notifying the user who reported the message about the rejection
    }
}

