package org.eoc.di;

import org.eoc.di.config.ApplicationConfig;
import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
	public static void main(String[] args) {
		ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		
		ImportantService service = context.getBean(ImportantService.class);

		Person person = service.perform("Real", 20);
		
		System.out.println(person);
	}
}
