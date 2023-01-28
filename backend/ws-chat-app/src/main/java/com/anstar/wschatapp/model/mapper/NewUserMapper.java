package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.entity.UserEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class NewUserMapper implements Converter<NewUserDto, UserEti> {

    @Override
    public UserEti convert(NewUserDto source) {
        return UserEti.builder()
                .userName(source.getUserName())
                .status(UserEti.UserStatus.offline)
                .password(source.getPassword())
                .imageSrc(source.getImageSrc())
                .build();
    }

}
