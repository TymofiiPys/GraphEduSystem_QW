package org.ges.gesbackend.repository;

import org.ges.gesbackend.entity.Graph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GraphRepository extends JpaRepository<Graph, UUID> {
}
