package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.model.entity.UsersEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class UserListMapper implements Converter<List<UsersEti>, List<UserDto>> {

@Override
public List<UserDto> convert(List<UsersEti> users) {
        List<UserDto> userDto = users
            .stream()
            .map((source -> {
                return new UserDto.Builder()
                    .userName(source.getUserName())
                    .status(source.getStatus())
                    .build();
            }))
            .collect(Collectors.toList());

        return userDto;
        }

}
