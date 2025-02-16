package com.bedard.portfolioapi.projects.datamapperlayer;

import com.bedard.portfolioapi.projects.datalayer.Project;
import com.bedard.portfolioapi.projects.datalayer.ProjectIdentifier;
import com.bedard.portfolioapi.projects.presentationlayer.ProjectRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectRequestMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projectIdentifier", expression = "java(createProjectIdentifier())")
    Project requestModelToEntity(ProjectRequestModel projectRequestModel);

    default ProjectIdentifier createProjectIdentifier() {
        return new ProjectIdentifier();
    }
}
