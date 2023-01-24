package com.anstar.wschatapp.service;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface ChatService {

    public List<UserDto> findAllUsers();

    public Optional<UserDto> findOneUserByUserName(String userName);

    public Boolean changeUserStatus(String userName, String status);

    public Boolean saveMessage(NewMessageDto newMessageDto);

    public List<MessageDto> findAllMessagesByUserName(String userName);

    public Boolean saveUser(NewUserDto newUserDto);

}
