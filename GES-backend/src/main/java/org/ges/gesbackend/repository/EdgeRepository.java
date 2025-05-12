package org.ges.gesbackend.repository;

import org.ges.gesbackend.entity.EdgesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EdgeRepository extends JpaRepository<EdgesId, UUID> {
}
