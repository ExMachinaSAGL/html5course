package org.eoc.di;

import org.eoc.di.config.DefaultApplicationConfig;
import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main1 {
	public static void main(String[] args) {
		ApplicationContext context = new AnnotationConfigApplicationContext(DefaultApplicationConfig.class);

		ImportantService service = context.getBean(ImportantService.class);

		Person person = service.perform("Test", 10);

		System.out.println(person);
	}
}
