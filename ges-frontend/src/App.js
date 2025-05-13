import "./App.css";

import GraphVisualizer from "./components/GraphVisualizer";
import BST from "./components/BST";
import DirectedGraph from "./components/DirectedGraph";
import WeightedGraph from "./components/WeightedGraph";

function App() {
  return (
    <div className="App">
      <h1>Візуалізація графа</h1>
      {/* <GraphVisualizer /> */}
      {/* <BST/> */}
      {/* <DirectedGraph/> */}
      <WeightedGraph/>
    </div>
  );
}

export default App;
