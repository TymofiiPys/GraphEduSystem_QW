import "./App.css";

import GraphVisualizer from "./components/GraphVisualizer";
import BST from "./components/BST";
import DirectedGraph from "./components/DirectedGraph";
import WeightedGraph from "./components/WeightedGraph";
import WeightedDirectedGraph from "./components/WeightedDirectedGraph";
import RBTree from "./components/RBTree";
import BTree from "./components/BTree";

function App() {
  return (
    <div className="App">
      <h1>Візуалізація графа</h1>
      {/* <GraphVisualizer /> */}
      {/* <BST/> */}
      {/* <DirectedGraph/> */}
      {/* <WeightedGraph/> */}
      {/* <WeightedDirectedGraph/> */}
      {/* <RBTree/> */}
      <BTree />
    </div>
  );
}

export default App;
