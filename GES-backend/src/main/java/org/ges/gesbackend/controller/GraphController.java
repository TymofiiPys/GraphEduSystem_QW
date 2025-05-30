package org.ges.gesbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ges.gesbackend.entity.Graph;
import org.ges.gesbackend.service.GraphService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/graph")
@RequiredArgsConstructor
public class GraphController {

    private final GraphService graphService;

    @GetMapping("/old")
    public Map<String, List<Map<String, Object>>>  getGraphOld() {
        Map<String, Object> graph = new HashMap<>();

        Map<String, List<Map<String, Object>>> elements = new HashMap<>();

        // Nodes
        List<Map<String, Object>> nodes = new ArrayList<>();
        nodes.add(Map.of("data", Map.of("id", "B", "label", "4"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "D", "label", "2"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "A", "label", "6"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "C", "label", "7"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "bob", "label", "nan"), "selectable", false, "style", Map.of("display", "element", "visibility", "hidden")));
        nodes.add(Map.of("data", Map.of("id", "F", "label", "8"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "E", "label", "5"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "і", "label", "notconnected"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "55f", "label", "anothernotconnected"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "A", "label", "554"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "A", "label", "5"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "B", "label", "2"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "C","label", "228"), "pannable", false, "grabbable", true));

        // Edges
        List<Map<String, Object>> edges = new ArrayList<>();
        edges.add(Map.of("data", Map.of("source", "A", "target", "B")));
        edges.add(Map.of("data", Map.of("source", "A", "target", "C")));
        edges.add(Map.of("data", Map.of("source", "B", "target", "D")));
        edges.add(Map.of("data", Map.of("source", "B", "target", "E")));
        edges.add(Map.of("data", Map.of("source", "C", "target", "bob"), "style", Map.of("display", "element", "visibility", "hidden")));
        edges.add(Map.of("data", Map.of("source", "C", "target", "F")));
//        edges.add(Map.of("data", Map.of("source", "C", "target", "F")));
//        edges.add(Map.of("data", Map.of("source", "F", "target", "F"), "pannable", false,"grabbable", true));

        elements.put("nodes", nodes);
        elements.put("edges", edges);
        graph.put("elements", elements);

        return elements;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Graph> getGraph(@PathVariable UUID id) {
        return graphService.getGraph(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
