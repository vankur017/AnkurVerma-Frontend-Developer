import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Save, Upload, Download } from 'lucide-react';


import { initialNodes, initialEdges } from './data/initialData';
import { getLayoutedElements } from './utils/layout';
import HomeNode from './components/HomeNode';

const App = () => {
 
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const nodeTypes = useMemo(() => ({ homeNode: HomeNode }), []);


  const onSectionChange = useCallback((nodeId, newSections) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, sections: newSections },
          };
        }
        return node;
      })
    );
  }, [setNodes]);


  const onSave = useCallback(() => {
    const flow = { nodes, edges };
    localStorage.setItem('hierarchy', JSON.stringify(flow));
    alert('Configuration saved to localstorage');
  }, [nodes, edges]);

  const onDownload = useCallback(() => {
    const flow = { nodes, edges };
    const jsonString = JSON.stringify(flow, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);


  useEffect(() => {
 
    const savedFlow = localStorage.getItem('hierarchy');

    if (savedFlow) {
    
      console.log('Restoring from LocalStorage...');
      const flow = JSON.parse(savedFlow);

     
      const restoredNodes = flow.nodes.map((node) => {
        if (node.type === 'homeNode') {
          return {
            ...node,
            data: { ...node.data, onSectionChange },
          };
        }
        return node;
      });

      setNodes(restoredNodes);
      setEdges(flow.edges);
    } else {
  
      console.log('Loading default layout...');
      const nodesWithCallbacks = initialNodes.map((node) => {
        if (node.type === 'homeNode') {
          return { ...node, data: { ...node.data, onSectionChange } };
        }
        return node;
      });

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodesWithCallbacks,
        initialEdges
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, []); 
  
  const onRestore = useCallback(() => {
    const savedFlow = localStorage.getItem('hierarchy-flow');
    if (savedFlow) {
      const flow = JSON.parse(savedFlow);
      const restoredNodes = flow.nodes.map((node) => {
        if (node.type === 'homeNode') {
          return { ...node, data: { ...node.data, onSectionChange } };
        }
        return node;
      });
      setNodes(restoredNodes);
      setEdges(flow.edges);
    } else {
      alert('No saved configuration found.');
    }
  }, [setNodes, setEdges, onSectionChange]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="h-screen w-screen bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#aaa" gap={16} />
        <Controls />

        <Panel
          position="top-right"
          className="bg-white p-2 rounded-lg shadow-md border border-gray-200 flex gap-2"
        >
          <button
            onClick={onSave}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            <Save size={16} /> Save
          </button>

          <button
            onClick={onRestore}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            <Upload size={16} /> Load
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            <Download size={16} /> Export JSON
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default App;