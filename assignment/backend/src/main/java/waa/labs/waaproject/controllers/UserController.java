package waa.labs.waaproject.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import waa.labs.waaproject.models.User;
import waa.labs.waaproject.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor // to autowire
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
//        System.out.println("Hello Users");
        return userService.getAllUsers();
    }
}
