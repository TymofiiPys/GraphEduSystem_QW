package org.ges.gesbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

import java.util.UUID;

/**
 * Mapping for DB view
 */
@Getter
@Setter
@Entity
@Immutable
@Table(name = "edges_id")
public class EdgesId {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "graph_id")
    private UUID graphId;

    @Column(name = "source", length = 32)
    private String source;

    @Column(name = "target", length = 32)
    private String target;

    @Column(name = "edge_id", length = Integer.MAX_VALUE)
    private String edgeId;

}