package org.eoc.jpa.dao;

import static org.eoc.jpa.dao.TestConstants.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.eoc.jpa.model.Address;
import org.eoc.jpa.model.Person;
import org.eoc.jpa.model.Professional;
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
public class ProfessionalDaoTest {

	
	final Logger logger = Logger.getLogger(ProfessionalDaoTest.class);

	@Autowired
	private PersonDao personDao;

	@Autowired
	private ProfessionalDao professionalDao;

	@Test
	public void testFindByAddress() {
		String firstName = "Tim";
		String lastName = "Alexander";
		String companyName = "Primus";

		int size = 35;

		for (int i = 1; i < size; i++) {
			professional(firstName, lastName, companyName, ADDR);
		}

		List<Person> persons = personDao.findByAddress(ADDR);

		int expectedCount = size;

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + expectedCount + ".", expectedCount, persons.size());

	}

	@Test
	public void testSave() {
		String firstName = "Les";
		String lastName = "Claypool";
		String companyName = "Primus";

		Person person = professional(firstName, lastName, companyName, ADDR);

		// get PK of first address
		Integer addressId = person.getAddresses().iterator().next().getId();

		// test saved person
		testPerson(person, firstName, lastName, EXPECTED_ADDRESS_COUNT, addressId, ADDR, CITY, STATE, ZIP_POSTAL, true, companyName);

		person = professionalDao.findOne(person.getId());

		// test retrieved person just saved
		testPerson(person, firstName, lastName, EXPECTED_ADDRESS_COUNT, addressId, ADDR, CITY, STATE, ZIP_POSTAL, true, companyName);

		Collection<Person> persons = personDao.findAll();

		int expectedCount = EXPECTED_COUNT + 1;

		assertNotNull("Person list is null.", persons);
		assertEquals("Number of persons should be " + expectedCount + ".", expectedCount, persons.size());
	}

	private Person professional(String firstName, String lastName, String companyName, String addr) {
		Professional person = new Professional();
		Set<Address> addresses = new HashSet<Address>();
		Address address = new Address();
		addresses.add(address);

		address.setAddress(addr);
		address.setCity(CITY);
		address.setState(STATE);
		address.setZipPostal(ZIP_POSTAL);
		address.setCountry(COUNTRY);

		person.setFirstName(firstName);
		person.setLastName(lastName);
		person.setCompanyName(companyName);
		person.setAddresses(addresses);

		Person result = personDao.saveAndFlush(person);

		return result;
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
