package com.pixelchat.repository;

import com.pixelchat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query("SELECT COUNT(c) FROM ChatRoom c JOIN c.users u WHERE u.id = :userId")
    long countByUserId(@Param("userId") Long userId);
    @Query("SELECT COUNT(DISTINCT m.chatRoom) FROM Message m WHERE m.user.id = :userId")
    long countDistinctChatRoomsByUserId(@Param("userId") Long userId);

}
