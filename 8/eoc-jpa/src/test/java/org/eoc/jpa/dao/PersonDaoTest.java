package org.eoc.jpa.dao;

import static org.eoc.jpa.dao.TestConstants.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.Collection;
import java.util.List;

import org.apache.log4j.Logger;
import org.eoc.jpa.model.Address;
import org.eoc.jpa.model.Person;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "classpath:/person-test-context.xml" })
@TransactionConfiguration
@Transactional
@ActiveProfiles("hsql")
// @ActiveProfiles("oracle")
public class PersonDaoTest {

	final Logger logger = Logger.getLogger(PersonDaoTest.class);

	@Autowired
	private PersonDao personDao;

	@Autowired
	private ProfessionalDao professionalDao;

	@Test
	public void testFindOne() {
		Person person = personDao.findOne(FIRST_ID);

		testPersonOne(person);
	}

	@Test
	public void testFindAll() {
		Collection<Person> persons = personDao.findAll();

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + EXPECTED_COUNT + ".", EXPECTED_COUNT, persons.size());

		for (Person person : persons) {
			logger.debug(person.toString());

			if (FIRST_ID.equals(person.getId())) {
				testPersonOne(person);
			} else if (SECOND_ID.equals(person.getId())) {
				testPersonTwo(person);
			}
		}
	}

	@Test
	public void testFindByFirstNameLike() {
		List<Person> persons = personDao.findByFirstNameLike("J%");

		int expectedCount = 2;

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + expectedCount + ".", expectedCount, persons.size());

		Person person = persons.get(0);

		testPersonOne(person);
	}

	@Test
	public void testFindByLastName() {
		List<Person> persons = personDao.findByLastName(LAST_NAME);

		int expectedCount = 1;

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + expectedCount + ".", expectedCount, persons.size());

		Person person = persons.get(0);

		testPersonOne(person);
	}

	@Test
	public void testFindByAddress() {
		List<Person> persons = personDao.findByAddress(ADDR);

		int expectedCount = 1;

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + expectedCount + ".", expectedCount, persons.size());

		Person person = persons.get(0);

		testPersonOne(person);
	}

	@Test
	public void testFindByName() {
		List<Person> persons = personDao.findByName(FIRST_NAME, LAST_NAME);

		int expectedCount = 1;

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + expectedCount + ".", expectedCount, persons.size());

		Person person = persons.get(0);

		testPersonOne(person);
	}

	@Test
	public void testUpdate() {
		Person person = personDao.findOne(FIRST_ID);
		testPersonOne(person);

		String lastName = "Jones";
		person.setLastName(lastName);

		personDao.saveAndFlush(person);

		person = personDao.findOne(FIRST_ID);
		testPersonOne(person, lastName);
	}

	@Test
	public void testDelete() {
		personDao.delete(FIRST_ID);

		// person should be null after delete
		Person person = personDao.findOne(FIRST_ID);
		assertNull("Person is not null.", person);
	}

	/**
	 * Tests person with a PK of one.
	 */
	private void testPersonOne(Person person) {
		testPersonOne(person, LAST_NAME);
	}

	/**
	 * Tests person with a PK of one.
	 */
	private void testPersonOne(Person person, String lastName) {
		String schoolName = "NYU";

		Integer addressId = new Integer(1);

		testPerson(person, FIRST_NAME, lastName, EXPECTED_ADDRESS_COUNT, addressId, ADDR, CITY, STATE, ZIP_POSTAL, false, schoolName);
	}

	/**
	 * Tests person with a PK of two.
	 */
	private void testPersonTwo(Person person) {
		String firstName = "John";
		String lastName = "Wilson";
		String companyName = "Spring Pizza";

		int expectedAddresses = 2;

		Integer addressId = new Integer(3);
		String addr = "47 Howard St.";
		String city = "San Francisco";
		String state = "CA";
		String zipPostal = "94103";

		testPerson(person, firstName, lastName, expectedAddresses, addressId, addr, city, state, zipPostal, true, companyName);
	}

	/**
	 * Tests person.
	 */
	private void testPerson(Person person, String firstName, String lastName, int expectedAddresses, Integer addressId, String addr, String city, String state, String zipPostal,
			boolean professional, String professionName) {
		assertNotNull("Person is null.", person);

		assertEquals("firstName", firstName, person.getFirstName());
		assertEquals("lastName", lastName, person.getLastName());

		assertNotNull("Person's address list is null.", person.getAddresses());
		assertEquals("addresses", expectedAddresses, person.getAddresses().size());

		for (Address address : person.getAddresses()) {
			assertNotNull("Address is null.", address);

			if (addressId.equals(address.getId())) {
				assertEquals("address.id", addressId, address.getId());
				assertEquals("address.addr", addr, address.getAddress());

				assertEquals("address.city", city, address.getCity());
				assertEquals("address.state", state, address.getState());
				assertEquals("address.zipPostal" + zipPostal + "'.", zipPostal, address.getZipPostal());
				assertEquals("address.country", COUNTRY, address.getCountry());

			}
		}

	}

}
