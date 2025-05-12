package org.ges.gesbackend.repository;

import org.ges.gesbackend.entity.Node;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NodeRepository extends JpaRepository<Node, UUID> {
}
