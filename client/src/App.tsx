// src/App.tsx
import axios from 'axios';
import  { useState } from 'react';
import { DndContext,DragEndEvent } from '@dnd-kit/core';
import DraggablePanel from './components/DraggablePanel';
import FormCanvas from './components/FormCanvas';
import { FormElement, ComponentType } from './types/formTypes';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const handlePreview = () => {
    document.getElementById('add-column-button')?.click(); // <- auto-add any in-progress column
    setPreviewMode(true); // <- then go to preview mode
  };

  const [elements, setElements] = useState<FormElement[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [formResponses, setFormResponses] = useState<Record<string, string | Record<string, string>>>({});
  const [numColumns, setNumColumns] = useState(1);



  const handleDrop = (event: DragEndEvent) => {
    const type = event.active.id as ComponentType;
  
    const newElement: FormElement = {
      id: uuidv4(),
      type,
      question: `Untitled ${type.charAt(0).toUpperCase() + type.slice(1)} Question`,
      ...(type === 'dropdown' && { options: ['Option 1', 'Option 2'] }),
      ...(type === 'table' && { columns: [{ label: 'Column 1', inputType: 'text' }] }),
      ...(type === 'text' && { minLength: 5, maxLength: 20 }), // optional default
    } as FormElement;
  
    setElements((prev) => [...prev, newElement]);
  };
  

  return (
    <DndContext onDragEnd={handleDrop}>
      <div style={{ display: 'flex', padding: '24px' }}>
        <DraggablePanel />
        <FormCanvas
  elements={elements}
  setElements={setElements}
  previewMode={previewMode}
  formResponses={formResponses}
  setFormResponses={setFormResponses}
  numColumns={numColumns}
/>

      </div>
      {!previewMode ? (
  <button onClick={handlePreview}>🔍 preview</button>
) : (
  <button
    onClick={async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/submit', formResponses);
        console.log('Submitted:', response.data);
        alert('Form submitted successfully!');
        window.location.reload(); // refresh back to builder
      } catch (err) {
        console.error('Submission failed:', err);
        alert('Failed to submit form.');
      }
    }}
  >✅ Submit</button>
)}
    <button onClick={() => setNumColumns((prev) => prev + 1)}>
      ➕ Add Column
    </button>
    </DndContext>
  );
};

export default App;
