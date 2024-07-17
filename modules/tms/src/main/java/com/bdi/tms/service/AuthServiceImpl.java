package com.bdi.tms.service;

import com.bdi.tms.dto.LoginDto;
import com.bdi.tms.dto.RegisterDto;
import com.bdi.tms.exception.TmsApiException;
import com.bdi.tms.model.security.Role;
import com.bdi.tms.model.security.User;
import com.bdi.tms.repository.RoleRepository;
import com.bdi.tms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public String register(RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new TmsApiException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }

        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new TmsApiException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        User user = createUser(registerDto);
        userRepository.save(user);

        return "User Registered Successfully...";
    }

    @Override
    public String login(LoginDto loginDto) {
        String message = null;
        //try {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        message = "User Login Successfully...";
            /*
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("login ex :: " + ex);
            message = ex.getMessage();
        }*/
        return message;
    }

    private User createUser(RegisterDto registerDto) {
        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roleSet = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        roleSet.add(userRole);

        user.setRoles(roleSet);
        return user;
    }

}
