package com.anstar.wschatapp.model.dto;

import com.anstar.wschatapp.model.enums.Status;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class NewMessageDto {
    private String senderName;
    private String receiverName;
    private String message;
    private Timestamp messageDate;
    private Status status;
}