import { tree, hierarchy } from 'd3-hierarchy';

export const getLayoutedElements = (originalTree, collapsedNodes, searchQuery = '') => {
  // First, find all nodes that match the query to auto-expand their parents
  const nodesToForceExpand = new Set();
  
  if (searchQuery) {
    const findMatches = (node, path) => {
      const isMatch = node.label.toLowerCase().includes(searchQuery.toLowerCase());
      if (isMatch) {
        path.forEach(p => nodesToForceExpand.add(p));
      }
      if (node.children) {
        node.children.forEach(child => findMatches(child, [...path, node.id]));
      }
    };
    findMatches(originalTree, []);
  }

  const filterTree = (node) => {
    // If a node is in nodesToForceExpand, it CANNOT be collapsed (override the user's collapse state)
    const forceExpanded = nodesToForceExpand.has(node.id);
    const isCollapsed = !forceExpanded && collapsedNodes.has(node.id);
    const hasOriginalChildren = node.children && node.children.length > 0;
    
    return {
      id: node.id,
      label: node.label,
      isRoot: node.isRoot,
      metadata: node.metadata,
      hasOriginalChildren,
      isCollapsed,
      children: (isCollapsed || !hasOriginalChildren) ? null : node.children.map(filterTree)
    };
  };

  const visibleTree = filterTree(originalTree);
  const root = hierarchy(visibleTree);
  
  const nodeWidth = 220;
  const nodeHeight = 50;
  
  const layout = tree().nodeSize([nodeWidth + 40, nodeHeight + 80]);
  layout(root);

  const nodes = [];
  const edges = [];

  root.each((d) => {
    const isHighlighted = searchQuery && d.data.label.toLowerCase().includes(searchQuery.toLowerCase());

    nodes.push({
      id: d.data.id,
      position: { x: d.x, y: d.y },
      data: { 
        label: d.data.label,
        isRoot: d.data.isRoot,
        metadata: d.data.metadata,
        hasChildren: d.data.hasOriginalChildren,
        isCollapsed: d.data.isCollapsed,
        isHighlighted
      },
      type: 'customNode',
    });

    if (d.parent) {
      edges.push({
        id: `e-${d.parent.data.id}-${d.data.id}`,
        source: d.parent.data.id,
        target: d.data.id,
        type: 'step', 
        style: { stroke: '#94a3b8', strokeWidth: 1.5 },
        animated: isHighlighted // Bonus: animate the edge to highlighted node!
      });
    }
  });

  return { nodes, edges };
};
