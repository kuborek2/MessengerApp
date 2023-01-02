package com.anstar.wschatapp.model.repository;

import com.anstar.wschatapp.model.dto.NewMessageDto;
import com.anstar.wschatapp.model.entity.MessageEti;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<MessageEti, NewMessageDto> {

    List<MessageEti> findAllBySenderIsNotNullAndReceiverIsNotNullAndSenderOrReceiver(String sender, String receiver);

    List<MessageEti> findAllByReceiverIsNull();

}
