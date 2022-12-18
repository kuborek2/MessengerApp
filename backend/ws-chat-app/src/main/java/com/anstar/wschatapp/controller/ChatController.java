package com.anstar.wschatapp.controller;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.service.ChatService;
import com.anstar.wschatapp.service.impl.ChatServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ChatController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChatServiceImpl.class);

    private final ChatService chatService;

    public ChatController(ChatService chatService){
        this.chatService = chatService;
    }
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @CrossOrigin
    @GetMapping(value = "/users")
    public ResponseEntity<List<UserDto>> getMovies() {
        LOGGER.info("find all users");

        List<UserDto> moviesDtoList = chatService.findAllUsers();
        return new ResponseEntity<>(moviesDtoList, HttpStatus.OK);
    }

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageDto receiveMessage(@Payload MessageDto messageDto){
        return messageDto;
    }

    @MessageMapping("/private-message")
    public MessageDto recMessage(@Payload MessageDto messageDto){
        simpMessagingTemplate.convertAndSendToUser(messageDto.getReceiverName(),"/private", messageDto);
        System.out.println(messageDto.toString());
        return messageDto;
    }
}
