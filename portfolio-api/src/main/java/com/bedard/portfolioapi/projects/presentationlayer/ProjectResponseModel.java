package com.bedard.portfolioapi.projects.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
@AllArgsConstructor
public class ProjectResponseModel {
    String projectId;
    String title;
    String description;
    String imageUrl;
    String projectUrl;
    List<String> techStack;
    String createdAt;
}
