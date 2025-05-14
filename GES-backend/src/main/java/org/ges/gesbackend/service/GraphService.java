package org.ges.gesbackend.service;

import lombok.RequiredArgsConstructor;
import org.ges.gesbackend.entity.EdgesInfo;
import org.ges.gesbackend.entity.Graph;
import org.ges.gesbackend.entity.Node;
import org.ges.gesbackend.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GraphService {
    private final GraphRepository graphRepository;

    public Optional<Graph> getGraph(UUID id) {
        Optional<Graph> graphOptional = graphRepository.findById(id);
        if (graphOptional.isPresent()) {
            Graph graph = graphOptional.get();
            switch (graph.getType()) {
                case "BST":
                case "RBTREE": {
                    Set<Node> nodes = graph.getNodes();
                    int nanCounter = 0;
                    for (var node : nodes.stream().filter(x -> {
                        Map<String, Object> metadata = x.getMetadata();
                        return ((String) metadata.get("left")).equals("NaN") ||
                                ((String) metadata.get("right")).equals("NaN");
                    }).toList()) {
                        Map<String, Object> metadata = node.getMetadata();
                        String leftChild = (String) metadata.get("left");
                        if (leftChild.equals("NaN")) {
                            String newName = "NaN" + nanCounter++;
                            metadata.put("left", newName);
                            Node left = new Node();
                            left.setGraph(graph);
                            left.setNodeId(newName);
                            if (graph.getType().equals("RBTREE")) {
                                left.setMetadata(Map.of("color", "black"));
                            }
                            nodes.add(left);
                        }

                        String rightChild = (String) metadata.get("right");
                        if (rightChild.equals("NaN")) {
                            String newName = "NaN" + nanCounter++;
                            metadata.put("right", newName);
                            Node right = new Node();
                            right.setGraph(graph);
                            right.setNodeId(newName);
                            if (graph.getType().equals("RBTREE")) {
                                right.setMetadata(Map.of("color", "black"));
                            }
                            nodes.add(right);
                        }

                        node.setMetadata(metadata);
                    }
                    Set<EdgesInfo> edges = new LinkedHashSet<>();
                    for (var node : graph.getNodes().stream().filter(x -> !x.getNodeId().startsWith("NaN")).toList()) {
                        Map<String, Object> metadata = node.getMetadata();

                        EdgesInfo edgeLeft = new EdgesInfo();
                        edgeLeft.setGraphId(graph);
                        edgeLeft.setSrcId(node.getNodeId());
                        edgeLeft.setTgtId((String) metadata.get("left"));
                        edgeLeft.setEdgeName("");

                        EdgesInfo edgeRight = new EdgesInfo();
                        edgeRight.setGraphId(graph);
                        edgeRight.setSrcId(node.getNodeId());
                        edgeRight.setTgtId((String) metadata.get("right"));
                        edgeRight.setEdgeName("");

                        edges.add(edgeLeft);
                        edges.add(edgeRight);
                    }
                    graph.setEdges(edges);
                    break;
                }
                case "BTREE": {
                    Set<EdgesInfo> edges = new LinkedHashSet<>();
                    for (var node : graph.getNodes().stream().filter(x -> !x.getNodeId().startsWith("NaN")).toList()) {
                        Map<String, Object> metadata = node.getMetadata();

                        List<String> children = (List<String>) metadata.get("children");
                        for (var child : children) {
                            EdgesInfo edge = new EdgesInfo();
                            edge.setGraphId(graph);
                            edge.setSrcId(node.getNodeId());
                            edge.setTgtId(child);
                            edge.setEdgeName("");
                            edges.add(edge);
                        }
                    }
                    graph.setEdges(edges);
                    break;
                }
                case "DIRGRAPH":
                case "WGRAPH":
                case "WDGRAPH":
                    break;
                default:
                    graph.setType("GRAPH");
                    break;
            }
        }
        return graphOptional;
    }
}
