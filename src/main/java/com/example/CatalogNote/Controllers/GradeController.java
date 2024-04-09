package com.example.CatalogNote.Controllers;

import com.example.CatalogNote.Entities.Grade;
import com.example.CatalogNote.Services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @PostMapping
    public Grade addGrade(@RequestBody Grade grade) {
        return gradeService.addGrade(grade);
    }


}
