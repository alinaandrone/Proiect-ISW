package com.example.CatalogNote.Repositories;

import com.example.CatalogNote.Entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    List<Grade> findByStudentUserId(Integer studentId);
}
