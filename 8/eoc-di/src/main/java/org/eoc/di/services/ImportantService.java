package org.eoc.di.services;

import org.eoc.di.model.Person;

public interface ImportantService {
	Person perform(String name, int age);
}
