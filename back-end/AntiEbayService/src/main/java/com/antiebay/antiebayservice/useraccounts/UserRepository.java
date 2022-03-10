package com.antiebay.antiebayservice.useraccounts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<UserAccountEntity, String> {
    List<UserAccountEntity> findByEmailAddress(String emailAddress);
    @Transactional
    @Modifying
    @Query("delete from UserAccountEntity u where u.emailAddress = ?1")
    void deleteByEmailAddress(String emailAddress);
}
