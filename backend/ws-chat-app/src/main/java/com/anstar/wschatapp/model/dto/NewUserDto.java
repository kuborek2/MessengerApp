package com.anstar.wschatapp.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
public class NewUserDto {
    private String userName;
    private String password;
    private String imageSrc;
}



