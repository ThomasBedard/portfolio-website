package com.bedard.portfolioapi.projects.datalayer;

import jakarta.persistence.Embeddable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Embeddable
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findProjectByProjectIdentifier_ProjectId(String projectId);

}
