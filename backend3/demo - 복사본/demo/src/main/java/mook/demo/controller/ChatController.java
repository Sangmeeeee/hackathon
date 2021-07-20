package mook.demo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mook.demo.apiresult.ApiResponseMessage;
import mook.demo.domain.ChatRoom;
import mook.demo.domain.Member;
import mook.demo.dto.ChatRoomForm;
import mook.demo.repository.ChatRoomRepository;
import mook.demo.session.SessionConst;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

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
//        model.addAttribute("rooms", chatRoomRepository.findAll());
        return "chat/rooms";
    }

    @GetMapping("/rooms/{room_id}")
    public String room(@PathVariable String room_id, Model model, HttpServletRequest request) {
        ChatRoom room = chatRoomRepository.findRoomById(room_id);
//        Optional<ChatRoom> room = chatRoomRepository.findById();

        model.addAttribute("room", room);

        HttpSession session = request.getSession(false);
        Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        model.addAttribute("member", loginMember);

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
    public ApiResponseMessage makeRoom(@RequestBody ChatRoomForm form) {
        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
        chatRoomRepository.createChatRoom(form.getName(), form.getDescription());
        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("방을 성공적으로 만들었습니다.");
        return apiResponseMessage;
    }
}
