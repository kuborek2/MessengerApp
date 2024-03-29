package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.UserDto;
import com.anstar.wschatapp.model.entity.UserEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Converter<UserEti, UserDto> {

    @Override
    public UserDto convert(UserEti source) {
        return UserDto.builder()
                .userName(source.getUserName())
                .status(source.getStatus())
                .password(source.getPassword())
                .imageSrc(source.getImageSrc())
                .build();
    }

}
