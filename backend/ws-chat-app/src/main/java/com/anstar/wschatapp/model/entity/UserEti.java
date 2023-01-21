package com.anstar.wschatapp.model.entity;

import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Entity
@Builder
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

    @Column(name = "password")
    private String password;

}
