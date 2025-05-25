import React, { useRef, useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import "./GraphVisualizer.css";
import PseudoCodeHighlighter from "./PseudoCodeHighlighter";
import axios from "axios";
import cytoscape from "cytoscape";

// const elements = [
//     { data: { id: 'A' } },
//     { data: { id: 'B' } },
//     { data: { id: 'C' } },
//     { data: { source: 'A', target: 'B' } },
//     { data: { source: 'A', target: 'C' } },
// ];

cytoscape.use(dagre);

// const elements = {
//   nodes: [
//     { data: { id: "A", label: "1" }, pannable: false, grabbable: true },
//     { data: { id: "B", label: "2" }, pannable: false, grabbable: true },
//     { data: { id: "C", label: "3" }, pannable: false, grabbable: true },
//   ],
//   edges: [
//     { data: { source: "A", target: "B" } },
//     { data: { source: "A", target: "C" } },
//   ],
// };

const layoutOptions = { name: "dagre" };
// const layoutOptions = { name: "cose" };

const stepToLineMap = [-1, 2, 3, 4, 5, 0, 1];

const params = ["", "k = 5, x.key = 6", "x.left = 4, k = 5", "x.key = 4, k = 5", "x.right = 5, k = 5", "k = 5, x.key = 5", "x = 5"]

const pseudoCode = [
  "if x == NIL or k == x.key",
  "  return x",
  "if k < x.key",
  "  return tree-search(x.left, k)",
  "else",
  "  return tree-search(x.right, k)",
];

export default function BST() {
  const cyRef = useRef(null);
  const [step, setStep] = useState(0);
  // const [params, setParams] = useState("");
  const [showCode, setShowCode] = useState(false);

  const [elements, setElements] = useState([]);

  // useEffect(() => {setElements({
  //     nodes: [
  //         { data: { id: 'A', label: '1' }, pannable: false, grabbable: true },
  //         { data: { id: 'B', label: '2' }, pannable: false, grabbable: true },
  //         { data: { id: 'C', label: '3' }, pannable: false, grabbable: true }
  //     ],
  //     edges: [
  //         { data: { source: 'A', target: 'B' } },
  //         { data: { source: 'A', target: 'C' } },
  //     ]
  // })}, []);
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

  const steps = [[], ["A"], ["A", "B"], ["B"], ["B", "E"], ["E"], ["E"]];

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
      .get("/api/graph/old")
      .then((res) => {
        // setElements(response.data.elements);
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
              // grabbable: true,
              scratch: {
                left: node.metadata.left,
                right: node.metadata.right,
              },
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
      <input></input>
      <button onClick={nextStep}>Пошук</button>
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
              .selector(".highlighted")
              .style({
                "background-color": "green",
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
                "background-color": "red",
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
          params={params[step]}
        />
      )}
    </div>
  );
}
