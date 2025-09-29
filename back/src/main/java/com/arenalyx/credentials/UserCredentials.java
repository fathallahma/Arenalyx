package com.arenalyx.credentials;

public class UserCredentials {
    private String email;
    private String password;
    private Long id;

    public UserCredentials(Long id) {
        this.id = id;
    }

    public UserCredentials(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Long getId() {
        return id;
    }

}
