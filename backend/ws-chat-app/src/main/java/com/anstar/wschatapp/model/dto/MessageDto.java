package com.anstar.wschatapp.model.dto;

import com.anstar.wschatapp.model.entity.MessageEti;
import com.anstar.wschatapp.model.enums.Status;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageDto {
    private int messageId;
    private String senderName;
    private String receiverName;
    private String message;
    private Timestamp messageDate;

    private MessageDto(MessageDto.Builder builder){
        messageId = builder.messageId;
        senderName = builder.senderName;
        receiverName = builder.receiverName;
        message = builder.message;
        messageDate = builder.messageDate;
    }

    @NoArgsConstructor
    public static final class Builder {

        private int messageId;
        private String senderName;
        private String receiverName;
        private String message;
        private Timestamp messageDate;

        public MessageDto.Builder messageId(int messageId) {
            this.messageId = messageId;
            return this;
        }

        public MessageDto.Builder senderName(String senderName) {
            this.senderName = senderName;
            return this;
        }

        public MessageDto.Builder receiverName(String receiverName) {
            this.receiverName = receiverName;
            return this;
        }

        public MessageDto.Builder message(String message) {
            this.message = message;
            return this;
        }

        public MessageDto.Builder messageDate(Timestamp messageDate) {
            this.messageDate = messageDate;
            return this;
        }

        public MessageDto build() {
            return new MessageDto(this);
        }
    }

}