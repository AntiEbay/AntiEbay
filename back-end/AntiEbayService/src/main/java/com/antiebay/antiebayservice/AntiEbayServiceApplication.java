package com.antiebay.antiebayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AntiEbayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntiEbayServiceApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/user/login")
                        .allowedOrigins("http://localhost:8080")
                        .allowedOrigins("http://localhost:3000")
                        .allowedOrigins("http://localhost:3306");;
            }
        };
    }

}
