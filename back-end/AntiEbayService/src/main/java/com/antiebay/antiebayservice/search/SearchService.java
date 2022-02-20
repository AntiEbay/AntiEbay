package com.antiebay.antiebayservice.search;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import antlr.collections.List;

@Service
public class SearchService {
	@Autowired
	private ProductRepository repo;
	
	public List<UserPosts> listAll(String keyword) {
		if (keyword != null) {
			return repo.search(keyword);
		}
		return repo.findAll();
	}
}
