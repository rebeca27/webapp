package com.pixelchat.service;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Random;
@Service
public class ImageService {
    public List<BufferedImage> createShares(byte[] originalImageData) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(originalImageData);
        BufferedImage originalImage = ImageIO.read(bais);
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();

        BufferedImage share1 = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);
        BufferedImage share2 = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);

        for(int i=0; i<width; i++) {
            for(int j=0; j<height; j++) {
                Color pixel = new Color(originalImage.getRGB(i, j));

                if(isBlack(pixel)) {
                    // If pixel is black, set complementary patterns in shares
                    share1.setRGB(i, j, randomPattern1());
                    share2.setRGB(i, j, complementaryPatternOfPattern1());
                } else {
                    // If pixel is white, set random identical patterns in shares
                    int pattern = randomPattern();
                    share1.setRGB(i, j, pattern);
                    share2.setRGB(i, j, pattern);
                }
            }
        }

        return List.of(share1, share2);
    }

    private boolean isBlack(Color pixel) {
        return pixel.getRed() == 0 && pixel.getGreen() == 0 && pixel.getBlue() == 0;
    }

    private int pattern1Value; // class variable to store the generated pattern for share1

    private int randomPattern1() {
        Random random = new Random();
        pattern1Value = random.nextInt(256);
        return pattern1Value;
    }

    private int complementaryPatternOfPattern1() {
        return 255 - pattern1Value;
    }


    private int randomPattern() {
        Random random = new Random();
        return random.nextInt(256);
    }

}
