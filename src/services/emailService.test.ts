import { emailService } from "./emailService";
import { ContactFormData } from "../types/contact";

// Simple test to verify EmailJS configuration
const testEmailService = async () => {
  const testData: ContactFormData = {
    name: "Test User",
    email: "test@example.com",
    phone: "+91-9876543210",
    message:
      "This is a test message from the contact form to verify EmailJS integration is working correctly.",
  };

  console.log("Testing EmailJS configuration...");
  console.log("Service ID: service_v1r38em");
  console.log("Template ID: template_iwc1i8t");
  console.log("Public Key: De-o6gYBa74JTUYcd");

  try {
    const result = await emailService.sendContactForm(testData);
    console.log("Email service test result:", result);
    return result;
  } catch (error) {
    console.error("Email service test failed:", error);
    return { success: false, message: "Test failed", error: String(error) };
  }
};

export { testEmailService };
