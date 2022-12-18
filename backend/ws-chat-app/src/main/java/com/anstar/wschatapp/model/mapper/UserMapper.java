package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.model.entity.UsersEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Converter<UsersEti, UserDto> {

    @Override
    public UserDto convert(UsersEti source) {
        return new UserDto.Builder()
                .userName(source.getUserName())
                .status(source.getStatus())
                .build();
    }

}