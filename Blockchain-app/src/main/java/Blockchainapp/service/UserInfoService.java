package Blockchainapp.service;

import Blockchainapp.entity.UserInfo;
import Blockchainapp.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userDetail = repository.findByName(username);

        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    // Method to check if user is active
    public boolean isUserActive(int id) {
        UserInfo user = repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        return user.getActive() == 1;
    }

    public int getUserIdByUsername(String username) {
        Optional<UserInfo> userDetail = repository.findByName(username);
        return userDetail.map(UserInfo::getId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";
    }

    public void updateNameAndAddress(int id, String newName, String newAddress) {
        UserInfo user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setName(newName);
        user.setAddress(newAddress);
        repository.save(user);
    }

    public void updatePassword(int id, String newPassword) {
        UserInfo user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
    }

    public List<UserInfo> getAllUsers() {
        return repository.findAll();
    }

    public void updateActive(int id, int newActiveValue) {
        UserInfo user = repository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + id));
        user.setActive(newActiveValue);
        repository.save(user);
    }
}
