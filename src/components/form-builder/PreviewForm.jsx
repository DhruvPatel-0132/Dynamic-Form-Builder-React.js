import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { message } from "antd";

function PreviewForm({ form, onClose }) {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (fieldId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    form.fields.forEach((field) => {
      if (field.required && !formValues[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      message.error("Please fill required fields");
      return;
    }

    const submission = {
      formId: Date.now(),
      values: formValues,
    };

    localStorage.setItem("formSubmission", JSON.stringify(submission));

    setSubmittedData(submission);

    message.success("Form submitted successfully");
  };

  const renderField = (field, values, readOnly = false) => {
    switch (field.type) {
      case "input":
        return (
          <Input
            type={field.inputType || "text"}
            placeholder={field.placeholder}
            value={values[field.id] || ""}
            disabled={readOnly}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "dropdown":
        return (
          <select
            disabled={readOnly}
            className="w-full border rounded-lg px-3 py-2"
            value={values[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select</option>

            {field.options.map((opt) => (
              <option key={opt.id} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-1">
            {field.options.map((opt) => (
              <label key={opt.id} className="flex gap-2">
                <input
                  type="radio"
                  disabled={readOnly}
                  checked={values[field.id] === opt.label}
                  onChange={() => handleChange(field.id, opt.label)}
                />

                {opt.label}
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-1">
            {field.options.map((opt) => (
              <label key={opt.id} className="flex gap-2">
                <input
                  type="checkbox"
                  disabled={readOnly}
                  checked={values[field.id] === opt.label}
                  onChange={(e) =>
                    handleChange(field.id, e.target.checked ? opt.label : "")
                  }
                />

                {opt.label}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-275 rounded-xl shadow-lg flex overflow-hidden">
        {/* LEFT SIDE */}

        <div className="w-1/2 p-6 overflow-y-auto">
          {/* Back button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Fill Form</h2>

            <Button variant="outline" onClick={onClose}>
              ← Back
            </Button>
          </div>

          {/* FORM TITLE & DESCRIPTION */}

          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold">
              {form.title || "Untitled Form"}
            </h1>

            {form.description && (
              <p className="text-gray-500 mt-1">{form.description}</p>
            )}
          </div>

          {/* FORM FIELDS */}

          <div className="space-y-4">
            {form.fields.map((field) => (
              <div key={field.id}>
                <label className="font-medium">
                  {field.label}

                  {field.required && <span className="text-red-500"> *</span>}
                </label>

                {renderField(field, formValues, false)}

                {errors[field.id] && (
                  <p className="text-red-500 text-sm">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <Button className="mt-6 w-full" onClick={handleSubmit}>
            {form.buttonText || "Submit"}
          </Button>
        </div>

        {/* RIGHT SIDE PREVIEW */}

        <div className="w-1/2 bg-gray-50 p-6 border-l overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Form Preview</h2>

          {!submittedData ? (
            <p className="text-gray-400">Submit form to see preview</p>
          ) : (
            <>
              {/* TITLE & DESCRIPTION */}

              <div className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold">
                  {form.title || "Untitled Form"}
                </h1>

                {form.description && (
                  <p className="text-gray-500 mt-1">{form.description}</p>
                )}
              </div>

              {/* READONLY FORM */}

              <div className="space-y-4">
                {form.fields.map((field) => (
                  <div key={field.id}>
                    <label className="font-medium">{field.label}</label>

                    {renderField(field, submittedData.values, true)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewForm;
