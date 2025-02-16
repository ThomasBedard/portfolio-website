package com.bedard.portfolioapi.projects.presentationlayer;

import lombok.*;

import java.util.List;

@Value
@Builder
@AllArgsConstructor
public class ProjectRequestModel {
    String title;
    String description;
    String imageUrl;
    String projectUrl;
    List<String> techStack;
}
