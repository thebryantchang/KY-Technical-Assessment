import { FormElement } from '../types/formTypes';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import Table from './Table';

const FormElementRenderer = ({
  element,
  updateElement,
  previewMode,
  formResponses,
  setFormResponses,
}: {
  element: FormElement;
  updateElement: (e: FormElement) => void;
  previewMode: boolean;
  formResponses: Record<string, string | Record<string, string>>;
  setFormResponses: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>>>
  >;
}) => {
  switch (element.type) {
    case 'text':
      return (
        <TextInput
          field={element}
          updateElement={updateElement}
          previewMode={previewMode}
          value={
            typeof formResponses[element.id] === 'string'
              ? formResponses[element.id]
              : ''
          }
          setValue={(val: string) =>
            setFormResponses((prev) => ({ ...prev, [element.id]: val }))
          }
        />
      );

    case 'dropdown':
      return (
        <Dropdown
          field={element}
          updateElement={updateElement}
          previewMode={previewMode}
          value={
            typeof formResponses[element.id] === 'string'
              ? formResponses[element.id]
              : ''
          }
          setValue={(val: string) =>
            setFormResponses((prev) => ({ ...prev, [element.id]: val }))
          }
        />
      );

      case 'table': {
        const raw = formResponses[element.id];
        const tableValue =
          typeof raw === 'object' && raw !== null && !Array.isArray(raw)
            ? (raw as Record<string, string>)
            : {};
      
        return (
          <Table
  field={element}
  updateElement={updateElement}
  previewMode={previewMode}
  value={tableValue}
  setValue={(val) =>
    setFormResponses((prev) => ({ ...prev, [element.id]: val }))
  }
/>
        );
      }

    case 'file':
      return (
        <div style={{ marginBottom: '16px' }}>
          {!previewMode ? (
            <input
              type="text"
              value={element.question}
              onChange={(e) =>
                updateElement({ ...element, question: e.target.value })
              }
              placeholder="File upload question"
              style={{ marginBottom: '8px', width: '100%' }}
            />
          ) : (
            <label style={{ fontWeight: 'bold' }}>{element.question}</label>
          )}
          <input type="file" />
        </div>
      );

    default:
      return null;
  }
};

export default FormElementRenderer;
