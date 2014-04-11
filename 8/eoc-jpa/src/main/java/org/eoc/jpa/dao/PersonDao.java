package org.eoc.jpa.dao;

import java.util.List;

import org.eoc.jpa.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PersonDao extends JpaRepository<Person, Integer> {

	 final static String FindByAddress = "SELECT p FROM Person p LEFT JOIN p.addresses a WHERE a.address = :address";

	final static String FindByName = "select p from Person p where p.firstName = :firstName AND p.lastName = :lastName";
	/**
	 * Find person like first name.
	 */
	 List<Person> findByFirstNameLike(String firstName);

	/**
	 * Find person by last name.
	 */
	 List<Person> findByLastName(String lastName);

	/**
	 * Find person by address.
	 */
	@Query(FindByAddress)
	 List<Person> findByAddress(@Param("address") String address);

	/**
	 * Find person by first and last name.
	 */
	@Query(FindByName)
	 List<Person> findByName(@Param("firstName") String firstName, @Param("lastName") String lastName);

}
