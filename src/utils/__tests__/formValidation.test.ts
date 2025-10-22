import { describe, it, expect } from "vitest";
import { FormValidator } from "../formValidation";
import { ContactFormData } from "../../types/contact";

describe("FormValidator", () => {
  describe("validateName", () => {
    it("should return error for empty name", () => {
      expect(FormValidator.validateName("")).toBe("Name is required");
      expect(FormValidator.validateName("   ")).toBe("Name is required");
    });

    it("should return error for name too short", () => {
      expect(FormValidator.validateName("A")).toBe(
        "Name must be at least 2 characters"
      );
    });

    it("should return error for name too long", () => {
      const longName = "A".repeat(51);
      expect(FormValidator.validateName(longName)).toBe(
        "Name must be less than 50 characters"
      );
    });

    it("should return null for valid name", () => {
      expect(FormValidator.validateName("John Doe")).toBeNull();
      expect(FormValidator.validateName("AB")).toBeNull();
      expect(FormValidator.validateName("A".repeat(50))).toBeNull();
    });
  });

  describe("validateEmail", () => {
    it("should return error for empty email", () => {
      expect(FormValidator.validateEmail("")).toBe("Email is required");
      expect(FormValidator.validateEmail("   ")).toBe("Email is required");
    });

    it("should return error for invalid email format", () => {
      expect(FormValidator.validateEmail("invalid")).toBe(
        "Please enter a valid email address"
      );
      expect(FormValidator.validateEmail("invalid@")).toBe(
        "Please enter a valid email address"
      );
      expect(FormValidator.validateEmail("@invalid.com")).toBe(
        "Please enter a valid email address"
      );
      expect(FormValidator.validateEmail("invalid@.com")).toBe(
        "Please enter a valid email address"
      );
    });

    it("should return null for valid email", () => {
      expect(FormValidator.validateEmail("test@example.com")).toBeNull();
      expect(
        FormValidator.validateEmail("user.name+tag@domain.co.uk")
      ).toBeNull();
    });
  });

  describe("validatePhone", () => {
    it("should return null for empty phone (optional field)", () => {
      expect(FormValidator.validatePhone("")).toBeNull();
      expect(FormValidator.validatePhone("   ")).toBeNull();
    });

    it("should return error for invalid phone format", () => {
      expect(FormValidator.validatePhone("abc")).toBe(
        "Please enter a valid phone number"
      );
      expect(FormValidator.validatePhone("123")).toBe(
        "Please enter a valid phone number"
      );
    });

    it("should return null for valid phone numbers", () => {
      expect(FormValidator.validatePhone("+1234567890")).toBeNull();
      expect(FormValidator.validatePhone("9876543210")).toBeNull();
      expect(FormValidator.validatePhone("+91-9876543210")).toBeNull();
      expect(FormValidator.validatePhone("+1 (555) 123-4567")).toBeNull();
    });
  });

  describe("validateMessage", () => {
    it("should return error for empty message", () => {
      expect(FormValidator.validateMessage("")).toBe("Message is required");
      expect(FormValidator.validateMessage("   ")).toBe("Message is required");
    });

    it("should return error for message too short", () => {
      expect(FormValidator.validateMessage("Short")).toBe(
        "Message must be at least 10 characters"
      );
    });

    it("should return error for message too long", () => {
      const longMessage = "A".repeat(1001);
      expect(FormValidator.validateMessage(longMessage)).toBe(
        "Message must be less than 1000 characters"
      );
    });

    it("should return null for valid message", () => {
      expect(
        FormValidator.validateMessage(
          "This is a valid message with enough characters"
        )
      ).toBeNull();
      expect(FormValidator.validateMessage("A".repeat(1000))).toBeNull();
    });
  });

  describe("validateForm", () => {
    const validFormData: ContactFormData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      message: "This is a valid message with enough characters",
    };

    it("should return valid for complete valid form", () => {
      const result = FormValidator.validateForm(validFormData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("should return invalid with errors for invalid form", () => {
      const invalidFormData: ContactFormData = {
        name: "",
        email: "invalid-email",
        phone: "abc",
        message: "short",
      };

      const result = FormValidator.validateForm(invalidFormData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe("Name is required");
      expect(result.errors.email).toBe("Please enter a valid email address");
      expect(result.errors.phone).toBe("Please enter a valid phone number");
      expect(result.errors.message).toBe(
        "Message must be at least 10 characters"
      );
    });

    it("should handle optional phone field correctly", () => {
      const formDataWithoutPhone: ContactFormData = {
        ...validFormData,
        phone: "",
      };

      const result = FormValidator.validateForm(formDataWithoutPhone);
      expect(result.isValid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });
  });
});
