package com.pixelchat.service;

import com.pixelchat.controller.SHA256Util;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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

    public String hashPassword(String plainPassword) {
        return SHA256Util.hashWithSHA256(plainPassword);
    }
    public boolean isPasswordValid(String rawPassword, String hashedPasswordFromDB) {
        return hashPassword(rawPassword).equals(hashedPasswordFromDB);
    }
    public String fetchTargetColorByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getColor)
                .orElse(null);
    }

    @Autowired
    private ImageService imageService;

    public boolean matchShares(String email, byte[] storedShare, BufferedImage uploadedShareImage) {
        BufferedImage storedShareImage;
        try {
            storedShareImage = convertByteArrayToBufferedImage(storedShare);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        String hashOfUploadedShare = hashImage(uploadedShareImage);
        String hashOfStoredShare = hashImage(storedShareImage);

        return hashOfUploadedShare.equals(hashOfStoredShare);
    }

    private BufferedImage convertByteArrayToBufferedImage(byte[] imageData) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        return ImageIO.read(bais);
    }

    private String hashImage(BufferedImage image) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(image, "png", outputStream);
            byte[] data = outputStream.toByteArray();

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(data);
            return bytesToHex(hash);
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public byte[] fetchShareByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getShare1)
                .orElse(null);
    }

}
