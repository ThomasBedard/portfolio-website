package com.bedard.portfolioapi.projects.datalayer;


import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Embeddable
@Getter
@Setter
public class ProjectIdentifier {
    private String projectId;
    public ProjectIdentifier() {
        this.projectId = UUID.randomUUID().toString();
    }
}
