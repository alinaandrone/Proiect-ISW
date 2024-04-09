package com.example.CatalogNote.Services;

import com.example.CatalogNote.Entities.Role;
import com.example.CatalogNote.Entities.User;
import com.example.CatalogNote.Repositories.RoleRepository;
import com.example.CatalogNote.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository; // Assuming you have this interface

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        System.out.println(user);
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword_hash());
        user.setPassword_hash(encodedPassword);

        Role defaultRole = roleRepository.findById(1).orElseThrow(() -> new RuntimeException("Default role not found"));
        user.setRole(defaultRole);

        return userRepository.save(user);
    }

  


    public List<User> getAllUsers() {
        // Assuming you have a userRepository that extends JpaRepository
        return userRepository.findAll();
    }

}
