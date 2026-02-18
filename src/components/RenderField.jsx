import React from "react";
import InputField from "./common/InputField";
import DropDown from "./common/DropDown";
import RadioButton from "./common/RadioButton";
import CheckBox from "./common/CheckBox";

function RenderField({ field, updateField }) {
  switch (field.type) {
    case "input":
      return (
        <InputField
          field={field}
          updateField={updateField}
        />
      );

    case "dropdown":
      return (
        <DropDown
          field={field}
          updateField={updateField}
        />
      );

    case "radio":
      return (
        <RadioButton
          field={field}
          updateField={updateField}
        />
      );

    case "checkbox":
      return (
        <CheckBox
          field={field}
          updateField={updateField}
        />
      );

    default:
      return null;
  }
  
}

export default RenderField;
