package com.anstar.wschatapp.model.mapper;

import com.anstar.wschatapp.model.dto.MessageDto;
import com.anstar.wschatapp.model.entity.MessageEti;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageEtiListMapper implements Converter<List<MessageEti>, List<MessageDto>> {

    @Override
    public List<MessageDto> convert(List<MessageEti> messeges) {
        List<MessageDto> messageDtoList = messeges
                .stream()
                .map((source -> {
                    return new MessageDto.Builder()
                            .messageId(source.getMessageId())
                            .senderName(source.getSender())
                            .receiverName(source.getReceiver())
                            .message(source.getContent())
                            .messageDate(source.getMessageDate())
                            .build();
                }))
                .collect(Collectors.toList());

        return messageDtoList;
    }
}
