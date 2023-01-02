package com.anstar.wschatapp.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
public class NewUserDto {
    private String userName;

    private String status;

    private NewUserDto(Builder builder){
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

        public NewUserDto build() {
            return new NewUserDto(this);
        }

    }

}



