package com.una.pp.urquerybackend;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.FileNotFoundException;
@SpringBootApplication
public class UrqueryBackendApplication {
	public static void main(String[] args) throws FileNotFoundException {
		SpringApplication.run(UrqueryBackendApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/una").allowedOrigins("http://localhost:3000");
			}
		};
	}
}
