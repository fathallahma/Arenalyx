package com.arenalyx.controllers;

import com.arenalyx.credentials.UserCredentials;
import com.arenalyx.models.Application;
import com.arenalyx.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * A class to set the control to the Application recovered from the database
 */
@RestController
@RequestMapping(path = "api/v1/application")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/home")
    public ResponseEntity<Map<String, List<Application>>> getApplications(@RequestBody UserCredentials userCredentials) {
        Map<String, List<Application>> allApplicationsUser = applicationService.getApplications(userCredentials.getId());
        // Long, Long, String, String, String, String, LocalDate, LocalDate, String, String, String
        return ResponseEntity.ok(allApplicationsUser);
    }

    /*
    @GetMapping("/home/cv")
    public ResponseEntity<byte[]> getCv(@RequestParam Long id) {
        try {
            Application application = applicationService.getApplicationById(id);
            if (application != null && application.getCv() != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDisposition(ContentDisposition.builder("attachment")
                        .filename("cv_" + id + ".pdf")
                        .build());

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(application.getCv());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération du CV: " + id);
            System.err.println("Erreur lors de la récupération du CV: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }*/

}
