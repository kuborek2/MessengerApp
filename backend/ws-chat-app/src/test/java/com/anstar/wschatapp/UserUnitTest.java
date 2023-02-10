package com.anstar.wschatapp;


import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.model.entity.UserEti;
import com.anstar.wschatapp.model.mapper.NewUserMapper;
import com.anstar.wschatapp.model.mapper.UserListMapper;
import com.anstar.wschatapp.model.mapper.UserMapper;
import com.anstar.wschatapp.model.repository.UserRepository;
import com.anstar.wschatapp.service.impl.ChatServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class UserUnitTest {

    ChatServiceImpl chatService;

    @Mock
    UserRepository userRepository;

    @Mock
    NewUserMapper newUserMapper;
    @Mock
    UserMapper userMapper;

    @Mock
    UserListMapper userListMapper;

    @BeforeEach
    void setUp() {
        chatService = new ChatServiceImpl(
                userRepository,
                userListMapper,
                null,
                null,
                null,
                userMapper,
                newUserMapper,
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

        //when
        Mockito.when(newUserMapper.convert(newUserDto)).thenReturn(userEti);
        Mockito.when(userRepository.findByUserName(newUserDto.getUserName())).thenReturn(userEti);
        Boolean result = chatService.saveUser(newUserDto);

        //then
        assertTrue(result);

    }

    @Tag("User")
    @Test
    void canUserWithInvalidUserNameBeSaved() {

        //given
        String userName = null;
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

        //when
        Mockito.when(newUserMapper.convert(newUserDto)).thenReturn(userEti);
        Mockito.when(userRepository.findByUserName(newUserDto.getUserName())).thenReturn(null);
        Boolean result = chatService.saveUser(newUserDto);

        //then
        assertFalse(result);

    }

    @Tag("User")
    @Test
    void canExistingUserBeSaved() {

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
        UserDto userDto = UserDto.builder()
                .userName(userName)
                .status(UserEti.UserStatus.offline)
                .password(password)
                .imageSrc(testImageSrc)
                .build();

        //when
        Mockito.when(userMapper.convert(userEti)).thenReturn(userDto);
        Mockito.when(userRepository.findByUserName(newUserDto.getUserName())).thenReturn(userEti);
        Boolean result = chatService.saveUser(newUserDto);

        //then
        assertFalse(result);

    }

    @Tag("User")
    @Test
    void canUserStatusBeChanged() {

        //given
        String userName = "testUser";
        String password = "123";
        String testImageSrc = "testImageSrc";
        UserEti userEti = UserEti.builder()
                .userName(userName)
                .status(UserEti.UserStatus.offline)
                .password(password)
                .imageSrc(testImageSrc)
                .build();

        //when
        Mockito.when(userRepository.findByUserName(userName)).thenReturn(userEti);
        Boolean result = chatService.changeUserStatus(userName, "online");

        //then
        assertTrue(result);

    }

    @Tag("User")
    @Test
    void canUserStatusBeChangedForInvalidUser() {

        //given
        String userName = "testUser";

        //when
        Mockito.when(userRepository.findByUserName(userName)).thenReturn(null);
        Boolean result = chatService.changeUserStatus(userName, "online");

        //then
        assertFalse(result);

    }

    @Tag("User")
    @Test
    void canGetAllUsers() {

        //when
        chatService.findAllUsers();

        //then
        verify(userRepository).findAll();

    }

}
