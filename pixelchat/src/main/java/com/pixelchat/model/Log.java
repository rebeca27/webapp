package com.pixelchat.model;

import jakarta.persistence.*;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
@Table(name = "logs")
public class Log {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime timestamp;

    private String message;

    @Enumerated(EnumType.STRING)
    private LogType logType;

    public enum LogType {
        INFO, ERROR, WARNING
    }

    // Constructors, getters, setters, etc.

    public Log() {}

    public Log(LocalDateTime timestamp, String message, LogType logType) {
        this.timestamp = timestamp;
        this.message = message;
        this.logType = logType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LogType getLogType() {
        return logType;
    }

    public void setLogType(LogType logType) {
        this.logType = logType;
    }
}
