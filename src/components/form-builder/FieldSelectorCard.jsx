import React, { forwardRef } from "react";
import { Card } from "antd";
import { CardTitle } from "../ui/card";

const FieldSelectorCard = forwardRef(({ open, onSelect }, ref) => {
  if (!open) return null;

  const fields = [
    { title: "Input Field", description: "Text, number, email, or password input", type: "input" },
    { title: "Dropdown", description: "Select one option from a list", type: "dropdown" },
    { title: "Radio Buttons", description: "Select one option from multiple choices", type: "radio" },
    { title: "Checkbox", description: "Select multiple options", type: "checkbox" },
  ];

  return (
    <Card ref={ref} className="mt-4 w-72 shadow-lg">
      <div className="space-y-1">
        {fields.map((field) => (
          <button
            key={field.type}
            onClick={() => onSelect(field.type)}
            className="flex flex-col gap-1 p-3 rounded-md hover:bg-gray-100 text-left w-full"
          >
            <CardTitle>{field.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{field.description}</p>
          </button>
        ))}
      </div>
    </Card>
  );
});

export default FieldSelectorCard;
