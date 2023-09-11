package com.pixelchat.controller;

import com.pixelchat.model.BlogPost;
import com.pixelchat.model.User;
import com.pixelchat.repository.UserRepository;
import com.pixelchat.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/addPost")
    public BlogPost addBlogPost(@RequestParam("image") String image, @RequestParam("content") String content, @RequestParam("user_id") Long userId) {
        BlogPost blogPost = new BlogPost();
        blogPost.setImageName(image);
        blogPost.setContent(content);

        User user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found"
            );
        }
        blogPost.setUser(user);

        return blogPostService.saveBlogPost(blogPost);
    }


    @GetMapping("/getPosts")
    public List<BlogPost> getAllBlogPosts() {
        return blogPostService.getAllBlogPosts();
    }
}
