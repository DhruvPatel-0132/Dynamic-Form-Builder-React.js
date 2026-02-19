import React from "react";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";

function CheckBox({ field, updateField }) {

  const generateDataName = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  };

  // Label change
  const handleLabelChange = (e) => {
    const value = e.target.value;

    updateField(field.id, {
      label: value,
      dataName: generateDataName(value),
    });
  };

  // Required toggle
  const handleRequiredChange = (value) => {
    updateField(field.id, { required: value });
  };

  // Add option
  const handleAddOption = () => {
    updateField(field.id, {
      options: [
        ...field.options,
        {
          id: Date.now(),
          label: "",
          checked: false,
        },
      ],
    });
  };

  // Delete option
  const handleDeleteOption = (optionId) => {
    if (field.options.length === 1) return;

    updateField(field.id, {
      options: field.options.filter((opt) => opt.id !== optionId),
    });
  };

  // Update option label
  const handleUpdateOption = (optionId, value) => {
    updateField(field.id, {
      options: field.options.map((opt) =>
        opt.id === optionId ? { ...opt, label: value } : opt
      ),
    });
  };

  // Toggle checkbox
  const handleToggleCheck = (optionId) => {
    updateField(field.id, {
      options: field.options.map((opt) =>
        opt.id === optionId
          ? { ...opt, checked: !opt.checked }
          : opt
      ),
    });
  };

  return (
    <div className="p-6 space-y-6">

      <div>
        <h3 className="font-semibold mb-4">
          Field Settings
        </h3>
        <Separator />
      </div>

      <FieldGroup className="space-y-4">

        {/* Label */}
        <Field>
          <FieldLabel>Field Label</FieldLabel>

          <Input
            value={field.label || ""}
            onChange={handleLabelChange}
          />
        </Field>

        {/* Data Name */}
        <Field>
          <FieldLabel>Data Name</FieldLabel>

          <Input
            value={field.dataName || ""}
            readOnly
          />
        </Field>

        {/* Required */}
        <Field>
          <div className="flex gap-2">

            <Switch
              checked={field.required || false}
              onCheckedChange={handleRequiredChange}
            />

            <FieldLabel>
              Required Field
            </FieldLabel>

          </div>
        </Field>

        <Separator />

        {/* Options */}
        <Field>

          <div className="flex justify-between mb-2">
            <h4>Checkbox Options</h4>

            <button
              type="button"
              onClick={handleAddOption}
              className="text-primary text-sm border-2 rounded-xl p-2"
            >
              + Add Option
            </button>
          </div>

          <div className="space-y-2">

            {field.options?.map((opt, index) => (

              <div key={opt.id} className="flex gap-2 items-center">

                <input
                  type="checkbox"
                  checked={opt.checked}
                  onChange={() =>
                    handleToggleCheck(opt.id)
                  }
                />

                <Input
                  value={opt.label}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) =>
                    handleUpdateOption(
                      opt.id,
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteOption(opt.id)
                  }
                  disabled={field.options.length === 1}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </Field>

      </FieldGroup>

    </div>
  );
}

export default CheckBox;
