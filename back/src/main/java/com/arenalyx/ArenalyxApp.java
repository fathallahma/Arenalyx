package com.arenalyx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.arenalyx")
public class ArenalyxApp {

	public static void main(String[] args) {
		SpringApplication.run(ArenalyxApp.class, args);
	}
}
