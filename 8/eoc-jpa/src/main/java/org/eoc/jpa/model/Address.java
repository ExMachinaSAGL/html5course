/*
 * Copyright 2007-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.eoc.jpa.model;

import javax.persistence.Entity;

import org.springframework.data.jpa.domain.AbstractPersistable;


@Entity
public class Address extends AbstractPersistable<Integer> {

    private static final long serialVersionUID = 1;

    private String address = null;
    private String city = null;
    private String state = null;
    private String zipPostal = null;
    private String country = null;

    /**
     * Gets address.
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets address.
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Gets city.
     */
    public String getCity() {
        return city;
    }

    /**
     * Sets city.
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Gets state.
     */
    public String getState() {
        return state;
    }

    /**
     * Sets state.
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * Gets zip or postal code.
     */
    public String getZipPostal() {
        return zipPostal;
    }

    /**
     * Sets zip or postal code.
     */
    public void setZipPostal(String zipPostal) {
        this.zipPostal = zipPostal;
    }

    /**
     * Gets country.
     */
    public String getCountry() {
        return country;
    }

    /**
     * Sets country.
     */
    public void setCountry(String country) {
        this.country = country;
    }

		@Override
		public String toString() {
			StringBuilder builder = new StringBuilder();
			builder.append("Address [");
			if (address != null) {
				builder.append("address=").append(address).append(", ");
			}
			if (city != null) {
				builder.append("city=").append(city).append(", ");
			}
			if (state != null) {
				builder.append("state=").append(state).append(", ");
			}
			if (zipPostal != null) {
				builder.append("zipPostal=").append(zipPostal).append(", ");
			}
			if (country != null) {
				builder.append("country=").append(country);
			}
			builder.append("]");
			return builder.toString();
		}

    /**
     * Returns a string representation of the object.
     */

}
