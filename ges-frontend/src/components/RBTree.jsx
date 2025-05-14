import React, { useRef, useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import "./GraphVisualizer.css";
import PseudoCodeHighlighter from "./PseudoCodeHighlighter";
import axios from "axios";
import cytoscape from "cytoscape";

cytoscape.use(dagre);

const layoutOptions = { name: "dagre" };

const stepToLineMap = [0, 1, 2, 3, 4];

const pseudoCode = [
  "DFS(node):",
  "  mark node as visited",
  "  for each neighbor of node:",
  "    if neighbor not visited:",
  "      DFS(neighbor)",
];

export default function RBTree() {
  const cyRef = useRef(null);
  const [step, setStep] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const [elements, setElements] = useState([]);

  useEffect(() => {
    axios
      .get("/api/graph/old")
      .then((response) => {
        setElements(response.data.elements);
      })
      .catch((error) => {
        console.error("Помилка при завантаженні графа:", error);
      });
  }, []);

  useEffect(() => {
    console.log(elements);
    if (cyRef.current) {
      // const layoutOptions = { name: "dagre" };
      const layout = cyRef.current.layout(layoutOptions);
      cyRef.current.zoom({
        level: 1,
        position: { x: 0, y: 0 },
      });
      // cyRef.current
      //   .style()
      //   .selector(".highlighted")
      //   .style({
      //     "background-color": "red",
      //     "line-color": "red",
      //   })
      //   .selector("edge")
      //   .style({
      //     width: 4,
      //     'target-arrow-shape': 'triangle',
      //     "line-color": "#9dbaea",
      //     'target-arrow-color': '#9dbaea',
      //     "curve-style": "bezier",
      //   })
      //   .update();
      layout.run();
    }
  }, [elements]);

  const steps = [["A"], ["A", "B"], ["A", "B", "C"]];

  const highlightNodes = (nodeIds) => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.nodes().removeClass("highlighted");
    nodeIds.forEach((id) => {
      const node = cy.getElementById(id);
      node.addClass("highlighted");
    });
  };

  const nextStep = () => {
    const next = (step + 1) % steps.length;
    setStep(next);
    highlightNodes(steps[next]);
  };

  const toggleCode = () => {
    setShowCode((prev) => !prev);
  };

  const showGraph1 = () => {
    axios
      .get("/api/graph/d0294ab3-8be6-49a5-b636-9c83e1ffb97d")
      .then((res) => {
        const { nodes, edges } = res.data;
        const cyNodes = nodes.map((node) => {
          if (node.nodeId.startsWith("NaN")) {
            return {
              data: { id: node.nodeId, label: "leaf" },
              classes: ["leaf-n-inv"],
            };
          } else {
            return {
              data: { id: node.nodeId, label: node.metadata.key },
              pannable: true,
              scratch: {
                left: node.metadata.left,
                right: node.metadata.right,
                color: node.metadata.color
              },
              classes: node.metadata.color == "red" ? ["rb-red"] : ["rb-black"]
            };
          }
        });
        const cyEdges = edges.map((edge) => ({
          data: {
            id: edge.id,
            source: edge.srcId,
            target: edge.tgtId,
            label: edge.edgeName,
          },
          ...(edge.tgtId.startsWith("NaN") && { classes: ["leaf-n-inv"] }),
        }));

        setElements({ nodes: cyNodes, edges: cyEdges });
      })
      .catch((error) => {
        console.error("Помилка при завантаженні графа:", error);
      });
  };

  return (
    <div>
      <button onClick={nextStep}>Наступний крок</button>
      <button onClick={toggleCode} style={{ marginLeft: "10px" }}>
        {showCode ? "Сховати псевдокод" : "Показати псевдокод"}
      </button>
      <button onClick={showGraph1} style={{ marginLeft: "10px" }}>
        Граф 1
      </button>
      <div className="graph-container">
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements(elements)}
          // style={{ width: '100vw', height: '100vh', zindex:'999', }}
          className="cyc"
          layout={layoutOptions}
          cy={(cy) => {
            cyRef.current = cy;
            cy.zoom({
              level: 1,
              position: { x: 0, y: 0 },
            });
            cy.style()
              .selector(".highlighted")
              .style({
                "background-color": "red",
                "line-color": "red",
              })
              .selector("edge")
              .style({
                width: 4,
                "target-arrow-shape": "triangle",
                "line-color": "#9dbaea",
                "target-arrow-color": "#9dbaea",
                "curve-style": "bezier",
              })
              .selector(".leaf-n-inv")
              .style({
                display: "element",
                visibility: "hidden",
              })
              .selector(".rb-red")
              .style({
                "background-color": "red",
              })
              .selector(".rb-black")
              .style({
                "background-color": "black",
              })
              .update();
            // cy.center()
          }}
          // userPanningEnabled={false}
          // boxSelectionEnabled={false}
          // pan={{x:-100, y:-200}}
          // userZoomingEnabled={true}
        />
      </div>

      {showCode && (
        <PseudoCodeHighlighter
          codeLines={pseudoCode}
          currentLine={stepToLineMap[step]}
        />
      )}
    </div>
  );
}
