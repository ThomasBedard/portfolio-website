package com.bedard.portfolioapi.projects.presentationlayer;

import com.bedard.portfolioapi.projects.businesslayer.ProjectService;
import com.bedard.portfolioapi.utils.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/projects")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://bedardthomas.com"
})
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectResponseModel> getAllProjects(@RequestParam(required = false) String projectId) {
        return projectService.getAllProject(projectId);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseModel> getProjectById(@PathVariable String projectId) {
        try {
            return ResponseEntity.ok(projectService.getProjectByProjectId(projectId));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProjectResponseModel> addProject(@RequestBody ProjectRequestModel projectRequestModel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(projectRequestModel));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProjectById(@PathVariable String projectId) {
        projectService.removeProject(projectId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectResponseModel> updateProjectState(@PathVariable String projectId,
                                                                   @RequestBody String status) {
        try {
            return ResponseEntity.ok(projectService.updateProjectState(status, projectId));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

