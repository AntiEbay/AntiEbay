package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.userposts.UserPosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Component("productRepository")
public interface ProductRepository extends JpaRepository<UserPosts, Integer> {

	@Query("SELECT p FROM UserPosts p WHERE CONCAT(p.buyerEmail, ' ', p.description, ' ', p.category, ' ', p.price) LIKE %?1%")
    List<UserPosts> search(String keyword);
}

