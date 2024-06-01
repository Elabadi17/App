package Blockchainapp.controller;

import Blockchainapp.entity.AuthRequest;
import Blockchainapp.entity.AuthResponse;
import Blockchainapp.entity.UserInfo;
import Blockchainapp.service.JwtService;
import Blockchainapp.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/users")
    public List<UserInfo> getAllUsers() {
        return service.getAllUsers();
    }
    @GetMapping("/isUserActive")
    public ResponseEntity<Boolean> isUserActive(Authentication authentication) {
        String username = authentication.getName();
        int userId = service.getUserIdByUsername(username);
        boolean isActive = service.isUserActive(userId);
        return new ResponseEntity<>(isActive, HttpStatus.OK);
    }
    @PostMapping("/users/{id}/update")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody UserInfo updatedUserInfo) {
        service.updateNameAndAddress(id, updatedUserInfo.getName(), updatedUserInfo.getAddress());
        return new ResponseEntity<>("{\"message\": \"User information updated successfully\"}", HttpStatus.OK);
    }

    @PostMapping("/users/{id}/changePassword")
    public ResponseEntity<String> changePassword(@PathVariable int id, @RequestBody UserInfo userInfo) {
        service.updatePassword(id, userInfo.getPassword());
        return new ResponseEntity<>("{\"message\": \"Password reset request sent successfully\"}", HttpStatus.OK);
    }

    @PostMapping("/users/{id}/deactivate")
    public ResponseEntity<String> deactivateUser(@PathVariable int id) {
        service.updateActive(id, 0);
        return new ResponseEntity<>("{\"message\": \"User deactivated successfully\"}", HttpStatus.OK);
    }

    @PostMapping("/users/{id}/activate")
    public ResponseEntity<String> activateUser(@PathVariable int id) {
        service.updateActive(id, 1);
        return new ResponseEntity<>("{\"message\": \"User activated successfully\"}", HttpStatus.OK);
    }

    @PostMapping("/addNewUser")
    public ResponseEntity<String> addNewUser(@RequestBody UserInfo userInfo) {
        String response = service.addUser(userInfo);
        return new ResponseEntity<>("{\"message\": \"" + response + "\"}", HttpStatus.CREATED);
    }

    @GetMapping("/user/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public boolean userProfile() {
        return true;
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public boolean adminProfile() {
        return true;
    }

    @PostMapping("/generateToken")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","));
            String token = jwtService.generateToken(authRequest.getUsername(), roles,service.getUserIdByUsername(authRequest.getUsername()));
            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}
