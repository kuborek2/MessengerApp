package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.entity.MessageEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MessageDtoToMessageEtiMapper implements Converter<NewMessageDto, MessageEti> {
    @Override
    public MessageEti convert(NewMessageDto source) {
        return new MessageEti.Builder()
                .sender(source.getSenderName())
                .receiver(source.getReceiverName())
                .content(source.getMessage())
                .messageDate(source.getMessageDate())
                .build();
    }
}
