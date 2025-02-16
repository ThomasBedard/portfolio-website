package com.bedard.portfolioapi.projects.datamapperlayer;

import com.bedard.portfolioapi.projects.datalayer.Project;
import com.bedard.portfolioapi.projects.presentationlayer.ProjectResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectResponseMapper {
    @Mapping(target = "projectId", expression = "java(project.getProjectIdentifier().getProjectId())")
    ProjectResponseModel entityToResponseModel(Project project);

    List<ProjectResponseModel> entityListToResponseModelList(List<Project> projects);
}
