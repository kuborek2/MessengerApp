package com.anstar.wschatapp.model.repository;

import com.anstar.wschatapp.model.entity.UserEti;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<UserEti, String> {

    List<UserEti> findAll();

    UserEti findByUserName(String userName);

}
