package com.anstar.wschatapp.model.repository;

import com.anstar.wschatapp.model.entity.UsersEti;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<UsersEti, Long> {

    List<UsersEti> findAll();

    UsersEti findByUserName(String userName);

}
