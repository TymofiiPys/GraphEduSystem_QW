import React, { useRef, useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './GraphVisualizer.css';
import PseudoCodeHighlighter from "./PseudoCodeHighlighter";
import axios from "axios";
// import normalizeElements from CytoscapeComponent

// const elements = [
//     { data: { id: 'A' } },
//     { data: { id: 'B' } },
//     { data: { id: 'C' } },
//     { data: { source: 'A', target: 'B' } },
//     { data: { source: 'A', target: 'C' } },
// ];

const elements = {
        nodes: [
            { data: { id: 'A', label: '1' }, pannable: false, grabbable: true },
            { data: { id: 'B', label: '2' }, pannable: false, grabbable: true },
            { data: { id: 'C', label: '3' }, pannable: false, grabbable: true }
        ],
        edges: [
            { data: { source: 'A', target: 'B' } },
            { data: { source: 'A', target: 'C' } },
        ]
    };

const layout = { name: 'breadthfirst' };

const stepToLineMap = [0, 1, 2, 3, 4];

const pseudoCode = [
    'DFS(node):',
    '  mark node as visited',
    '  for each neighbor of node:',
    '    if neighbor not visited:',
    '      DFS(neighbor)',
];

export default function GraphVisualizer() {
    const cyRef = useRef(null);
    const [step, setStep] = useState(0);
    const [showCode, setShowCode] = useState(false);

    // const [elements, setElements] = useState([]); 

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
    // useEffect(() => {
    //     axios.get('/api/graph')
    //         .then(response => {
    //             setElements(response.data.elements);
    //         })
    //         .catch(error => {
    //             console.error('Помилка при завантаженні графа:', error);
    //         });
    // }, []);

    const steps = [
        ['A'],
        ['A', 'B'],
        ['A', 'B', 'C'],
    ];

    const highlightNodes = (nodeIds) => {
        const cy = cyRef.current;
        if (!cy) return;
        cy.nodes().removeClass('highlighted');
        nodeIds.forEach(id => {
            const node = cy.getElementById(id);
            node.addClass('highlighted');
        });
    };

    const nextStep = () => {
        const next = (step + 1) % steps.length;
        setStep(next);
        highlightNodes(steps[next]);
    };

    const toggleCode = () => {
        setShowCode(prev => !prev);
    };

    const showGraph1 = () => {
        // axios.get('/api/graph')
        //     .then(response => {
        //         setElements(response.data.elements);
        //     })
        //     .catch(error => {
        //         console.error('Помилка при завантаженні графа:', error);
        //     });
    };

    return (
        <div>
            <button onClick={nextStep}>Наступний крок</button>
            <button onClick={toggleCode} style={{ marginLeft: '10px' }}>
                {showCode ? 'Сховати псевдокод' : 'Показати псевдокод'}
            </button>
            <button onClick={showGraph1} style={{ marginLeft: '10px' }}>Граф 1</button>
            <div className="graph-container">
            <CytoscapeComponent
                elements={CytoscapeComponent.normalizeElements(elements)}
                // style={{ width: '100vw', height: '100vh', zindex:'999', }}
                className="cyc"
                layout={layout}
                cy={(cy) => {
                    cyRef.current = cy;
                    cy.style()
                        .selector('.highlighted')
                        .style({
                            'background-color': 'red',
                            'line-color': 'red',
                        })
                        .selector('edge')
                        .style({
                            'width': 4,
                            'target-arrow-shape': 'triangle',
                            'line-color': '#9dbaea',
                            'target-arrow-color': '#9dbaea',
                            'curve-style': 'bezier'
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
