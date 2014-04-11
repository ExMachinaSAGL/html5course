package org.eoc.di.conf;

import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationTest {

	@Bean
	ImportantService mockImportantService() {
		return new ImportantService() {

			public Person perform(String name, int age) {
				return new Person("This is only a test", 150);
			}
		};
	}

}
