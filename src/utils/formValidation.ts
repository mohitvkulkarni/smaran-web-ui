import { ContactFormData, ValidationResult } from "../types/contact";

export class FormValidator {
  static validateField(
    field: keyof ContactFormData,
    value: string
  ): string | null {
    switch (field) {
      case "name":
        return this.validateName(value);
      case "email":
        return this.validateEmail(value);
      case "phone":
        return this.validatePhone(value);
      case "message":
        return this.validateMessage(value);
      default:
        return null;
    }
  }

  static validateName(name: string): string | null {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    return null;
  }

  static validateEmail(email: string): string | null {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return null;
  }

  static validatePhone(phone: string): string | null {
    if (!phone || !phone.trim()) {
      return null; // Phone is optional
    }
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
      return "Please enter a valid phone number";
    }
    return null;
  }

  static validateMessage(message: string): string | null {
    if (!message.trim()) {
      return "Message is required";
    }
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    if (message.trim().length > 1000) {
      return "Message must be less than 1000 characters";
    }
    return null;
  }

  static validateForm(data: ContactFormData): ValidationResult {
    const errors: Partial<ContactFormData> = {};

    const nameError = this.validateName(data.name);
    if (nameError) errors.name = nameError;

    const emailError = this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const phoneError = this.validatePhone(data.phone || "");
    if (phoneError) errors.phone = phoneError;

    const messageError = this.validateMessage(data.message);
    if (messageError) errors.message = messageError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
