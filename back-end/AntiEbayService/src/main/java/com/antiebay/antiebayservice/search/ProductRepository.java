package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.userposts.UserPosts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import antlr.collections.List;

public interface ProductRepository extends JpaRepository<UserPosts, Integer> {
	
	@Query("SELECT p FROM posts p WHERE CONCAT(p.description, ' ', p.category, ' ', p.price) LIKE %?1%")
}
