package com.arenalyx.services;

import com.arenalyx.models.Application;
import com.arenalyx.repositories.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }


    /**
     * get all the applications form the database
     * @return all the applications form the database created by userId
     */
    public Map<String, List<Application>> getApplications(Long userId) {

        Map<String, List<Application>> response = new HashMap<>();
        response.put("applications", applicationRepository.findByUserId(userId));
        return response;
    }

    /*
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }*/

}
