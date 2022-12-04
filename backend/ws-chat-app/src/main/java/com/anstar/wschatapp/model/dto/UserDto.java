package com.anstar.wschatapp.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Id;

@NoArgsConstructor
@ToString
@Getter
public class UserDto {

    @Id
    @Column(name = "messanger_app.user_name")
    private String userName;

    @Column(name = "messanger_app.status")
    private String status;

    private UserDto(Builder builder){
        userName = builder.userName;
        status = builder.status;
    }

    @NoArgsConstructor
    public static final class Builder {

        private String userName;
        private String status;

        public Builder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public UserDto build() {
            return new UserDto(this);
        }
    }

}

