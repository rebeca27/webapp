package com.pixelchat.service;

import com.pixelchat.model.ChatRoom;
import com.pixelchat.model.Message;
import com.pixelchat.model.User;
import com.pixelchat.repository.ChatRoomRepository;
import com.pixelchat.repository.MessageRepository;
import com.pixelchat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }

    public Message sendMessage(Long chatRoomId, String content, User user) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new RuntimeException("ChatRoom not found"));
        Message message = new Message();
        message.setChatRoom(chatRoom);
        message.setUser(user);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);  // Save and return the saved Message
    }


    public List<Message> getMessagesForChatRoom(Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException("ChatRoom with ID " + chatRoomId + " not found"));
        return messageRepository.findByChatRoom(chatRoom);
    }

    public List<ChatRoom> searchByKeyword(String query) {
        // This is a simple example. In a real-world scenario, you'd likely use a more advanced searching mechanism.
        return chatRoomRepository.findAll().stream()
                .filter(chatroom -> chatroom.getKeywords().contains(query))
                .collect(Collectors.toList());
    }


    public class ChatRoomNotFoundException extends RuntimeException {
        public ChatRoomNotFoundException(String message) {
            super(message);
        }
    }

    public ChatRoom createChatroom(String chatroomName) {
        ChatRoom chatroom = new ChatRoom();
        chatroom.setName(chatroomName);
        return chatRoomRepository.save(chatroom);
    }

    public boolean setModerator(Long chatroomId, Long userId) {
        ChatRoom chatroom = chatRoomRepository.findById(chatroomId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if (chatroom != null && user != null) {
            chatroom.setModerator(user);
            chatRoomRepository.save(chatroom);
            return true;
        }
        return false;
    }

    public boolean deleteChatroom(Long chatroomId) {
        if (chatRoomRepository.existsById(chatroomId)) {
            chatRoomRepository.deleteById(chatroomId);
            return true;
        }
        return false;
    }

}
