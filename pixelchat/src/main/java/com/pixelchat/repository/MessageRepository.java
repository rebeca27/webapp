package com.pixelchat.repository;

import com.pixelchat.model.ChatRoom;
import com.pixelchat.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoom(ChatRoom chatRoom);
    @Query(value = "SELECT HOUR(m.timestamp) as hour, COUNT(m.id) as count " +
            "FROM messages m " +
            "WHERE m.user_id = :userId " +  // Adjusted based on your Message model
            "GROUP BY HOUR(m.timestamp) " +
            "ORDER BY COUNT(m.id) DESC", nativeQuery = true)
    List<Object[]> findMessageCountsGroupedByHour(@Param("userId") Long userId);

    long countByUser_Id(Long userId);
    @Query("SELECT COUNT(m) FROM Message m JOIN m.chatRoom.users u WHERE u.id = :userId AND m.user.id <> :userId")
    long countReceivedMessages(@Param("userId") Long userId);
    @Query("SELECT COUNT(DISTINCT m.chatRoom) FROM Message m WHERE m.user.id = :userId")
    long countDistinctChatRoomsByUserId(@Param("userId") Long userId);

}

