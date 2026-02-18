import React from "react";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Switch } from "@/components/ui/switch";

function RadioButton({ field, updateField }) {

  // Generate dataName from label
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
    updateField(field.id, {
      required: value,
    });
  };

  // Add option
  const handleAddOption = () => {
    updateField(field.id, {
      options: [
        ...(field.options || []),
        {
          id: Date.now(),
          label: "",
          isDefault: false,
        },
      ],
    });
  };

  // Delete option
  const handleDeleteOption = (optionId) => {

    if (field.options.length === 1) return;

    updateField(field.id, {
      options: field.options.filter(
        (opt) => opt.id !== optionId
      ),
    });
  };

  // Update option label
  const handleUpdateOption = (optionId, value) => {

    updateField(field.id, {
      options: field.options.map((opt) =>
        opt.id === optionId
          ? { ...opt, label: value }
          : opt
      ),
    });

  };

  // Set default option
  const handleSetDefault = (optionId) => {

    updateField(field.id, {
      options: field.options.map((opt) => ({
        ...opt,
        isDefault: opt.id === optionId,
      })),
    });

  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h3 className="font-semibold">
          Field Settings
        </h3>
        <Separator />
      </div>

      <FieldGroup className="space-y-4">

        {/* Label */}
        <Field>

          <FieldLabel>
            Field Label
          </FieldLabel>

          <Input
            value={field.label || ""}
            placeholder="Radio Field"
            onChange={handleLabelChange}
          />

        </Field>

        {/* Data Name */}
        <Field>

          <FieldLabel>
            Data Name
          </FieldLabel>

          <Input
            value={field.dataName || ""}
            readOnly
          />

          <p className="text-xs text-muted-foreground">
            Used for data storage and API integration
          </p>

        </Field>

        {/* Required */}
        <Field>

          <div className="flex items-center gap-2">

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

          <div className="flex justify-between items-center">

            <h4 className="font-medium">
              Radio Button Options
            </h4>

            <button
              type="button"
              onClick={handleAddOption}
              className="text-primary text-sm font-medium"
            >
              + Add Option
            </button>

          </div>

          <div className="space-y-2 mt-2">

            {field.options?.map((opt, index) => (

              <div
                key={opt.id}
                className="flex items-center gap-2"
              >

                {/* Default selector */}
                <input
                  type="radio"
                  checked={opt.isDefault}
                  onChange={() =>
                    handleSetDefault(opt.id)
                  }
                />

                {/* Option input */}
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

                {/* Delete */}
                <button
                  type="button"
                  disabled={field.options.length === 1}
                  onClick={() =>
                    handleDeleteOption(opt.id)
                  }
                  className={`text-sm ${
                    field.options.length === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500"
                  }`}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Select one option as default
          </p>

        </Field>

      </FieldGroup>

    </div>
  );
}

export default RadioButton;
