package com.antiebay.antiebayservice.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostReviewRepository extends JpaRepository<PostReview, Integer> {
}
