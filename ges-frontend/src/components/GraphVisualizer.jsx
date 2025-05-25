import React, { useRef, useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import "./GraphVisualizer.css";
import PseudoCodeHighlighter from "./PseudoCodeHighlighter";
import axios from "axios";

const layoutOptions = { name: "cose" };

const stepToLineMap = [-1, [5,6,7,8,9], 11, 12, 18];

const pseudoCode = [
  "BFS(s)",
  "for each vertex u in G.V - {s}",
  "  u.color = WHITE",
  "  u.d = inf",
  "  u.pre = NIL",
  "s.color = GRAY",
  "s.d = 0",
  "s.pre = NIL",
  "Q = []",
  "ENQUEUE(Q, s)",
  "while Q != []",
  "  u = DEQUEUE(Q)",
  "  for each v in G.Adj[u]",
  "    if v.color == WHITE",
  "      v.color = GRAY",
  "      v.d = u.d + 1",
  "      v.pre = u",
  "      ENQUEUE(Q, v)",
  "  u.color = BLACK",
];

export default function GraphVisualizer() {
  const cyRef = useRef(null);
  const [step, setStep] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const [elements, setElements] = useState([]);

  useEffect(() => {
    // axios
    //   .get("/api/graph/old")
    //   .then((response) => {
    //     setElements(response.data.elements);
    //   })
    //   .catch((error) => {
    //     console.error("Помилка при завантаженні графа:", error);
    //   });
  }, []);

  useEffect(() => {
    if (cyRef.current) {
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
      //     // 'target-arrow-shape': 'triangle',
      //     "line-color": "#9dbaea",
      //     // 'target-arrow-color': '#9dbaea',
      //     "curve-style": "bezier",
      //   })
      //   .update();
      layout.run();
    }
  }, [elements]);

  const steps = [[], ["1G"], ["1G", "2G", "5G"], ["1B", "2G", "5G"],
["1B", "2G", "3G", "4G", "5G"],
["1B", "2B", "3G", "4G", "5G"],
["1B", "2B", "3G", "4G", "5B"],
["1B", "2B", "3B", "4G", "5B"],
["1B", "2B", "3B", "4B", "5B"],
// ["1B", "2G", "3G", "4G", "5G"],
];

  const highlightNodes = (nodeIds) => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.nodes().removeClass("highlighted-G");
    cy.nodes().removeClass("highlighted-B");
    nodeIds.forEach((id) => {
      const node = cy.getElementById(id[0]);
      console.log(id[0]);
      node.addClass("highlighted-" + id[1]);
      console.log(id[1]);

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
      .get("/api/graph/0e7ef67a-fbc3-43c3-bf9c-b3f6bffb9fe2")
      .then((res) => {
        const { nodes, edges } = res.data;
        const cyNodes = nodes.map((node) => ({
          data: { id: node.nodeId, label: node.nodeId },
          pannable: false,
          grabbable: true,
        }));
        const cyEdges = edges.map((edge) => ({
          data: {
            id: edge.id,
            source: edge.srcId,
            target: edge.tgtId,
            label: edge.edgeName,
          },
        }));

        setElements([...cyNodes, ...cyEdges]);
      })
      .catch((error) => {
        console.error("Помилка при завантаженні графа:", error);
      });
  };

  return (
    <div>
      <input placeholder="Номер вершини"></input>
      <button onClick={nextStep}>Пошук у ширину</button>
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
            // cy.zoom({
            //   level: 1,
            //   position: { x: 0, y: 0 },
            // });
            cy.style()
                          .selector("node")
              .style({
                "background-color": "white",
                "line-color": "red",
                "border-width": "1px"
              })
              .selector(".highlighted-G")
              .style({
                "background-color": "grey",
                "line-color": "red",
              })
              .selector(".highlighted-B")
              .style({
                "background-color": "black",
                "line-color": "red",
              })
              .selector("edge")
              .style({
                width: 4,
                "line-color": "#9dbaea",
                "curve-style": "bezier",
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
