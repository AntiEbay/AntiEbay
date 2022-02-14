package com.antiebay.antiebayservice.JSONUtilities;

import com.antiebay.antiebayservice.useraccounts.UserLoginResponse;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;

@JsonComponent
public class LoginResponseJsonSerializer extends JsonSerializer<UserLoginResponse> {

    @Override
    public void serialize(UserLoginResponse value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField("isLoggedIn", value.isLoggedIn());
        gen.writeStringField("userType", value.getUserType());
        gen.writeEndObject();
    }
}
