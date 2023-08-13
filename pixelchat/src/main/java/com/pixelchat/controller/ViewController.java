package com.pixelchat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/login2")
    public String login2Page() {
        return "login2";
    }

    @GetMapping("/login3")
    public String login3Page() {
        return "login3";
    }

    @GetMapping("/index")
    public String indexPage() {
        return "index";
    }
    @GetMapping("/home")
    public String homePage() {
        return "home";
    }
    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/dashboard")
    public String dashboardPage() {
        return "dashboard";
    }
}

