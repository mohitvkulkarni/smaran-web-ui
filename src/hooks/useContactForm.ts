import { useState, useCallback } from "react";
import { ContactFormData, ContactFormState } from "../types/contact";
import { FormValidator } from "../utils/formValidation";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const initialState: ContactFormState = {
  formData: initialFormData,
  isSubmitting: false,
  submitStatus: "idle",
  validationErrors: {},
};

export const useContactForm = () => {
  const [state, setState] = useState<ContactFormState>(initialState);

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [field]: value,
        },
        validationErrors: {
          ...prev.validationErrors,
          [field]: FormValidator.validateField(field, value),
        },
      }));
    },
    []
  );

  const validateForm = useCallback(() => {
    const validation = FormValidator.validateForm(state.formData);
    setState((prev) => ({
      ...prev,
      validationErrors: validation.errors,
    }));
    return validation.isValid;
  }, [state.formData]);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setState((prev) => ({
      ...prev,
      isSubmitting,
    }));
  }, []);

  const setSubmitStatus = useCallback(
    (status: "idle" | "success" | "error") => {
      setState((prev) => ({
        ...prev,
        submitStatus: status,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setState(initialState);
  }, []);

  const isFormValid = useCallback(() => {
    return FormValidator.validateForm(state.formData).isValid;
  }, [state.formData]);

  return {
    formData: state.formData,
    validationErrors: state.validationErrors,
    isSubmitting: state.isSubmitting,
    submitStatus: state.submitStatus,
    updateField,
    validateForm,
    setSubmitting,
    setSubmitStatus,
    resetForm,
    isFormValid,
  };
};
