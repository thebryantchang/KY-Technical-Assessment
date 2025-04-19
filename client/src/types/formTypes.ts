export type ComponentType = 'text' | 'dropdown' | 'table' | 'file'

export interface BaseElement{
    id: string;
    type: ComponentType
    question: string;
    column?: number;
}

export interface TextElement extends BaseElement{
    type: 'text';
    minLength?: number;
    maxLength?: number;
}

export interface DropdownElement extends BaseElement{
    type: 'dropdown';
    options: string[];
    flow?: { [option:string]:string};
}

export interface TableColumn {
  label: string;
  inputType: 'text' | 'dropdown';
  options?: string[];
}

export interface TableElement extends BaseElement {
  type: 'table';
  columns: TableColumn[];
}

  
  export interface FileElement extends BaseElement {
    type: 'file';
    acceptedTypes?: string[];
  }
  
  export type FormElement =
    | TextElement
    | DropdownElement
    | TableElement
    | FileElement;
  