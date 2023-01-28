package com.anstar.wschatapp;


import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.enums.Status;
import com.anstar.wschatapp.service.ChatService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class MessageTest {

    private final ChatService chatService;

    public MessageTest(ChatService chatService){
        this.chatService = chatService;
    }

    @Tag("Message")
    @ParameterizedTest
    void canMessageBeSaved() {

        //given
        NewMessageDto newMessageDto = new NewMessageDto(
            "David",
            null,
            "Hi",
            null,
            Status.MESSAGE
            );

        //when
        MessageDto result = chatService.saveMessage(newMessageDto);

        //then
        assertTrue(result.getMessage() == newMessageDto.getMessage());

    }

}
