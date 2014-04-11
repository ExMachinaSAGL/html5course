package org.eoc.di.dao.impl;

import org.eoc.di.dao.ImportantDao;
import org.eoc.di.model.Person;
import org.springframework.stereotype.Repository;

@Repository
public class RealImportantDao implements ImportantDao {
	
	public Person save(Person p) {
		System.out.println("Very important");
		return p;
	}

}
