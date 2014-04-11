package org.eoc.jpa.dao;

import org.eoc.jpa.model.Professional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfessionalDao extends JpaRepository<Professional, Integer> {
    
}
