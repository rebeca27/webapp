package com.pixelchat.service;

import com.pixelchat.controller.SHA256Util;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.model.User;
import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

//    public String hashPassword(String plainPassword) {
//        return SHA256Util.hashWithSHA256(plainPassword);
//    }

    public String hashWithSalt(String plainPassword, String salt) {
        Argon2Parameters.Builder builder = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withSalt(decodeSalt(salt))
                .withParallelism(2)
                .withMemoryAsKB(65536)
                .withIterations(4);

        Argon2BytesGenerator gen = new Argon2BytesGenerator();
        gen.init(builder.build());

        byte[] result = new byte[32];
        gen.generateBytes(plainPassword.toCharArray(), result, 0, result.length);

        return Base64.getEncoder().encodeToString(result);
    }

    private static final int SALT_LENGTH = 16; // 16 bytes = 128 bits

    public static String generateSalt() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[SALT_LENGTH];
        secureRandom.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public static byte[] decodeSalt(String salt) {
        return Base64.getDecoder().decode(salt);
    }

    public boolean isPasswordValid(String rawPassword, String salt, String hashedPasswordFromDB) {
        return hashWithSalt(rawPassword, salt).equals(hashedPasswordFromDB);
    }

    public String fetchTargetColorByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getColor)
                .orElse(null);
    }


    public byte[] fetchShareByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getShare1)
                .orElse(null);
    }
    public User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

}
