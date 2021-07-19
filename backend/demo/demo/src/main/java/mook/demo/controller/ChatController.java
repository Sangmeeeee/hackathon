package mook.demo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mook.demo.domain.ChatRoom;
import mook.demo.dto.ChatRoomForm;
import mook.demo.repository.ChatRoomRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private final ChatRoomRepository chatRoomRepository;

    @GetMapping("/")
    public String rooms(Model model) {
        log.info("enter /chat");
        model.addAttribute("rooms", chatRoomRepository.findAllRoom());
        return "chat/rooms";
    }

//    @GetMapping("/")
//    public String rooms(@SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) Member loginMember, Model model) {
//        //세션에 회원 데이터가 없으면 home
//        if (loginMember == null) {
//            return "home";
//        }
//
//        //세션이 유지되면 로그인으로 이동
//        model.addAttribute("member", loginMember);
//        model.addAttribute("rooms", chatRoomRepository.findAllRoom());
//        return "rooms";
//    }

    @GetMapping("/rooms/{id}")
    public String room(@PathVariable String id, Model model) {
        ChatRoom room = chatRoomRepository.findRoomById(id);
        model.addAttribute("room", room);
        return "chat/room";
    }

    @GetMapping("/new")
    public String make(Model model) {
        log.info("enter /new");
        ChatRoomForm form = new ChatRoomForm();
        model.addAttribute("form", form);
        return "chat/newRoom";
    }

    @PostMapping("/room/new")
    public String makeRoom(ChatRoomForm form) {
        chatRoomRepository.createChatRoom(form.getName());
        return "redirect:/chat/";
    }
}
