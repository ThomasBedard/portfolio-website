package com.bedard.portfolioapi.projects.datalayer;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Embedded
    private ProjectIdentifier projectIdentifier;
    private String title;
    private String description;
    private String imageUrl;
    private String projectUrl;

    @ElementCollection
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tech_stack")
    private List<String> techStack;

    public Project(){
        this.projectIdentifier = new ProjectIdentifier();
    }

    public Project(String title, String description, String imageUrl, String projectUrl, List<String> techStack) {

        this.projectIdentifier = new ProjectIdentifier();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.projectUrl = projectUrl;
        this.techStack = techStack;
    }
}
