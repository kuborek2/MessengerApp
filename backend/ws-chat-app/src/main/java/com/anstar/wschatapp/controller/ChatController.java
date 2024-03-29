package com.anstar.wschatapp.controller;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.service.ChatService;
import com.anstar.wschatapp.service.impl.ChatServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class ChatController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChatServiceImpl.class);

    private final ChatService chatService;
    private SimpMessagingTemplate simpMessagingTemplate;

    public ChatController(ChatService chatService,
                          SimpMessagingTemplate simpMessagingTemplate){
        this.chatService = chatService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    @CrossOrigin
    @GetMapping(value = "/users")
    public ResponseEntity<List<UserDto>> getUsers() {
        LOGGER.info("find all users");

        List<UserDto> moviesDtoList = chatService.findAllUsers();
        return new ResponseEntity<>(moviesDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userName}")
    public ResponseEntity<UserDto> getUsersByName(@PathVariable String userName) {
        LOGGER.info("find user by userName: "+userName);

        Optional<UserDto> userDtoOptional = chatService.findOneUserByUserName(userName);
        if( userDtoOptional.isEmpty() )
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(userDtoOptional.get(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/messages")
    public ResponseEntity<List<MessageDto>> getMessagesByUserName(@RequestParam("userName") String userName) {
        LOGGER.info("Get user by userName"+userName);

        List<MessageDto> messageDtoList = chatService.findAllMessagesByUserName(userName);
        return new ResponseEntity<>(messageDtoList, HttpStatus.OK);
    }
    @CrossOrigin
    @PostMapping("/users")
    public ResponseEntity<Void> saveUser(@RequestBody NewUserDto newUserDto){
        LOGGER.info("Trying to register user with: ");
        LOGGER.info(newUserDto.toString());
        Boolean result = chatService.saveUser(newUserDto);
        LOGGER.info("Did user got saved: "+result);
        if( !result )
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/users")
    public ResponseEntity<Void> updateUserStatus(@RequestParam("userName") String userName, @RequestParam("status") String status){
        Boolean result = chatService.changeUserStatus(userName, status);
        LOGGER.info("Did user status got upadted: "+result);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public NewMessageDto receiveMessage(@Payload NewMessageDto newMessageDto){
        LOGGER.info("Message: "+newMessageDto.toString());
        if( newMessageDto.getMessage() != null )
            LOGGER.info("Did message got saved " + chatService.saveMessage(newMessageDto));
        return newMessageDto;
    }

    @MessageMapping("/private-message")
    public void recMessage(@Payload NewMessageDto newMessageDto){
        LOGGER.info("saveing message: "+newMessageDto);
        MessageDto savedMessage = chatService.saveMessage(newMessageDto);
        LOGGER.info("saved message: "+savedMessage);
        simpMessagingTemplate.convertAndSendToUser(savedMessage.getReceiverName(),"/private", savedMessage);
    }
}
