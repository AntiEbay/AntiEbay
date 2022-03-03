package com.antiebay.antiebayservice.useraccounts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserAccountEntity, String> {
    List<UserAccountEntity> findByEmail(String emailAddress);
    void deleteByEmail(String emailAddress);
}
