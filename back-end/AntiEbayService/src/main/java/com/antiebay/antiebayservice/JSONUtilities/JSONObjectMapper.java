package com.antiebay.antiebayservice.JSONUtilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONObjectMapper {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static String mapObjectToString(Object obj) {
        String result = "";
        try {
            result = objectMapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }
}
