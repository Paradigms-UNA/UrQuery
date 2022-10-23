package com.una.pp.urquerybackend;
import com.una.pp.urquerybackend.services.PrologService;
import com.una.pp.urquerybackend.services.ServiceApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootApplication
public class UrqueryBackendApplication {
	public static void main(String[] args) throws IOException, URISyntaxException, InterruptedException {
		//SpringApplication.run(UrqueryBackendApplication.class, args);
		PrologService.instance().connectionTest();
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**");
//				registry.addMapping("/api/una").allowedOrigins("http://localhost:3000");
//				registry.addMapping("/api/una/compile").allowedOrigins("http://localhost:3000");
//				registry.addMapping("/api/una/document/").allowedOrigins("http://localhost:3000");
			}
		};
	}
}
