package com.example.CatalogNote.Repositories;

import com.example.CatalogNote.Entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
}
