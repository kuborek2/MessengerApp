package com.anstar.wschatapp.service.impl;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.model.entity.MessageEti;
import com.anstar.wschatapp.model.entity.UserEti;
import com.anstar.wschatapp.model.mapper.*;
import com.anstar.wschatapp.model.repository.MessageRepository;
import com.anstar.wschatapp.model.repository.UserRepository;
import com.anstar.wschatapp.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChatServiceImpl.class);
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    private final UserMapper userMapper;
    private final NewUserMapper newUserMapper;
    private final UserListMapper userListMapper;
    private final MessageDtoToMessageEtiMapper messageDtoToMessageEtiMapper;
    private final MessageEtiListMapper messageEtiListMapper;

    public ChatServiceImpl( UserRepository userRepository,
                            UserListMapper userListMapper,
                            MessageRepository messageRepository,
                            MessageDtoToMessageEtiMapper messageDtoToMessageEtiMapper,
                            MessageEtiListMapper messageEtiListMapper,
                            UserMapper userMapper,
                            NewUserMapper newUserMapper){
        this.userRepository = userRepository;
        this.userListMapper = userListMapper;
        this.messageRepository = messageRepository;
        this.messageDtoToMessageEtiMapper = messageDtoToMessageEtiMapper;
        this.messageEtiListMapper = messageEtiListMapper;
        this.userMapper = userMapper;
        this.newUserMapper = newUserMapper;
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<UserEti> userEtiList = userRepository.findAll();
        LOGGER.info("These are users", userEtiList);
        return userListMapper.convert(userEtiList);
    }

    @Override
    public Optional<UserDto> findOneUserByUserName(String userName) {
        Optional<UserEti> userEtiOptional = Optional.ofNullable(userRepository.findByUserName(userName));
        if( userEtiOptional.isEmpty())
            return Optional.empty();

        return Optional.ofNullable(userMapper.convert(userEtiOptional.get()));
    }

    @Override
    public Boolean saveMessage(NewMessageDto newMessageDto) {
        MessageEti newMessage = messageDtoToMessageEtiMapper.convert(newMessageDto);
        MessageEti savedMessage = messageRepository.save(newMessage);
        return savedMessage.equals(newMessage);
    }

    @Override
    public List<MessageDto> findAllMessagesByUserName(String userName) {
        List<MessageEti> messageEtiList;
        if( userName.equals("null") )
            messageEtiList = messageRepository.findAllByReceiverIsNull();
        else
            messageEtiList = messageRepository.findAllBySenderIsNotNullAndReceiverIsNotNullAndSenderOrReceiver(userName, userName);
        return messageEtiListMapper.convert(messageEtiList);
    }

    @Override
    public Boolean saveUser(NewUserDto newUserDto) {
        Optional<UserDto> userDtoOptional = findOneUserByUserName(newUserDto.getUserName());
        if ( userDtoOptional.isPresent() )
            return false;

        UserEti newUser = newUserMapper.convert(newUserDto);
        LOGGER.info(newUser.getStatus().getClass().toString());
        UserEti savedUser = userRepository.save(newUser);
        return savedUser.getUserName() == newUserDto.getUserName();
    }

}
