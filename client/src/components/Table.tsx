import { TableElement } from '../types/formTypes';
import { useState } from 'react';

const Table = ({
  field,
  updateElement,
  previewMode,
  value,
  setValue,
}: {
  field: TableElement;
  updateElement: (e: TableElement) => void;
  previewMode: boolean;
  value: Record<string, string>;
  setValue: (val: Record<string, string>) => void;
}) => {
  const [newColLabel, setNewColLabel] = useState('');
  const [newColType, setNewColType] = useState<'text' | 'dropdown'>('text');

  const handleAddColumn = () => {
    // if (!newColLabel.trim()) return;
    // if (!newColLabel.trim()) {
    //   alert('Please enter a column label.');
    //   return;
    // }
    console.log('handleAddColumn triggered!');
    const newColumn = {
      label: newColLabel.trim(),
      inputType: newColType,
      options: newColType === 'dropdown' ? ['Option 1', 'Option 2'] : undefined,
    };
  
    console.log('Adding column:', newColumn); // DEBUG ✅
  
    console.log('[Table] Before:', field.columns);
    updateElement({
      ...field,
      columns: [...field.columns, newColumn],
    });
    console.log('[Table] After:', [...field.columns, newColumn]);
  
    setNewColLabel('');
    setNewColType('text');
  };
  

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ ...field, question: e.target.value });
  };

  const handleCellChange = (colLabel: string, newValue: string) => {
    setValue({ ...value, [colLabel]: newValue });
  };

  return (
    <div style={{ marginBottom: '16px' }}>


      {!previewMode ? (
        <>
          <input
            type="text"
            value={field.question}
            onChange={handleQuestionChange}
            placeholder="Table Question"
            style={{ marginBottom: '8px', width: '100%' }}
          />

          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            {/* <input
              type="text"
              value={newColLabel}
              onChange={(e) => setNewColLabel(e.target.value)}
              placeholder="Column Label"
            /> */}
            <select
              value={newColType}
              onChange={(e) =>
                setNewColType(e.target.value as 'text' | 'dropdown')
              }
            >
              <option value="text">Text</option>
              <option value="dropdown">Dropdown</option>
            </select>
            <button type="button" 
  onClick={() => {
    console.log('REAL Add Column button clicked');
    handleAddColumn();
  }}
>
  ➕ Add Column
</button>

          </div>
        </>
      ) : (
        <label style={{ fontWeight: 'bold' }}>{field.question}</label>
      )}

<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      {field.columns.map((col, idx) => (
        <th key={idx} style={{ border: '1px solid #ccc', padding: '8px' }}>
          {previewMode ? (
            col.label
          ) : (
            <div>
  <input
    type="text"
    value={col.label}
    onChange={(e) => {
      const updated = [...field.columns];
      updated[idx].label = e.target.value;
      updateElement({ ...field, columns: updated });
    }}
    style={{ width: '100%', marginBottom: '4px' }}
  />
  
  {col.inputType === 'dropdown' && (
    <>
      {col.options?.map((opt, optIdx) => (
        <div key={optIdx} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
          <input
            type="text"
            value={opt}
            onChange={(e) => {
              const updated = [...field.columns];
              const newOptions = [...(col.options || [])];
              newOptions[optIdx] = e.target.value;
              updated[idx] = { ...col, options: newOptions };
              updateElement({ ...field, columns: updated });
            }}
            style={{ flex: 1 }}
          />
          <button
            onClick={() => {
              const updated = [...field.columns];
              const newOptions = [...(col.options || [])];
              newOptions.splice(optIdx, 1);
              updated[idx] = { ...col, options: newOptions };
              updateElement({ ...field, columns: updated });
            }}
          >
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          const updated = [...field.columns];
          const newOptions = [...(col.options || []), ''];
          updated[idx] = { ...col, options: newOptions };
          updateElement({ ...field, columns: updated });
        }}
      >
        ➕ Add Option
      </button>
    </>
  )}
</div>

          )}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    <tr>
      {field.columns.map((col, idx) => (
        <td key={idx} style={{ border: '1px solid #ccc', padding: '8px' }}>
          {col.inputType === 'text' ? (
            <input
              type="text"
              value={value[col.label] || ''}
              onChange={(e) => handleCellChange(col.label, e.target.value)}
              disabled={!previewMode}
            />
          ) : (
            <select
              value={value[col.label] || ''}
              onChange={(e) => handleCellChange(col.label, e.target.value)}
              disabled={!previewMode}
            >
              <option value="">Select</option>
              {col.options?.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </td>
      ))}
    </tr>
  </tbody>
</table>

    </div>
  );
};

export default Table;
