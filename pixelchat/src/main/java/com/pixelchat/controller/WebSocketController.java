package com.pixelchat.controller;

import com.pixelchat.model.Message;
import com.pixelchat.model.User;
import com.pixelchat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class WebSocketController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat/{chatroomId}/sendMessage")
    @SendTo("/topic/chat/{chatroomId}")
    public Message sendMessage(@DestinationVariable Long chatroomId, @RequestBody Message message) {
        // Extract the necessary data from the message object
        String content = message.getContent();
        User user = message.getUser(); // Assuming your Message object has a getUser method

        // Save the message using the ChatService's sendMessage method
        return chatService.sendMessage(chatroomId, content, user); // Return the saved message
    }


}



