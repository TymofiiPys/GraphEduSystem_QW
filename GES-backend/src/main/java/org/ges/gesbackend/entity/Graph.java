package org.ges.gesbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "graphs")
public class Graph {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "description", length = 256)
    private String description;

    @ColumnDefault("'GRAPH'")
    @Column(name = "type", nullable = false, length = 10)
    private String type;

    @OneToMany(mappedBy = "graph")
    private Set<Node> nodes = new LinkedHashSet<>();

}