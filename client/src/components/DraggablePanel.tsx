import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, label }: { id: string; label: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: '10px',
        marginBottom: '8px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        cursor: 'grab',
      }}
    >
      {label}
    </div>
  );
};

const DraggablePanel = () => {
  const components = [
    { id: 'text', label: 'Text Input' },
    { id: 'dropdown', label: 'Dropdown' },
    { id: 'table', label: 'Table' },
    { id: 'file', label: 'File Upload' },
  ];

  return (
    <div style={{ width: '200px', padding: '16px', borderRight: '1px solid #eee' }}>
      <h3>Components</h3>
      {components.map((comp) => (
        <DraggableItem key={comp.id} id={comp.id} label={comp.label} />
      ))}
    </div>
  );
};

export default DraggablePanel;
