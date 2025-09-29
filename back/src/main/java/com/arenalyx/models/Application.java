package com.arenalyx.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @SequenceGenerator(
            name = "application_sequence",
            sequenceName = "application_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "application_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Relation avec l'entité User

    private String name;
    private String jobTitle;
    private String company;
    private String location;
    private LocalDate applicationDate;
    private LocalDate applicationDeadline;
    //@Lob
    //@Column(columnDefinition = "BYTEA")
    private String cv;
    private String customCoverLetter;
    private String status;
}
