export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormState {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  validationErrors: Partial<ContactFormData>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<ContactFormData>;
}

export interface EmailResult {
  success: boolean;
  message: string;
  error?: string;
}
