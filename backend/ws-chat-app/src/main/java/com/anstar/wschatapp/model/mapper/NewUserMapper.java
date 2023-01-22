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

    private UserEti.UserStatus mapUserStatus(String userStatus){
        UserEti.UserStatus result;
        switch(userStatus){
            case "online":
                result = UserEti.UserStatus.online;
                break;

            case "offline":
                result = UserEti.UserStatus.offline;
                break;

            case "away":
                result = UserEti.UserStatus.away;
                break;

            default:
                result = UserEti.UserStatus.offline;
                break;
        }
        return result;
    }
}
