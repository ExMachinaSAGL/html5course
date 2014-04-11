package org.eoc.jpa.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.springframework.data.jpa.domain.AbstractPersistable;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "TYPE", discriminatorType = DiscriminatorType.INTEGER)
public class Person extends AbstractPersistable<Integer> {

	private static final long serialVersionUID = 1;

	private String firstName = null;
	private String lastName = null;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "PERSON_ID", nullable = false)
	private Set<Address> addresses = null;

	/**
	 * Gets first name.
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * Sets first name.
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * Gets last name.
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * Sets last name.
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * Gets list of <code>Address</code>es.
	 */
	public Set<Address> getAddresses() {
		return addresses;
	}

	/**
	 * Sets list of <code>Address</code>es.
	 */
	public void setAddresses(Set<Address> addresses) {
		this.addresses = addresses;
	}

	/**
	 * Find an address by it's primary key.
	 */
	public Address findAddressById(Integer id) {
		Address result = null;

		if (addresses != null) {
			for (Address address : addresses) {
				if (address.getId().equals(id)) {
					result = address;

					break;
				}
			}
		}

		return result;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Person [");
		if (firstName != null) {
			builder.append("firstName=").append(firstName).append(", ");
		}
		if (lastName != null) {
			builder.append("lastName=").append(lastName).append(", ");
		}
		if (addresses != null) {
			builder.append("addresses=").append(addresses);
		}
		builder.append("]");
		return builder.toString();
	}


}
