import { TextElement } from '../types/formTypes';

const TextInput = ({
  field,
  updateElement,
  previewMode,
  value,
  setValue,
}: {
  field: TextElement;
  updateElement: (e: TextElement) => void;
  previewMode: boolean;
  value: string;
  setValue: (val: string) => void;
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {!previewMode ? (
        <input
          type="text"
          value={field.question}
          onChange={(e) =>
            updateElement({ ...field, question: e.target.value })
          }
          placeholder="Enter your question"
          style={{ marginBottom: '8px', width: '100%' }}
        />
      ) : (
        <label style={{ fontWeight: 'bold' }}>{field.question}</label>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="User input here"
        style={{
          display: 'block',
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginTop: previewMode ? '8px' : '0',
        }}
        disabled={!previewMode}
      />
    </div>
  );
};

export default TextInput;
