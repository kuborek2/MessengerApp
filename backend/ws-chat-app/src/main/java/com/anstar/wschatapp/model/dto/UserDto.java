package com.anstar.wschatapp.model.dto;

import com.anstar.wschatapp.model.entity.UserEti;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
public class UserDto {

    private String userName;

    private UserEti.UserStatus status;

    private String password;

    private String imageSrc;
}

