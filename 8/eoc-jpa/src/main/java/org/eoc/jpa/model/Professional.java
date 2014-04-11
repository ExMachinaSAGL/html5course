package org.eoc.jpa.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name="PERSON_PROFESSIONAL")
@DiscriminatorValue("2")
public class Professional extends Person {

    private static final long serialVersionUID = 1;

    private String companyName = null;

    /**
     * Gets company name.
     */
    public String getCompanyName() {
        return companyName;
    }

    /**
     * Sets company name.
     */
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
}
