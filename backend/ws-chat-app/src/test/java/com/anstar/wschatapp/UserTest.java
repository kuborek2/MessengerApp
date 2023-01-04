package com.anstar.wschatapp;


import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.service.ChatService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserTest {

    private final ChatService chatService;

    public UserTest(ChatService chatService){
        this.chatService = chatService;
    }

    @Tag("User")
    @Test
    void canUserBeSaved() {

        //given
        NewUserDto newUserDto = new NewUserDto.Builder()
                .userName("Test1")
                .status("online")
                .build();

        //when
        Boolean result = chatService.saveUser(newUserDto);

        //then
        assertTrue(result);

    }

}
