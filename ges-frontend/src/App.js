import "./App.css";

import GraphVisualizer from "./components/GraphVisualizer";
import BST from "./components/BST";
import DirectedGraph from "./components/DirectedGraph";
import WeightedGraph from "./components/WeightedGraph";
import WeightedDirectedGraph from "./components/WeightedDirectedGraph";
import RBTree from "./components/RBTree";
import BTree from "./components/BTree";
import GraphManager from "./components/GraphManager";
function App() {
  return (
    <div className="App">
      <h1>Навчальна вебсистема для вивчення графових структур</h1>
      {/* <GraphVisualizer /> */}
      {/* <BST/> */}
      {/* <DirectedGraph/> */}
      {/* <WeightedGraph/> */}
      {/* <WeightedDirectedGraph/> */}
      {/* <RBTree/> */}
      {/* <BTree /> */}
      <GraphManager />
    </div>
  );
}

export default App;
