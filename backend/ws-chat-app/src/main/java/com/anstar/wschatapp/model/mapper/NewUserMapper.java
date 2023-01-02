package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.NewUserDto;
import com.anstar.wschatapp.model.entity.UserEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class NewUserMapper implements Converter<NewUserDto, UserEti> {

    @Override
    public UserEti convert(NewUserDto source) {
        return new UserEti.Builder()
                .userName(source.getUserName())
                .status(mapUserStatus(source.getStatus()))
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
                result = UserEti.UserStatus.online;
                break;
        }
        return result;
    }
}
