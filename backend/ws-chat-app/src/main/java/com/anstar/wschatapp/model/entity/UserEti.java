package com.anstar.wschatapp.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@NoArgsConstructor
@ToString
@Getter
@Entity
@Table(name = "user", schema="messanger_app")
public class UserEti {

    public static enum UserStatus {online, offline, away}
    @Id
    @Column(name = "user_name")
    private String userName;

//    @Enumerated(EnumType.STRING)
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status;

    private UserEti(Builder builder){
        userName = builder.userName;
        status = builder.status;
    }

    @NoArgsConstructor
    public static final class Builder {

        private String userName;
        private UserStatus status;

        public Builder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public Builder status(UserStatus status) {
            this.status = status;
            return this;
        }

        public UserEti build() {
            return new UserEti(this);
        }
    }

}
