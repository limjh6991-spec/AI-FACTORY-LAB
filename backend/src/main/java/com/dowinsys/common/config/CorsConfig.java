package com.dowinsys.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS 설정
 * Vue 프론트엔드(8082)에서 Spring Boot API(8080)로의 요청 허용
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:8083",
                    "http://localhost:8082",
                    "http://localhost:8081",
                    "http://localhost:8080",
                    "http://172.30.1.54:8083",
                    "http://172.30.1.54:8082",
                    "http://172.30.1.54:8081",
                    "http://172.30.1.54:8080"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
