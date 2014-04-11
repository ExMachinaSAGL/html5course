package org.eoc.di.auto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.log4j.Logger;
import org.eoc.di.auto.beans.Bean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ConstructorTest {

	final Logger logger = Logger.getLogger(ConstructorTest.class);

	@Autowired
	private Bean bean = null;

	@Test
	public void testName() {
		assertNotNull("Constructor message instance is null.", bean);

		String name = bean.getName();

		assertNotNull("Name is null.", name);

		String expected = "Bean populated by contructor";

		assertEquals("Message should be '" + expected + "'.", expected, name);

		logger.info("message='" + name + "'");
	}

}
