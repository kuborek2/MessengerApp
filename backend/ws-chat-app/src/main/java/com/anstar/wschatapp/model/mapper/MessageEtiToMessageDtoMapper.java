package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.entity.MessageEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MessageEtiToMessageDtoMapper implements Converter<MessageEti, MessageDto> {

    @Override
    public MessageDto convert(MessageEti source) {
        return new MessageDto.Builder()
                .messageId(source.getMessageId())
                .messageDate(source.getMessageDate())
                .senderName(source.getSender())
                .receiverName(source.getReceiver())
                .message(source.getContent())
                .build();
    }
}