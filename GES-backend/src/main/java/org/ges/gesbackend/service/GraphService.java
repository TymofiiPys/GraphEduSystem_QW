package org.ges.gesbackend.service;

import lombok.RequiredArgsConstructor;
import org.ges.gesbackend.entity.Graph;
import org.ges.gesbackend.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GraphService {
    private final GraphRepository graphRepository;

    public Optional<Graph> getGraph(UUID id) {
        return graphRepository.findById(id);
    }
}
