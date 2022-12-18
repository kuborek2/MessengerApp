package com.anstar.wschatapp.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;

@NoArgsConstructor
@ToString
@Getter
@Entity
@Table(name = "message", schema="messanger_app")
public class MessageEti {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int messageId;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "message_date")
    private Timestamp messageDate;

    @Column(name = "content")
    private String content;

    private MessageEti(MessageEti.Builder builder){
        sender = builder.sender;
        receiver = builder.receiver;;
        content = builder.content;
        messageDate = builder.messageDate;
    }

    @NoArgsConstructor
    public static final class Builder {

        private String sender;

        private String receiver;

        private String content;

        private Timestamp messageDate;

        public MessageEti.Builder sender(String sender) {
            this.sender = sender;
            return this;
        }

        public MessageEti.Builder receiver(String receiver) {
            this.receiver = receiver;
            return this;
        }

        public MessageEti.Builder content(String content) {
            this.content = content;
            return this;
        }

        public MessageEti.Builder messageDate(Timestamp messageDate) {
            this.messageDate = messageDate;
            return this;
        }

        public MessageEti build() {
            return new MessageEti(this);
        }
    }

}

