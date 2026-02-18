# Dynamic Form Builder

A React-based **dynamic form builder** with live field editing, preview, and save functionality. Built using **React**, **Ant Design**, and **TailwindCSS** with modular components for different field types.

---

## Features

- **Dynamic Fields**
  - Add fields of types: `Input`, `Dropdown`, `Radio Button`, `Checkbox`.
  - Edit field labels, data names, and options dynamically.
  - Set required fields and default values for dropdowns/radio buttons.
  - Supports multiple options for checkboxes and radio buttons.

- **Form Header**
  - Set **form title** and **form description**.
  - Customize submit button text.

- **Live Field Preview**
  - Selected field is editable in the **right sidebar**.
  - Changes update both field preview and form state in real-time.

- **Add Field Selector**
  - `FieldSelectorCard` component allows choosing a field type.
  - Appears only when clicking **Add Field** button.

- **Preview Mode**
  - Render full form in a modal with live input fields.
  - Validation for required fields.
  - Supports form submission, storing values in `localStorage`.

- **Save Form**
  - Save form configuration (title, description, fields, submit button) to `localStorage`.

---

## Components

### 1. `FormBuilder.jsx`
- Main container for the form builder.
- Manages state for form fields, title, description, and submit button.
- Handles adding, selecting, and updating fields.
- Renders `FieldCard` list and sidebar editor (`RenderField`).

### 2. `FieldSelectorCard.jsx`
- Pop-up card for selecting field types.
- Field types: `Input`, `Dropdown`, `Radio Button`, `Checkbox`.
- Calls `onSelect(fieldType)` when a type is chosen.

### 3. `FieldCard.jsx`
- Shows a **preview of each field** in the builder.
- Highlights selected field.
- Clicking sets the field as active for editing.

### 4. `RenderField.jsx`
- Dynamically renders field editors in the sidebar:
  - `CheckBox.jsx`
  - `DropDown.jsx`
  - `RadioButton.jsx`
  - `InputField.jsx` (if implemented)
- Handles updating labels, options, required toggle, and defaults.

### 5. `CheckBox.jsx`
- Editor for **checkbox fields**.
- Add, delete, edit options.
- Toggle default checked options.
- Required toggle for the field.

### 6. `DropDown.jsx`
- Editor for **dropdown fields**.
- Add, delete, edit options.
- Set default option.
- Required toggle for the field.

### 7. `RadioButton.jsx`
- Editor for **radio button fields**.
- Add, delete, edit options.
- Set single default option.
- Required toggle for the field.

### 8. `PreviewForm.jsx`
- Renders form in **modal preview mode**.
- Handles input for all field types.
- Validates required fields.
- Saves form submissions to `localStorage`.

---

## Usage

1. **Add Field**
   - Click **+ Add Field** → select a field type → field appears in the list.
2. **Edit Field**
   - Click a field card → sidebar editor opens → update label, options, required toggle.
3. **Set Submit Button Text**
   - Update live in **Submit Button Text** section.
4. **Preview**
   - Click **Preview** → shows the full form modal with validation.
5. **Save Form**
   - Click **Save Form** → form configuration stored in `localStorage`.

---

## Data Structure

### Field Object
```js
{
  id: number,
  type: "input" | "dropdown" | "radio" | "checkbox",
  label: string,
  dataName: string,
  placeholder?: string,
  required: boolean,
  options?: [
    { id: number, label: string, checked?: boolean, isDefault?: boolean }
  ]
}
