package mook.demo.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mook.demo.domain.ChatMessage;
import mook.demo.domain.ChatRoom;
import mook.demo.repository.ChatRoomRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final ChatRoomRepository chatRoomRepository;
    private final ObjectMapper objectMapper;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info("메시지 전송 = {} : {}", session, message.getPayload());
        String msg = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(msg, ChatMessage.class);
        ChatRoom chatRoom = chatRoomRepository.findRoomById(chatMessage.getChatRoomId());
//        chatRoom.handleMessage(session,chatMessage,objectMapper);
        chatRoom.handleMessage(session,chatMessage,objectMapper);
    }
}
