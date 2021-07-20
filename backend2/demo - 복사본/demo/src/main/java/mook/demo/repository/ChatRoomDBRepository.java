package mook.demo.repository;

import mook.demo.domain.ChatRoom;
import mook.demo.domain.ChatRoomDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public interface ChatRoomDBRepository extends JpaRepository<ChatRoomDB,Long> {

//    public List<ChatRoom> findAllRoom(){
//        List chatRooms = new ArrayList<>(chatRoomMap.values());
//        Collections.reverse(chatRooms);
//        return chatRooms;
//    }
}
