import React from "react";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Switch } from "@/components/ui/switch";

function InputField({ field, updateField }) {

  // Generate dataName safely
  const generateDataName = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  };

  // Label change
  const handleFieldLabelChange = (e) => {
    const value = e.target.value;

    updateField(field.id, {
      label: value,
      dataName: generateDataName(value),
    });
  };

  // Placeholder change ✅
  const handlePlaceholderChange = (e) => {
    updateField(field.id, {
      placeholder: e.target.value,
    });
  };

  // Input type change (optional but recommended)
  const handleTypeChange = (value) => {
    updateField(field.id, {
      inputType: value.toLowerCase(),
    });
  };

  const types = ["Text", "Number", "Email", "Password"];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h3 className="mb-4">Field Settings</h3>
        <Separator />
      </div>

      <FieldGroup className="space-y-4">

        {/* Field Label */}
        <Field>
          <FieldLabel htmlFor="input-field">
            Field Label
          </FieldLabel>

          <Input
            id="input-field"
            placeholder="Input Field"
            value={field.label || ""}
            onChange={handleFieldLabelChange}
          />
        </Field>

        {/* Data Name */}
        <Field>
          <FieldLabel htmlFor="data-name">
            Data Name
          </FieldLabel>

          <Input
            id="data-name"
            value={field.dataName || ""}
            readOnly
          />

          <p className="text-xs text-muted-foreground mt-1">
            Used for data storage and API integration
          </p>
        </Field>

        {/* Input Type */}
        <Field>
          <FieldLabel>Input Type</FieldLabel>

          <Combobox
            items={types}
            value={field.inputType}
            onValueChange={handleTypeChange}
          >
            <ComboboxInput placeholder="Select Input Type" />

            <ComboboxContent>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>

          </Combobox>
        </Field>

        {/* Placeholder ✅ */}
        <Field>
          <FieldLabel htmlFor="placeholder">
            Placeholder Text
          </FieldLabel>

          <Input
            id="placeholder"
            placeholder="Enter placeholder text"
            value={field.placeholder || ""}
            onChange={handlePlaceholderChange}
          />
        </Field>

        {/* Required Switch */}
        <Field>
          <div className="flex gap-2">

            <Switch
              id="required-switch"
              checked={field.required || false}
              onCheckedChange={(value) =>
                updateField(field.id, {
                  required: value,
                })
              }
            />

            <FieldLabel htmlFor="required-switch">
              Required Field
            </FieldLabel>

          </div>
        </Field>

      </FieldGroup>

    </div>
  );
}

export default InputField;
