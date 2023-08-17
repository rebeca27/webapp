package com.pixelchat;

import com.pixelchat.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PixelchatApplicationTests {

	@Autowired  // <-- This will inject the userService bean when the test is run
	private UserService userService;

	@Test
	public void testPasswordHashing() {
		String testPassword = "admin12345";

		// If generateSalt is an instance method, call it like this:
		String salt = userService.generateSalt();

		// If generateSalt is a static method, then your original call was correct.

		String hashedPassword = userService.hashWithSalt(testPassword, salt);
		System.out.println("Test Salt: " + salt);
		System.out.println("Hashed Password: " + hashedPassword);

		boolean isValid = userService.isPasswordValid(testPassword, salt, hashedPassword);
		System.out.println("Is Valid: " + isValid);
	}
}
