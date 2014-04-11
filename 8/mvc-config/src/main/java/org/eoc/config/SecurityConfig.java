package org.eoc.config;

import org.eoc.account.UserService;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.*;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

@Configuration
@ImportResource(value = "classpath:spring-security-context.xml")
class SecurityConfig {
	
	@Bean
	public UserService userService() {
		return new UserService();
	}

	@Bean
	public TokenBasedRememberMeServices rememberMeServices() {
		return new TokenBasedRememberMeServices("remember-me-key", userService());
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new StandardPasswordEncoder();
	}
}