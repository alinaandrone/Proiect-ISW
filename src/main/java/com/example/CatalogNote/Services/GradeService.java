package com.example.CatalogNote.Services;


import com.example.CatalogNote.Entities.Grade;
import com.example.CatalogNote.Repositories.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    public Grade addGrade(Grade grade) {
        return gradeRepository.save(grade);
    }


}
