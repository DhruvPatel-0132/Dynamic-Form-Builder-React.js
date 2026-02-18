import React, { useState, useRef, useEffect } from "react";
import FieldSelectorCard from "./common/FieldSelectorCard";
import FieldCard from "./FieldCard";
import RenderField from "./RenderField";
import PreviewForm from "./PreviewForm";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { EyeOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { TextArea } = Input;

function FormBuilder() {

  const [buttonText, setButtonText] = useState("Submit");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [showCard, setShowCard] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");

  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  // close selector on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // add field
  const handleSelectField = (type) => {

    const newField = {
      id: Date.now(),
      type,
      label: "Untitled Field",
      dataName: "",
      placeholder: "",
      required: false,
      options:
        type === "dropdown" ||
        type === "radio" ||
        type === "checkbox"
          ? [
              {
                id: Date.now(),
                label: "Option 1",
                checked: false,
                isDefault: false,
              },
            ]
          : [],
    };

    setFields(prev => [...prev, newField]);
    setSelectedFieldId(newField.id);
    setShowCard(false);
  };

  // update field
  const updateField = (id, updatedValues) => {

    setFields(prev =>
      prev.map(field =>
        field.id === id
          ? { ...field, ...updatedValues }
          : field
      )
    );
  };

  const selectedField =
    fields.find(f => f.id === selectedFieldId);

  // SAVE FORM
  const handleSaveForm = () => {

    if (!formTitle.trim()) {
      setStatusMessage("Form title is required");
      return;
    }

    const formData = {
      title: formTitle,
      description: formDescription,
      fields,
      buttonText,
    };

    localStorage.setItem(
      "savedForm",
      JSON.stringify(formData)
    );

    setStatusMessage("Form saved successfully");

    setTimeout(() => setStatusMessage(""), 3000);
  };

  // PREVIEW MODE
  if (previewMode) {
    return (
      <PreviewForm
        form={{
          title: formTitle,
          description: formDescription,
          fields,
          buttonText,
        }}
        onBack={() => setPreviewMode(false)}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/20">

      {/* LEFT */}
      <div className="flex-1 max-w-4xl mx-auto p-6">

        {/* FORM HEADER */}
        <div className="bg-card border rounded-xl shadow-sm p-6 mb-6">

          <TextArea
            placeholder="Untitled Form"
            value={formTitle}
            className="text-2xl font-semibold border-none shadow-none"
            onChange={(e) =>
              setFormTitle(e.target.value)
            }
            autoSize
          />

          <TextArea
            placeholder="Form Description"
            value={formDescription}
            className="border-none shadow-none mt-2"
            onChange={(e) =>
              setFormDescription(e.target.value)
            }
            autoSize={{ minRows: 2 }}
          />

        </div>

        {/* STATUS MESSAGE */}
        {statusMessage && (
          <div className="
            mb-4
            p-3
            rounded-lg
            bg-green-100
            text-green-700
          ">
            {statusMessage}
          </div>
        )}

        {/* FIELDS */}
        <div className="space-y-4">

          {fields.map(field => (
            <FieldCard
              key={field.id}
              field={field}
              isSelected={
                selectedFieldId === field.id
              }
              onSelect={setSelectedFieldId}
            />
          ))}

        </div>

        {/* ADD FIELD */}
        <div className="flex flex-col items-center py-8 relative">

          <Button
            ref={buttonRef}
            variant="outline"
            className="
              w-48 h-12
              border-dashed
            "
            onClick={() => setShowCard(true)}
          >
            + Add Field
          </Button>

          <FieldSelectorCard
            ref={cardRef}
            open={showCard}
            onSelect={handleSelectField}
          />

        </div>

        {/* SUBMIT BUTTON SETTING */}
        <div className="
          bg-card border rounded-xl p-5 mt-6 space-y-3 w-80
        ">

          <Button disabled>
            {buttonText}
          </Button>

          <Field>
            <FieldLabel>
              Submit Button Text
            </FieldLabel>

            <Input
              value={buttonText}
              onChange={(e) =>
                setButtonText(e.target.value)
              }
            />

          </Field>

        </div>

        {/* FOOTER BUTTONS */}
        <div className="fixed bottom-6 left-6 flex gap-3">

          <Button
            variant="outline"
            onClick={handleSaveForm}
          >
            Save Form
          </Button>

          <Button
            disabled={!fields.length}
            onClick={() =>
              setPreviewMode(true)
            }
          >
            <EyeOutlined />
            Preview
          </Button>

        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="
        w-96
        border-l
        bg-background
        min-h-screen
        p-6
      ">

        {selectedField ? (
          <RenderField
            field={selectedField}
            updateField={updateField}
          />
        ) : (
          <p className="text-center text-muted-foreground">
            Select a field
          </p>
        )}

      </div>

    </div>
  );
}

export default FormBuilder;
  