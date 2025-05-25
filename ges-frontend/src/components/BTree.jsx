import React, { useRef, useState, useEffect, Children } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import "./GraphVisualizer.css";
import PseudoCodeHighlighter from "./PseudoCodeHighlighter";
import axios from "axios";
import cytoscape from "cytoscape";

cytoscape.use(dagre);

const layoutOptions = {
  name: "dagre",
  rankDir: "TB", // top-to-bottom
  nodeSep: 50,
  edgeSep: 10,
  rankSep: 100,
};

const stepToLineMap = [0, 1, 2, 3, 4];

const pseudoCode = [
  "DFS(node):",
  "  mark node as visited",
  "  for each neighbor of node:",
  "    if neighbor not visited:",
  "      DFS(neighbor)",
];

export default function BTree() {
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

  const text_width = (text, font = "14px Arial") => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };

  const showGraph1 = () => {
    axios
      .get("/api/graph/58f2beb6-0f55-4f05-82f0-e4f76c8dbd7b")
      .then((res) => {
        const { nodes, edges } = res.data;
        console.log(res.data);

        // const cyNodes = nodes.flatMap((node) => {
        //   const nodeContainer = {
        //     data: { id: node.nodeId, label: "", },
        //     pannable: false,
        //     grabbable: true,
        //     scratch: {
        //       children: node.metadata.children,
        //       keys: node.metadata.keys,
        //     },
        //   };

        //   const keyNodes = node.metadata.keys.map((key, index) => ({
        //     data: {
        //       label: key,
        //       parent: node.nodeId,
        //       id: `child${node.nodeId}_${index}`,
        //     },
        //     pannable: true,
        //   }));

        //   return [nodeContainer, ...keyNodes];
        // });

        const cyNodes = nodes.flatMap((node) => {
          const nlabel = node.metadata.keys.join(" ");
          const nwidth = text_width(nlabel) + 20;
          return {
            data: { id: node.nodeId, label: nlabel },
            pannable: true,
            // grabbable: true,
            scratch: {
              children: node.metadata.children,
              keys: node.metadata.keys,
            },
            style: {
              width: nwidth,
            },
          };
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
        console.log(cyNodes);
        console.log(cyEdges);
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
            // cy.zoom({
            //   level: 2,
            //   position: { x: 0, y: 0 },
            // });
            cy.style()
              .selector(".highlighted")
              .style({
                "background-color": "red",
                "line-color": "red",
              })
              .selector("node")
              .style({
                shape: "round-rectangle",
                // content: "data(id)",
                // "background-color": "red",
                "text-valign": "center",
                "text-halign": "center",
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
              .selector(":parent")
              .style({
                "text-valign": "top",
                "text-halign": "center",
                shape: "round-rectangle",
                "corner-radius": "10",
                // "background-color": "blue",
                padding: 10,
              })
              .update();
            cy.center();
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
