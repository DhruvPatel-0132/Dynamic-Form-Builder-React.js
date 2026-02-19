import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { message } from "antd"; 

function PreviewForm({ form, onClose }) {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const validate = () => {
    let newErrors = {};
    form.fields.forEach(field => {
      if (field.required && !formValues[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      message.error("Please fill all required fields"); 
      return;
    }

    const submission = {
      formId: Date.now(),
      values: formValues
    };

    localStorage.setItem("formSubmission", JSON.stringify(submission));
    message.success("Form submitted and stored in localStorage"); 
    if (onClose) onClose(); 
  };

  const renderField = (field) => {
    switch (field.type) {
      case "input":
        let htmlType = "text";
        if (field.inputType) {
          switch (field.inputType.toLowerCase()) {
            case "number":
              htmlType = "number";
              break;
            case "email":
              htmlType = "email";
              break;
            case "password":
              htmlType = "password";
              break;
            default:
              htmlType = "text";
          }
        }
        return (
          <Input
            type={htmlType}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={field.placeholder || ""}
            value={formValues[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case "dropdown":
        return (
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formValues[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select</option>
            {field.options.map(opt => (
              <option key={opt.id} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex flex-col space-y-1">
            {field.options.map(opt => (
              <label key={opt.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.id}
                  checked={formValues[field.id] === opt.label}
                  onChange={() => handleChange(field.id, opt.label)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex flex-col space-y-1">
            {field.options.map(opt => (
              <label key={opt.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formValues[field.id] === opt.label}
                  onChange={(e) =>
                    handleChange(field.id, e.target.checked ? opt.label : "")
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{opt.label}</span>
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
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">{form.title}</h2>
        {form.description && (
          <p className="text-gray-600 text-sm">{form.description}</p>
        )}

        <div className="space-y-4">
          {form.fields.map(field => (
            <div key={field.id} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
              {errors[field.id] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            {form.buttonText || "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PreviewForm;
