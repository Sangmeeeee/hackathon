//package mook.demo.domain;
//
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity
//@Getter @Setter
//@NoArgsConstructor
//public class ChatRoomJoin {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "join_id")
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "member_id",nullable = false)
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "room_id",nullable = false)
//    private ChatRoom chatRoom;
//
//    public ChatRoomJoin(Member member, ChatRoom chatRoom){
//        this.member = member;
//        this.chatRoom = chatRoom;
//    }
//
//
//}
