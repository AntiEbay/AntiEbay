package com.antiebay.antiebayservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AntiEbayRestController {

    @GetMapping("/")
    private String getString() {
        System.out.println("Hello received");
        return "<h1>Hello World</h1>";
    }
}
