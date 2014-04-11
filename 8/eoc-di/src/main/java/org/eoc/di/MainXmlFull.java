package org.eoc.di;

import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainXmlFull {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("/full-application-context.xml");

		ImportantService service = context.getBean(ImportantService.class);

		Person person = service.perform("Real", 20);

		System.out.println(person);
	}
}
