package com.anstar.wschatapp.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@ToString
@Getter
@Entity
@Table(name = "user", schema="messanger_app")
public class UsersEti {

    @Id
    @Column(name = "user_name")
    private String userName;

    @Column(name = "status")
    private String status;

    private UsersEti(Builder builder){
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

        public UsersEti build() {
            return new UsersEti(this);
        }
    }

}
