import "./App.css";

import GraphVisualizer from "./components/GraphVisualizer";
import BST from "./components/BST";
import DirectedGraph from "./components/DirectedGraph";
import WeightedGraph from "./components/WeightedGraph";
import WeightedDirectedGraph from "./components/WeightedDirectedGraph";
import RBTree from "./components/RBTree";

function App() {
  return (
    <div className="App">
      <h1>Візуалізація графа</h1>
      {/* <GraphVisualizer /> */}
      {/* <BST/> */}
      {/* <DirectedGraph/> */}
      {/* <WeightedGraph/> */}
      {/* <WeightedDirectedGraph/> */}
      <RBTree/>
    </div>
  );
}

export default App;
