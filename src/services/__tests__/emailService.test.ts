import { describe, it, expect, vi, beforeEach } from "vitest";
import { emailService } from "../emailService";
import { ContactFormData } from "../../types/contact";

// Mock EmailJS
vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

import emailjs from "@emailjs/browser";

describe("EmailService", () => {
  const mockFormData: ContactFormData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    message: "This is a test message",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock environment variables
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "test_service_id");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "test_template_id");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "test_public_key");
  });

  it("should send email successfully", async () => {
    const mockSend = vi.mocked(emailjs.send);
    mockSend.mockResolvedValue({ status: 200, text: "OK" });

    const result = await emailService.sendContactForm(mockFormData);

    expect(result.success).toBe(true);
    expect(result.message).toBe(
      "Your message has been sent successfully! We will get back to you soon."
    );
    expect(mockSend).toHaveBeenCalledWith(
      "test_service_id",
      "test_template_id",
      {
        from_name: "John Doe",
        from_email: "john@example.com",
        phone: "+1234567890",
        message: "This is a test message",
        to_email: "info@smaranfoundation.org",
        reply_to: "john@example.com",
        subject: "Contact Form Submission from John Doe",
      },
      "test_public_key"
    );
  });

  it("should handle email sending failure", async () => {
    const mockSend = vi.mocked(emailjs.send);
    mockSend.mockRejectedValue(new Error("Network error"));

    const result = await emailService.sendContactForm(mockFormData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Failed to send your message. Please try again or contact us directly."
    );
    expect(result.error).toBe("Network error");
  });

  it("should handle missing configuration", async () => {
    // Clear environment variables
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "");

    const result = await emailService.sendContactForm(mockFormData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      "Failed to send your message. Please try again or contact us directly."
    );
    expect(result.error).toBe("EmailJS configuration is incomplete");
  });

  it("should handle form data without phone number", async () => {
    const mockSend = vi.mocked(emailjs.send);
    mockSend.mockResolvedValue({ status: 200, text: "OK" });

    const formDataWithoutPhone: ContactFormData = {
      ...mockFormData,
      phone: undefined,
    };

    const result = await emailService.sendContactForm(formDataWithoutPhone);

    expect(result.success).toBe(true);
    expect(mockSend).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        phone: "Not provided",
      }),
      expect.any(String)
    );
  });

  it("should open mailto fallback", () => {
    const mockOpen = vi.fn();
    vi.stubGlobal("window", { open: mockOpen });

    emailService.openMailtoFallback(mockFormData);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining("mailto:info@smaranfoundation.org"),
      "_blank"
    );

    const callArgs = mockOpen.mock.calls[0][0];
    expect(callArgs).toContain(
      "subject=Contact%20Form%20Submission%20from%20John%20Doe"
    );
    expect(callArgs).toContain("body=Name%3A%20John%20Doe");
    expect(callArgs).toContain("Email%3A%20john%40example.com");
    expect(callArgs).toContain("Phone%3A%20%2B1234567890");
    expect(callArgs).toContain("Message%3A%0AThis%20is%20a%20test%20message");
  });
});
