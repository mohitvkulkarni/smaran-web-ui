import "@testing-library/jest-dom";

// Mock environment variables for tests
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_EMAILJS_SERVICE_ID: "test_service_id",
    VITE_EMAILJS_TEMPLATE_ID: "test_template_id",
    VITE_EMAILJS_PUBLIC_KEY: "test_public_key",
  },
  writable: true,
});
