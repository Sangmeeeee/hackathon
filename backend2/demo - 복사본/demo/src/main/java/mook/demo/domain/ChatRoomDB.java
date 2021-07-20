package mook.demo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter @Getter
@NoArgsConstructor
public class ChatRoomDB {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_db_id")
    private Long id;

    private String roomId;
    private String name;

    public ChatRoomDB(String roomId,String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
