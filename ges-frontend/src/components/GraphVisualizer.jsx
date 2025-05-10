import React, { useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './GraphVisualizer.css';

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

export default function GraphVisualizer() {
    const cyRef = useRef(null);
    const [step, setStep] = useState(0);

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

    return (
        <div>
            <button onClick={nextStep}>Наступний крок</button>
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
        </div>
    );
}
