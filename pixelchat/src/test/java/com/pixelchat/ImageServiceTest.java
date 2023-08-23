package com.pixelchat;

import com.pixelchat.service.ImageService;
import org.junit.jupiter.api.Test;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ImageServiceTest {

    private ImageService imageService = new ImageService();


    @Test
    public void testCreateShares() throws Exception {
        byte[] mockImageData = new byte[]{1, 2, 3, 4, 5}; // Mock image data
        List<BufferedImage> shares = imageService.createShares(mockImageData);

        assertNotNull(shares);
        assertEquals(2, shares.size());
    }

    @Test
    public void testPixelIntensity() {
        Color lightColor = new Color(200, 200, 200);
        Color darkColor = new Color(50, 50, 50);

        int lightIntensity = imageService.pixelIntensity(lightColor);
        int darkIntensity = imageService.pixelIntensity(darkColor);

        assertTrue(lightIntensity > 128);
        assertTrue(darkIntensity <= 128);
    }

    @Test
    public void testRandomPattern() {
        int pattern1 = imageService.randomPattern();
        int pattern2 = imageService.randomPattern();

        assertNotEquals(pattern1, pattern2);
    }

    @Test
    public void testComplementaryPattern() {
        int pattern = imageService.randomPattern();
        int complementary = imageService.complementaryPattern(pattern);

        Color originalColor = new Color(pattern);
        Color complementaryColor = new Color(complementary);

        assertEquals(255 - originalColor.getRed(), complementaryColor.getRed());
        assertEquals(255 - originalColor.getGreen(), complementaryColor.getGreen());
        assertEquals(255 - originalColor.getBlue(), complementaryColor.getBlue());
    }
}
