package org.eoc.di.dao.def;

import org.eoc.di.dao.ImportantDao;
import org.eoc.di.model.Person;
import org.springframework.stereotype.Repository;

@Repository
public class DefaultImportantDao implements ImportantDao {

	public Person save(Person p) {
		return p;
	}

}
