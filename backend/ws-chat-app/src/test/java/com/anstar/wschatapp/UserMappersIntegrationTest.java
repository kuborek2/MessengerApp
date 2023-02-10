package com.anstar.wschatapp;

import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.entity.UserEti;
import com.anstar.wschatapp.model.mapper.NewUserMapper;
import com.anstar.wschatapp.model.mapper.UserListMapper;
import com.anstar.wschatapp.model.mapper.UserMapper;
import com.anstar.wschatapp.model.repository.UserRepository;
import com.anstar.wschatapp.service.impl.ChatServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserMappersIntegrationTest {
    ChatServiceImpl chatService;

    @Mock
    UserRepository userRepository;

    @BeforeEach
    void setUp() {
        chatService = new ChatServiceImpl(
                userRepository,
                new UserListMapper(),
                null,
                null,
                null,
                new UserMapper(),
                new NewUserMapper(),
                null
        );
    }

    @Tag("User")
    @Test
    void canUserBeSaved() {

        //given
        String userName = "testUser";
        String password = "123";
        String testImageSrc = "testImageSrc";
        NewUserDto newUserDto = NewUserDto.builder()
                .userName(userName)
                .password(password)
                .imageSrc(testImageSrc)
                .build();
        UserEti userEti = UserEti.builder()
                .userName(userName)
                .status(UserEti.UserStatus.offline)
                .password(password)
                .imageSrc(testImageSrc)
                .build();

        ChatServiceImpl spyChatService = Mockito.spy(chatService);

        //when
        Mockito.doReturn(Optional.empty()).when(spyChatService).findOneUserByUserName(userName);
        Mockito.when(userRepository.findByUserName(newUserDto.getUserName())).thenReturn(userEti);
        Boolean result = spyChatService.saveUser(newUserDto);

        //then
        assertTrue(result);

    }



}
