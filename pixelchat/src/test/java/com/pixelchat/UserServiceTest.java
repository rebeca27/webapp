package com.pixelchat;

import com.pixelchat.model.User;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test
    public void testFindByEmail() {
        User mockUser = new User();
        mockUser.setEmail("test@email.com");
        when(userRepository.findByEmail(Mockito.anyString())).thenReturn(java.util.Optional.of(mockUser));

        User result = userService.findByEmail("test@email.com");
        assertEquals("test@email.com", result.getEmail());
    }

    @Test
    public void testSave() {
        User mockUser = new User();
        when(userRepository.save(Mockito.any(User.class))).thenReturn(mockUser);

        User result = userService.save(new User());
        assertNotNull(result);
    }

    @Test
    public void testHashWithSalt() {
        String plainPassword = "testPassword";
        String salt = UserService.generateSalt();
        String hashedPassword = userService.hashWithSalt(plainPassword, salt);

        assertNotNull(hashedPassword);
        assertNotEquals(plainPassword, hashedPassword);
    }

    @Test
    public void testIsPasswordValid() {
        String rawPassword = "testPassword";
        String salt = UserService.generateSalt();
        String hashedPasswordFromDB = userService.hashWithSalt(rawPassword, salt);

        boolean isValid = userService.isPasswordValid(rawPassword, salt, hashedPasswordFromDB);
        assertTrue(isValid);
    }
}
