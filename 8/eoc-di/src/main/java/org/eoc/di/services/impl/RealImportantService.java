package org.eoc.di.services.impl;

import org.apache.log4j.Logger;
import org.eoc.di.dao.ImportantDao;
import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RealImportantService implements ImportantService {
	Logger logger = Logger.getLogger(RealImportantService.class);

	@Value("${name}")
	private String value;

	@Autowired
	private ImportantDao dao;

	public Person perform(String name, int age) {
		logger.info(value);
		System.out.println(value);
		return dao.save(new Person(name, age));
	}

	public void setDao(ImportantDao dao) {
		this.dao = dao;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
