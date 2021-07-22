package mook.demo.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mook.demo.apiresult.ApiResponseMessage;
import mook.demo.domain.ChatRoom;
import mook.demo.domain.Member;
import mook.demo.dto.ChatRoomForm;
import mook.demo.repository.ChatRoomRepository;
import mook.demo.session.SessionConst;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import org.apache.tomcat.util.net.openssl.ciphers.Protocol;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URI;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.List;

import javax.net.ssl.SSLContext;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import java.security.cert.X509Certificate;

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
    public ApiResponseMessage makeRoom(@RequestBody ChatRoomForm form) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
        ChatRoom chatRoom = chatRoomRepository.createChatRoom(form.getName(), form.getDescription());

        URI uri = UriComponentsBuilder
                .fromUriString("https://video-chat-lsm.herokuapp.com")
                .path("/api/update/room")
                .queryParam("name",chatRoom.getName())
                .queryParam("description",chatRoom.getDescription())
                .queryParam("roomId",chatRoom.getRoomId())
                .encode()
                .build()
                .toUri();
        System.out.println(uri);
//        URI uri = URI.create("https://61.42.104.74/api/update/room?name="
//                + chatRoom.getName()
//                +"&decription="
//                + chatRoom.getDescription()
//                +"&roodId="
//                + chatRoom.getRoomId());

//        TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;
//
//        SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
//                .loadTrustMaterial(null, acceptingTrustStrategy)
//                .build();
//
//        SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);
//
//        CloseableHttpClient httpClient = HttpClients.custom()
//                .setSSLSocketFactory(csf)
//                .build();
////        CloseableHttpClient httpClient = HttpClients.custom().setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE).build();
//
//        HttpComponentsClientHttpRequestFactory requestFactory =
//                new HttpComponentsClientHttpRequestFactory();
//
//        requestFactory.setHttpClient(httpClient);
//
//        RestTemplate restTemplate = new RestTemplate();
//        restTemplate.setRequestFactory(requestFactory);
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("asdasdasdasdasdasdasd");

        String result = restTemplate.getForObject(uri,String.class);
        System.out.println(result);
        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("방을 성공적으로 만들었습니다.");
        return apiResponseMessage;
    }
}