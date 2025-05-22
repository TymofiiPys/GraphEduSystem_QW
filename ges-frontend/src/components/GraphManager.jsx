import React, { useState } from "react";
import GraphVisualizer from "./GraphVisualizer";
import BST from "./BST";
import RBTree from "./RBTree";
import BTree from "./BTree";
import DirectedGraph from "./DirectedGraph";
import WeightedDirectedGraph from "./WeightedDirectedGraph";
import WeightedGraph from "./WeightedGraph";

const GraphManager = () => {
  const [type, setType] = useState(null);
  const [graphId, setGraphId] = useState("");

  const handleSelect = (e) => {
    setType(e.target.value);
    setGraphId(""); // скинути ID при зміні типу
  };

  const renderComponent = () => {
    if (!type) return <p>Оберіть тип графа/дерева для візуалізації.</p>;
    // if (!graphId) return <p>Введіть ID графа.</p>;

    switch (type) {
      case "GRAPH":
        return <GraphVisualizer />;
      case "TREE":
        return <BST />;
      case "RBTREE":
        return <RBTree />;
      case "BTREE":
        return <BTree />;
      case "DIRGRAPH":
        return <DirectedGraph />;
      case "WDGRAPH":
        return <WeightedDirectedGraph/>;
      case "WGRAPH":
        return <WeightedGraph />;
      default:
        return <p>Невідомий тип.</p>;
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Меню вибору структури</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Тип графа / дерева: </label>
        <select onChange={handleSelect} value={type || ""}>
          <option value="">-- Обрати --</option>
          <option value="GRAPH">Незважений неорієнтований граф</option>
          <option value="WGRAPH">Зважений неорієнтований граф</option>
          <option value="DIRGRAPH">Незважений орієнтований граф</option>
          <option value="WDGRAPH">Зважений орієнтований граф</option>
          <option value="TREE">Бінарне дерево</option>
          <option value="RBTREE">Червоно-чорне дерево</option>
          <option value="BTREE">B-дерево</option>
        </select>
      </div>

      {/* <div style={{ marginBottom: "1rem" }}>
        <label>ID графа: </label>
        <input
          type="text"
          value={graphId}
          onChange={(e) => setGraphId(e.target.value)}
          placeholder="Введіть UUID"
        />
      </div> */}

      <hr />
      {renderComponent()}
    </div>
  );
};

export default GraphManager;
