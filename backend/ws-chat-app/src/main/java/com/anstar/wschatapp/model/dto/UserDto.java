package com.anstar.wschatapp.model.dto;

import com.anstar.wschatapp.model.entity.UserEti;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class UserDto {

    private String userName;

    private UserEti.UserStatus status;

    private UserDto(Builder builder){
        userName = builder.userName;
        status = builder.status;
    }

    @NoArgsConstructor
    public static final class Builder {

        private String userName;
        private UserEti.UserStatus status;

        public Builder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public Builder status(UserEti.UserStatus status) {
            this.status = status;
            return this;
        }

        public UserDto build() {
            return new UserDto(this);
        }
    }

}

