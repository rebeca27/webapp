package com.pixelchat.service;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.List;
@Service
public class ImageService {
    /**
     * Creates two share images from an original image based on pixel intensity.
     * Pixels with intensity <= 128 in the original image have complementary patterns in the shares.
     * Pixels with intensity > 128 have identical patterns.
     *
     * @param originalImageData Byte array representing the original image.
     * @return List of two share images.
     * @throws Exception If there is an issue reading the original image.
     */
    public List<BufferedImage> createShares(byte[] originalImageData) throws Exception {

       // byte[] encryptedData = encryptImage(originalImageData);

        ByteArrayInputStream bais = new ByteArrayInputStream(originalImageData);
        BufferedImage originalImage = ImageIO.read(bais);
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();

        BufferedImage share1 = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        BufferedImage share2 = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                Color pixel = new Color(originalImage.getRGB(i, j));

                if (pixelIntensity(pixel) <= 128) {
                    // If pixel intensity is less than 128, set complementary patterns in shares
                    share1.setRGB(i, j, randomPattern());
                    share2.setRGB(i, j, complementaryPattern(share1.getRGB(i, j)));
                } else {
                    // If pixel intensity is above 128, set random identical patterns in shares
                    int pattern = randomPattern();
                    share1.setRGB(i, j, pattern);
                    share2.setRGB(i, j, pattern);
                }
            }
        }

        return List.of(share1, share2);
    }


    /**
     * Calculates the intensity of a pixel based on its RGB components.
     * Intensity is computed as a weighted sum of the red, green, and blue values.
     *
     * @param pixel The pixel color.
     * @return Intensity of the pixel.
     */
    public int pixelIntensity(Color pixel) {
        return (int) (0.3 * pixel.getRed() + 0.59 * pixel.getGreen() + 0.11 * pixel.getBlue());
    }

    /**
     * Generates a random RGB color pattern.
     *
     * @return Random RGB color as an integer.
     */

    public int randomPattern() {
        return secureRandom.nextInt(0xFFFFFF + 1);  // Generating random RGB color
    }

    /**
     * Calculates the complementary RGB color of a given pattern.
     *
     * @param pattern RGB color pattern as an integer.
     * @return Complementary RGB color as an integer.
     */

    public int complementaryPattern(int pattern) {
        Color color = new Color(pattern);
        int r = 255 - color.getRed();
        int g = 255 - color.getGreen();
        int b = 255 - color.getBlue();
        return new Color(r, g, b).getRGB();
    }

    // Instance of SecureRandom for generating random patterns.

    protected SecureRandom secureRandom = new SecureRandom();




    private static final String AES_TRANSFORMATION = "AES/CBC/PKCS5Padding";
    private static final String AES_ALGORITHM = "AES";
    private static final int AES_KEY_SIZE = 256; // in bits
    private static final int AES_IV_SIZE = 16;   // in bytes

    private static byte[] deriveKey(String passphrase) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        return digest.digest(passphrase.getBytes("UTF-8"));
    }

    private static final byte[] SECRET_KEY;
    static {
        try {
            SECRET_KEY = deriveKey("AES_PASSPHRASE");
        } catch (Exception e) {
            throw new RuntimeException("Failed to derive the key.", e);
        }
    };

    private byte[] encryptImage(byte[] originalImageData) throws Exception {
        SecretKey secretKey = new SecretKeySpec(SECRET_KEY, AES_ALGORITHM);

        SecureRandom secureRandom = new SecureRandom();
        byte[] iv = new byte[AES_IV_SIZE];
        secureRandom.nextBytes(iv);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

        Cipher cipher = Cipher.getInstance(AES_TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParameterSpec);

        byte[] encryptedData = cipher.doFinal(originalImageData);

        // Combine IV and encrypted data
        byte[] combinedData = new byte[AES_IV_SIZE + encryptedData.length];
        System.arraycopy(iv, 0, combinedData, 0, AES_IV_SIZE);
        System.arraycopy(encryptedData, 0, combinedData, AES_IV_SIZE, encryptedData.length);

        return combinedData;
    }
}
