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
        // Codificarea parolei
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword_hash());
        user.setPassword_hash(encodedPassword);

        // Verificarea și setarea rolului pe baza role_id furnizat
        if (user.getRole() != null && user.getRole().getRole_id() != null) {
            Role chosenRole = roleRepository.findById(user.getRole().getRole_id())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(chosenRole);
        } else {
            throw new RuntimeException("Role must be provided");
        }

        // Salvarea utilizatorului în baza de date
        return userRepository.save(user);
    }


    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPassword_hash())) {
            return user;
        }
        return null;
    }


    public List<User> getAllUsers() {
        // Assuming you have a userRepository that extends JpaRepository
        return userRepository.findAll();
    }

}
