package waa.labs.waaproject.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import waa.labs.waaproject.models.User;
import waa.labs.waaproject.repositories.IUserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
