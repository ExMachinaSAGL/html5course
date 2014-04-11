package org.eoc.di.services.def;

import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.springframework.stereotype.Service;

@Service
public class DefaultImportantService implements ImportantService {

	public Person perform(String name, int age) {
		return null;
	}

}
