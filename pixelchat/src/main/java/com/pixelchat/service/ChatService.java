package com.pixelchat.service;

import com.pixelchat.model.ChatRoom;
import com.pixelchat.model.Message;
import com.pixelchat.model.User;
import com.pixelchat.repository.ChatRoomRepository;
import com.pixelchat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }

    public List<Message> getMessagesForChatRoom(Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new RuntimeException("ChatRoom not found"));
        return messageRepository.findByChatRoom(chatRoom);
    }

    public void sendMessage(Long chatRoomId, String content, User user) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new RuntimeException("ChatRoom not found"));
        Message message = new Message();
        message.setChatRoom(chatRoom);
        message.setUser(user);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
    }
}
