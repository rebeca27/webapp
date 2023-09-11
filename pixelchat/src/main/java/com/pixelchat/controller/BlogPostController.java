package com.pixelchat.controller;

import com.pixelchat.model.BlogPost;
import com.pixelchat.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping("/addPost")
    public BlogPost addBlogPost(@RequestBody BlogPost blogPost) {
        System.out.println(blogPost.getImageName()); // Debugging statement

        return blogPostService.saveBlogPost(blogPost);
    }

    @GetMapping("/getPosts")
    public List<BlogPost> getAllBlogPosts() {
        return blogPostService.getAllBlogPosts();
    }
}
