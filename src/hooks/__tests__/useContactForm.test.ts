import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContactForm } from "../useContactForm";

describe("useContactForm", () => {
  it("should initialize with empty form data", () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current.formData).toEqual({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitStatus).toBe("idle");
    expect(result.current.validationErrors).toEqual({});
  });

  it("should update field values", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", "John Doe");
    });

    expect(result.current.formData.name).toBe("John Doe");
  });

  it("should validate fields on update", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", ""); // Invalid name
    });

    expect(result.current.validationErrors.name).toBe("Name is required");
  });

  it("should validate entire form", () => {
    const { result } = renderHook(() => useContactForm());

    // Set invalid data
    act(() => {
      result.current.updateField("name", "");
      result.current.updateField("email", "invalid-email");
      result.current.updateField("message", "short");
    });

    let isValid;
    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(false);
    expect(result.current.validationErrors.name).toBe("Name is required");
    expect(result.current.validationErrors.email).toBe(
      "Please enter a valid email address"
    );
    expect(result.current.validationErrors.message).toBe(
      "Message must be at least 10 characters"
    );
  });

  it("should check if form is valid", () => {
    const { result } = renderHook(() => useContactForm());

    // Initially invalid (empty required fields)
    expect(result.current.isFormValid()).toBe(false);

    // Set valid data
    act(() => {
      result.current.updateField("name", "John Doe");
      result.current.updateField("email", "john@example.com");
      result.current.updateField(
        "message",
        "This is a valid message with enough characters"
      );
    });

    expect(result.current.isFormValid()).toBe(true);
  });

  it("should set submitting state", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.setSubmitting(true);
    });

    expect(result.current.isSubmitting).toBe(true);

    act(() => {
      result.current.setSubmitting(false);
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it("should set submit status", () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.setSubmitStatus("success");
    });

    expect(result.current.submitStatus).toBe("success");

    act(() => {
      result.current.setSubmitStatus("error");
    });

    expect(result.current.submitStatus).toBe("error");
  });

  it("should reset form", () => {
    const { result } = renderHook(() => useContactForm());

    // Set some data
    act(() => {
      result.current.updateField("name", "John Doe");
      result.current.updateField("email", "john@example.com");
      result.current.setSubmitting(true);
      result.current.setSubmitStatus("success");
    });

    // Reset form
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitStatus).toBe("idle");
    expect(result.current.validationErrors).toEqual({});
  });
});
