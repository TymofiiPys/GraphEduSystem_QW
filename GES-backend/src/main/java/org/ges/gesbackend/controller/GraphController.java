package org.ges.gesbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/graph")
public class GraphController {

    @GetMapping
    public Map<String, Object> getGraph() {
        Map<String, Object> graph = new HashMap<>();

        Map<String, List<Map<String, Object>>> elements = new HashMap<>();

        // Nodes
        List<Map<String, Object>> nodes = new ArrayList<>();
        nodes.add(Map.of("data", Map.of("id", "A", "label", "6"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "B", "label", "5"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "D", "label", "2"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "C", "label", "7"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "F", "label", "8"), "pannable", false, "grabbable", true));
        nodes.add(Map.of("data", Map.of("id", "E", "label", "5"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "A", "label", "554"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "A", "label", "5"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "B", "label", "2"), "pannable", false, "grabbable", true));
//        nodes.add(Map.of("data", Map.of("id", "C","label", "228"), "pannable", false, "grabbable", true));

        // Edges
        List<Map<String, Object>> edges = new ArrayList<>();
        edges.add(Map.of("data", Map.of("source", "A", "target", "C")));
        edges.add(Map.of("data", Map.of("source", "A", "target", "B")));
        edges.add(Map.of("data", Map.of("source", "B", "target", "D")));
        edges.add(Map.of("data", Map.of("source", "B", "target", "E")));
        edges.add(Map.of("data", Map.of("source", "C", "target", "F")));

        elements.put("nodes", nodes);
        elements.put("edges", edges);
        graph.put("elements", elements);

        return graph;
    }
}
