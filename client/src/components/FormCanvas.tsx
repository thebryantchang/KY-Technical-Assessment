import { useDroppable } from '@dnd-kit/core';
import { FormElement } from '../types/formTypes';
import FormElementRenderer from './FormElement';

interface Props {
  elements: FormElement[];
  setElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
  previewMode: boolean;
  formResponses: Record<string, string | Record<string, string>>;
  setFormResponses: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>>>
  >;
  numColumns: number;
}

let currentColumn = 0;
let lastElementCount = 0;

const FormCanvas = ({
  elements,
  setElements,
  previewMode,
  formResponses,
  setFormResponses,
  numColumns,
}: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: 'form-canvas' });

  // If the number of elements has increased, assign the new ones to the current column
  if (elements.length > lastElementCount) {
    const updatedElements = elements.map((el, idx) => {
      if (el.column === undefined) {
        return { ...el, column: currentColumn };
      }
      return el;
    });
    setElements(updatedElements);
    lastElementCount = updatedElements.length;
  }

  // If the number of columns increased, move to next column for future elements
  if (numColumns > currentColumn + 1) {
    currentColumn = numColumns - 1;
  }

  const updateElement = (updated: FormElement) => {
    setElements((prev) =>
      prev.map((el) => (el.id === updated.id ? { ...updated } : el))
    );
  };

  const columns: FormElement[][] = Array.from({ length: numColumns }, () => []);

  elements.forEach((el) => {
    const col = el.column ?? 0;
    if (col >= 0 && col < numColumns) {
      columns[col].push(el);
    } else {
      columns[0].push(el);
    }
  });

  return (
    <div>
      <h3>Form Builder</h3>
      <div
        ref={setNodeRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
          gap: '16px',
          padding: '16px',
          minHeight: '400px',
          border: '2px dashed #ccc',
          backgroundColor: isOver ? '#e0f7fa' : '#fafafa',
        }}
      >
        {columns.map((columnElements, colIdx) => (
          <div
            key={colIdx}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {columnElements.map((el) => (
              <FormElementRenderer
                key={el.id}
                element={el}
                updateElement={updateElement}
                previewMode={previewMode}
                formResponses={formResponses}
                setFormResponses={setFormResponses}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormCanvas;
