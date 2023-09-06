package com.pixelchat.repository;

import com.pixelchat.model.ReportedMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportedMessageRepository extends JpaRepository<ReportedMessage, Long> {
    List<ReportedMessage> findAll();

}
