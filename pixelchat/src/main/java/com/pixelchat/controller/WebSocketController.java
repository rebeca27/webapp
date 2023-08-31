package com.pixelchat.controller;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class WebSocketController {

    @MessageMapping("/chat/{chatroomId}/sendMessage")
    @SendTo("/topic/chat/{chatroomId}")
    public Message sendMessage(@DestinationVariable Long chatroomId, @RequestBody Message message) {
        return message;
    }
}

