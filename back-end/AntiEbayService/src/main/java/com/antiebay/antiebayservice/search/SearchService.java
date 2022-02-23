package com.antiebay.antiebayservice.search;

import com.antiebay.antiebayservice.userposts.UserPosts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Component("searchService")
public class SearchService {
	@Qualifier("productRepository")
	@Autowired
	private ProductRepository productRepository;
	
	public List<UserPosts> listAll(String keyword) {
		if (keyword != null) {
			return productRepository.search(keyword);
		}
		return productRepository.findAll();
	}
}
