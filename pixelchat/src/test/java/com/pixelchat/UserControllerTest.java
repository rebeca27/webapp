package com.pixelchat;

import com.pixelchat.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService; // Assuming you have a UserService

    @Test
    public void testRegistrationWithValidData() throws Exception {
        // Assuming a POST request to "/register" with some valid data
        mockMvc.perform(post("/register")
                                .param("email", "test@email.com")
                                .param("password", "securePassword123")
                        // ... other parameters ...
                )
                .andExpect(status().isOk());
        // Add more assertions as needed
    }

    @Test
    public void testRegistrationWithInvalidEmail() throws Exception {
        // Assuming a POST request to "/register" with invalid email
        mockMvc.perform(post("/register")
                                .param("email", "invalidEmail")
                                .param("password", "securePassword123")
                        // ... other parameters ...
                )
                .andExpect(status().isBadRequest());
        // Add more assertions as needed
    }

    // Similarly, you can add tests for login, image share comparison, etc.
}

