package com.anstar.wschatapp.service;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.dto.UserDto;

import java.util.List;

public interface ChatService {

    public List<UserDto> findAllUsers();

    public Boolean saveMessage(NewMessageDto newMessageDto);

    public List<MessageDto> findAllMessagesByUserName(String userName);

    public Boolean saveUser(NewUserDto newUserDto);

}
