package com.anstar.wschatapp.service.impl;

import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.model.entity.UsersEti;
import com.anstar.wschatapp.model.mapper.UserListMapper;
import com.anstar.wschatapp.model.repository.UserRepository;
import com.anstar.wschatapp.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChatServiceImpl.class);
    private final UserRepository userRepository;
    private final UserListMapper userListMapper;

    public ChatServiceImpl( UserRepository userRepository,
                            UserListMapper userListMapper){
        this.userRepository = userRepository;
        this.userListMapper = userListMapper;
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<UsersEti> usersEtiList = userRepository.findAll();
        LOGGER.info("These are users", usersEtiList);
        return userListMapper.convert(usersEtiList);
    }

}
