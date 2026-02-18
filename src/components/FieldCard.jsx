import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function FieldCard({ field, isSelected, onSelect }) {
  const renderPreview = () => {
    switch (field.type) {
      case "input":
        return <Input placeholder={field.placeholder || "Your answer"} disabled />;
      case "dropdown":
        return (
          <select disabled className="w-full border rounded-md p-2 bg-muted/30">
            <option>Select option</option>
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            <label className="flex gap-2">
              <input type="radio" disabled /> Option 1
            </label>
          </div>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            <label className="flex gap-2">
              <input type="checkbox" disabled /> Option 1
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(field.id)}
      className={`group bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-4 cursor-pointer transition-all hover:shadow-sm ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Field Label */}
      <div className="flex items-center justify-between">
        <label className="font-medium">{field.label}</label>
      </div>

      {/* Field Preview */}
      <div>{renderPreview()}</div>
    </div>
  );
}

export default FieldCard;
