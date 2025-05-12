package org.ges.gesbackend.repository;

import org.hibernate.graph.GraphNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NodeRepository  extends JpaRepository<GraphNode, UUID> {
}
