package com.bedard.portfolioapi.projects.businesslayer;

import com.bedard.portfolioapi.projects.datalayer.Project;
import com.bedard.portfolioapi.projects.datalayer.ProjectRepository;
import com.bedard.portfolioapi.projects.datamapperlayer.ProjectRequestMapper;
import com.bedard.portfolioapi.projects.datamapperlayer.ProjectResponseMapper;
import com.bedard.portfolioapi.projects.presentationlayer.ProjectRequestModel;
import com.bedard.portfolioapi.projects.presentationlayer.ProjectResponseModel;
import com.bedard.portfolioapi.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectRequestMapper projectRequestMapper;
    private final ProjectResponseMapper projectResponseMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository,
                              ProjectRequestMapper projectRequestMapper,
                              ProjectResponseMapper projectResponseMapper) {
        this.projectRepository = projectRepository;
        this.projectRequestMapper = projectRequestMapper;
        this.projectResponseMapper = projectResponseMapper;
    }

    @Override
    public List<ProjectResponseModel> getAllProject(String projectId) {
        if (projectId != null) {
            Project project = projectRepository.findProjectByProjectIdentifier_ProjectId(projectId);
            if (project == null) {
                throw new NotFoundException("Project not found with ID: " + projectId);
            }
            return List.of(projectResponseMapper.entityToResponseModel(project));
        }
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .map(projectResponseMapper::entityToResponseModel)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponseModel getProjectByProjectId(String projectId) {
        Project project = projectRepository.findProjectByProjectIdentifier_ProjectId(projectId);
        if (project == null) {
            throw new NotFoundException("Project not found with ID: " + projectId);
        }
        return projectResponseMapper.entityToResponseModel(project);
    }

    @Override
    public ProjectResponseModel addProject(ProjectRequestModel projectRequestModel) {
        Project project = projectRequestMapper.requestModelToEntity(projectRequestModel);
        Project savedProject = projectRepository.save(project);
        return projectResponseMapper.entityToResponseModel(savedProject);
    }

    @Override
    public ProjectResponseModel updateProjectState(String status, String projectId) {
        Project project = projectRepository.findProjectByProjectIdentifier_ProjectId(projectId);
        if (project == null) {
            throw new NotFoundException("Project not found with ID: " + projectId);
        }

        // Here, you may need to update a status field (currently, there's no such field in your schema)
        // Assuming there's a "status" field:
        // project.setStatus(status);

        Project updatedProject = projectRepository.save(project);
        return projectResponseMapper.entityToResponseModel(updatedProject);
    }

    @Override
    public void removeProject(String projectId) {
        Project project = projectRepository.findProjectByProjectIdentifier_ProjectId(projectId);
        if (project == null) {
            throw new NotFoundException("Project not found with ID: " + projectId);
        }
        projectRepository.delete(project);
    }
}

