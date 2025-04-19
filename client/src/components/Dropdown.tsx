import { useState } from 'react';
import { DropdownElement } from '../types/formTypes';

const Dropdown = ({
  field,
  updateElement,
  previewMode,
  value,
  setValue,
}: {
  field: DropdownElement;
  updateElement: (e: DropdownElement) => void;
  previewMode: boolean;
  value: string;
  setValue: (val: string) => void;
}) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement({ ...field, question: e.target.value });
  };

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...field.options];
    updated[index] = val;
    updateElement({ ...field, options: updated });
  };

  const addOption = () => {
    updateElement({ ...field, options: [...field.options, ''] });
  };

  const removeOption = (index: number) => {
    const updated = [...field.options];
    updated.splice(index, 1);
    updateElement({ ...field, options: updated });
  };

  const handleFlowChange = (option: string, target: string) => {
    const updatedFlow = { ...(field.flow || {}) };
    updatedFlow[option] = target;
    updateElement({ ...field, flow: updatedFlow });
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {!previewMode ? (
        <>
          <input
            type="text"
            value={field.question}
            onChange={handleQuestionChange}
            placeholder="Dropdown Question"
            style={{ marginBottom: '8px', width: '100%' }}
          />

          {field.options.map((opt, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                style={{ flex: 1 }}
              />
              <button onClick={() => removeOption(idx)}>❌</button>
            </div>
          ))}

          <button onClick={addOption}>➕ Add Option</button>

          {field.options.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <strong>Conditional Logic (Flow):</strong>
              {field.options.map((opt, idx) => (
                <div key={idx} style={{ marginTop: '8px' }}>
                  <label style={{ marginRight: '8px' }}>If "{opt}" → Go to Question ID:</label>
                  <input
                    type="text"
                    value={field.flow?.[opt] || ''}
                    onChange={(e) => handleFlowChange(opt, e.target.value)}
                    style={{ width: '200px' }}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <label style={{ fontWeight: 'bold' }}>{field.question}</label>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: '8px' }}
          >
            <option value="">Select</option>
            {field.options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {field.flow && field.flow[value] && (
            <p style={{ color: '#0077cc', marginTop: '8px' }}>
              You will be directed to: <strong>{field.flow[value]}</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Dropdown;
