package com.project.foodies.UserManagement;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/cus")
public class UserController  {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private User_FollowRep user_FollowRep;

    
    //USER REGISTER FUNCTION WORKING PROPERLY IN BACKEND AND FRONTEND
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/adduser") 
    public ResponseEntity<String> addNewUser(
        @RequestParam String username, 
        @RequestParam String name,
        @RequestParam String email, 
        @RequestParam String password, 
        @RequestParam ("profilepictureurl") MultipartFile profilepictureurl,
        @RequestParam String bio) 
            throws IOException 
            {
                Optional<User> existingUserWithEmail = userRepository.findByEmail(email);
                if (existingUserWithEmail.isPresent()) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Email Already Exists"); 
                }

                Optional<User> existingUserWithUsername = userRepository.findByUsername(username);
                if (existingUserWithUsername.isPresent()) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("User Name Already Exists");
                }

    User n = new User();

    n.setUsername(username);
    n.setName(name);
    n.setEmail(email);
    n.setPassword(password);
    n.setProfilepictureurl(profilepictureurl.getBytes()); // convert image to byte array
    n.setBio(bio);


    userRepository.save(n);
    User_Follow uf = new User_Follow();
    uf.setUserid(n.getUser_id());
    user_FollowRep.save(uf);

    return ResponseEntity.status(HttpStatus.OK).body("User Added");
}

    //GET ALL USERS INFO FUNCTION WORKING PROPERLY IN BACKEND AND FRONTEND
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
 

    //USER LOGIN FUNCTION WORKING PROPERLY IN BACKEND AND FRONTEND
     @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping(path = "/login")

    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {

    // CHECK EMAIL 
        Optional<User> existingUserWithEmail = userRepository.findByEmail(email);
            if (!existingUserWithEmail.isPresent()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email");
            }
            User user = existingUserWithEmail.get();

            // CHECK PASSWORD
            if (!user.getPassword().equals(password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
            }
            return ResponseEntity.status(HttpStatus.OK).body("Login Successful");
        }


    //USER UPDATE FUNCTION WORKING PROPERLY IN BACKEND
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/updateuser/{id}")
    public @ResponseBody String updateUser(
            @PathVariable Integer id, 
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String name, 
            @RequestParam(required = false) String password,
            @RequestParam(required = false) byte[]profilepictureurl,
            @RequestParam(required = false) String bio) {

        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (username != null) {
                user.setUsername(username);
            }

            if (name != null) {
                user.setName(name);
            }

            if (password != null) {
                user.setPassword(password);
            }

            if (profilepictureurl != null) {
                user.setProfilepictureurl(profilepictureurl);
            }

            if (bio != null) {
                user.setBio(bio);
            }

            userRepository.save(user);

            return "User Updated";
        } else {
            return "User Not Found";
        }
    }


    //USER DELETE PROFILE BY USERNAME WORKING PROPERLY IN BACKEND AND FRONTEND
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/delete/{username}")
    public @ResponseBody String deleteUser(@PathVariable String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
    
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
            return "User Deleted";
        } else {
            return "User not found";
        }
    }
    
    
    //GET PROFILE BY ID FUNCTION WORKING PROPERLY
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/profile/{id}")
    public @ResponseBody User RetriveUserbyUsername(@PathVariable Integer id) {

        Optional<User> userOptional = userRepository.findById(id);

        User user = userOptional.get();
        return user;
    }

    //GET PROFILE BY EAMIL FUNCTION  WORKING PROPERLY BACKEND AND FRONTEND - TO LOGIN FORM
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/getid/{email}")
    public @ResponseBody Integer RetriveIdbyEmail(@PathVariable String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        User user = userOptional.get();

        return user.getUser_id();
    }
}