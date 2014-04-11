package org.eoc.di.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.eoc.di.conf.ApplicationTest;
import org.eoc.di.model.Person;
import org.eoc.di.services.ImportantService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ApplicationTest.class)
public class ImportantServiceTest {

	@Autowired
	private ApplicationContext applicationContext;

	@Autowired
	private ImportantService importantService;

	@Test
	public void testAutowire() {
		assertNotNull(applicationContext);
		assertNotNull(importantService);
	}

	@Test
	public void testService() {
		Person person = importantService.perform("name", 1);

		assertEquals("This is only a test", person.getName());
		assertEquals(new Integer(150), person.getAge());
	}

}
