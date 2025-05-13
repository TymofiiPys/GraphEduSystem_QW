package org.ges.gesbackend.repository;

import org.ges.gesbackend.entity.EdgesInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EdgeRepository extends JpaRepository<EdgesInfo, UUID> {
}
