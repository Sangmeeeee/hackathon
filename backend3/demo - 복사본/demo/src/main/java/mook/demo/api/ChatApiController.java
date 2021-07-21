package mook.demo.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mook.demo.apiresult.ApiResponseMessage;
import mook.demo.domain.ChatRoom;
import mook.demo.domain.Member;
import mook.demo.dto.ChatRoomForm;
import mook.demo.repository.ChatRoomRepository;
import mook.demo.session.SessionConst;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatApiController {

    private final ChatRoomRepository chatRoomRepository;

    @GetMapping("/")
    public List<ChatRoom> rooms() {
        List<ChatRoom> allRoom = chatRoomRepository.findAllRoom();
        for (ChatRoom chatRoom : allRoom) {
            System.out.println("chatRoom.toString() = " + chatRoom.getName());
            System.out.println("chatRoom.getRoomId() = " + chatRoom.getRoomId());
        }
        return allRoom;
    }

    @GetMapping("/rooms/{room_id}")
    public String room(@PathVariable String room_id, Model model, HttpServletRequest request) {
        ChatRoom room = chatRoomRepository.findRoomById(room_id);

        model.addAttribute("room", room);

        HttpSession session = request.getSession(false);
        Member loginMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        model.addAttribute("member", loginMember);

        return "chat/room";
    }

    @GetMapping("/new")
    public String make(Model model) {
        ChatRoomForm form = new ChatRoomForm();
        model.addAttribute("form", form);
        return "chat/newRoom";
    }

    @PostMapping("/room/new")
    public ApiResponseMessage makeRoom(@RequestBody ChatRoomForm form) {
        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
        ChatRoom chatRoom = chatRoomRepository.createChatRoom(form.getName(), form.getDescription());

        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:9090")
                .path("/api/update/room")
                .queryParam("name",chatRoom.getName())
                .queryParam("description",chatRoom.getDescription())
                .queryParam("roomId",chatRoom.getRoomId())
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri,String.class);

        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("방을 성공적으로 만들었습니다.");
        return apiResponseMessage;
    }
}