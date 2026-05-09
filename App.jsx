import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialData } from './data';
import { getLayoutedElements } from './layout';
import CustomNode from './CustomNode';

const nodeTypes = {
  customNode: CustomNode,
};

function AppContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  const { fitView } = useReactFlow();

  const handleToggle = useCallback((nodeId) => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialData, collapsedNodes, searchQuery);
    
    // Inject onToggle callback into node data
    const nodesWithCallbacks = layoutedNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onToggle: handleToggle
      }
    }));

    setNodes(nodesWithCallbacks);
    setEdges(layoutedEdges);

    // Auto-pan and zoom whenever layout changes!
    // Give it a tiny timeout to allow React Flow to register the new nodes before fitting
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.2 });
    }, 50);

  }, [collapsedNodes, searchQuery, handleToggle, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.05}
      nodesDraggable={false}
    >
      <Background color="#cbd5e1" gap={16} />
      <Controls />
      <MiniMap />
      <Panel position="top-left" className="panel">
        <h3>Tree Visualizer</h3>
        <input 
          type="text"
          className="search-input"
          placeholder="Search for a node..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p>Hover nodes for metadata. Click +/- to expand or collapse.</p>
      </Panel>
    </ReactFlow>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8fafc' }}>
      <ReactFlowProvider>
        <AppContent />
      </ReactFlowProvider>
    </div>
  );
}
