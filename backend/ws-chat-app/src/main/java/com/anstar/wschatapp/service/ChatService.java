package com.anstar.wschatapp.service;

import com.anstar.wschatapp.model.dto.UserDto;

import java.util.List;

public interface ChatService {

    public List<UserDto> findAllUsers();

}
