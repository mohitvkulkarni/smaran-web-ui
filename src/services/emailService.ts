import emailjs from "@emailjs/browser";
import { ContactFormData, EmailResult } from "../types/contact";

class EmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    // Hardcoded values for your EmailJS configuration
    this.serviceId = "service_v1r38em";
    this.templateId = "template_iwc1i8t";
    this.publicKey = "De-o6gYBa74JTUYcd";

    // Initialize EmailJS with your public key
    emailjs.init(this.publicKey);
  }

  async sendContactForm(data: ContactFormData): Promise<EmailResult> {
    try {
      console.log("Sending email with data:", data);
      console.log("Using service ID:", this.serviceId);
      console.log("Using template ID:", this.templateId);

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone_number: data.phone || "Not provided",
        message: data.message,
        to_name: "Smaran Foundation",
        reply_to: data.email,
      };

      console.log("Template params:", templateParams);

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log("EmailJS response:", response);

      if (response.status === 200) {
        return {
          success: true,
          message:
            "Your message has been sent successfully! We will get back to you soon.",
        };
      } else {
        throw new Error(`Failed to send email. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      return {
        success: false,
        message:
          "Failed to send your message. Please try again or contact us directly.",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Fallback method using mailto
  openMailtoFallback(data: ContactFormData): void {
    const subject = encodeURIComponent(
      `Contact Form Submission from ${data.name}`
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || "Not provided"}\n\n` +
        `Message:\n${data.message}`
    );

    const mailtoUrl = `mailto:sanjana@smaranfoundation.org?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, "_blank");
  }
}

export const emailService = new EmailService();
