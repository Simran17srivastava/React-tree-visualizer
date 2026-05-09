import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data, id }) => {
  const { label, isRoot, hasChildren, isCollapsed, onToggle, metadata, isHighlighted } = data;

  return (
    <div className="custom-node">
      {!isRoot && <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />}
      
      <div className={`node-content ${isRoot ? 'root-node' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
        <div className="node-label">{label}</div>
        
        {/* Tooltip for Metadata */}
        {metadata && Object.keys(metadata).length > 0 && (
          <div className="node-tooltip">
            {Object.entries(metadata).map(([key, val]) => (
              <div key={key} className="tooltip-row">
                <span className="tooltip-key">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span className="tooltip-val">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {hasChildren && (
        <button 
          className="collapse-btn" 
          onClick={(e) => {
            e.stopPropagation();
            if (onToggle) onToggle(id);
          }}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? '+' : '-'}
        </button>
      )}

      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
  );
};

export default CustomNode;
