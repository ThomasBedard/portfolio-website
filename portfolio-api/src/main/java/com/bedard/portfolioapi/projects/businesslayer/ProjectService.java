package com.bedard.portfolioapi.projects.businesslayer;

import com.bedard.portfolioapi.projects.presentationlayer.ProjectRequestModel;
import com.bedard.portfolioapi.projects.presentationlayer.ProjectResponseModel;

import java.util.List;

public interface ProjectService {
    List<ProjectResponseModel> getAllProject(String projectId);
    ProjectResponseModel getProjectByProjectId(String projectId);
    ProjectResponseModel addProject(ProjectRequestModel projectRequestModel);
    ProjectResponseModel updateProjectState(String status, String projectId);
    void removeProject(String projectId);
}
